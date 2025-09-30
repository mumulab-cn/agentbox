export default class ConnectionManager {
    constructor() {
        this.connections = [];
        this.startPoint = null;
        this.startNode = null;
        this.isConnecting = false;
        this.selectedConnection = null;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        document.getElementById('main-canvas').appendChild(this.canvas);
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.startDot = null;
        this.lines = [];
        this.retryCount = 0;
        this.maxRetries = 3;
        this.retryDelay = 500;
    }

    restoreConnectionsWithRetry(connectionsData) {
        this.retryCount = 0;
        this.attemptRestoreConnections(connectionsData);
    }

    attemptRestoreConnections(connectionsData) {
        const allElementsLoaded = this.checkAllElementsExist(connectionsData);
        
        if (allElementsLoaded || this.retryCount >= this.maxRetries) {
            if (allElementsLoaded) {
                this.restoreConnections(connectionsData);
            } else {
                console.error(`Failed to restore connections after ${this.maxRetries} attempts`);
            }
            return;
        }
        
        this.retryCount++;
        console.log(`Retrying connection restore (attempt ${this.retryCount})...`);
        setTimeout(() => this.attemptRestoreConnections(connectionsData), this.retryDelay);
    }

    checkAllElementsExist(connectionsData) {
        return connectionsData.every(conn => {
            const startNode = document.getElementById(conn.startBlockId);
            const endNode = document.getElementById(conn.endBlockId);
            return startNode && endNode;
        });
    }

    resizeCanvas() {
        const container = document.getElementById('main-canvas');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.redrawConnections();
    }

    startConnection(node, point) {
        console.log("dragstart connection");
        this.startNode = node;
        this.startPoint = point;
        this.isConnecting = true;
        // 添加临时连线预览
        document.addEventListener('dragover', this.handleDrag.bind(this));
    }

    createLine(start, end) {
        // 确保start和end参数存在
        if (!start || !end) {
            console.error('无效的连接点:', start, end);
            return;
        }
        
        // 检查start和end是否为jQuery对象且具有offset方法
        if (!start.offset || typeof start.offset !== 'function' || 
            !end.offset || typeof end.offset !== 'function') {
            console.error('连接点不是有效的DOM元素:', start, end);
            return;
        }
        
        console.log("创建连线 - 起点:", start.offset(), "终点:", end.offset());
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke', '#2196F3');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        $('#svg-container').append(path);
        
        const connection = {
            line: $(path),
            start: start,
            end: end
        };
        this.lines.push(connection);
        this.updateLine(connection);
    }

    endConnection(event) {
        console.log("dragend connection");
        const endNode = event.target.closest('.node');
        const endPoint = endNode?.querySelector('.connection-point');
        
        if (this.startNode && endNode && endPoint && endNode !== this.startNode) {
            // 获取起始连接点和结束连接点的DOM元素
            const startPointElement = this.startPoint.element;
            const endPointElement = endPoint.element;
            
            if (!startPointElement || !endPointElement) {
                console.error('无法获取连接点元素');
                this.resetConnectionState();
                return;
            }
            
            console.log("完成连线 - 起点节点:", this.startNode.id, "起点类型:", this.startPoint.type);
            console.log("完成连线 - 终点节点:", endNode.id, "终点类型:", endPoint.type);
            
            // 创建SVG连线
            this.createLine(startPointElement, endPointElement);
            
            const connection = {
                startNode: this.startNode,
                startPoint: this.startPoint,
                endNode: endNode,
                endPoint: endPoint
            };
            
            // 检查是否已经存在相同的连接
            const isExisting = this.connections.some(conn => 
                conn.startNode === connection.startNode && 
                conn.endNode === connection.endNode &&
                conn.startPoint.type === connection.startPoint.type &&
                conn.endPoint.type === connection.endPoint.type
            );
            
            if (!isExisting) {
                this.connections.push(connection);
                this.redrawConnections();
            }
        }
        this.resetConnectionState();
    }

    resetConnectionState() {
        console.log("reset connection");
        this.startNode = null;
        this.startPoint = null;
        this.isConnecting = false;
    }

    redrawConnections() {
        console.log("redraw connection");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.connections.forEach(conn => {
            const startPoint = conn.startNode.connectionPoints.find(p => p.type === conn.startPoint.type);
            const endPoint = conn.endNode.connectionPoints.find(p => p.type === conn.endPoint.type);
            
            if (!startPoint || !endPoint) return;
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = conn === this.selectedConnection ? '#28a745' : '#232f3e';
            this.ctx.lineWidth = conn === this.selectedConnection ? 3 : 2;
            
            // 绘制直角连线
            const midX = startPoint.x + (endPoint.x - startPoint.x) / 2;
            this.ctx.moveTo(startPoint.x, startPoint.y);
            this.ctx.lineTo(midX, startPoint.y);
            this.ctx.lineTo(midX, endPoint.y);
            this.ctx.lineTo(endPoint.x, endPoint.y);
            this.ctx.stroke();
            
            // 绘制箭头
            this.drawArrow(endPoint.x, endPoint.y, this.getArrowDirection(conn.endPoint.type));
        });
    }
    
    restoreConnections(connectionsData) {
        const svgContainer = document.getElementById('svg-container');
        if (!svgContainer) {
            console.error('SVG容器未找到，等待重试...');
            setTimeout(() => this.restoreConnections(connectionsData), 100);
            return;
        }
        
        connectionsData.forEach(conn => {
            const startNode = document.getElementById(conn.startBlockId);
            const endNode = document.getElementById(conn.endBlockId);
            
            if (startNode && endNode) {
                const connection = {
                    startNode: startNode,
                    startPoint: { type: conn.startPosition },
                    endNode: endNode,
                    endPoint: { type: conn.endPosition }
                };
                this.connections.push(connection);
            }
        });
        this.redrawConnections();
    }

    update22Line(connection) {
        // 检查connection对象及其属性是否存在
        if (!connection || !connection.start || !connection.end) {
            console.error('无效的连接对象:', connection);
            return;
        }
        
        // 检查start和end元素是否仍然存在于DOM中
        if (connection.start.length === 0 || connection.end.length === 0) {
            console.error('连接点已不存在于DOM中:', connection);
            return;
        }
        
        // 检查main-canvas元素是否存在
        const mainCanvas = $('#main-canvas');
        if (mainCanvas.length === 0) {
            console.error('找不到main-canvas元素');
            return;
        }
        
        const containerOffset = mainCanvas.offset() || {left: 0, top: 0};
        if (!containerOffset) {
            console.error('无法获取容器偏移量');
            return;
        }
        
        // 直接从连接点元素获取坐标，不使用localStorage
        // 添加默认值0，防止NaN出现
        const startOffset = connection.start.offset() || {left: 0, top: 0};
        const endOffset = connection.end.offset() || {left: 0, top: 0};
        
        // 记录连接点位置信息，便于调试
        console.log("连接点DOM状态 - 起点:", connection.start.length, "终点:", connection.end.length);
        console.log("连接点offset - 起点:", startOffset, "终点:", endOffset);
        
        // 直接使用连接点的位置，不再计算中心点
        // 连接点本身就是一个小圆点，其位置已经是准确的
        const startId = connection.start.attr('id');
        const endId = connection.end.attr('id');
        const storageKey = `connection_${startId}_${endId}`;
        
        // 从localStorage获取坐标
        const savedCoords = JSON.parse(localStorage.getItem(storageKey)) || {};
        const x1 = savedCoords.x1 || startOffset.left - containerOffset.left;
        const y1 = savedCoords.y1 || startOffset.top - containerOffset.top;
        const x2 = savedCoords.x2 || endOffset.left - containerOffset.left;
        const y2 = savedCoords.y2 || endOffset.top - containerOffset.top;
        
        // 存储最新坐标
        localStorage.setItem(storageKey, JSON.stringify({
          x1: startOffset.left - containerOffset.left,
          y1: startOffset.top - containerOffset.top,
          x2: endOffset.left - containerOffset.left,
          y2: endOffset.top - containerOffset.top
        }));
        
        console.log("连接点位置 - 起点:", x1, y1, "终点:", x2, y2);

        // 设置固定的圆角半径
        const radius = 10;
        
        let path;
        // 判断起点和终点的相对位置，决定路径的绘制方式
        const startPointType = connection.start.data('point-type');
        const endPointType = connection.end.data('point-type');
        
        if (startPointType === 'right') {
            // 从右侧连接点开始
            if (endPointType === 'left') {
                // 如果终点是左侧连接点，直接水平连接
                if (y1 === y2) {
                    path = `M ${x1} ${y1} H ${x2}`;
                } else {
                    const midX = x1 + (x2 - x1) / 2;
                    path = `M ${x1} ${y1}
                           H ${midX - radius}
                           Q ${midX} ${y1} ${midX} ${y1 + Math.sign(y2 - y1) * radius}
                           V ${y2 - Math.sign(y2 - y1) * radius}
                           Q ${midX} ${y2} ${midX + radius} ${y2}
                           H ${x2}`;
                }
            } else if (endPointType === 'top' || endPointType === 'bottom') {
                // 右侧连接点连接到上/下连接点
                const midX = x1 + (x2 - x1) / 2;
                path = `M ${x1} ${y1}
                       H ${midX - radius}
                       Q ${midX} ${y1} ${midX} ${y1 + Math.sign(y2 - y1) * radius}
                       V ${y2 - Math.sign(y2 - y1) * radius}
                       Q ${midX} ${y2} ${midX + Math.sign(x2 - midX) * radius} ${y2}
                       H ${x2}`;
            }
        } else if (startPointType === 'left') {
            // 从左侧连接点开始
            if (endPointType === 'right') {
                // 如果终点是右侧连接点
                if (y1 === y2) {
                    path = `M ${x1} ${y1} H ${x2}`;
                } else {
                    const midX = x1 + (x2 - x1) / 2;
                    path = `M ${x1} ${y1}
                           H ${midX - radius}
                           Q ${midX} ${y1} ${midX} ${y1 + Math.sign(y2 - y1) * radius}
                           V ${y2 - Math.sign(y2 - y1) * radius}
                           Q ${midX} ${y2} ${midX + radius} ${y2}
                           H ${x2}`;
                }
            } else if (endPointType === 'top' || endPointType === 'bottom') {
                // 左侧连接点连接到上/下连接点
                const midX = x1 + (x2 - x1) / 2;
                path = `M ${x1} ${y1}
                       H ${midX - radius}
                       Q ${midX} ${y1} ${midX} ${y1 + Math.sign(y2 - y1) * radius}
                       V ${y2 - Math.sign(y2 - y1) * radius}
                       Q ${midX} ${y2} ${midX + Math.sign(x2 - midX) * radius} ${y2}
                       H ${x2}`;
            }
        } else if (startPointType === 'top') {
            // 从顶部连接点开始
            if (endPointType === 'bottom') {
                // 如果终点是底部连接点
                if (x1 === x2) {
                    path = `M ${x1} ${y1} V ${y2}`;
                } else {
                    const midY = y1 + (y2 - y1) / 2;
                    path = `M ${x1} ${y1}
                           V ${midY - radius}
                           Q ${x1} ${midY} ${x1 + Math.sign(x2 - x1) * radius} ${midY}
                           H ${x2 - Math.sign(x2 - x1) * radius}
                           Q ${x2} ${midY} ${x2} ${midY + radius}
                           V ${y2}`;
                }
            } else if (endPointType === 'left' || endPointType === 'right') {
                // 顶部连接点连接到左/右连接点
                const midY = y1 + (y2 - y1) / 2;
                path = `M ${x1} ${y1}
                       V ${midY - radius}
                       Q ${x1} ${midY} ${x1 + Math.sign(x2 - x1) * radius} ${midY}
                       H ${x2 - Math.sign(x2 - x1) * radius}
                       Q ${x2} ${midY} ${x2} ${midY + Math.sign(y2 - midY) * radius}
                       V ${y2}`;
            }
        } else if (startPointType === 'bottom') {
            // 从底部连接点开始
            if (endPointType === 'top') {
                // 如果终点是顶部连接点
                if (x1 === x2) {
                    path = `M ${x1} ${y1} V ${y2}`;
                } else {
                    const midY = y1 + (y2 - y1) / 2;
                    path = `M ${x1} ${y1}
                           V ${midY - radius}
                           Q ${x1} ${midY} ${x1 + Math.sign(x2 - x1) * radius} ${midY}
                           H ${x2 - Math.sign(x2 - x1) * radius}
                           Q ${x2} ${midY} ${x2} ${midY + radius}
                           V ${y2}`;
                }
            } else if (endPointType === 'left' || endPointType === 'right') {
                // 底部连接点连接到左/右连接点
                const midY = y1 + (y2 - y1) / 2;
                path = `M ${x1} ${y1}
                       V ${midY - radius}
                       Q ${x1} ${midY} ${x1 + Math.sign(x2 - x1) * radius} ${midY}
                       H ${x2 - Math.sign(x2 - x1) * radius}
                       Q ${x2} ${midY} ${x2} ${midY + Math.sign(y2 - midY) * radius}
                       V ${y2}`;
            }
        }
        
        // 如果没有匹配到任何路径规则，创建一个简单的直线连接
        if (!path) {
            path = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        connection.line.attr('d', path);
    }

    handleDrag(event) {
        if (!this.isConnecting) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTempConnection(mouseX, mouseY);
    }

    drawTempConnection(mouseX, mouseY) {
        if (this.isConnecting && this.startNode && this.startPoint) {
            // 获取startPoint的DOM元素
            const startPointElement = this.startPoint.element;
            if (!startPointElement) {
                console.error('无法获取起始连接点元素');
                return;
            }
            
            // 获取连接点在画布中的位置
            const containerOffset = $('#main-canvas').offset() || {left: 0, top: 0};
            const startOffset = startPointElement.offset() || {left: 0, top: 0};
            const startX = startOffset.left - containerOffset.left;
            const startY = startOffset.top - containerOffset.top;
            
            console.log("临时连线 - 起点:", startX, startY, "鼠标位置:", mouseX, mouseY);
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#6c757d';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            
            const midX = startX + (mouseX - startX) / 2;
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(midX, startY);
            this.ctx.lineTo(midX, mouseY);
            this.ctx.lineTo(mouseX, mouseY);
            
            this.ctx.stroke();
            this.ctx.setLineDash([]);
            
            // 绘制临时箭头
            const direction = mouseX > startX ? 'right' : 'left';
            this.drawArrow(mouseX, mouseY, direction);
        }
    }

    drawArrow(x, y, direction) {
        const arrowSize = 8;
        this.ctx.beginPath();
        switch(direction) {
            case 'left':
                this.ctx.moveTo(x + arrowSize, y - arrowSize);
                this.ctx.lineTo(x, y);
                this.ctx.lineTo(x + arrowSize, y + arrowSize);
                break;
            case 'right':
                this.ctx.moveTo(x - arrowSize, y - arrowSize);
                this.ctx.lineTo(x, y);
                this.ctx.lineTo(x - arrowSize, y + arrowSize);
                break;
            case 'up':
                this.ctx.moveTo(x - arrowSize, y + arrowSize);
                this.ctx.lineTo(x, y);
                this.ctx.lineTo(x + arrowSize, y + arrowSize);
                break;
            case 'down':
                this.ctx.moveTo(x - arrowSize, y - arrowSize);
                this.ctx.lineTo(x, y);
                this.ctx.lineTo(x + arrowSize, y - arrowSize);
                break;
        }
        this.ctx.stroke();
    }

    getArrowDirection(position) {
        switch(position) {
            case 'left': return 'left';
            case 'right': return 'right';
            case 'top': return 'up';
            case 'bottom': return 'down';
        }
    }

    getConnectionAtPosition(x, y) {
        const hitDistance = 5;
        return this.connections.find(conn => {
            const startPoint = conn.startNode.connectionPoints.find(p => p.type === conn.startPoint.type);
            const endPoint = conn.endNode.connectionPoints.find(p => p.type === conn.endPoint.type);
            if (!startPoint || !endPoint) return false;
            
            const midX = startPoint.x + (endPoint.x - startPoint.x) / 2;
            
            // 检查垂直线段
            if (Math.abs(x - midX) <= hitDistance &&
                y >= Math.min(startPoint.y, endPoint.y) &&
                y <= Math.max(startPoint.y, endPoint.y)) {
                return true;
            }
            
            // 检查水平线段
            if (y >= startPoint.y - hitDistance && y <= startPoint.y + hitDistance &&
                x >= Math.min(startPoint.x, midX) && x <= Math.max(startPoint.x, midX)) {
                return true;
            }
            if (y >= endPoint.y - hitDistance && y <= endPoint.y + hitDistance &&
                x >= Math.min(midX, endPoint.x) && x <= Math.max(midX, endPoint.x)) {
                return true;
            }
            
            return false;
        });
    }

    setSelectedConnection(connection) {
        this.selectedConnection = connection;
        this.redrawConnections();alert("205");
    }

    deleteSelectedConnection() {
        if (this.selectedConnection) {
            const index = this.connections.indexOf(this.selectedConnection);
            if (index > -1) {
                this.connections.splice(index, 1);
            }
            this.selectedConnection = null;
            this.redrawConnections();alert("215");
        }
    }

    removeNodeConnections(node) {
        this.connections = this.connections.filter(conn => 
            conn.startNode !== node && conn.endNode !== node
        );
        this.redrawConnections();alert("223");
    }

    loadState(connectionsData) {
        this.connections = [];
        connectionsData.forEach(connData => {
            this.connections.push({
                startNode: nodeManager.nodes.find(n => n.id === connData.startNodeId),
                startPoint: { type: connData.startPointType },
                endNode: nodeManager.nodes.find(n => n.id === connData.endNodeId),
                endPoint: { type: connData.endPointType }
            });
        });
        this.redrawConnections();alert("236");
    }

    restoreConnections(savedConnections) {
        savedConnections.forEach(conn => {
            // 通过节点管理器获取最新节点引用
            const startNode = nodeManager.getNodeById(conn.startNodeId);
            const endNode = nodeManager.getNodeById(conn.endNodeId);
            
            if (startNode && endNode) {
                // 使用节点自身的连接点查找方法
                const startElement = startNode.element.querySelector(`.connector.${conn.startPointType}`);
                const endElement = endNode.element.querySelector(`.connector.${conn.endPointType}`);
                
                if (startElement && endElement) {
                    // 先移除旧事件监听
                    startElement.removeEventListener('mousedown', this.handleConnectorMouseDown);
                    endElement.removeEventListener('mousedown', this.handleConnectorMouseDown);
                    
                    // 创建新连线并绑定事件
                    this.createLine($(startElement), $(endElement));
                    
                    // 绑定mousedown事件
                    startElement.addEventListener('mousedown', (e) => {
                        this.startConnection(startNode, { 
                            type: conn.startPointType, 
                            element: e.target 
                        });
                        e.stopPropagation();
                    });
                    endElement.addEventListener('mousedown', (e) => {
                        this.startConnection(endNode, {
                            type: conn.endPointType,
                            element: e.target
                        });
                        e.stopPropagation();
                    });
                    
                    // 绑定dragend事件
                    document.addEventListener('dragend', (e) => {
                        if (this.isConnecting) {
                            this.endConnection(e);
                        }
                    });
                    
                    // 确保连接点可交互
                    startElement.style.pointerEvents = 'auto';
                    endElement.style.pointerEvents = 'auto';
                    
                    console.log('连接点事件已重新绑定:', startElement, endElement);
                }
            }
        });
        this.redrawConnections();
    }
}