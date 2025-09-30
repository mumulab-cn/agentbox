class StatisticsManager {
    constructor(nodeManager) {
        alert("statistics");
        this.nodeManager = nodeManager;
        this.initStatisticsPanel();
        this.bindEvents();
    }

    initStatisticsPanel() {
        $('#info-panel').append(`
            <div class="node_info">
                <h3>项目分析仪表盘</h3>
                <div class="dashboard-section">
                    <h4>关键指标 (KPI)</h4>
                    <div id="global-stats" class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-title">优点评分</div>
                            <div class="metric-value" id="total-good">0</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">缺点评分</div>
                            <div class="metric-value" id="total-bad">0</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">投资成本</div>
                            <div class="metric-value" id="total-cost">0</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">待办事项</div>
                            <div class="metric-value" id="total-todo">0</div>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-section">
                    <h4>ROI 分析</h4>
                    <div id="roi-analysis">
                        <div class="roi-metric">
                            <span>投资回报率：</span>
                            <span id="roi-value">0%</span>
                        </div>
                        <div class="roi-metric">
                            <span>预期收益：</span>
                            <span id="expected-return">0</span>
                        </div>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h4>风险评估矩阵</h4>
                    <div id="risk-matrix" class="risk-grid">
                        <div class="risk-level high">高风险项：<span id="high-risk-count">0</span></div>
                        <div class="risk-level medium">中风险项：<span id="medium-risk-count">0</span></div>
                        <div class="risk-level low">低风险项：<span id="low-risk-count">0</span></div>
                    </div>
                </div>

                <div class="dashboard-section">
                    <h4>详细分析报告</h4>
                    <div id="text-stats" class="analysis-content">
                        <div class="analysis-item">
                            <h5>优势分析</h5>
                            <p id="good-text"></p>
                        </div>
                        <div class="analysis-item">
                            <h5>劣势分析</h5>
                            <p id="bad-text"></p>
                        </div>
                        <div class="analysis-item">
                            <h5>成本构成</h5>
                            <p id="cost-text"></p>
                        </div>
                        <div class="analysis-item">
                            <h5>执行清单</h5>
                            <p id="todo-text"></p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    bindEvents() {
        $(document).on('nodeAdded nodeUpdated connectionAdded connectionRemoved', () => {
            this.updateStatistics();
        });
    }

    updateStatistics() {
        let totals = {
            good: 0,
            bad: 0,
            cost: 0,
            todo: 0,
            highRisk: 0,
            mediumRisk: 0,
            lowRisk: 0
        };
        
        let texts = {
            good: [],
            bad: [],
            cost: [],
            todo: []
        };

        this.nodeManager.nodes.forEach(node => {
            totals.good += parseInt(node.good) || 0;
            totals.bad += parseInt(node.bad) || 0;
            totals.cost += parseInt(node.cost) || 0;
            totals.todo += node.todo ? 1 : 0;

            // 风险评估
            const riskScore = (parseInt(node.bad) || 0) - (parseInt(node.good) || 0);
            if (riskScore > 5) totals.highRisk++;
            else if (riskScore > 0) totals.mediumRisk++;
            else totals.lowRisk++;

            if (node.good_text) texts.good.push(node.good_text);
            if (node.bad_text) texts.bad.push(node.bad_text);
            if (node.cost_text) texts.cost.push(node.cost_text);
            if (node.todo_text) texts.todo.push(node.todo_text);
        });

        // 更新KPI指标
        $('#total-good').text(totals.good);
        $('#total-bad').text(totals.bad);
        $('#total-cost').text(totals.cost);
        $('#total-todo').text(totals.todo);

        // 计算并更新ROI
        const roi = totals.cost > 0 ? ((totals.good - totals.bad) / totals.cost * 100).toFixed(1) : 0;
        const expectedReturn = (totals.good - totals.bad - totals.cost).toFixed(1);
        $('#roi-value').text(roi + '%');
        $('#expected-return').text(expectedReturn);

        // 更新风险矩阵
        $('#high-risk-count').text(totals.highRisk);
        $('#medium-risk-count').text(totals.mediumRisk);
        $('#low-risk-count').text(totals.lowRisk);

        // 更新详细分析报告
        $('#good-text').text(texts.good.join('；'));
        $('#bad-text').text(texts.bad.join('；'));
        $('#cost-text').text(texts.cost.join('；'));
        $('#todo-text').text(texts.todo.join('；'));
    }
}