import NodeManager from './nodeManager.js';
import  ConnectionManager  from './connectionManager.js';
import ToolbarManager from './toolbarManager.js';
import svgConnectionManager from './svg-connection.js';
import { StatisticsManager } from './statistics.js';

// 绘制网格辅助线
function drawGrid(canvas, gridSize = 10) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
    ctx.lineWidth = 1;
    
    // 绘制垂直线
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // 绘制水平线
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// 吸附到网格
function snapToGrid(value, gridSize = 10) {
    return Math.round(value / gridSize) * gridSize;
}

document.addEventListener('DOMContentLoaded', function() {
    // 创建网格画布
    const gridCanvas = document.createElement('canvas');
    gridCanvas.style.position = 'absolute';
    gridCanvas.style.top = '0';
    gridCanvas.style.left = '0';
    gridCanvas.style.width = '100%';
    gridCanvas.style.height = '100%';
    gridCanvas.style.pointerEvents = 'none';
    document.getElementById('main-canvas').appendChild(gridCanvas);
    
    // 初始化管理器
    const connectionManager = new ConnectionManager();
    const nodeManager = new NodeManager();
    nodeManager.connectionManager = connectionManager;
    window.nodeManager = nodeManager;
    window.connectionManager = connectionManager;

    // 初始化全局鼠标坐标
    let mouseX = 0;
    let mouseY = 0;

    // 调整画布大小
    function resizeCanvas() {
        const container = document.getElementById('main-canvas');
        gridCanvas.width = container.clientWidth;
        gridCanvas.height = container.clientHeight;
        drawGrid(gridCanvas);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();


    // 调整画布大小
    function resizeCanvas() {
        const container = document.getElementById('main-canvas');
        gridCanvas.width = container.clientWidth;
        gridCanvas.height = container.clientHeight;
        drawGrid(gridCanvas);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // 初始化jQuery UI拖拽
    $('#main-canvas').droppable({
        accept: '.tool-item',
        drop: function(event, ui) {
            const rect = this.getBoundingClientRect();
            const x = ui.offset.left - rect.left;
            const y = ui.offset.top - rect.top;
            const $draggable = ui.draggable.clone(true).css({
                position: 'absolute',
                left: x + 'px',
                top: y + 'px'
            });
            
            const config = ui.draggable.data();
            console.log("**********************************");
            console.log(config);
            console.log(config.good);
            const nodeText = ui.draggable.text().trim();
            console.log("**********************************");
            console.log(config);
            const node = nodeManager.createNode(x, y, config.name, nodeText, config.type, config.good, config.bad, config.cost, config.todo);
            node.element = $draggable;
            
            // 确保节点可以继续拖动
            node.element.draggable({
                containment: '#main-canvas',
                zIndex: 1000,
                cancel: '.node-content',
                grid: [10, 10],
                drag: function(event, ui) {
                    const nodeId = $(this).data('node-id');
                    const node = nodeManager.nodes.find(n => n.id === nodeId);
                    if (node) {
                        node.x = snapToGrid(ui.position.left);
                        node.y = snapToGrid(ui.position.top);
                        node.good = config.good;
                        node.bad = config.bad;
                        node.cost = config.cost;
                        node.todo = config.todo;
                        node.connectionPoints = nodeManager.createConnectionPoints(node.x, node.y);
                        connectionManager.redrawConnections();
                        updateStatistics();
                    }
                }
            }).on('click', function(event) {
                event.stopPropagation();
                //$('div[style*="position:fixed;right:10px"]').show();
                $('#node-connect').html(`
                    <p>名称：${nodeText}</p>
                    <p>优点1：${config.good || ''}</p>
                    <p>缺点：${config.bad || ''}</p>
                    <p>成本：${config.cost || ''}</p>
                    <p>实施要点：${config.todo || ''}</p>
                `);
            });
            redraw();
        }
    });

    updateStatistics1234();
    //window.updateStatistics = function() {
    //updateStatistics1234 = function() {
    function updateStatistics1234() {
        // 动态计算人员配置
        const roleCounts = {};
        nodeManager.nodes.forEach(node => {
            if(node.type === 'AI工程师' || node.type === '数据工程师') {
                roleCounts[node.type] = (roleCounts[node.type] || 0) + 1;
            }
        });
    
        // 动态计算成本数据
        const costData = {
            '硬件设施': 300000,
            '软件授权': nodeManager.nodes.reduce((sum, node) => sum + (node.cost || 0), 0),
            '模型费用': 200000,
            '人力成本': Object.values(roleCounts).reduce((sum, num) => sum + num * 150000, 0)
        };
    
        // 使用模板引擎生成HTML
        const staffContainer = document.getElementById('staff-config');
        staffContainer.innerHTML = Object.entries(roleCounts).map(([role, num]) => `
            <div class="stat-item">
                <span>${role}</span>
                <span class="badge">${num}人</span>
            </div>`
        ).join('');
    
        
    
        document.getElementById('total-budget').textContent = 
            '￥' + Object.values(costData).reduce((a, b) => a + b, 0).toLocaleString();
    
        // 更新人员配置
        const staffData = {
            '项目经理':1,
            'AI工程师':4,
            '数据工程师':2,
            '全栈工程师':2,
            '前端工程师':1,
            '运维工程师':1
        };
    
        const costContainer = document.getElementById('cost-budget');
        costContainer.innerHTML = Object.entries(costData).map(([item, amount]) =>
            `<div style="display:flex;justify-content:space-between;">
                <span>${item}</span>
                <span>￥${amount.toLocaleString()}</span>
            </div>`
        ).join('');
        document.getElementById('total-budget').textContent = '￥1,550,000';
    }

    // 初始化projectData
    const projectData = {
        id: new URLSearchParams(window.location.search).get('project_id') || Date.now(),
        name: "未命名项目",
        created_at: Math.floor(Date.now() / 1000)
    };

    // 加载保存的状态
    const savedData = localStorage.getItem(`project_${projectData.id}`);
    if (savedData) {
        /*const state = JSON.parse(savedData).config;
        nodeManager.loadState(JSON.parse(state).nodes);
        connectionManager.loadState(JSON.parse(state).connections);
        redraw();*/
    }

    window.serializeCanvasState = function() {
        return {
            nodes: nodeManager.nodes.map(node => ({
                id: node.id,
                type: node.type,
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                good: node.good,
                bad: node.bad,
                cost: node.cost,
                todo: node.todo,
                content: node.content
            })),
            connections: connectionManager.connections.map(conn => ({
                startNodeId: conn.startNode.id,
                endNodeId: conn.endNode.id,
                startPointType: conn.startPoint.type,
                endPointType: conn.endPoint.type
            }))
        };
    }

    const toolbarManager = new ToolbarManager(nodeManager, redraw, serializeCanvasState);

    // 设置容器尺寸
    function resizeCanvas() {
        const mainCanvas = document.getElementById('main-canvas');
        const container = $('.canvas-container');
        mainCanvas.style.width = mainCanvas.offsetWidth + 'px';
        mainCanvas.style.height = mainCanvas.offsetHeight + 'px';

        // 计算画布和容器的尺寸差，设置滚动位置使画布居中
        const scrollX = (mainCanvas.offsetWidth - container.width()) / 2;
        const scrollY = (mainCanvas.offsetHeight - container.height()) / 2;
        container.scrollLeft(scrollX);
        container.scrollTop(scrollY);

        redraw();
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 重绘画布
    function redraw() {
        // 统计todo数量
        let todoCount = nodeManager.nodes.reduce((sum, node) => sum + (node.todo ? 1 : 0), 0);
        $('#top-info-1 span').text(todoCount);

        // 统计cost数量
        let costCount = nodeManager.nodes.reduce((sum, node) => sum + (node.cost ? 1 : 0), 0);
        $('#top-info-2 span').text(costCount);
        
        if(!nodeManager.selectedNode) {
            $('#node-config').html(`
                <div class="canvas-stats">
                    <h5>画布配置</h5>
                    <p>节点总数：${nodeManager.nodes.length}</p>
                    <p>连接数量：${connectionManager.connections.length}</p>
                    ${nodeManager.nodes.map(n => [n.good, n.bad, n.cost, n.todo]
                        .filter(t => t && typeof t === 'string' && t.trim())
                        .join(' | '))
                        .filter(t => t)
                        .map(t => `<p class="node-info">${t}</p>`)
                        .join('')}
                </div>
            `);
        }
        connectionManager.redrawConnections();
        nodeManager.nodes.forEach(node => nodeManager.drawNode(node));
        connectionManager.drawTempConnection(mouseX, mouseY);
        
        // 更新SVG连线
        svgConnectionManager.updateConnections();
    }

    // 画布事件处理
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    
    $('.canvas-container').on('mousedown', function(e) {
        if (e.target === this || e.target.id === 'main-canvas') {
            isDragging = true;
            $(this).css('cursor', 'grabbing');
            startX = e.pageX - $(this).offset().left;
            startY = e.pageY - $(this).offset().top;
            scrollLeft = $(this).scrollLeft();
            scrollTop = $(this).scrollTop();
        }
    });

    $(document).on('mousemove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - $('.canvas-container').offset().left;
        const y = e.pageY - $('.canvas-container').offset().top;
        const walkX = x - startX;
        const walkY = y - startY;
        $('.canvas-container').scrollLeft(scrollLeft - walkX);
        $('.canvas-container').scrollTop(scrollTop - walkY);
    });

    $(document).on('mouseup', function() {
        isDragging = false;
        $('.canvas-container').css('cursor', 'grab');
    });

    $('#main-canvas').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        if (connectionManager.isConnecting) {
            redraw();
        }
    });

    $('#main-canvas').on('mousedown', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const node = nodeManager.getNodeAtPosition(x, y);
        console.log("=================================");
        console.log(node);
        if (node) {
            nodeManager.setSelectedNode(node);
            nodeManager.updateInfoPanel(node);
        } else {
            nodeManager.setSelectedNode(null);
            nodeManager.updateInfoPanel(null);
            connectionManager.resetConnectionState();
        }
        redraw();
    });

    // 双击删除连线
    $('#main-canvas').on('dblclick', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const connection = connectionManager.getConnectionAtPosition(x, y);
        if (connection) {
            connectionManager.setSelectedConnection(connection);
            connectionManager.deleteSelectedConnection();
            redraw();
        }
    });

    // 内容更新处理
    $(document).on('change', '#node-content', function() {
        if (nodeManager.selectedNode) {
            nodeManager.selectedNode.content = $(this).val();
            nodeManager.selectedNode.element.text($(this).val() || nodeManager.selectedNode.type);
        }
    });

    // 自动保存
    function autoSave() {
        const version = {
            timestamp: new Date().toISOString(),
            content: serializeCanvasState(),
            description: 'autosave_' + new Date().toISOString()
        };
        localStorage.setItem(`project_${projectData.id}`, JSON.stringify(version));
    }


    document.dispatchEvent(new CustomEvent('canvasInitialized'));
});

// 添加节点点击事件监听
$('#main-canvas').on('click', '.node', function() {
    $('.node').removeClass('active');
    $(this).addClass('active');
    console.log("========================-------[");
    console.log($(this).data('name'));
    const nodeData = {
        name: $(this).data('type'),
        good: $(this).data('good'),
        bad: $(this).data('bad'),
        cost: $(this).data('cost'),
        todo: $(this).data('todo')
    };
    
    $('#node-info').html(`
        <h4>${nodeData.name}</h4>
        <p><strong>优势2222:</strong> ${nodeData.good}</p>
        <p><strong>劣势:</strong> ${nodeData.bad}</p>
        <p><strong>成本:</strong> ${nodeData.cost}</p>
        <p><strong>实施要点:</strong> ${nodeData.todo}</p>
    `);
});

// PDF导出功能
$('#export-pdf').click(() => {
    const element = document.getElementById('main-canvas');


    const element1 = document.querySelector('.flex.flex-1.pt-16');
    const opt = {
        margin: 1,
        filename: '企业内部RAG聊天机器人解决方案.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(element).save(`架构设计_${Date.now()}.pdf`);
    
    //html2pdf().from(element).save(`架构设计_${Date.now()}.pdf`);
});

// Excel导出功能
$('#export-excel').click(() => {
    const data = serializeCanvasState().nodes.map(node => ({
        节点类型: node.type,
        位置: `(${node.x},${node.y})`,
        优点: node.good,
        缺点: node.bad,
        成本: node.cost,
        实施要点: node.todo
    }));

    var aa = {
        节点类型: 1,
        位置: `(2,3)`,
        优点: 4,
        缺点: 5,
        成本: 6,
        实施要点: 7
    };

    // 加载保存的状态
    var id = new URLSearchParams(window.location.search).get('id') || Date.now();
    const savedData = localStorage.getItem(`project_${id}`);
    console.log(id);
    //console.log(savedData);
    if (savedData) {
        //const state = JSON.parse(savedData,true);
        //console.log(state);
        //const ws = XLSX.utils.json_to_sheet(aa);
        //console.log(ws);
        //const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, aa, "架构节点");
        XLSX.writeFile(wb, `架构设计_${Date.now()}.xlsx`);
    }
});