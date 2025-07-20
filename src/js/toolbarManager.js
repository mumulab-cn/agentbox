class ToolbarManager {
    constructor(nodeManager, redraw, serializeFn) {
        this.nodeManager = nodeManager;
        this.redraw = redraw;
        this.serializeFn = serializeFn;
        this.initDraggable();
    }

    initDraggable() {
        $('.tool-item').draggable({
            helper: 'clone',
            cursor: 'move',
            // 移除stop事件，因为main.js中的droppable已经处理了节点创建
            // 这里不需要重复创建节点
        });
    }
}

export default ToolbarManager;