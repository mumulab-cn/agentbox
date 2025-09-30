/**
 * 节点属性管理器
 * 用于管理节点的时间、费用、人力、风险和TODO任务等属性，并实现自动计算功能
 */
class NodeAttributeManager {
    constructor(nodeManager) {
        this.nodeManager = nodeManager;
        this.initAttributesPanel();
        this.bindEvents();
    }

    /**
     * 初始化属性面板
     */
    initAttributesPanel() {
        // 在右侧信息栏添加属性统计面板
        $('#component-info').append(`
            <div class="mt-6 border-t pt-4">
                <h3 class="text-lg font-semibold mb-4 text-gray-700">属性统计</h3>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-blue-50 p-3 rounded-md">
                        <h4 class="text-sm font-medium text-blue-700 mb-1">时间</h4>
                        <p id="total-time" class="text-lg font-semibold">0 天</p>
                    </div>
                    <div class="bg-green-50 p-3 rounded-md">
                        <h4 class="text-sm font-medium text-green-700 mb-1">费用</h4>
                        <p id="total-cost" class="text-lg font-semibold">0 元</p>
                    </div>
                    <div class="bg-purple-50 p-3 rounded-md">
                        <h4 class="text-sm font-medium text-purple-700 mb-1">人力</h4>
                        <p id="total-manpower" class="text-lg font-semibold">0 人</p>
                    </div>
                    <div class="bg-red-50 p-3 rounded-md">
                        <h4 class="text-sm font-medium text-red-700 mb-1">风险</h4>
                        <p id="total-risk" class="text-lg font-semibold">0</p>
                    </div>
                </div>
                <div class="mt-3 bg-yellow-50 p-3 rounded-md">
                    <h4 class="text-sm font-medium text-yellow-700 mb-1">待办任务</h4>
                    <p id="total-todo-count" class="text-lg font-semibold">0 项</p>
                    <ul id="todo-list" class="mt-2 text-sm text-gray-600 list-disc pl-4 space-y-1">
                        <li class="text-gray-400">暂无待办任务</li>
                    </ul>
                </div>
            </div>
        `);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 监听节点添加、更新、删除事件
        $(document).on('nodeAdded nodeUpdated nodeRemoved', () => {
            this.updateAttributes();
        });
    }

    /**
     * 更新属性统计
     */
    updateAttributes() {
        let totals = {
            time: 0,
            cost: 0,
            manpower: 0,
            risk: 0,
            todoCount: 0
        };
        
        let todoItems = [];

        // 遍历所有节点，累加属性值
        this.nodeManager.nodes.forEach(node => {
            totals.time += parseInt(node.time) || 0;
            totals.cost += parseInt(node.cost) || 0;
            totals.manpower += parseInt(node.manpower) || 0;
            totals.risk += parseInt(node.risk) || 0;
            
            // 处理待办任务
            if (node.todo) {
                totals.todoCount++;
                if (node.todo_text) {
                    todoItems.push({
                        text: node.todo_text,
                        nodeName: node.name || node.type
                    });
                }
            }
        });

        // 更新UI显示
        $('#total-time').text(`${totals.time} 天`);
        $('#total-cost').text(`${totals.cost} 元`);
        $('#total-manpower').text(`${totals.manpower} 人`);
        $('#total-risk').text(`${totals.risk}`);
        $('#total-todo-count').text(`${totals.todoCount} 项`);

        // 更新待办任务列表
        const todoList = $('#todo-list');
        if (todoItems.length > 0) {
            todoList.empty();
            todoItems.forEach(item => {
                todoList.append(`<li>${item.text} <span class="text-xs text-gray-500">(${item.nodeName})</span></li>`);
            });
        } else {
            todoList.html('<li class="text-gray-400">暂无待办任务</li>');
        }
    }

    /**
     * 更新节点属性
     * @param {Object} node 节点对象
     * @param {Object} attributes 属性对象
     */
    updateNodeAttributes(node, attributes) {
        // 更新节点属性
        if (attributes.time !== undefined) node.time = attributes.time;
        if (attributes.cost !== undefined) node.cost = attributes.cost;
        if (attributes.manpower !== undefined) node.manpower = attributes.manpower;
        if (attributes.risk !== undefined) node.risk = attributes.risk;
        if (attributes.todo !== undefined) node.todo = attributes.todo;
        if (attributes.todo_text !== undefined) node.todo_text = attributes.todo_text;
        
        // 触发节点更新事件
        $(document).trigger('nodeUpdated');
        
        // 更新属性统计
        this.updateAttributes();
    }
}

// 导出NodeAttributeManager类
export default NodeAttributeManager;