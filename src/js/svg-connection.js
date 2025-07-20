// SVG连线管理类
class SVGConnectionManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Container element not found:', containerId);
            return;
        }

        // 创建SVG容器
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', '100%');
        this.svg.setAttribute('height', '100%');
        this.svg.style.position = 'absolute';
        this.svg.style.top = '0';
        this.svg.style.left = '0';
        this.svg.style.pointerEvents = 'none';
        this.container.appendChild(this.svg);

        this.connections = [];
        this.startConnector = null;
        this.nodes = [];

        // 初始化事件监听
        this.initEventListeners();
    }

    // 初始化事件监听
    initEventListeners() {
        // 监听节点拖拽事件
        this.container.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('node')) {
                e.dataTransfer.setData('text/plain', e.target.id);
            }
        });

        // 监听画布放置事件
        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            const nodeId = e.dataTransfer.getData('text/plain');
            const node = document.getElementById(nodeId);
            if (node) {
                this.addNode(node);
                node.style.left = (e.clientX - this.container.getBoundingClientRect().left) + 'px';
                node.style.top = (e.clientY - this.container.getBoundingClientRect().top) + 'px';
            }
        });

        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        // 监听连接点点击事件
        this.container.addEventListener('click', (e) => {
            const connector = e.target.closest('.connector');
            if (connector) {
                this.handleConnectorClick(connector);
            }
        });
    }

    // 添加节点
    addNode(node) {
        if (!node.id) {
            node.id = 'node-' + Date.now();
        }

        // 为节点添加连接点
        this.addConnectors(node);
        this.nodes.push(node);

        // 使节点可拖拽
        node.draggable = true;
        node.style.position = 'absolute';
        node.addEventListener('drag', () => {
            this.updateConnections();
        });
        // 添加拖拽结束事件监听
        node.addEventListener('dragend', () => {
            this.updateConnections();
        });
    }

    // 为节点添加连接点
    addConnectors(node) {
        // 创建左侧连接点
        const leftConnector = document.createElement('div');
        leftConnector.className = 'connector left';
        leftConnector.style.cssText = 'position:absolute; left:-8px; top:50%; width:12px; height:12px; background:#4a90e2; border-radius:50%; cursor:pointer;';
        node.appendChild(leftConnector);

        // 创建右侧连接点
        const rightConnector = document.createElement('div');
        rightConnector.className = 'connector right';
        rightConnector.style.cssText = 'position:absolute; right:-8px; top:50%; width:12px; height:12px; background:#4a90e2; border-radius:50%; cursor:pointer;';
        node.appendChild(rightConnector);
    }

    // 处理连接点点击
    handleConnectorClick(connector) {
        if (!this.startConnector) {
            // 开始连接
            this.startConnector = connector;
            connector.style.backgroundColor = '#0D47A1';
        } else {
            // 完成连接
            if (this.startConnector !== connector) {
                this.createConnection(this.startConnector, connector);
            }
            this.startConnector.style.backgroundColor = '';
            this.startConnector = null;
        }
    }

    // 创建连接
    createConnection(startConnector, endConnector) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke', '#2196F3');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        this.svg.appendChild(path);

        const connection = {
            path: path,
            start: startConnector,
            end: endConnector
        };

        this.connections.push(connection);
        this.updateConnection(connection);
    }

    // 更新单个连接
    updateConnection(connection) {
        const startRect = connection.start.getBoundingClientRect();
        const endRect = connection.end.getBoundingClientRect();
        const containerRect = this.container.getBoundingClientRect();

        const startX = startRect.left - containerRect.left + (connection.start.classList.contains('right') ? startRect.width : 0);
        const startY = startRect.top - containerRect.top + startRect.height / 2;
        const endX = endRect.left - containerRect.left + (connection.end.classList.contains('right') ? endRect.width : 0);
        const endY = endRect.top - containerRect.top + endRect.height / 2;

        connection.path.setAttribute('d', `M${startX},${startY} L${endX},${endY}`);
    }

    // 更新所有连接
    updateConnections() {
        this.connections.forEach(connection => {
            this.updateConnection(connection);
        });
    }
}

// 导出单例实例
const svgConnectionManager = new SVGConnectionManager('canvas-container');
export default svgConnectionManager;