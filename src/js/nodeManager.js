export default class NodeManager {
    constructor() {
        this.nodes = [];
        this.selectedNode = null;
        this.hoveredNode = null;
        this.connectionPoints = [];
        this.connectionManager = null;
        this.deleteIcon = null;
        this.startDot = null;
        this.lines = [];
        
        // 确保SVG容器存在
        if ($('#svg-container').length === 0) {
            $('<svg id="svg-container" width="100%" height="100%"></svg>').css({
                position: 'absolute',
                top: 0,
                left: 0,
                'pointer-events': 'none',
                'z-index': 1
            }).appendTo('#main-canvas');
        }
    }

    createNode(x, y, name, node_text, type, good, bad, cost, todo) {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        
        var node_div = '<div class="node" id='+id+'><span class="node-text"></span><div>';
        
        var use_default = "no";
        var color = "#0066FF";
        var img = "tongyi.png";
        console.log(use_default);

        if(name == "微信小程序"){
            img = "weixin.png";
            color = "rgb(14, 181, 94)";
        }
        else if(name == "DeepSeek"){
            img = "deepseek.png";
            color = "#0066FF";
            //var node_div = '<div class="node" id='+id+' style="height:60px;"><div style="height:72px;"><img src="/0313/src/images/deepseek.png" style="" /></div><div><span class="node-text"></span></div></div>';
        }
        else if(name == "MiniMax"){
            img = "minimax.png";
            color = "RGB(244,73,68)";
        }
        else if(type == "文本"){
            use_default = "text";
        }
        else {
            use_default = "default";
        }

        if(use_default == "text"){
            var node_div = '<div class="node" id='+id+' style="height:60px;display:flex;align-items:center;padding:20px 10px;font-weight:bold;"><div><span class="node-text"></span></div></div>';
            var display_str = 'flex';
            var width = 160;
            var height = 100;
            var background_color = 'RGB(255,196,0,0.2)';
        }
        else if(use_default == "default"){
            var node_div = '<div class="node" id='+id+' style="height:60px;display:flex;align-items:center;padding:20px 10px;font-weight:bold;"><div><span class="node-text"></span></div></div>';
            var display_str = 'flex';
            var width = 80;
            var height = 80;
            var background_color = 'RGB(255,255,255,0,2)';
        }
        else {
            var node_div = '<div class="node" id='+id+' style="height:60px;"><div style="height:72px;"><img src="/0313/src/images/'+img+'" style="" /></div><div><span class="node-text"></span></div></div>';
            var display_str = 'flow';
            var width = 80;
            var height = 80;
            var background_color = 'RGB(255,255,255,0,2)';
        }
        
        const nodeElement = $(node_div).css({
            position: 'absolute',
            left: Math.round(x),
            top: Math.round(y),
            width: width,
            height: height,
            fontSize: '13px',
            backgroundColor: background_color,
            border: '2px solid '+color,
            boxSshadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            color:"#0066FF",
            borderRadius: '8px',
            padding: '10px 0',
            cursor: 'move',
            userSelect: 'none',
            good: good,
            bad: bad,
            cost: cost,
            todo: todo,
            display:display_str
        }).data('node-id', id);
        nodeElement.find('.node-text').text(name);

        $('#main-canvas').append(nodeElement);

        const node1 = {
            id: id,
            element: nodeElement,
            name: `${type}_${id.slice(-4)}`,
            x: Math.round(x),
            y: Math.round(y),
            type: type,
            width: 100,
            height: 60,
            connectionPoints: [],
            content: type,
            good: good,
            bad: bad,
            cost: cost,
            todo: todo
        };

        this.currentNodeId = id;
        console.log("6666666666666666666666");
        node1.connectionPoints = this.createConnectionPoints(node1.x, node1.y);
        
        const $nodeb = $(this);
        
        // 添加连接点元素
        node1.connectionPoints.forEach(point => {
            // 创建连接点元素并添加类名
            const pointElement = $('<div class="connection-point"></div>').css({
                position: 'absolute',
                width: '10px',
                height: '10px',
                backgroundColor: '#FFFFFF',
                border:'1px solid #0066FF',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'none',
                zIndex: 9999
            }).data('point-type', point.type);

            console.log(point.type);
            switch(point.type) {
                case 'top':
                    pointElement.css({
                        left: '50%',
                        top: '-5px',
                        transform: 'translateX(-50%)'
                    });
                    break;
                case 'right':
                    pointElement.css({
                        right: '-5px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    });
                    pointElement.addClass('right');
                    break;
                case 'bottom':
                    pointElement.css({
                        left: '50%',
                        bottom: '-5px',
                        transform: 'translateX(-50%)'
                    });
                    break;
                case 'left':
                    pointElement.css({
                        left: '-5px',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    });
                    pointElement.addClass('left');
                    break;
            }

            //const $nodea = $(this);
            const $nodea = $("#"+id);
            console.log("1234567890");
            console.log($nodea);

            point.element = pointElement;
            //const nodeId = $(e.currentTarget).data('node-id');
            //const node = this.nodes.find(n => n.id === nodeId);
            $nodea.find('.connection-point').on('click', (e) => {
                if (this.startDot && !this.endDot) {
                    this.endDot = $(e.currentTarget);
                    this.endDot.addClass('active-connector');
                } else if (!this.startDot) {
                    this.startDot = $(e.currentTarget);
                    this.startDot.addClass('active-connector');
                }
                console.log("click1234567890");
                var a = $(this);
                console.log(a);
                
                const nodeManager = window.nodeManager;
                if (!nodeManager.startDot) {
                    // 开始连线
                    nodeManager.startDot = $(this);
                    nodeManager.startDot.css('background-color', '#0D47A1');
                } else {
                    // 完成连线
                    nodeManager.endDot = $(this);
                    console.log("创建连线");
                    nodeManager.createLine(nodeManager.startDot, nodeManager.endDot);
                    if (nodeManager.startDot[0] !== nodeManager.endDot[0]) {
                        //createLine(startDot, endDot);
                    }
                    nodeManager.startDot.css('background-color', '');
                    nodeManager.startDot = null;
                    // 移除无参数调用createLine
                }






                /*e.stopPropagation();
                console.log("187");
                var a = $(this);
                console.log("===**==**==**==**");
                console.log(point);
                console.log(e);
                //var a = e;
                console.log(a);
                console.log(a.offset);
                console.log(a.offset.left);
                this.checkDot(a, node1, point);*/
                //this.checkDot.call(pointElement, node1, point);
                //this.checkDot.call(this, node1, point);
                //this.checkDot(e, node1, point);
            });
            nodeElement.append(pointElement);
            console.log(pointElement);
        });

        // 添加删除图标和编辑图标
        const deleteIcon = $('<i class="fa fa-times delete-node"></i>').css({
            position: 'absolute',
            right: '-8px',
            top: '-8px',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'none',
            zIndex: 1000
        });

        const editIcon = $('<i class="fa fa-edit edit-node"></i>').css({
            position: 'absolute',
            right: '15px',
            top: '-8px',
            color: '#0066FF',
            cursor: 'pointer',
            fontSize: '16px',
            display: 'none',
            zIndex: 1000
        });

        nodeElement.append(deleteIcon);
        nodeElement.append(editIcon);

        // 删除节点事件
        deleteIcon.on('click', (e) => {
            e.stopPropagation();
            const nodeId = nodeElement.data('node-id');
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                // 移除相关连接线
                this.connectionManager.removeNodeConnections(node);
                // 从节点数组中移除
                this.nodes = this.nodes.filter(n => n.id !== nodeId);
                // 移除DOM元素
                nodeElement.remove();
            }
        });

        nodeElement.on('mouseenter', () => {
            nodeElement.find('.connection-point').show();
            deleteIcon.show();
            editIcon.show();
        }).on('mouseleave', () => {
            if (!this.connectionManager.isConnecting) {
                nodeElement.find('.connection-point').hide();
                deleteIcon.hide();
                editIcon.hide();
            }
        });

        // 编辑节点事件
        editIcon.on('click', (e) => {
            e.stopPropagation();
            const nodeId = nodeElement.data('node-id');
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                $('#node-info').html(`
                    <div class="form-group">
                        <label>名称：</label>
                        <input type="text" class="form-control" id="edit-name" value="${node.name}">
                    </div>
                    <div class="form-group">
                        <label>类型：</label>
                        <input type="text" class="form-control" id="edit-type" value="${node.type}">
                    </div>
                    <div class="form-group">
                        <label>优点：</label>
                        <textarea class="form-control" id="edit-good">${node.good || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>缺点：</label>
                        <textarea class="form-control" id="edit-bad">${node.bad || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>成本：</label>
                        <input type="text" class="form-control" id="edit-cost" value="${node.cost || ''}">
                    </div>
                    <div class="form-group">
                        <label>待办：</label>
                        <textarea class="form-control" id="edit-todo">${node.todo || ''}</textarea>
                    </div>
                    <button class="btn btn-primary" id="save-node">保存</button>
                `);

                $('#save-node').on('click', () => {
                    $("#"+nodeId).text($('#edit-type').val());

                    /*$("#"+nodeId).css({
                        'border-color': '#232f3e',
                        'box-shadow': 'none',
                        'width':'200px'
                    });*/
                    
                    node.name = $('#edit-name').val();
                    node.type = $('#edit-type').val();
                    node.good = $('#edit-good').val();
                    node.bad = $('#edit-bad').val();
                    node.cost = $('#edit-cost').val();
                    node.todo = $('#edit-todo').val();
                    node.content = node.type;
                    
                    console.log("save-node");
                    // 更新节点显示内容和样式
                    node.element.text(node.type);
                    console.log(node.type);
                    node.element.text("aaaaaaaa");
                    node.element.css({
                        good: node.good,
                        bad: node.bad,
                        cost: node.cost,
                        todo: node.todo
                    });
                    
                    this.updateInfoPanel(node);
                });
            }
        });

        const $nodea = $("#"+id);
        //nodeElement.on('click', (e) => {
        $nodea.find('.connection-point').on('click', (e) => {
            console.log("nodea");
            console.log($nodea);
            e.stopPropagation();
            const nodeId = $(e.currentTarget).data('node-id');
            console.log("----------------------------");
            console.log($(e.currentTarget));
            console.log(nodeId);
            
            // 输出节点的offset和x、y坐标值
            const nodeOffset = $(e.currentTarget).offset();
            console.log("节点offset:", nodeOffset);
            console.log("节点x坐标:", $(e.currentTarget).css('left'));
            console.log("节点y坐标:", $(e.currentTarget).css('top'));
            
            const node = this.nodes.find(n => n.id === nodeId);
            if (node) {
                this.setSelectedNode(node);
                window.connectionManager.redrawConnections();
                this.updateInfoPanel(node);
            }
            console.log("335");
            console.log("asdfsdfsafasda");
            this.checkDot($(e.currentTarget));
            //this.checkDot(e);
        });

        nodeElement.draggable({
            containment: '#main-canvas',
            zIndex: 1000,
            revert: false,
            helper: 'original',
            start: function(event, ui) {
                $(this).css('opacity', '0.5');
            },
            stop: function(event, ui) {
                $(this).css('opacity', '1');
            },
            drag: function(event, ui) {
                const nodeId = $(this).data('node-id');
                const node = window.nodeManager.nodes.find(n => n.id === nodeId);
                if (node) {
                    node.x = ui.position.left;
                    node.y = ui.position.top;
                    console.log("节点拖动中 - 位置更新:", node.x, node.y);
                    
                    // 更新节点的连接点
                    node.connectionPoints = window.nodeManager.createConnectionPoints(node.x, node.y);
                    
                    // 更新连接线
                    window.nodeManager.updateAllLines();
                    window.connectionManager.redrawConnections();
                    
                    // 更新SVG连线
                    if (window.svgConnectionManager) {
                        window.svgConnectionManager.updateConnections();
                    }
                }
            }
        });

        this.nodes.push(node1);

        //当移动时更新
        /*$(".node").on('mousemove', () => {
            alert("aa");
            this.update22AllLines();
        });*/
        
        return node1;
    }

    checkDot(dotElement) {
        if (!this.startDot) {
            console.log("开始连线");
            // 开始连线，保存startDot到实例属性
            this.startDot = $(dotElement);
            console.log("起点连接点信息:", this.startDot.offset());
            
            // 将startDot的背景颜色设置为橙色
            this.startDot.css('background-color', '#FF8800');
            // 不再使用localStorage存储坐标和元素ID
        } else {
            console.log("完成连线");
            // 完成连线
            const endDot = $(dotElement);
            
            console.log("连接点信息:");
            console.log("起点:", this.startDot.offset());
            console.log("终点:", endDot.offset());
            
            // 确保只调用一次createLine方法，并且不是连接到自身
            if (this.startDot[0] !== endDot[0]) {
                // 直接使用当前的startDot和endDot创建连线，不从localStorage获取
                this.createLine(this.startDot, endDot);
            }
            
            this.startDot.css('background-color', '');
            this.startDot = null; // 重置startDot，允许创建新的连线
        }
    }
    createLine(start, end) {
        // 检查start和end参数是否存在
        if (!start || !end) {
            console.error('无效的连接点:', start, end);
            return;
        }
        console.log("创建连线");
        
        // 检查start和end是否为jQuery对象且具有offset方法
        if (!start.offset || typeof start.offset !== 'function' || 
            !end.offset || typeof end.offset !== 'function') {
            console.error('连接点不是有效的DOM元素:', start, end);
            return;
        }
        
        // 确保svg-container元素存在
        if ($('#svg-container').length === 0) {
            $('<svg id="svg-container" width="100%" height="100%"></svg>').css({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                'pointer-events': 'none'
            }).appendTo('#main-canvas');
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke', '#2196F3');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        $('#svg-container').append(path);
        
        // 创建连接对象，保存当前的start和end元素引用
        const connection = {
            line: $(path),
            start: start,
            end: end
        };
        this.lines.push(connection);
        
        // 立即更新连线
        this.updateLine(connection);
    }

    // 更新单条连线位置
    updateLine(connection) {
        console.log("更新连线");

        // 检查connection对象及其属性是否存在
        if (!connection || !connection.start || !connection.end) {
            console.error('无效的连接对象:', connection);
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
        
        // 检查start和end元素是否仍然存在于DOM中
        if (connection.start.length === 0 || connection.end.length === 0) {
            console.error('连接点已不存在于DOM中:', connection);
            return;
        }

        // 直接从连接点元素获取坐标
        // 添加默认值0，防止NaN出现
        const startOffset = connection.start.offset() || {left: 0, top: 0};
        const endOffset = connection.end.offset() || {left: 0, top: 0};
        
        // 记录连接点位置信息，便于调试
        console.log("连接点DOM状态 - 起点:", connection.start.length, "终点:", connection.end.length);
        console.log("连接点offset - 起点:", startOffset, "终点:", endOffset);
        
        // 直接使用连接点的位置，不再计算中心点
        // 连接点本身就是一个小圆点，其位置已经是准确的
        const x1 = startOffset.left - containerOffset.left || 0;
        const y1 = startOffset.top - containerOffset.top || 0;
        const x2 = endOffset.left - containerOffset.left || 0;
        const y2 = endOffset.top - containerOffset.top || 0;
        
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

        console.log(path);
        
        // 如果没有匹配到任何路径规则，创建一个简单的直线连接
        if (!path) {
            path = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        connection.line.attr('d', path);
    }

    createaLine1(start, end) {
        return ;
        // 检查start和end参数是否存在
        if (!start || !end) {
            console.error('无效的连接点:', start, end);
            return;
        }
        
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
        this.update22Line(connection);
    }
    updateaLine2(connection) {
        return;
        // 检查connection对象及其属性是否存在
        if (!connection ||!connection.start ||!connection.end) {
            console.error('无效的连接对象:', connection);
            return;
        }

        // 直接使用connection.start.offset()，不创建中间变量
        const startOffset = connection.start.offset() || {left: 0, top: 0};
        const endOffset = connection.end.offset() || {left: 0, top: 0};
        const containerOffset = $('#main-canvas').offset() || {left: 0, top: 0};

        console.log(containerOffset);
        console.log("====00000");
        const x1 = startOffset.left + connection.start.width() / 2 - containerOffset.left;
        const y1 = startOffset.top + connection.start.height() / 2 - containerOffset.top;
        const x2 = endOffset.left + connection.end.width() / 2 - containerOffset.left;
        const y2 = endOffset.top + connection.end.height() / 2 - containerOffset.top;

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
        alert("path",path);
        // 如果没有匹配到任何路径规则，创建一个简单的直线连接
        if (!path) {
            path = `M ${x1} ${y1} L ${x2} ${y2}`;
        }

        connection.line.attr('d', path);
    }
    
    // 更新单条连线位置
    updateaLinea(connection) {
        // 检查connection对象及其属性是否存在
        if (!connection ||!connection.start ||!connection.end) {
            console.error('无效的连接对象:', connection);
            return;
        }

        // 直接使用connection.start.offset()，不创建中间变量
        const startOffset = connection.start.offset() || {left: 0, top: 0};
        const endOffset = connection.end.offset() || {left: 0, top: 0};
        const containerOffset = $('#main-canvas').offset() || {left: 0, top: 0};

        console.log(containerOffset);
        console.log("====00000");
        const x1 = startOffset.left + connection.start.width() / 2 - containerOffset.left;
        const y1 = startOffset.top + connection.start.height() / 2 - containerOffset.top;
        const x2 = endOffset.left + connection.end.width() / 2 - containerOffset.left;
        const y2 = endOffset.top + connection.end.height() / 2 - containerOffset.top;

        // 设置固定的圆角半径
        const radius = 10;
        
        let path;
        // 判断起点和终点的相对位置，决定路径的绘制方式
        if (connection.start.hasClass('right')) {
            // 从右侧连接点开始
            alert("connection.end.hasClass('left')",connection.end.hasClass('left'));
            if (connection.end.hasClass('left')) {
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
            }
        } else {
            // 从左侧连接点开始
            alert("connection.end.hasClass('right')",connection.end.hasClass('right'));
            if (connection.end.hasClass('right')) {
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
            }
        }

        connection.line.attr('d', path);
    }

    // 更新所有连线位置
    updateAllLines() {
        console.log("updateAllLines");
        // 使用this.lines而不是全局变量lines
        // 使用箭头函数保持this上下文
        this.lines.forEach(connection => this.updateLine(connection));
    }

    // 连接点信息
    createConnectionPoints(x, y) {
        // 使用相对于节点的坐标计算连接点位置
        // 不再返回绝对坐标，而是返回相对于节点的位置信息
        return [
            { type: 'top' },
            { type: 'right' },
            { type: 'bottom' },
            { type: 'left' }
        ];
    }

    updateNodePosition(node, x, y) {
        node.element.css({ left: x, top: y });
        console.log("20250326-------------------------------------------------------");
        console.log(x,y);
        node.x = Math.round(x);
        node.y = Math.round(y);
        // 只需更新节点位置，连接点会自动跟随节点移动
        // 因为连接点是相对于节点定位的
        node.connectionPoints = this.createConnectionPoints(x, y);
    }

    getNodeAtPosition(x, y) {
        return this.nodes.find(node => 
            x >= node.x && x <= node.x + node.width &&
            y >= node.y && y <= node.y + node.height
        );
    }

    setSelectedNode(node) {
        if (this.selectedNode) {
            this.selectedNode.element.css({
                'border-color': '#232f3e',
                'box-shadow': 'none'
            });
        }
        this.selectedNode = node;
        if (node) {
            node.element.css({
                'border-color': '#28a745',
                'box-shadow': '0 0 0 2px rgba(40, 167, 69, 0.25)'
            });
        }
    }

    updateInfoPanel(node) {
        console.log("updateInfoPanel");
        console.log(node);
        if (node) {
            $('#node-info').html(`
                <p>ID：${node.id}</p>
                <p>名称：${node.name}</p>
                <p>类型：${node.type}</p>
                <p>优点2：${node.good}</p>
                <p>缺点：${node.bad}</p>
                <p>成本：${node.cost}</p>
                <p>待办：${node.todo}</p>
                <p>位置：(${Math.round(node.x)}, ${Math.round(node.y)})</p>
                <div class="form-group">
                    <label>内容：</label>
                    <input type="text" class="form-control" id="node-content" value="${node.content}">
                </div>
            `);
            if (node.good) {
                $('#node-good').append(`<p>优势3：${node.good}</p>`);
            }

            if (node.bad) {
                $('#node-bad').append(`<p>缺点3：${node.bad}</p>`);
            }

            if (node.cost) {
                $('#node-cost').append(`<p>成本3：${node.cost}</p>`);
            }

            if (node.todo) {
                $('#node-todo').append(`<p>代办3：${node.todo}</p>`);
            }

        } else {
            $('#node-config').html(`
                <div class="canvas-stats">
                    <h5>画布配置</h5>
                    <p>节点总数：${this.nodes.length}</p>
                    <p>连接数量：${this.connectionManager.connections.length}</p>
                </div>
            `);
        }
    }

    loadState(nodesData) {
        alert("loadState");
        this.nodes = [];
        nodesData.forEach(nodeData => {
            console.log("------------------------------------");
            console.log(nodeData);
            const node1 = this.createNode(
                nodeData.x,
                nodeData.y,
                nodeData.type
            );
            node1.content = nodeData.content;
            node1.element.text(nodeData.content || nodeData.type);
        });
    }

    drawNode(node) {
        node.element.css({
            left: Math.round(node.x),
            top: Math.round(node.y),
            width: node.width,
            height: node.height,
            backgroundColor: node.type === 'service' ? '#f0f5ff' : '#fff7ed',
            border: `2px solid ${node === this.selectedNode ? '#ff9900' : '#232f3e'}`
        });
    
        // 更新连接点位置
        node.connectionPoints.forEach((point) => {
            if (point.element) {
                point.element.css({
                    left: point.x - 3,
                    top: point.y - 3
                });
            }
        });
    }
}


