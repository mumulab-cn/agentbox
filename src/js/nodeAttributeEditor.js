/**
 * 节点属性编辑器
 * 用于编辑节点的时间、费用、人力、风险和TODO任务等属性
 */
class NodeAttributeEditor {
    constructor(nodeManager, attributeManager) {
        this.nodeManager = nodeManager;
        this.attributeManager = attributeManager;
        this.currentNode = null;
        this.initEditDialog();
        this.bindEvents();
    }

    /**
     * 初始化编辑对话框
     */
    initEditDialog() {
        // 创建属性编辑对话框
        const dialogHtml = `
        <div id="attributeEditDialog" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl w-96">
                <h3 class="text-lg font-semibold mb-4">编辑节点属性</h3>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">时间 (天)</label>
                        <input type="number" id="editTime" min="0" class="w-full p-2 border rounded-md">
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">费用 (元)</label>
                        <input type="number" id="editCost" min="0" class="w-full p-2 border rounded-md">
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">人力 (人)</label>
                        <input type="number" id="editManpower" min="0" class="w-full p-2 border rounded-md">
                    </div>
                    <div class="mb-3">
                        <label class="block text-sm font-medium text-gray-700 mb-1">风险 (0-10)</label>
                        <input type="number" id="editRisk" min="0" max="10" class="w-full p-2 border rounded-md">
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex items-center mb-2">
                        <input type="checkbox" id="editTodo" class="mr-2">
                        <label class="text-sm font-medium text-gray-700">添加为待办任务</label>
                    </div>
                    <textarea id="editTodoText" class="w-full p-2 border rounded-md h-20" placeholder="请输入待办任务描述"></textarea>
                </div>
                <div class="flex justify-end gap-2">
                    <button id="closeAttributeEditBtn" class="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100">取消</button>
                    <button id="saveAttributeEditBtn" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">保存</button>
                </div>
            </div>
        </div>
        `;

        // 添加到页面
        $('body').append(dialogHtml);
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 关闭对话框
        $('#closeAttributeEditBtn').on('click', () => {
            this.closeEditDialog();
        });

        // 保存属性
        $('#saveAttributeEditBtn').on('click', () => {
            this.saveAttributes();
        });

        // 为节点添加编辑属性按钮
        $(document).on('nodeAdded', (e, node) => {
            if (node && node.element) {
                const attributeIcon = $('<i class="fa fa-cog attribute-edit-icon"></i>').css({
                    position: 'absolute',
                    right: '15px',
                    bottom: '-8px',
                    color: '#6B7280',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'none',
                    zIndex: 1000
                });

                // 添加点击事件
                attributeIcon.on('click', (e) => {
                    e.stopPropagation();
                    this.showEditDialog(node);
                });

                // 添加到节点
                node.element.append(attributeIcon);

                // 显示/隐藏图标
                node.element.on('mouseenter', () => {
                    node.element.find('.attribute-edit-icon').show();
                }).on('mouseleave', () => {
                    node.element.find('.attribute-edit-icon').hide();
                });
            }
        });
    }

    /**
     * 显示编辑对话框
     * @param {Object} node 节点对象
     */
    showEditDialog(node) {
        this.currentNode = node;

        // 设置表单值
        $('#editTime').val(node.time || 0);
        $('#editCost').val(node.cost || 0);
        $('#editManpower').val(node.manpower || 0);
        $('#editRisk').val(node.risk || 0);
        $('#editTodo').prop('checked', node.todo || false);
        $('#editTodoText').val(node.todo_text || '');

        // 显示对话框
        $('#attributeEditDialog').removeClass('hidden');
    }

    /**
     * 关闭编辑对话框
     */
    closeEditDialog() {
        $('#attributeEditDialog').addClass('hidden');
        this.currentNode = null;
    }

    /**
     * 保存属性
     */
    saveAttributes() {
        if (!this.currentNode) return;

        // 获取表单值
        const attributes = {
            time: parseInt($('#editTime').val()) || 0,
            cost: parseInt($('#editCost').val()) || 0,
            manpower: parseInt($('#editManpower').val()) || 0,
            risk: parseInt($('#editRisk').val()) || 0,
            todo: $('#editTodo').is(':checked'),
            todo_text: $('#editTodoText').val()
        };

        // 更新节点属性
        this.attributeManager.updateNodeAttributes(this.currentNode, attributes);

        // 关闭对话框
        this.closeEditDialog();
    }
}

// 导出NodeAttributeEditor类
export default NodeAttributeEditor;