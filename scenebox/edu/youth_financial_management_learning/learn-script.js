// 学习页面JavaScript功能

$(document).ready(function() {
    // 初始化
    initializeLearning();
    
    // 菜单点击事件
    $('.menu-item').click(function() {
        if ($(this).hasClass('back-to-main')) {
            // 返回主页
            window.location.href = 'index.html';
            return;
        }
        
        const tabId = $(this).data('tab');
        if (tabId) {
            switchTab(tabId);
        }
    });
    
    // 课程导航按钮
    $('#nextSection').click(nextSection);
    $('#prevSection').click(prevSection);
    $('#completeLesson').click(completeLesson);
    
    // 交互式计算器
    $('#dailySpend').on('input', updateCalculator);
    
    // 初始化测验
    initializeQuiz();
});

// 全局变量
let currentSection = 0;
let totalSections = 6; // 第一课总共6个部分
let quizQuestions = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let selectedQuizAnswer = null;

// 初始化学习系统
function initializeLearning() {
    updateProgress();
    updateCalculator();
    loadQuizQuestions();
}

// 切换标签页
function switchTab(tabId) {
    // 移除所有活动状态
    $('.menu-item').removeClass('active');
    $('.tab-content').removeClass('active');
    
    // 添加新的活动状态
    $(`.menu-item[data-tab="${tabId}"]`).addClass('active');
    $(`#${tabId}`).addClass('active');
    
    // 如果是测验页面，重置测验
    if (tabId === 'quiz') {
        resetQuiz();
    }
}

// 更新课程进度
function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    $('.progress-fill').css('width', progress + '%');
    $('.progress-text').text(`进度: ${Math.round(progress)}%`);
    
    // 更新导航按钮状态
    $('#prevSection').prop('disabled', currentSection === 0);
    
    if (currentSection === totalSections - 1) {
        $('#nextSection').hide();
        $('#completeLesson').show();
    } else {
        $('#nextSection').show();
        $('#completeLesson').hide();
    }
    
    // 滚动到对应部分
    scrollToSection(currentSection);
}

// 滚动到指定部分
function scrollToSection(sectionIndex) {
    const sections = $('.lesson-section');
    if (sections.length > sectionIndex) {
        const targetSection = sections.eq(sectionIndex);
        $('html, body').animate({
            scrollTop: targetSection.offset().top - 100
        }, 500);
        
        // 高亮当前部分
        sections.removeClass('current-section');
        targetSection.addClass('current-section');
    }
}

// 下一节
function nextSection() {
    if (currentSection < totalSections - 1) {
        currentSection++;
        updateProgress();
        
        // 添加完成动画
        showSectionCompleteAnimation();
    }
}

// 上一节
function prevSection() {
    if (currentSection > 0) {
        currentSection--;
        updateProgress();
    }
}

// 完成课程
function completeLesson() {
    // 保存完成状态
    localStorage.setItem('lesson1_completed', 'true');
    localStorage.setItem('lesson1_completion_date', new Date().toISOString());
    
    // 显示完成提示
    showMessage('🎉 恭喜！你已经完成了第一课的学习！', 'success');
    
    // 解锁练习题
    setTimeout(() => {
        switchTab('practice');
    }, 2000);
}

// 显示部分完成动画
function showSectionCompleteAnimation() {
    const animation = $('<div class="section-complete-animation">✅ 部分完成！</div>');
    animation.css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#34a853',
        color: 'white',
        padding: '16px 32px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '500',
        zIndex: 1000,
        opacity: 0
    });
    
    $('body').append(animation);
    
    animation.animate({ opacity: 1 }, 300)
           .delay(1000)
           .animate({ opacity: 0 }, 300, function() {
               animation.remove();
           });
}

// 更新计算器
function updateCalculator() {
    const dailySpend = parseInt($('#dailySpend').val()) || 0;
    const monthlyTotal = dailySpend * 30;
    
    $('#monthlyTotal').text(monthlyTotal);
    
    // 更新替代品建议
    let alternatives = '';
    if (monthlyTotal >= 500) {
        alternatives = '一部新手机或高级耳机';
    } else if (monthlyTotal >= 300) {
        alternatives = '一双好鞋子或一套衣服';
    } else if (monthlyTotal >= 150) {
        alternatives = '几本好书或一个月的兴趣班';
    } else if (monthlyTotal >= 50) {
        alternatives = '一本好书或一次电影';
    } else {
        alternatives = '一些学习用品';
    }
    
    $('#alternatives').text(alternatives);
}

// 练习题功能
function checkPracticeAnswer() {
    const selectedOptions = [];
    $('.practice-options input:checked').each(function() {
        selectedOptions.push($(this).val());
    });
    
    const resultArea = $('#practiceResult');
    let resultText = '';
    let resultClass = '';
    
    // 评估答案
    const hasExpensiveItem = selectedOptions.includes('skin');
    const hasUsefulItem = selectedOptions.includes('book');
    const hasSaving = selectedOptions.includes('save');
    
    if (hasSaving && hasUsefulItem && !hasExpensiveItem) {
        resultText = '🎉 优秀！你选择了储蓄和购买有用的物品，这是很明智的理财决策！';
        resultClass = 'success';
    } else if (hasUsefulItem && !hasExpensiveItem) {
        resultText = '👍 不错！你避免了昂贵的游戏道具，选择了更有价值的物品。';
        resultClass = 'success';
    } else if (hasExpensiveItem && selectedOptions.length === 1) {
        resultText = '⚠️ 需要思考：把大部分钱花在游戏道具上可能不是最好的选择。试试考虑其他选项？';
        resultClass = 'warning';
    } else {
        resultText = '💭 继续思考：理财的关键是平衡需要和想要。再试试看？';
        resultClass = 'warning';
    }
    
    resultArea.removeClass('success warning').addClass(resultClass + ' show');
    resultArea.html(`<p>${resultText}</p>`);
    
    // 滚动到结果
    $('html, body').animate({
        scrollTop: resultArea.offset().top - 100
    }, 300);
}

// 储蓄计划计算器
function calculateSavingsPlan() {
    const targetAmount = parseFloat($('#targetAmount').val()) || 0;
    const targetMonths = parseFloat($('#targetMonths').val()) || 1;
    const monthlyIncome = parseFloat($('#monthlyIncome').val()) || 0;
    const monthlyExpense = parseFloat($('#monthlyExpense').val()) || 0;
    const currentSavings = parseFloat($('#currentSavings').val()) || 0;
    
    const monthlySavings = monthlyIncome - monthlyExpense;
    const requiredSavings = (targetAmount - currentSavings) / targetMonths;
    const isFeasible = monthlySavings >= requiredSavings;
    
    // 更新显示
    $('#monthlySavings').text(monthlySavings + '元');
    $('#requiredSavings').text(Math.round(requiredSavings) + '元');
    
    const feasibilityElement = $('#planFeasibility');
    let advice = '';
    
    if (isFeasible) {
        feasibilityElement.text('✅ 计划可行').removeClass('status-warning').addClass('status-good');
        const surplus = monthlySavings - requiredSavings;
        advice = `
            <div class="advice-good">
                <h5>🎉 恭喜！你的储蓄计划是可行的</h5>
                <p>按照当前的收支情况，你每月还能多储蓄 <strong>${Math.round(surplus)}元</strong>。</p>
                <div class="suggestions">
                    <h6>💡 建议：</h6>
                    <ul>
                        <li>可以提前达成目标，或者设定更高的储蓄目标</li>
                        <li>考虑将多余资金投入货币基金获得更多收益</li>
                        <li>建立应急资金，为意外支出做准备</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        feasibilityElement.text('⚠️ 需要调整').removeClass('status-good').addClass('status-warning');
        const deficit = requiredSavings - monthlySavings;
        advice = `
            <div class="advice-warning">
                <h5>⚠️ 当前计划需要调整</h5>
                <p>按照目标，你每月需要多储蓄 <strong>${Math.round(deficit)}元</strong>。</p>
                <div class="suggestions">
                    <h6>💡 调整建议：</h6>
                    <ul>
                        <li><strong>延长储蓄时间：</strong>将目标时间延长到 ${Math.ceil((targetAmount - currentSavings) / monthlySavings)} 个月</li>
                        <li><strong>降低目标金额：</strong>考虑购买价格更低的替代品</li>
                        <li><strong>增加收入：</strong>寻找兼职或其他收入来源</li>
                        <li><strong>减少支出：</strong>审查日常开销，削减不必要的花费</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    $('#savingsAdvice').html(advice);
    $('#savingsResult').show();
}

// 检查投资选择答案
function checkInvestmentChoices() {
    const scenarioA = $('input[name="scenarioA"]:checked').val();
    const scenarioB = $('input[name="scenarioB"]:checked').val();
    const scenarioC = $('input[name="scenarioC"]:checked').val();
    
    if (!scenarioA || !scenarioB || !scenarioC) {
        showMessage('请完成所有场景的选择！', 'warning');
        return;
    }
    
    const correctAnswers = {
        scenarioA: 'fund', // 货币基金
        scenarioB: 'bond', // 债券基金
        scenarioC: 'index' // 指数基金
    };
    
    let score = 0;
    let results = [];
    
    // 场景A评分
    if (scenarioA === correctAnswers.scenarioA) {
        score++;
        results.push({
            scenario: 'A',
            correct: true,
            explanation: '✅ 正确！货币基金流动性好，风险低，适合应急资金储备。'
        });
    } else {
        results.push({
            scenario: 'A',
            correct: false,
            explanation: '❌ 应急资金需要随时取用，货币基金是最佳选择，既有收益又保证流动性。'
        });
    }
    
    // 场景B评分
    if (scenarioB === correctAnswers.scenarioB) {
        score++;
        results.push({
            scenario: 'B',
            correct: true,
            explanation: '✅ 正确！债券基金风险适中，收益稳定，适合中期目标。'
        });
    } else {
        results.push({
            scenario: 'B',
            correct: false,
            explanation: '❌ 3年期目标需要平衡收益和风险，债券基金是较好的选择。'
        });
    }
    
    // 场景C评分
    if (scenarioC === correctAnswers.scenarioC) {
        score++;
        results.push({
            scenario: 'C',
            correct: true,
            explanation: '✅ 正确！指数基金分散风险，长期收益较好，适合长期投资。'
        });
    } else {
        results.push({
            scenario: 'C',
            correct: false,
            explanation: '❌ 长期投资可以承受波动，指数基金是很好的选择，避免个股风险。'
        });
    }
    
    // 显示结果
    let resultHTML = `
        <div class="investment-result">
            <div class="score-summary">
                <h4>📊 投资选择结果</h4>
                <p>你答对了 <strong>${score}/3</strong> 个场景</p>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${(score/3)*100}%"></div>
                </div>
            </div>
            <div class="detailed-results">
    `;
    
    results.forEach(result => {
        resultHTML += `
            <div class="result-item ${result.correct ? 'correct' : 'incorrect'}">
                <h5>场景${result.scenario}</h5>
                <p>${result.explanation}</p>
            </div>
        `;
    });
    
    resultHTML += `
            </div>
            <div class="investment-advice">
                <h5>💡 投资建议</h5>
    `;
    
    if (score === 3) {
        resultHTML += '<p>🎉 优秀！你对不同投资工具的特点有很好的理解。继续保持这种理性的投资思维。</p>';
    } else if (score === 2) {
        resultHTML += '<p>👍 不错！你基本掌握了投资工具的选择原则，继续学习完善投资知识。</p>';
    } else {
        resultHTML += '<p>📚 需要加强学习！建议多了解不同投资工具的特点，根据投资期限和风险承受能力做选择。</p>';
    }
    
    resultHTML += `
                <div class="key-principles">
                    <h6>投资选择关键原则：</h6>
                    <ul>
                        <li><strong>流动性需求：</strong>应急资金选择高流动性产品</li>
                        <li><strong>投资期限：</strong>长期投资可承受更多波动</li>
                        <li><strong>风险承受：</strong>根据个人情况选择合适风险等级</li>
                        <li><strong>分散投资：</strong>不要把鸡蛋放在一个篮子里</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    
    $('#investmentResult').html(resultHTML).show();
}

// 风险承受能力评估
function assessRiskTolerance() {
    const risk1 = $('input[name="risk1"]:checked').val();
    const risk2 = $('input[name="risk2"]:checked').val();
    const risk3 = $('input[name="risk3"]:checked').val();
    
    if (!risk1 || !risk2 || !risk3) {
        showMessage('请完成所有问题的回答！', 'warning');
        return;
    }
    
    const totalScore = parseInt(risk1) + parseInt(risk2) + parseInt(risk3);
    let riskLevel, riskDescription, investmentAdvice;
    
    if (totalScore <= 5) {
        riskLevel = '保守型';
        riskDescription = '你偏好稳定，不愿承担较大风险';
        investmentAdvice = `
            <div class="risk-conservative">
                <h5>🛡️ 保守型投资建议</h5>
                <div class="allocation-suggestion">
                    <h6>推荐资产配置：</h6>
                    <ul>
                        <li>银行存款/货币基金：60-70%</li>
                        <li>债券基金：20-30%</li>
                        <li>股票基金：0-10%</li>
                    </ul>
                </div>
                <div class="suitable-products">
                    <h6>适合的投资产品：</h6>
                    <ul>
                        <li>银行定期存款</li>
                        <li>货币市场基金</li>
                        <li>国债</li>
                        <li>低风险债券基金</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (totalScore <= 8) {
        riskLevel = '稳健型';
        riskDescription = '你希望获得一定收益，能承受适度风险';
        investmentAdvice = `
            <div class="risk-moderate">
                <h5>⚖️ 稳健型投资建议</h5>
                <div class="allocation-suggestion">
                    <h6>推荐资产配置：</h6>
                    <ul>
                        <li>银行存款/货币基金：30-40%</li>
                        <li>债券基金：40-50%</li>
                        <li>股票基金：10-30%</li>
                    </ul>
                </div>
                <div class="suitable-products">
                    <h6>适合的投资产品：</h6>
                    <ul>
                        <li>混合基金</li>
                        <li>债券基金</li>
                        <li>指数基金（小比例）</li>
                        <li>银行理财产品</li>
                    </ul>
                </div>
            </div>
        `;
    } else {
        riskLevel = '积极型';
        riskDescription = '你追求较高收益，能承受较大风险波动';
        investmentAdvice = `
            <div class="risk-aggressive">
                <h5>🚀 积极型投资建议</h5>
                <div class="allocation-suggestion">
                    <h6>推荐资产配置：</h6>
                    <ul>
                        <li>银行存款/货币基金：10-20%</li>
                        <li>债券基金：20-30%</li>
                        <li>股票基金：50-70%</li>
                    </ul>
                </div>
                <div class="suitable-products">
                    <h6>适合的投资产品：</h6>
                    <ul>
                        <li>股票基金</li>
                        <li>指数基金</li>
                        <li>混合基金</li>
                        <li>个股投资（需要专业知识）</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    const resultHTML = `
        <div class="risk-assessment-result">
            <div class="risk-profile">
                <h4>📊 你的风险承受能力评估结果</h4>
                <div class="risk-level">
                    <span class="risk-label">风险类型：</span>
                    <strong class="risk-type">${riskLevel}</strong>
                </div>
                <p class="risk-desc">${riskDescription}</p>
                <div class="risk-score">
                    <span>评估得分：${totalScore}/12</span>
                </div>
            </div>
            ${investmentAdvice}
            <div class="risk-reminder">
                <h5>⚠️ 重要提醒</h5>
                <ul>
                    <li>风险承受能力会随年龄、收入、家庭状况变化</li>
                    <li>建议定期重新评估并调整投资策略</li>
                    <li>投资前务必充分了解产品风险</li>
                    <li>不要投资超出理解范围的产品</li>
                </ul>
            </div>
        </div>
    `;
    
    $('#riskAssessmentResult').html(resultHTML).show();
}

// 理财误区判断
let misconceptionAnswers = {};
let misconceptionCount = 0;

function judgeMisconception(button, isCorrect) {
    const item = $(button).closest('.misconception-item');
    const statement = item.find('.statement-text').text();
    const explanation = item.find('.explanation');
    const buttons = item.find('.btn-judgment');
    
    // 禁用按钮
    buttons.prop('disabled', true);
    
    // 记录答案
    const correctAnswer = $(button).data('answer');
    misconceptionAnswers[statement] = isCorrect === correctAnswer;
    misconceptionCount++;
    
    // 显示解释
    explanation.show();
    
    // 标记按钮状态
    if (isCorrect === correctAnswer) {
        $(button).addClass('selected-correct');
    } else {
        $(button).addClass('selected-wrong');
        // 高亮正确答案
        buttons.filter(`[data-answer="${correctAnswer}"]`).addClass('highlight-correct');
    }
    
    // 检查是否完成所有题目
    if (misconceptionCount === 5) {
        showMisconceptionSummary();
    }
}

function showMisconceptionSummary() {
    const correctCount = Object.values(misconceptionAnswers).filter(answer => answer).length;
    const totalCount = Object.keys(misconceptionAnswers).length;
    
    $('#correctCount').text(correctCount);
    $('#totalCount').text(totalCount);
    
    let advice = '';
    if (correctCount === 5) {
        advice = `
            <div class="advice-excellent">
                <h5>🎉 优秀！</h5>
                <p>你对理财有正确的认知，能够识别常见的理财误区。继续保持理性的理财观念！</p>
            </div>
        `;
    } else if (correctCount >= 3) {
        advice = `
            <div class="advice-good">
                <h5>👍 不错！</h5>
                <p>你基本具备了正确的理财观念，但还需要在某些方面加强学习。建议多关注理财知识，避免常见误区。</p>
            </div>
        `;
    } else {
        advice = `
            <div class="advice-need-improvement">
                <h5>📚 需要加强学习！</h5>
                <p>你对理财还存在一些误解，建议系统学习理财知识，树立正确的理财观念。记住：理财是一门科学，需要持续学习。</p>
            </div>
        `;
    }
    
    $('#misconceptionAdvice').html(advice);
    $('#misconceptionSummary').show();
    
    // 滚动到结果区域
    $('html, body').animate({
        scrollTop: $('#misconceptionSummary').offset().top - 100
    }, 500);
}

// 加载测验题目
function loadQuizQuestions() {
    quizQuestions = [
        // 基础理财概念题（简单）
        {
            question: "以下哪个属于'需要'而不是'想要'？",
            options: [
                "游戏皮肤",
                "学习用品",
                "高档零食",
                "名牌衣服"
            ],
            correct: 1,
            explanation: "学习用品是学习必需的，属于'需要'；其他选项都是'想要'的物品。",
            difficulty: "简单"
        },
        {
            question: "看到喜欢的游戏道具时，最好的做法是？",
            options: [
                "立即购买",
                "先等24小时再决定",
                "借钱购买",
                "要求父母购买"
            ],
            correct: 1,
            explanation: "24小时冷静期可以帮助我们避免冲动消费，做出更理性的决定。",
            difficulty: "简单"
        },
        {
            question: "金钱的主要作用是？",
            options: [
                "炫耀财富",
                "交换商品和服务",
                "装饰用品",
                "游戏道具"
            ],
            correct: 1,
            explanation: "金钱是交换的媒介，帮助我们获得需要的商品和服务。",
            difficulty: "简单"
        },
        {
            question: "建立正确金钱观最重要的是？",
            options: [
                "赚更多钱",
                "花更多钱",
                "理性思考和规划",
                "跟风消费"
            ],
            correct: 2,
            explanation: "理性思考和规划是建立正确金钱观的基础，帮助我们做出明智的财务决策。",
            difficulty: "简单"
        },
        {
            question: "储蓄的主要目的是什么？",
            options: [
                "让钱放在那里不动",
                "为未来的目标和紧急情况做准备",
                "显示自己很有钱",
                "避免花钱的诱惑"
            ],
            correct: 1,
            explanation: "储蓄是为了实现未来目标和应对紧急情况，是理财规划的重要组成部分。",
            difficulty: "简单"
        },
        
        // 储蓄投资题（中等）
        {
            question: "如果你有100元零花钱，最明智的分配方式是？",
            options: [
                "全部花在游戏上",
                "全部存起来",
                "一部分储蓄，一部分合理消费",
                "全部买零食"
            ],
            correct: 2,
            explanation: "合理分配资金，既满足当前需要又为未来储蓄，是最明智的理财方式。",
            difficulty: "中等"
        },
        {
            question: "以下哪种储蓄方式风险最低？",
            options: [
                "股票投资",
                "银行定期存款",
                "购买基金",
                "投资房地产"
            ],
            correct: 1,
            explanation: "银行定期存款受到存款保险保护，是风险最低的储蓄方式。",
            difficulty: "中等"
        },
        {
            question: "复利的概念是指？",
            options: [
                "利息保持不变",
                "利息逐年减少",
                "利息产生利息",
                "没有利息"
            ],
            correct: 2,
            explanation: "复利是指利息会产生新的利息，随着时间推移，财富增长会越来越快。",
            difficulty: "中等"
        },
        {
            question: "货币基金相比银行活期存款的优势是？",
            options: [
                "风险更低",
                "收益更高且流动性好",
                "投资门槛更高",
                "只能长期持有"
            ],
            correct: 1,
            explanation: "货币基金通常比银行活期存款收益更高，同时保持良好的流动性。",
            difficulty: "中等"
        },
        {
            question: "制定储蓄目标时，以下哪个做法最合理？",
            options: [
                "设定一个很高的目标激励自己",
                "根据收入情况设定可实现的目标",
                "随意设定，能存多少是多少",
                "完全不设目标"
            ],
            correct: 1,
            explanation: "储蓄目标应该基于实际收入情况，既有挑战性又可实现，这样更容易坚持。",
            difficulty: "中等"
        },
        
        // 风险管理题（中等偏难）
        {
            question: "投资中的'不要把鸡蛋放在一个篮子里'是指？",
            options: [
                "不要投资太多钱",
                "分散投资降低风险",
                "只投资一种产品",
                "避免所有投资"
            ],
            correct: 1,
            explanation: "分散投资是指将资金投资于不同类型的产品，以降低整体投资风险。",
            difficulty: "中等"
        },
        {
            question: "以下哪种情况下最需要紧急备用金？",
            options: [
                "想买新游戏",
                "朋友生日聚会",
                "突然生病需要治疗",
                "看到打折商品"
            ],
            correct: 2,
            explanation: "紧急备用金是为了应对突发的、必要的支出，如医疗费用等。",
            difficulty: "中等"
        },
        {
            question: "年轻人投资时应该优先考虑什么？",
            options: [
                "追求最高收益",
                "学习投资知识，从小额开始",
                "借钱投资",
                "跟风投资热门产品"
            ],
            correct: 1,
            explanation: "年轻人应该先学习投资知识，从小额投资开始积累经验，避免盲目追求高收益。",
            difficulty: "中等"
        },
        
        // 理财规划题（较难）
        {
            question: "SMART目标设定法中，'M'代表什么？",
            options: [
                "金钱(Money)",
                "可衡量(Measurable)",
                "管理(Management)",
                "最大化(Maximize)"
            ],
            correct: 1,
            explanation: "SMART目标中的M代表Measurable（可衡量），即目标应该是可以量化和衡量的。",
            difficulty: "较难"
        },
        {
            question: "如果通胀率是3%，银行存款利率是2%，实际收益率是？",
            options: [
                "5%",
                "1%",
                "-1%",
                "3%"
            ],
            correct: 2,
            explanation: "实际收益率 = 名义利率 - 通胀率 = 2% - 3% = -1%，说明购买力实际在下降。",
            difficulty: "较难"
        },
        {
            question: "资产配置中，以下哪个组合对20岁年轻人最合适？",
            options: [
                "100%现金存款",
                "80%股票基金 + 20%债券基金",
                "100%股票",
                "50%房地产 + 50%黄金"
            ],
            correct: 1,
            explanation: "年轻人风险承受能力强，可以配置较高比例的股票基金，同时保留部分稳健资产。",
            difficulty: "较难"
        },
        {
            question: "定投策略的主要优势是什么？",
            options: [
                "保证盈利",
                "平摊成本，降低波动风险",
                "获得最高收益",
                "避免所有损失"
            ],
            correct: 1,
            explanation: "定投通过定期投资固定金额，可以在市场波动中平摊投资成本，降低择时风险。",
            difficulty: "较难"
        },
        {
            question: "理财规划中，以下哪个顺序最合理？",
            options: [
                "投资→储蓄→保险→消费",
                "消费→储蓄→保险→投资",
                "保险→投资→储蓄→消费",
                "储蓄→投资→保险→消费"
            ],
            correct: 1,
            explanation: "合理的理财顺序是：先满足基本消费需求，然后储蓄，购买必要保险，最后进行投资。",
            difficulty: "较难"
        },
        
        // 实际应用题（较难）
        {
            question: "小明每月零花钱300元，想在一年后买一个1800元的电脑，他每月至少要储蓄多少？",
            options: [
                "100元",
                "150元",
                "200元",
                "250元"
            ],
            correct: 1,
            explanation: "1800元÷12个月=150元，所以小明每月至少要储蓄150元才能实现目标。",
            difficulty: "较难"
        },
        {
            question: "以下哪种行为属于理性消费？",
            options: [
                "看到打折就买，不管是否需要",
                "购买前列清单，按需购买",
                "只买最贵的，认为贵就是好",
                "从不比较价格，随意购买"
            ],
            correct: 1,
            explanation: "理性消费是指根据实际需要，经过思考和比较后做出的购买决定。",
            difficulty: "中等"
        }
    ];
}

// 初始化测验
function initializeQuiz() {
    resetQuiz();
}

// 重置测验
function resetQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    selectedQuizAnswer = null;
    $('#quizResult').hide();
    $('.quiz-question').show();
    loadQuizQuestion();
}

// 加载测验问题
function loadQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        showQuizResult();
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    
    $('#questionTitle').text(`问题 ${currentQuizQuestion + 1}: ${question.question}`);
    $('#questionNumber').text(currentQuizQuestion + 1);
    $('#totalQuestions').text(quizQuestions.length);
    
    const optionsHtml = question.options.map((option, index) => 
        `<label>
            <input type="radio" name="quizOption" value="${index}">
            ${option}
        </label>`
    ).join('');
    
    $('#questionOptions').html(optionsHtml);
    
    // 重置选择
    selectedQuizAnswer = null;
    
    // 绑定选择事件
    $('input[name="quizOption"]').change(function() {
        selectedQuizAnswer = parseInt($(this).val());
    });
}

// 提交测验答案
function submitQuizAnswer() {
    if (selectedQuizAnswer === null) {
        showMessage('请选择一个答案！', 'warning');
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    const isCorrect = selectedQuizAnswer === question.correct;
    
    if (isCorrect) {
        quizScore++;
        showMessage('✅ 回答正确！' + question.explanation, 'success');
    } else {
        showMessage('❌ 回答错误。' + question.explanation, 'warning');
    }
    
    // 延迟后加载下一题
    setTimeout(() => {
        currentQuizQuestion++;
        loadQuizQuestion();
    }, 2000);
}

// 显示测验结果
function showQuizResult() {
    $('.quiz-question').hide();
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let resultClass = '';
    let resultTitle = '';
    let resultMessage = '';
    
    if (percentage >= 80) {
        resultClass = 'excellent';
        resultTitle = '🏆 优秀！';
        resultMessage = '你对理财知识掌握得很好！';
    } else if (percentage >= 60) {
        resultClass = 'good';
        resultTitle = '👍 良好！';
        resultMessage = '你已经掌握了基本的理财概念，继续加油！';
    } else {
        resultClass = 'needs-improvement';
        resultTitle = '📚 需要加强';
        resultMessage = '建议重新学习课程内容，加深理解。';
    }
    
    const resultHtml = `
        <h2>${resultTitle}</h2>
        <div class="score-display">
            <div class="score-circle">
                <span class="score-number">${quizScore}</span>
                <span class="score-total">/${quizQuestions.length}</span>
            </div>
            <p class="score-percentage">${percentage}%</p>
        </div>
        <p>${resultMessage}</p>
        <div class="result-actions">
            <button class="btn btn-primary" onclick="resetQuiz()">重新测验</button>
            <button class="btn btn-secondary" onclick="switchTab('lesson1')">回到课程</button>
        </div>
    `;
    
    $('#quizResult').removeClass('excellent good needs-improvement')
                   .addClass(resultClass)
                   .html(resultHtml)
                   .show();
    
    // 保存测验结果
    const quizResult = {
        score: quizScore,
        total: quizQuestions.length,
        percentage: percentage,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('lesson1_quiz_result', JSON.stringify(quizResult));
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const messageDiv = $('<div class="message-toast"></div>');
    messageDiv.text(message);
    
    const colors = {
        success: '#34a853',
        warning: '#fbbc04',
        error: '#ea4335',
        info: '#4285f4'
    };
    
    messageDiv.css({
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '12px 20px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 2000,
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        opacity: 0,
        transform: 'translateX(100%)'
    });
    
    $('body').append(messageDiv);
    
    // 动画显示
    messageDiv.animate({
        opacity: 1,
        transform: 'translateX(0)'
    }, 300);
    
    // 自动隐藏
    setTimeout(() => {
        messageDiv.animate({
            opacity: 0,
            transform: 'translateX(100%)'
        }, 300, function() {
            messageDiv.remove();
        });
    }, 3000);
}

// 添加当前部分高亮样式
$('<style>').text(`
    .lesson-section.current-section {
        background: linear-gradient(90deg, transparent 0%, rgba(26, 115, 232, 0.1) 50%, transparent 100%);
        border-left: 4px solid #1a73e8;
        padding-left: 20px;
        margin-left: -24px;
        transition: all 0.3s ease;
    }
    
    .score-display {
        text-align: center;
        margin: 20px 0;
    }
    
    .score-circle {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #f8f9fa;
        border: 4px solid #1a73e8;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-bottom: 12px;
    }
    
    .score-number {
        font-size: 24px;
        font-weight: bold;
        color: #1a73e8;
    }
    
    .score-total {
        font-size: 16px;
        color: #5f6368;
    }
    
    .score-percentage {
        font-size: 20px;
        font-weight: 500;
        color: #202124;
        margin: 0;
    }
    
    .result-actions {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        justify-content: center;
    }
`).appendTo('head');

// 键盘快捷键支持
$(document).keydown(function(e) {
    // 只在lesson1页面激活时响应
    if ($('#lesson1').hasClass('active')) {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            e.preventDefault();
            if (currentSection < totalSections - 1) {
                nextSection();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentSection > 0) {
                prevSection();
            }
        }
    }
});