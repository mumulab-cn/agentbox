$(document).ready(function() {
    let componentCounter = 0;
    let uploadedFiles = [];
    let canvasComponents = [];
    let connections = [];
    let isConnecting = false;
    let connectionStart = null;

    // 全局函数：添加连接点到组件
    function addConnectionPoints(component) {
        const points = [
            { class: 'connection-point-top', style: 'top: -5px; left: 50%; transform: translateX(-50%);' },
            { class: 'connection-point-right', style: 'top: 50%; right: -5px; transform: translateY(-50%);' },
            { class: 'connection-point-bottom', style: 'bottom: -5px; left: 50%; transform: translateX(-50%);' },
            { class: 'connection-point-left', style: 'top: 50%; left: -5px; transform: translateY(-50%);' }
        ];
        
        points.forEach(point => {
            const connectionPoint = $(`
                <div class="connection-point ${point.class}" style="position: absolute; ${point.style} width: 10px; height: 10px; background: #3b82f6; border: 2px solid white; border-radius: 50%; cursor: pointer; z-index: 1001;">
                </div>
            `);
            
            connectionPoint.on('click', function(e) {
                e.stopPropagation();
                handleConnectionClick(component, $(this));
            });
            
            component.append(connectionPoint);
        });
    }

    // 全局函数：处理连接点点击
    function handleConnectionClick(component, point) {
        if (!connectionStart) {
            // 开始连线
            connectionStart = { component, point };
            point.addClass('connection-active');
        } else {
            // 完成连线
            if (connectionStart.component.data('id') !== component.data('id')) {
                createConnection(connectionStart, { component, point });
            }
            
            // 重置连线状态
            $('.connection-point').removeClass('connection-active');
            connectionStart = null;
        }
    }

    // 全局函数：创建连接
    function createConnection(start, end) {
        const connectionId = `connection-${Date.now()}`;
        const startPos = getConnectionPointPosition(start.component, start.point);
        const endPos = getConnectionPointPosition(end.component, end.point);
        
        const connection = {
            id: connectionId,
            startComponent: start.component.data('id'),
            endComponent: end.component.data('id'),
            startPos,
            endPos
        };
        
        connections.push(connection);
        drawConnection(connection);
        
        // 显示连接成功消息
        showConnectionSuccess(start.component, end.component);
    }

    // 全局函数：获取连接点位置
    function getConnectionPointPosition(component, point) {
        const canvasOffset = $('#canvas').offset();
        const componentOffset = component.offset();
        const pointOffset = point.offset();
        
        return {
            x: pointOffset.left - canvasOffset.left + 5, // 5px是连接点半径
            y: pointOffset.top - canvasOffset.top + 5
        };
    }

    // 全局函数：绘制连接线
    function drawConnection(connection) {
        let svg = $('#connectionSvg');
        
        // 确保SVG容器存在
        if (svg.length === 0) {
            const canvasContainer = $('.flex-1.bg-gray-100');
            const svgContainer = $(`
                <svg id="connectionSvg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                                refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                    </defs>
                </svg>
            `);
            canvasContainer.prepend(svgContainer);
            svg = $('#connectionSvg');
        }
        
        // 添加箭头标记（如果不存在）
        if (!svg.find('#arrowhead').length) {
            const defs = $(`
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                    </marker>
                </defs>
            `);
            svg.prepend(defs);
        }
        
        const line = $(`
            <line id="${connection.id}" 
                  x1="${connection.startPos.x}" y1="${connection.startPos.y}"
                  x2="${connection.endPos.x}" y2="${connection.endPos.y}"
                  stroke="#3b82f6" stroke-width="2" 
                  marker-end="url(#arrowhead)">
            </line>
        `);
        
        svg.append(line);
    }

    // 全局函数：显示连接成功消息
    function showConnectionSuccess(startComponent, endComponent) {
        const startName = startComponent.find('h4').text();
        const endName = endComponent.find('h4').text();
        
        const message = $(`
            <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                <i class="fas fa-link mr-2"></i>
                已连接: ${startName} → ${endName}
            </div>
        `);
        $('body').append(message);
        setTimeout(() => message.fadeOut(() => message.remove()), 3000);
    }

    // 初始化拖拽功能
    initDragAndDrop();
    
    // 初始化文件上传
    initFileUpload();
    
    // 初始化AI助手侧边栏
    initializeAISidebar();
    
    // 初始化画布操作
    initCanvasOperations();
    
    // 初始化连线功能
    initConnections();
    
    // 初始化画布大小
    adjustCanvasSize();
    
    // 监听窗口大小变化
    $(window).resize(function() {
        adjustCanvasSize();
    });

    function initDragAndDrop() {
        // 使拖拽元素可拖拽
        $('.component-item, .data-item').each(function() {
            $(this).attr('draggable', true);
        });

        // 拖拽开始
        $('.component-item, .data-item').on('dragstart', function(e) {
            const isDataItem = $(this).hasClass('data-item');
            const componentData = {
                type: $(this).data('type'),
                name: $(this).data('name'),
                html: $(this)[0].outerHTML,
                category: isDataItem ? 'data' : 'component'
            };
            try {
                e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(componentData));
            } catch (error) {
                console.error('JSON序列化错误:', error);
                // 使用简化的数据结构作为备选
                const simpleData = {
                    type: $(this).data('type') || 'unknown',
                    name: $(this).data('name') || 'unknown',
                    category: isDataItem ? 'data' : 'component'
                };
                e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(simpleData));
            }
            $(this).addClass('opacity-50');
         });

        // 拖拽结束
        $('.component-item, .data-item').on('dragend', function(e) {
            $(this).removeClass('opacity-50');
        });

        // 画布拖拽事件
        const canvas = document.getElementById('canvas');
        
        canvas.addEventListener('dragover', function(e) {
            e.preventDefault();
            $(this).addClass('border-blue-400 bg-blue-50');
        });

        canvas.addEventListener('dragleave', function(e) {
            $(this).removeClass('border-blue-400 bg-blue-50');
        });

        canvas.addEventListener('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('border-blue-400 bg-blue-50');
            
            try {
                const componentData = JSON.parse(e.dataTransfer.getData('text/plain'));
                addComponentToCanvas(componentData);
            } catch (error) {
                console.error('JSON解析错误:', error);
                // 显示错误提示
                const message = $(`
                    <div class="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                        <i class="fas fa-exclamation-triangle mr-2"></i>
                        拖拽数据解析失败，请重试
                    </div>
                `);
                $('body').append(message);
                setTimeout(() => message.fadeOut(() => message.remove()), 3000);
            }
        });

        // 初始化画布内部排序
        new Sortable(canvas, {
            animation: 150,
            ghostClass: 'opacity-50',
            filter: '.canvas-placeholder'
        });
    }

    function addComponentToCanvas(componentData) {
        componentCounter++;
        
        // 移除占位符
        $('#canvas .text-center').remove();
        
        // 计算随机位置（避免重叠）
        const canvasRect = $('#canvas')[0].getBoundingClientRect();
        const randomX = Math.random() * (canvasRect.width - 220); // 220px为组件宽度+边距
        const randomY = Math.random() * (canvasRect.height - 150); // 150px为组件高度+边距
        
        // 根据类别创建不同的组件
        let canvasComponent;
        if (componentData.category === 'data') {
            canvasComponent = $(`
                <div class="canvas-component bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow" data-id="${componentCounter}" data-type="${componentData.type}" data-name="${componentData.name}" style="position: absolute; left: ${randomX}px; top: ${randomY}px; max-width: 200px; cursor: move;">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <i class="fas fa-database text-green-600 mr-2"></i>
                            <h4 class="font-semibold text-gray-800 text-sm">${componentData.name}</h4>
                        </div>
                        <button class="remove-btn text-red-500 hover:text-red-700" title="移除">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="data-preview bg-gray-50 rounded p-2 text-xs">
                        <div class="flex items-center mb-1">
                            <i class="fas fa-database text-green-600 mr-1"></i>
                            <span class="font-medium">数据预览</span>
                        </div>
                        <div class="text-gray-600">点击查看详细信息</div>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                        <span>状态: <span class="text-green-600">已加载</span></span>
                        <span>添加时间: ${new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            `);
        } else {
            canvasComponent = $(`
                <div class="canvas-component bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow" data-id="${componentCounter}" data-type="${componentData.type}" data-name="${componentData.name}" style="position: absolute; left: ${randomX}px; top: ${randomY}px; max-width: 200px; cursor: move;">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                            <i class="fas fa-cog text-blue-600 mr-2"></i>
                            <h4 class="font-semibold text-gray-800 text-sm">${componentData.name}</h4>
                            <span class="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">${getTypeLabel(componentData.type)}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="config-btn text-blue-500 hover:text-blue-700" title="配置">
                                <i class="fas fa-cog"></i>
                            </button>
                            <button class="remove-btn text-red-500 hover:text-red-700" title="移除">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                <div class="component-config hidden bg-gray-50 rounded p-3 mt-2">
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-medium text-gray-700 mb-1">API接口</label>
                            <select class="w-full text-xs border border-gray-300 rounded px-2 py-1">
                                <option>公有云API</option>
                                <option>私有化部署</option>
                                <option>端侧SDK</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-700 mb-1">识别精度</label>
                            <select class="w-full text-xs border border-gray-300 rounded px-2 py-1">
                                <option>标准</option>
                                <option>高精度</option>
                                <option>超高精度</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-700 mb-1">处理速度</label>
                            <input type="range" class="w-full" min="1" max="10" value="5">
                        </div>
                        <div>
                            <label class="block text-xs font-medium text-gray-700 mb-1">并发数</label>
                            <input type="number" class="w-full text-xs border border-gray-300 rounded px-2 py-1" value="10">
                        </div>
                    </div>
                </div>
                <div class="text-sm text-gray-600 mt-2">
                    ${getComponentDescription(componentData.name)}
                </div>
                <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>状态: <span class="text-green-600">已配置</span></span>
                    <span>添加时间: ${new Date().toLocaleTimeString()}</span>
                </div>
            </div>
        `);
        }
        
        $('#canvas').append(canvasComponent);
        
        // 如果处于连线模式，添加连接点
        if (isConnecting) {
            addConnectionPoints(canvasComponent);
        }
        
        // 保存到数组
        canvasComponents.push({
            id: componentCounter,
            type: componentData.type,
            name: componentData.name,
            timestamp: new Date()
        });
        
        updateComponentCount();
        
        // 如果是数据组件，显示产品组件推荐
        if (componentData.category === 'data') {
            showProductRecommendations();
        }
        
        // 绑定事件
        canvasComponent.find('.remove-btn').on('click', function() {
            const componentId = canvasComponent.data('id');
            canvasComponent.remove();
            canvasComponents = canvasComponents.filter(c => c.id !== componentId);
            updateComponentCount();
            
            // 如果没有组件了，显示占位符
            if (canvasComponents.length === 0) {
                showCanvasPlaceholder();
            }
        });
        
        canvasComponent.find('.config-btn').on('click', function() {
            canvasComponent.find('.component-config').toggleClass('hidden');
        });
        
        // 添加拖拽功能
        makeComponentDraggable(canvasComponent);
        
        // 延时2秒显示处理完成提示
        setTimeout(() => {
            showProcessingComplete();
        }, 2000);
    }

    function getTypeColor(type) {
        const colors = {
            'ocr': 'bg-blue-500',
            'data': 'bg-green-500',
            'solution': 'bg-purple-500'
        };
        return colors[type] || 'bg-gray-500';
    }

    function getTypeLabel(type) {
        const labels = {
            'ocr': 'OCR识别',
            'data': '大数据',
            'solution': '解决方案'
        };
        return labels[type] || '未知';
    }

    function getComponentDescription(name) {
        const descriptions = {
            '证件识别': '支持身份证、护照、驾驶证等100+证照的高精度识别，识别准确率达99%以上',
            '票据识别': '智能识别各类发票、银行单据、财务报表，支持结构化数据输出',
            '文档扫描': '将纸质文档转换为高清PDF，支持多页合并和OCR文字识别',
            '多语言识别': '支持中英日韩等50+语言的印刷体和手写体识别',
            '企业信息查询': '提供全面的企业工商信息、股权结构、经营状况查询服务',
            '风险评估': '基于大数据分析的企业信用风险和经营风险智能评估',
            '产业链分析': '深度挖掘企业间供应链关系，提供产业布局分析报告',
            '营销拓客': '基于AI算法的精准客户挖掘和潜在客户推荐服务',
            '银行数字化': '为银行提供移动开户、信贷风控、客户管理等全流程数字化解决方案',
            '保险数字化': '涵盖移动投保、理赔审核、风险评估的保险行业数字化转型方案',
            '智慧政务': '政务服务数字化，包括证件办理、信息采集、流程优化等',
            '供应链金融': '供应商管理、风险控制、资金流转的供应链金融解决方案'
        };
        return descriptions[name] || '暂无描述';
    }

    function updateComponentCount() {
        $('#componentCount').text(canvasComponents.length);
    }

    function showCanvasPlaceholder() {
        $('#canvas').html(`
            <div class="text-center text-gray-500 mt-20">
                <i class="fas fa-mouse-pointer text-4xl mb-4"></i>
                <p class="text-lg">将左侧数据和产品模块拖拽到此处开始构建您的解决方案</p>
                <p class="text-sm mt-2">支持自由拖拽定位和组合不同的数据与产品功能</p>
            </div>
        `);
    }
    
    function showProcessingComplete() {
        // 创建处理完成提示弹窗
        const notification = $(`
            <div class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm" id="processingNotification">
                <div class="flex items-start">
                    <i class="fas fa-check-circle text-xl mr-3 mt-1"></i>
                    <div>
                        <h4 class="font-semibold mb-2">数据已处理完成</h4>
                        <div class="text-sm space-y-1">
                            <div class="flex items-center">
                                <i class="fas fa-comments text-sm mr-2"></i>
                                <span>可通过Chatbot问答</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-code text-sm mr-2"></i>
                                <span>可通过API调用</span>
                            </div>
                        </div>
                    </div>
                    <button class="ml-2 text-white hover:text-gray-200" onclick="$('#processingNotification').fadeOut(() => $('#processingNotification').remove())">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `);
        
        $('body').append(notification);
        
        // 5秒后自动消失
        setTimeout(() => {
            notification.fadeOut(() => notification.remove());
        }, 5000);
    }
    
    function showProductRecommendations() {
        // 定义所有产品组件
        const allProducts = [
            { name: '银行数字化', category: 'solution' },
            { name: '保险数字化', category: 'solution' },
            { name: '智慧政务', category: 'solution' },
            { name: '供应链金融', category: 'solution' },
            { name: '证件识别', category: 'ocr' },
            { name: '票据识别', category: 'ocr' },
            { name: '文档扫描', category: 'ocr' },
            { name: '多语言识别', category: 'ocr' }
        ];
        
        // 随机选择两个产品
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const recommendations = shuffled.slice(0, 2);
        
        // 创建推荐弹窗
        const modal = $(`
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" id="recommendationModal">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-800">
                            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                            推荐产品组件
                        </h3>
                        <button class="text-gray-500 hover:text-gray-700" id="closeRecommendation">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-4">基于您添加的数据组件，我们推荐以下产品组件：</p>
                    <div class="space-y-3">
                        ${recommendations.map(product => `
                            <div class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer recommendation-item" data-name="${product.name}" data-category="${product.category}">
                                <div class="flex items-center">
                                    <i class="fas fa-${product.category === 'solution' ? 'cogs' : 'eye'} text-blue-600 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-800">${product.name}</h4>
                                        <p class="text-sm text-gray-500">${getComponentDescription(product.name).substring(0, 50)}...</p>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-4 text-center">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" id="closeRecommendation2">
                            知道了
                        </button>
                    </div>
                </div>
            </div>
        `);
        
        $('body').append(modal);
        
        // 绑定关闭事件
        modal.find('#closeRecommendation, #closeRecommendation2').on('click', function() {
            modal.fadeOut(() => modal.remove());
        });
        
        // 点击推荐项自动添加到画布
        modal.find('.recommendation-item').on('click', function() {
            const productName = $(this).data('name');
            const productCategory = $(this).data('category');
            
            const productData = {
                type: productCategory,
                name: productName,
                category: productCategory
            };
            
            addComponentToCanvas(productData);
            modal.fadeOut(() => modal.remove());
        });
        
        // 点击背景关闭
        modal.on('click', function(e) {
            if (e.target === this) {
                modal.fadeOut(() => modal.remove());
            }
        });
    }
    
    // 使组件可拖拽
    function makeComponentDraggable(component) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        component.on('mousedown', function(e) {
            if ($(e.target).closest('button').length > 0) return; // 忽略按钮点击
            
            isDragging = true;
            component.addClass('dragging');
            component.css('z-index', '1000');
            
            startX = e.clientX;
            startY = e.clientY;
            initialX = parseInt(component.css('left')) || 0;
            initialY = parseInt(component.css('top')) || 0;
            
            e.preventDefault();
        });
        
        $(document).on('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newX = initialX + deltaX;
            const newY = initialY + deltaY;
            
            // 限制在画布范围内
            const canvasRect = $('#canvas')[0].getBoundingClientRect();
            const componentWidth = component.outerWidth();
            const componentHeight = component.outerHeight();
            
            const maxX = canvasRect.width - componentWidth;
            const maxY = canvasRect.height - componentHeight;
            
            const constrainedX = Math.max(0, Math.min(newX, maxX));
            const constrainedY = Math.max(0, Math.min(newY, maxY));
            
            component.css({
                left: constrainedX + 'px',
                top: constrainedY + 'px'
            });
        });
        
        $(document).on('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                component.removeClass('dragging');
                component.css('z-index', 'auto');
            }
        });
    }

    function initFileUpload() {
        const dropZone = $('#dropZone');
        const fileInput = $('#fileInput');

        // 点击上传
        dropZone.on('click', function() {
            fileInput.click();
        });

        // 文件选择
        fileInput.on('change', function(e) {
            handleFiles(e.target.files);
        });

        // 拖拽上传
        dropZone.on('dragover', function(e) {
            e.preventDefault();
            $(this).addClass('border-blue-500 bg-blue-100');
        });

        dropZone.on('dragleave', function(e) {
            $(this).removeClass('border-blue-500 bg-blue-100');
        });

        dropZone.on('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('border-blue-500 bg-blue-100');
            handleFiles(e.originalEvent.dataTransfer.files);
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.size > 10 * 1024 * 1024) { // 10MB限制
                    alert(`文件 ${file.name} 超过10MB限制`);
                    return;
                }
                
                // 创建可拖拽的文件项
                const fileItem = $(`
                    <div class="data-item bg-gray-50 border border-gray-200 rounded-lg p-2 mb-2 flex items-center justify-between cursor-move hover:shadow-sm transition-shadow" draggable="true" data-type="file" data-name="${file.name}">
                        <div class="flex items-center">
                            <i class="fas fa-file text-gray-600 mr-2"></i>
                            <div>
                                <p class="text-sm font-medium text-gray-900">${file.name}</p>
                                <p class="text-xs text-gray-500">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button class="text-red-500 hover:text-red-700 remove-file-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `);
                
                // 添加拖拽事件
                fileItem.on('dragstart', function(e) {
                    const fileData = {
                        type: 'file',
                        name: file.name,
                        html: $(this)[0].outerHTML,
                        category: 'data'
                    };
                    e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(fileData));
                    $(this).addClass('opacity-50');
                });
                
                fileItem.on('dragend', function(e) {
                    $(this).removeClass('opacity-50');
                });
                
                // 添加删除功能
                fileItem.find('.remove-file-btn').on('click', function() {
                    fileItem.remove();
                    uploadedFiles = uploadedFiles.filter(f => f.name !== file.name);
                    updateFileCount();
                });
                
                // 添加到上传文件列表
                $('#uploadedFiles').append(fileItem);
                
                // 同时添加到示例数据集列表
                const datasetItem = $(`
                    <div class="data-item bg-gray-50 border border-gray-200 rounded-lg p-2 mb-2 flex items-center justify-between cursor-move hover:shadow-sm transition-shadow" draggable="true" data-type="file" data-name="${file.name}" data-category="data">
                        <div class="flex items-center">
                            <i class="fas fa-file text-gray-600 mr-2"></i>
                            <div>
                                <h4 class="text-sm font-medium text-gray-900">${file.name}</h4>
                                <p class="text-xs text-gray-500">用户上传 • ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                    </div>
                `);
                
                // 为数据集项添加拖拽事件
                datasetItem.on('dragstart', function(e) {
                    const itemData = {
                        type: 'file',
                        name: file.name,
                        html: $(this)[0].outerHTML,
                        category: 'data'
                    };
                    try {
                        e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(itemData));
                    } catch (error) {
                        e.originalEvent.dataTransfer.setData('text/plain', JSON.stringify({
                            type: 'file',
                            name: 'uploaded_file',
                            category: 'data'
                        }));
                    }
                    $(this).addClass('opacity-50');
                });
                
                datasetItem.on('dragend', function(e) {
                    $(this).removeClass('opacity-50');
                });
                
                // 添加到示例数据集列表
                $('#dataList').append(datasetItem);
                
                uploadedFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    uploadTime: new Date()
                });
            });
            
            updateFileCount();
            showUploadSuccess(files.length);
        }

        function updateFileCount() {
            $('#fileCount').text(uploadedFiles.length);
        }

        function showUploadSuccess(count) {
            const message = $(`
                <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    <i class="fas fa-check mr-2"></i>
                    成功上传 ${count} 个文件
                </div>
            `);
            $('body').append(message);
            setTimeout(() => message.fadeOut(() => message.remove()), 3000);
        }
    }

    function initializeAISidebar() {
        // AI助手切换按钮
        $('#aiToggle').click(function() {
            $('#aiSidebar').toggleClass('translate-x-full');
            
            // 画布自适应调整
            setTimeout(() => {
                adjustCanvasSize();
            }, 300); // 等待动画完成
        });
        
        // 关闭侧边栏
        $('#closeSidebar').click(function() {
            $('#aiSidebar').addClass('translate-x-full');
            
            // 画布自适应调整
            setTimeout(() => {
                adjustCanvasSize();
            }, 300); // 等待动画完成
        });
        
        // 发送消息
        $('#sidebarSendMessage').click(function() {
            sendSidebarMessage();
        });
        
        $('#sidebarChatInput').keypress(function(e) {
            if (e.which === 13) {
                sendSidebarMessage();
            }
        });
        
        function sendSidebarMessage() {
            const message = $('#sidebarChatInput').val().trim();
            if (!message) return;
            
            // 添加用户消息
            $('#sidebarChatMessages').append(`
                <div class="bg-white rounded-lg p-3 mb-3 ml-8">
                    <div class="flex items-start">
                        <i class="fas fa-user text-gray-600 mr-2 mt-1"></i>
                        <div>
                            <p class="text-sm text-gray-800">${message}</p>
                        </div>
                    </div>
                </div>
            `);
            
            $('#sidebarChatInput').val('');
            
            // 模拟AI回复
            setTimeout(() => {
                const response = generateAIResponse(message);
                
                $('#sidebarChatMessages').append(`
                    <div class="bg-blue-100 rounded-lg p-3 mb-3">
                        <div class="flex items-start">
                            <i class="fas fa-robot text-blue-600 mr-2 mt-1"></i>
                            <div>
                                <p class="text-sm text-gray-800">${response}</p>
                            </div>
                        </div>
                    </div>
                `);
                
                $('#sidebarChatMessages').scrollTop($('#sidebarChatMessages')[0].scrollHeight);
            }, 1000);
        }
        
        function generateAIResponse(message) {
            const responses = {
                'ocr': '我们的OCR技术支持100+种证照识别，识别准确率达99%以上，支持50+种语言。您可以选择公有云API、私有化部署或端侧SDK等多种接入方式。',
                '大数据': '我们的商业大数据服务覆盖企业信息查询、风险评估、产业链分析等功能，数据来源权威，更新及时，可为您的业务决策提供强有力的数据支撑。',
                '银行': '我们为银行提供完整的数字化解决方案，包括移动开户、信贷风控、客户管理等，已服务超过125家世界500强企业。',
                '保险': '我们的保险数字化方案涵盖移动投保、理赔审核、风险评估等全业务流程，帮助保险公司降本增效。',
                '价格': '我们提供灵活的定价方案，包括按调用量计费和包年包月等模式。具体价格请联系我们的销售团队获取详细报价。',
                '技术': '我们拥有17年技术积淀，110+国内外发明专利，技术团队由中科院博士领衔，在AI和大数据领域具有深厚的技术实力。',
                '连线': '您可以通过点击组件右下角的连接点来创建组件间的连线，构建完整的业务流程。',
                '画布': '画布支持自由拖拽组件，您可以将左侧的数据和产品模块拖拽到画布中进行组合。'
            };

            // 简单的关键词匹配
            for (const [key, response] of Object.entries(responses)) {
                if (message.toLowerCase().includes(key.toLowerCase())) {
                    return response;
                }
            }

            // 默认回复
            return '感谢您的咨询！我们是数据处理公司，专注于智能文字识别和商业大数据服务。您可以询问我们的产品功能、技术优势、行业解决方案等。如需详细了解，请联系我们的客服：021-56511321。';
        }
    }
    


    function initConnections() {
        // 连线模式切换
         $('#connectionMode').on('click', function() {
             isConnecting = !isConnecting;
             $(this).toggleClass('bg-blue-600 bg-gray-600');
             $(this).find('span').text(isConnecting ? '退出连线模式' : '连线模式');
             
             if (isConnecting) {
                 $('.canvas-component').addClass('connection-mode');
                 showConnectionPoints();
             } else {
                 $('.canvas-component').removeClass('connection-mode');
                 hideConnectionPoints();
                 connectionStart = null;
             }
         });
         
         // 清除所有连线
         $('#clearConnections').on('click', function() {
             connections = [];
             $('#connectionSvg line').remove();
             
             const message = $(`
                 <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                     <i class="fas fa-check mr-2"></i>
                     已清除所有连线
                 </div>
             `);
             $('body').append(message);
             setTimeout(() => message.fadeOut(() => message.remove()), 2000);
         });
        
        // 动态添加连接点到组件
        $(document).on('mouseenter', '.canvas-component', function() {
            if (isConnecting && !$(this).find('.connection-point').length) {
                addConnectionPoints($(this));
            }
        });
        
        function showConnectionPoints() {
            $('.canvas-component').each(function() {
                addConnectionPoints($(this));
            });
        }
        
        function hideConnectionPoints() {
            $('.connection-point').remove();
        }
    }
    
    // 画布大小自适应函数
    function adjustCanvasSize() {
        const isSidebarOpen = !$('#aiSidebar').hasClass('translate-x-full');
        const mainContent = $('.flex-1.flex.flex-col');
        
        if (isSidebarOpen) {
            // 侧边栏打开时，减少主内容区域宽度
            mainContent.css('margin-right', '0px');
            $("#aiSidebar").css("width", "300px");
            //$("#bottom-block").css("z-index","-1");
        } else {
            // 侧边栏关闭时，恢复主内容区域宽度
            mainContent.css('margin-right', '0');
            $("#aiSidebar").css("width", "0px");
            //$("#bottom-block").css("z-index","99");
        }
        
        // 重新绘制所有连线
        setTimeout(() => {
            redrawAllConnections();
        }, 100);
    }
    
    // 重新绘制所有连线
    function redrawAllConnections() {
        if (connections.length === 0) return;
        
        // 清除现有连线
        $('#connectionSvg line').remove();
        
        // 重新绘制所有连线
        connections.forEach(connection => {
            const startComponent = $(`.canvas-component[data-id="${connection.startComponent}"]`);
            const endComponent = $(`.canvas-component[data-id="${connection.endComponent}"]`);
            
            if (startComponent.length && endComponent.length) {
                // 重新计算位置
                const startPos = getComponentCenter(startComponent);
                const endPos = getComponentCenter(endComponent);
                
                connection.startPos = startPos;
                connection.endPos = endPos;
                
                drawConnection(connection);
            }
        });
    }
    
    // 获取组件中心位置
    function getComponentCenter(component) {
        const pos = component.position();
        const width = component.outerWidth();
        const height = component.outerHeight();
        
        return {
            x: pos.left + width / 2,
            y: pos.top + height / 2
        };
    }
    

    function initCanvasOperations() {
        // 清空画布
        $('#clearCanvas').on('click', function() {
            if (canvasComponents.length === 0) return;
            
            if (confirm('确定要清空画布吗？此操作不可撤销。')) {
                canvasComponents = [];
                componentCounter = 0;
                showCanvasPlaceholder();
                updateComponentCount();
            }
        });

        // 保存画布
        $('#saveCanvas').on('click', function() {
            if (canvasComponents.length === 0) {
                alert('画布为空，无法保存');
                return;
            }

            const canvasData = {
                components: canvasComponents,
                uploadedFiles: uploadedFiles,
                saveTime: new Date(),
                version: '1.0'
            };

            // 模拟保存到本地存储
            localStorage.setItem('canvasData', JSON.stringify(canvasData));
            
            // 显示保存成功消息
            const message = $(`
                <div class="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    <i class="fas fa-save mr-2"></i>
                    画布已保存成功
                </div>
            `);
            $('body').append(message);
            setTimeout(() => message.fadeOut(() => message.remove()), 3000);
        });

        // 页面加载时尝试恢复画布
        const savedData = localStorage.getItem('canvasData');
        if (savedData) {
            try {
                const canvasData = JSON.parse(savedData);
                // 这里可以实现画布恢复逻辑
                console.log('发现保存的画布数据:', canvasData);
            } catch (e) {
                console.error('恢复画布数据失败:', e);
            }
        }
    }
});