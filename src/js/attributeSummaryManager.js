/**
 * 属性统计管理器
 * 用于统计所有节点的good、bad、cost、todo属性数量，并在页面顶部显示
 */
class AttributeSummaryManager {
    constructor() {
        //this.initSummaryPanel();
    }

    /**
     * 初始化顶部统计面板
     */
    initSummaryPanel() {
        // 创建顶部悬浮统计面板
        const summaryPanel = $(`
            <div class="attribute-summary-panel">
                <div class="summary-stats">
                    <div class="stat-item good-stat">
                        <i class="fas fa-thumbs-up"></i>
                        <!--<span>优点: </span>-->
                        <span id="good-count">0</span>
                    </div>
                    <div class="stat-item bad-stat">
                        <i class="fas fa-thumbs-down"></i>
                        <!--<span>缺点: </span>-->
                        <span id="bad-count">0</span>
                    </div>
                    <div class="stat-item cost-stat">
                        <i class="fas fa-coins"></i>
                        <!--<span>成本: </span>-->
                        <span id="cost-count">0</span>
                    </div>
                    <div class="stat-item todo-stat">
                        <i class="fas fa-tasks"></i>
                        <!--<span>待办: </span>-->
                        <span id="todo-count">0</span>
                    </div>
                </div>
            </div>
        `);

        // 添加到body
        $('body').append(summaryPanel);
    }

    /**
     * 更新属性统计
     */
    updateAttributeCounts() {
        // 初始化计数
        let counts = {
            good: 0,
            bad: 0,
            cost: 0,
            todo: 0
        };

        // 获取所有方块
        const blocks = $('.draggable-block');
        
        // 遍历所有方块，统计属性数量
        blocks.each(function() {
            const properties = $(this).data('properties') || {};
            
            // 只统计有内容的属性
            if (properties.good && properties.good.trim() !== '') {
                counts.good++;
            }
            
            if (properties.bad && properties.bad.trim() !== '') {
                counts.bad++;
            }
            
            if (properties.cost && properties.cost.trim() !== '') {
                counts.cost++;
            }
            
            if (properties.todo && properties.todo.trim() !== '') {
                counts.todo++;
            }
        });

        // 更新UI显示
        $('#good-count').text(counts.good);
        $('#bad-count').text(counts.bad);
        $('#cost-count').text(counts.cost);
        $('#todo-count').text(counts.todo);
    }
}

// 导出AttributeSummaryManager类
export default AttributeSummaryManager;