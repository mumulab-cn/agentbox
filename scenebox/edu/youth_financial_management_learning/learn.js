// 学习中心JavaScript功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeLearningCenter();
});

// 初始化学习中心
function initializeLearningCenter() {
    // 初始化侧边栏导航
    initializeSidebar();
    
    // 初始化课程进度
    initializeLessonProgress();
    
    // 绑定课程导航事件
    bindLessonNavigation();
    
    // 初始化第一课的动画
    if (document.getElementById('lesson1')) {
        initializeCoinAnimation();
    }
}

// 初始化侧边栏导航
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.menu-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果是返回主页按钮，跳转到主页
            if (this.classList.contains('back-to-main')) {
                window.location.href = 'index.html';
                return;
            }
            
            // 移除所有活动状态
            sidebarItems.forEach(i => i.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 显示对应内容
            const targetId = this.getAttribute('data-tab');
            showTabContent(targetId);
        });
    });
}

// 显示标签页内容
function showTabContent(targetId) {
    // 隐藏所有内容
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示目标内容
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
        
        // 如果是课程页面，初始化相应功能
        if (targetId.startsWith('lesson')) {
            initializeLessonFeatures(targetId);
        }
    }
}

// 初始化课程功能
function initializeLessonFeatures(lessonId) {
    if (lessonId === 'lesson1') {
        initializeCoinAnimation();
    } else if (lessonId === 'lesson2') {
        initializeBudgetCalculator();
    }
}

// 初始化硬币动画（第一课）
function initializeCoinAnimation() {
    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin, index) => {
        setTimeout(() => {
            coin.style.animation = 'coinFloat 3s ease-in-out infinite';
            coin.style.animationDelay = `${index * 0.5}s`;
        }, index * 200);
    });
}

// 初始化预算计算器（第二课）
function initializeBudgetCalculator() {
    const calculateBtn = document.querySelector('button[onclick="calculateBudget()"]');
    if (calculateBtn) {
        calculateBtn.onclick = calculateBudget;
    }
}

// 预算计算器功能
function calculateBudget() {
    const incomeInput = document.getElementById('monthlyIncome');
    const resultDiv = document.getElementById('budgetResult');
    
    if (!incomeInput || !resultDiv) {
        console.error('预算计算器元素未找到');
        return;
    }
    
    const income = parseFloat(incomeInput.value);
    
    if (!income || income <= 0) {
        alert('请输入有效的收入金额');
        return;
    }
    
    // 计算预算分配（建议比例：储蓄30%，必需品40%，娱乐30%）
    const savings = Math.round(income * 0.3);
    const needs = Math.round(income * 0.4);
    const wants = Math.round(income * 0.3);
    
    // 显示结果
    resultDiv.innerHTML = `
        <h5 style="margin: 0 0 12px 0; color: #1a73e8; text-align: center;">💰 你的预算分配建议</h5>
        <div class="result-item">
            <span class="result-label">💳 总收入</span>
            <span class="result-amount">¥${income}</span>
        </div>
        <div class="result-item">
            <span class="result-label">🏦 储蓄 (30%)</span>
            <span class="result-amount">¥${savings}</span>
        </div>
        <div class="result-item">
            <span class="result-label">📚 必需品 (40%)</span>
            <span class="result-amount">¥${needs}</span>
        </div>
        <div class="result-item">
            <span class="result-label">🎮 娱乐 (30%)</span>
            <span class="result-amount">¥${wants}</span>
        </div>
        <div style="margin-top: 12px; padding: 12px; background: #e8f0fe; border-radius: 6px; text-align: center;">
            <small style="color: #1a73e8; font-weight: 500;">💡 记住：先存钱，再花钱！</small>
        </div>
    `;
    
    resultDiv.classList.add('show');
    
    // 滚动到结果区域
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 初始化课程进度
function initializeLessonProgress() {
    // 从localStorage获取学习进度
    const learningProgress = JSON.parse(localStorage.getItem('learningProgress')) || {};
    
    // 更新各课程进度显示
    updateLessonProgress('lesson1', learningProgress.lesson1 || 0);
    updateLessonProgress('lesson2', learningProgress.lesson2 || 0);
}

// 更新课程进度
function updateLessonProgress(lessonId, progress) {
    const lessonElement = document.getElementById(lessonId);
    if (!lessonElement) return;
    
    const progressFill = lessonElement.querySelector('.progress-fill');
    const progressText = lessonElement.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `进度: ${progress}%`;
        
        // 根据进度改变颜色
        if (progress >= 100) {
            progressFill.style.background = '#34a853';
        } else if (progress >= 50) {
            progressFill.style.background = '#fbbc04';
        } else {
            progressFill.style.background = '#4285f4';
        }
    }
}

// 绑定课程导航事件
function bindLessonNavigation() {
    // 第一课导航
    const nextSection1 = document.getElementById('nextSection1');
    const completeLesson1 = document.getElementById('completeLesson1');
    
    if (nextSection1) {
        nextSection1.addEventListener('click', function() {
            // 模拟进度更新
            updateLessonProgress('lesson1', 50);
            saveLearningProgress('lesson1', 50);
        });
    }
    
    if (completeLesson1) {
        completeLesson1.addEventListener('click', function() {
            updateLessonProgress('lesson1', 100);
            saveLearningProgress('lesson1', 100);
            alert('🎉 恭喜完成第一课！');
        });
    }
    
    // 第二课导航
    const nextSection2 = document.getElementById('nextSection2');
    const completeLesson2 = document.getElementById('completeLesson2');
    
    if (nextSection2) {
        nextSection2.addEventListener('click', function() {
            updateLessonProgress('lesson2', 50);
            saveLearningProgress('lesson2', 50);
        });
    }
    
    if (completeLesson2) {
        completeLesson2.addEventListener('click', function() {
            updateLessonProgress('lesson2', 100);
            saveLearningProgress('lesson2', 100);
            alert('🎉 恭喜完成第二课！');
        });
    }
}

// 保存学习进度到localStorage
function saveLearningProgress(lessonId, progress) {
    const learningProgress = JSON.parse(localStorage.getItem('learningProgress')) || {};
    learningProgress[lessonId] = progress;
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    
    // 同时更新主页面的学习统计
    if (window.updateLearningStats) {
        window.updateLearningStats();
    }
}

// 练习题功能
function checkAnswer(questionId, selectedAnswer) {
    const correctAnswers = {
        'q1': 'B',
        'q2': 'A',
        'q3': 'C'
    };
    
    const isCorrect = correctAnswers[questionId] === selectedAnswer;
    const resultElement = document.getElementById(questionId + '_result');
    
    if (resultElement) {
        if (isCorrect) {
            resultElement.innerHTML = '<span style="color: #34a853;">✅ 回答正确！</span>';
        } else {
            resultElement.innerHTML = '<span style="color: #ea4335;">❌ 回答错误，请再想想。</span>';
        }
    }
    
    return isCorrect;
}

// 测验功能
function submitQuiz() {
    const form = document.getElementById('quizForm');
    if (!form) return;
    
    const formData = new FormData(form);
    let score = 0;
    let total = 0;
    
    // 正确答案
    const correctAnswers = {
        'quiz1': 'B',
        'quiz2': 'A',
        'quiz3': 'C',
        'quiz4': 'B'
    };
    
    // 检查答案
    for (let [question, correctAnswer] of Object.entries(correctAnswers)) {
        total++;
        const userAnswer = formData.get(question);
        if (userAnswer === correctAnswer) {
            score++;
        }
    }
    
    // 显示结果
    const percentage = Math.round((score / total) * 100);
    const resultDiv = document.getElementById('quizResult');
    
    if (resultDiv) {
        let message = '';
        let color = '';
        
        if (percentage >= 80) {
            message = '🎉 优秀！你已经很好地掌握了理财基础知识！';
            color = '#34a853';
        } else if (percentage >= 60) {
            message = '👍 不错！继续加油，多复习一下课程内容。';
            color = '#fbbc04';
        } else {
            message = '💪 需要加强！建议重新学习课程内容。';
            color = '#ea4335';
        }
        
        resultDiv.innerHTML = `
            <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; text-align: center; margin-top: 20px;">
                <h4 style="color: ${color}; margin: 0 0 10px 0;">测验结果</h4>
                <p style="font-size: 18px; font-weight: bold; color: ${color}; margin: 0 0 10px 0;">
                    得分：${score}/${total} (${percentage}%)
                </p>
                <p style="color: #5f6368; margin: 0;">${message}</p>
            </div>
        `;
        
        // 保存测验成绩
        const quizScores = JSON.parse(localStorage.getItem('quizScores')) || {};
        quizScores.basic = percentage;
        localStorage.setItem('quizScores', JSON.stringify(quizScores));
    }
}

// 练习功能
function checkPracticeAnswer() {
    const selectedOptions = document.querySelectorAll('input[name="practice"]:checked');
    const resultDiv = document.getElementById('practice-result');
    
    if (selectedOptions.length === 0) {
        alert('请至少选择一个选项');
        return;
    }
    
    let totalCost = 0;
    let selectedItems = [];
    
    selectedOptions.forEach(option => {
        const price = parseInt(option.value);
        totalCost += price;
        selectedItems.push(option.getAttribute('data-name'));
    });
    
    const budget = 500;
    const remaining = budget - totalCost;
    
    let resultClass = '';
    let resultMessage = '';
    
    if (remaining >= 0) {
        if (remaining >= 100) {
            resultClass = 'success';
            resultMessage = `🎉 很好！你选择了：${selectedItems.join('、')}。总花费：¥${totalCost}，剩余预算：¥${remaining}。你做出了明智的选择，既满足了需求又控制了支出！`;
        } else {
            resultClass = 'warning';
            resultMessage = `⚠️ 不错！你选择了：${selectedItems.join('、')}。总花费：¥${totalCost}，剩余预算：¥${remaining}。预算控制得当，但剩余较少，要注意应急资金。`;
        }
    } else {
        resultClass = 'error';
        resultMessage = `❌ 超预算了！你选择了：${selectedItems.join('、')}。总花费：¥${totalCost}，超出预算：¥${Math.abs(remaining)}。建议重新考虑，优先选择必需品。`;
    }
    
    resultDiv.className = `result-area show ${resultClass}`;
    resultDiv.innerHTML = resultMessage;
}

// 预算分配练习
function updateAllocation() {
    const savingsSlider = document.getElementById('savings-slider');
    const needsSlider = document.getElementById('needs-slider');
    const wantsSlider = document.getElementById('wants-slider');
    
    const savingsValue = document.getElementById('savings-value');
    const needsValue = document.getElementById('needs-value');
    const wantsValue = document.getElementById('wants-value');
    
    const totalDisplay = document.getElementById('total-percentage');
    const statusDisplay = document.getElementById('allocation-status');
    
    const savings = parseInt(savingsSlider.value);
    const needs = parseInt(needsSlider.value);
    const wants = parseInt(wantsSlider.value);
    
    savingsValue.textContent = savings + '%';
    needsValue.textContent = needs + '%';
    wantsValue.textContent = wants + '%';
    
    const total = savings + needs + wants;
    totalDisplay.textContent = total + '%';
    
    if (total === 100) {
        statusDisplay.textContent = '✓ 完美分配';
        statusDisplay.className = 'status-good';
    } else if (total < 100) {
        statusDisplay.textContent = '⚠️ 还有 ' + (100 - total) + '% 未分配';
        statusDisplay.className = 'status-warning';
    } else {
        statusDisplay.textContent = '❌ 超出 ' + (total - 100) + '%';
        statusDisplay.className = 'status-error';
    }
}

function checkAllocation() {
    const savings = parseInt(document.getElementById('savings-slider').value);
    const needs = parseInt(document.getElementById('needs-slider').value);
    const wants = parseInt(document.getElementById('wants-slider').value);
    const total = savings + needs + wants;
    
    const resultDiv = document.getElementById('allocation-result');
    
    if (total !== 100) {
        resultDiv.className = 'result-area show error';
        resultDiv.innerHTML = '❌ 请确保总分配比例为100%！';
        return;
    }
    
    let feedback = '';
    let resultClass = 'success';
    
    if (savings >= 20 && needs >= 50 && wants <= 30) {
        feedback = '🎉 优秀的预算分配！你很好地平衡了储蓄、必需品和娱乐支出。';
    } else if (savings < 10) {
        feedback = '💡 建议增加储蓄比例至少到10-20%，为未来做准备。';
        resultClass = 'warning';
    } else if (needs < 40) {
        feedback = '⚠️ 必需品支出可能过低，确保基本生活需求得到满足。';
        resultClass = 'warning';
    } else if (wants > 40) {
        feedback = '💡 娱乐支出占比较高，可以适当减少以增加储蓄。';
        resultClass = 'warning';
    } else {
        feedback = '👍 不错的分配！继续保持理性的消费习惯。';
    }
    
    resultDiv.className = `result-area show ${resultClass}`;
    resultDiv.innerHTML = feedback;
}

// 新的测验功能
let currentQuestionIndex = 0;
let quizScore = 0;
let userAnswers = [];

const quizQuestions = [
    {
        question: "预算的主要目的是什么？",
        description: "选择最能概括预算核心作用的选项",
        options: [
            "限制所有消费活动",
            "记录每一笔支出",
            "合理规划和控制资金使用",
            "增加收入来源"
        ],
        correct: 2,
        explanation: "预算的核心目的是帮助我们合理规划和控制资金的使用，确保收支平衡并实现财务目标。"
    },
    {
        question: "制定预算时，以下哪个原则最重要？",
        description: "考虑预算制定的基本原则",
        options: [
            "收入必须大于支出",
            "娱乐支出应该最多",
            "不需要考虑储蓄",
            "预算越复杂越好"
        ],
        correct: 0,
        explanation: "收入大于支出是预算的基本原则，这样才能确保财务健康并有余钱储蓄。"
    },
    {
        question: "青少年制定预算时，储蓄比例建议是多少？",
        description: "根据青少年的实际情况选择合适的储蓄比例",
        options: [
            "5-10%",
            "20-30%",
            "50%以上",
            "不需要储蓄"
        ],
        correct: 1,
        explanation: "青少年建议将收入的20-30%用于储蓄，这样既能培养储蓄习惯，又不会过度限制当前的合理消费。"
    },
    {
        question: "预算执行过程中出现超支时，最好的做法是？",
        description: "选择处理预算超支的最佳策略",
        options: [
            "立即放弃预算计划",
            "分析原因并调整预算",
            "借钱维持原计划",
            "忽略超支继续执行"
        ],
        correct: 1,
        explanation: "出现超支时应该冷静分析原因，然后根据实际情况调整预算，这样才能让预算更加实用和可持续。"
    },
    {
        question: "以下哪种记账方法最适合初学者？",
        description: "考虑简单易行且有效的记账方式",
        options: [
            "复杂的电子表格",
            "专业财务软件",
            "手机记账APP",
            "只靠大脑记忆"
        ],
        correct: 2,
        explanation: "手机记账APP操作简单、随时可用，非常适合初学者养成记账习惯，而且通常有分类和统计功能。"
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    userAnswers = [];
    
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-content').style.display = 'block';
    
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    document.getElementById('question-number').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = quizQuestions.length;
    document.getElementById('current-score').textContent = quizScore;
    
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-desc').textContent = question.description;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="radio" name="current-question" value="${index}">
            ${option}
        `;
        optionsContainer.appendChild(label);
    });
    
    // 更新进度条
    const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
    document.querySelector('.quiz-progress .progress-fill').style.width = progress + '%';
    
    // 重置按钮状态
    document.getElementById('submit-answer').style.display = 'inline-block';
    document.getElementById('next-question').style.display = 'none';
    
    // 清除之前的反馈
    const feedback = document.getElementById('answer-feedback');
    if (feedback) {
        feedback.remove();
    }
}

function submitQuizAnswer() {
    const selectedOption = document.querySelector('input[name="current-question"]:checked');
    if (!selectedOption) {
        alert('请选择一个答案');
        return;
    }
    
    const userAnswer = parseInt(selectedOption.value);
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = userAnswer === question.correct;
    
    userAnswers.push({
        questionIndex: currentQuestionIndex,
        userAnswer: userAnswer,
        correct: isCorrect
    });
    
    if (isCorrect) {
        quizScore++;
    }
    
    // 显示答案反馈
    const feedbackDiv = document.createElement('div');
    feedbackDiv.id = 'answer-feedback';
    feedbackDiv.className = `answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
    feedbackDiv.innerHTML = `
        <strong>${isCorrect ? '✓ 正确！' : '✗ 错误'}</strong><br>
        ${question.explanation}
    `;
    
    document.getElementById('quiz-actions').appendChild(feedbackDiv);
    
    // 更新按钮状态
    document.getElementById('submit-answer').style.display = 'none';
    document.getElementById('next-question').style.display = 'inline-block';
    
    // 更新分数显示
    document.getElementById('current-score').textContent = quizScore;
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';
    
    const accuracy = Math.round((quizScore / quizQuestions.length) * 100);
    
    document.getElementById('final-score').textContent = quizScore;
    document.getElementById('total-questions-result').textContent = quizQuestions.length;
    document.getElementById('accuracy-percentage').textContent = accuracy;
    
    // 根据分数给出反馈
    const feedbackElement = document.getElementById('performance-feedback');
    let feedback = '';
    
    if (accuracy >= 80) {
        feedback = '🎉 优秀！你对预算规划有很好的理解，继续保持这种学习态度！';
        document.getElementById('result-icon').textContent = '🏆';
    } else if (accuracy >= 60) {
        feedback = '👍 不错！你已经掌握了基本概念，建议再复习一下相关内容。';
        document.getElementById('result-icon').textContent = '📚';
    } else {
        feedback = '💪 继续努力！建议重新学习课程内容，多做练习来加深理解。';
        document.getElementById('result-icon').textContent = '📖';
    }
    
    feedbackElement.textContent = feedback;
}

function showReview() {
    document.getElementById('quiz-review').style.display = 'block';
    
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers.find(a => a.questionIndex === index);
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        reviewItem.innerHTML = `
            <div class="review-question">问题 ${index + 1}: ${question.question}</div>
            <div class="review-answer ${userAnswer.correct ? 'correct' : 'incorrect'}">
                你的答案: ${question.options[userAnswer.userAnswer]} ${userAnswer.correct ? '✓' : '✗'}
            </div>
            ${!userAnswer.correct ? `<div class="review-answer correct">正确答案: ${question.options[question.correct]} ✓</div>` : ''}
            <div class="review-explanation">${question.explanation}</div>
        `;
        
        reviewContent.appendChild(reviewItem);
    });
}

function restartQuiz() {
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-review').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
    
    // 重置进度条
    document.querySelector('.quiz-progress .progress-fill').style.width = '0%';
}

// 导出函数供全局使用
// 成就系统数据
const achievements = [
    {
        id: 'first_lesson',
        title: '初学者',
        description: '完成第一课学习',
        icon: '📚',
        progress: 100,
        completed: true,
        exp: 100
    },
    {
        id: 'budget_master',
        title: '预算达人',
        description: '掌握预算规划技能',
        icon: '💰',
        progress: 75,
        completed: false,
        exp: 150
    },
    {
        id: 'quiz_champion',
        title: '测验冠军',
        description: '测验成绩达到90分以上',
        icon: '🏆',
        progress: 60,
        completed: false,
        exp: 200
    },
    {
        id: 'consistent_learner',
        title: '坚持学习',
        description: '连续学习7天',
        icon: '🔥',
        progress: 40,
        completed: false,
        exp: 250
    },
    {
        id: 'game_controller',
        title: '游戏理财师',
        description: '完成游戏消费课程',
        icon: '🎮',
        progress: 0,
        completed: false,
        exp: 180
    },
    {
        id: 'investment_rookie',
        title: '投资新手',
        description: '了解基本投资知识',
        icon: '📈',
        progress: 0,
        completed: false,
        exp: 300
    }
];

const badges = [
    { id: 'starter', name: '新手', icon: '🌱', earned: true },
    { id: 'learner', name: '学习者', icon: '📖', earned: true },
    { id: 'calculator', name: '计算器', icon: '🧮', earned: false },
    { id: 'saver', name: '储蓄家', icon: '🏦', earned: false },
    { id: 'investor', name: '投资者', icon: '💎', earned: false },
    { id: 'expert', name: '专家', icon: '🎓', earned: false }
];

// 用户等级系统
const userLevels = [
    { level: 1, title: '理财新手', minExp: 0, maxExp: 1000, description: '刚开始学习理财知识的小白' },
    { level: 2, title: '理财学徒', minExp: 1000, maxExp: 2500, description: '掌握了基础理财概念' },
    { level: 3, title: '理财达人', minExp: 2500, maxExp: 5000, description: '能够制定简单的理财计划' },
    { level: 4, title: '理财专家', minExp: 5000, maxExp: 10000, description: '具备全面的理财知识和技能' },
    { level: 5, title: '理财大师', minExp: 10000, maxExp: 999999, description: '理财知识炉火纯青，可以指导他人' }
];

// 初始化成就系统
function initializeAchievements() {
    if (document.getElementById('achievements')) {
        renderBadges();
        renderAchievements();
        updateUserLevel();
    }
}

// 渲染徽章
function renderBadges() {
    const badgesGrid = document.getElementById('badgesGrid');
    if (!badgesGrid) return;
    
    badgesGrid.innerHTML = badges.map(badge => `
        <div class="badge-item ${badge.earned ? 'earned' : 'locked'}">
            <span class="badge-icon">${badge.icon}</span>
            <p class="badge-name">${badge.name}</p>
        </div>
    `).join('');
}

// 渲染成就列表
function renderAchievements() {
    const achievementsList = document.getElementById('achievementsList');
    if (!achievementsList) return;
    
    achievementsList.innerHTML = achievements.map(achievement => `
        <div class="achievement-item ${achievement.completed ? 'completed' : ''}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4 class="achievement-title">${achievement.title}</h4>
                <p class="achievement-description">${achievement.description}</p>
            </div>
            <div class="achievement-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${achievement.progress}%"></div>
                </div>
                <span class="progress-text">${achievement.progress}%</span>
            </div>
        </div>
    `).join('');
}

// 更新用户等级
function updateUserLevel() {
    const data = learningDataManager.getData();
    const currentExp = data.totalExp;
    const currentLevel = userLevels.find(level => currentExp >= level.minExp && currentExp < level.maxExp);
    
    if (currentLevel) {
        const levelElement = document.getElementById('userLevel');
        const titleElement = document.getElementById('levelTitle');
        const descElement = document.getElementById('levelDescription');
        const currentExpElement = document.getElementById('currentExp');
        const nextLevelExpElement = document.getElementById('nextLevelExp');
        const progressBarElement = document.getElementById('levelProgressBar');
        
        if (levelElement) levelElement.textContent = currentLevel.level;
        if (titleElement) titleElement.textContent = currentLevel.title;
        if (descElement) descElement.textContent = currentLevel.description;
        if (currentExpElement) currentExpElement.textContent = currentExp;
        if (nextLevelExpElement) nextLevelExpElement.textContent = currentLevel.maxExp;
        
        if (progressBarElement) {
            const progressPercent = ((currentExp - currentLevel.minExp) / (currentLevel.maxExp - currentLevel.minExp)) * 100;
            progressBarElement.style.width = `${progressPercent}%`;
        }
    }
}

// 初始化学习统计
function initializeStats() {
    if (document.getElementById('stats')) {
        initializeCharts();
        updateStatsData();
    }
}

// 更新课程统计表格
function updateCourseStatsTable(lessonProgress) {
    const tableBody = document.querySelector('.stats-table .table-body');
    if (!tableBody) return;
    
    const lessons = [
        { id: 'lesson1', name: '认识金钱' },
        { id: 'lesson2', name: '预算规划' },
        { id: 'lesson3', name: '游戏消费' },
        { id: 'lesson4', name: '理性消费' }
    ];
    
    tableBody.innerHTML = lessons.map(lesson => {
         const progress = lessonProgress[lesson.id] || { completed: false, score: 0, timeSpent: 0 };
         const status = progress.completed ? '已完成' : '未完成';
         const statusClass = progress.completed ? 'completed' : 'pending';
         
         return `
             <div class="table-row">
                 <div class="table-cell">${lesson.name}</div>
                 <div class="table-cell">
                     <span class="status ${statusClass}">${status}</span>
                 </div>
                 <div class="table-cell">${progress.score}分</div>
                 <div class="table-cell">${progress.timeSpent}分钟</div>
             </div>
         `;
     }).join('');
}

// 初始化图表
function initializeCharts() {
    const data = learningDataManager.getData();
    
    // 学习进度图表
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        const dailyStats = data.dailyStats || [];
        const labels = dailyStats.map(stat => {
            const date = new Date(stat.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        });
        const progressData = dailyStats.map(stat => stat.progress);
        
        new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '学习进度',
                    data: progressData,
                    borderColor: '#4285f4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 测验成绩图表
    const quizCtx = document.getElementById('quizScoreChart');
    if (quizCtx) {
        const lessons = ['第1课', '第2课', '第3课', '第4课'];
        const scores = [
            data.lessonProgress.lesson1?.score || 0,
            data.lessonProgress.lesson2?.score || 0,
            data.lessonProgress.lesson3?.score || 0,
            data.lessonProgress.lesson4?.score || 0
        ];
        
        new Chart(quizCtx, {
            type: 'bar',
            data: {
                labels: lessons,
                datasets: [{
                    label: '测验成绩',
                    data: scores,
                    backgroundColor: scores.map(score => {
                        if (score >= 90) return '#34a853';
                        if (score >= 60) return '#fbbc04';
                        if (score > 0) return '#ea4335';
                        return '#e8eaed';
                    }),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '分';
                            }
                        }
                    }
                }
            }
        });
    }
}

// 学习数据管理
class LearningDataManager {
    constructor() {
        this.storageKey = 'learningData';
        this.sessionStartTime = null;
        this.currentSessionTime = 0;
        this.initializeData();
    }
    
    initializeData() {
        const defaultData = {
            totalStudyTime: 0, // 总学习时间（小时）
            completedLessons: 0,
            correctAnswers: 0,
            totalQuizzes: 0,
            currentLevel: 1,
            totalExp: 250,
            lessonProgress: {
                lesson1: { completed: true, score: 90, timeSpent: 45 },
                lesson2: { completed: true, score: 85, timeSpent: 38 },
                lesson3: { completed: false, score: 0, timeSpent: 0 },
                lesson4: { completed: false, score: 0, timeSpent: 0 }
            },
            dailyStats: this.generateDailyStats(),
            achievements: [],
            badges: ['starter', 'learner'],
            lastLoginDate: new Date().toDateString()
        };
        
        const savedData = localStorage.getItem(this.storageKey);
        this.data = savedData ? { ...defaultData, ...JSON.parse(savedData) } : defaultData;
        
        // 检查是否是新的一天
        if (this.data.lastLoginDate !== new Date().toDateString()) {
            this.updateDailyStats();
            this.data.lastLoginDate = new Date().toDateString();
            this.saveData();
        }
    }
    
    generateDailyStats() {
        const stats = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            stats.push({
                date: date.toDateString(),
                studyTime: Math.random() * 2, // 随机生成学习时间
                progress: Math.min(100, (7 - i) * 15) // 递增的进度
            });
        }
        
        return stats;
    }
    
    updateDailyStats() {
        // 添加新的一天数据
        const today = new Date().toDateString();
        const existingIndex = this.data.dailyStats.findIndex(stat => stat.date === today);
        
        if (existingIndex === -1) {
            this.data.dailyStats.push({
                date: today,
                studyTime: 0,
                progress: this.calculateTotalProgress()
            });
            
            // 保持最近7天的数据
            if (this.data.dailyStats.length > 7) {
                this.data.dailyStats = this.data.dailyStats.slice(-7);
            }
        }
    }
    
    calculateTotalProgress() {
        const lessons = Object.values(this.data.lessonProgress);
        const completedLessons = lessons.filter(lesson => lesson.completed).length;
        return (completedLessons / lessons.length) * 100;
    }
    
    startSession() {
        this.sessionStartTime = Date.now();
    }
    
    endSession() {
        if (this.sessionStartTime) {
            const sessionTime = (Date.now() - this.sessionStartTime) / (1000 * 60 * 60); // 转换为小时
            this.data.totalStudyTime += sessionTime;
            
            // 更新今日学习时间
            const today = new Date().toDateString();
            const todayStats = this.data.dailyStats.find(stat => stat.date === today);
            if (todayStats) {
                todayStats.studyTime += sessionTime;
            }
            
            this.sessionStartTime = null;
            this.saveData();
        }
    }
    
    updateLessonProgress(lessonId, score, timeSpent) {
        if (!this.data.lessonProgress[lessonId]) {
            this.data.lessonProgress[lessonId] = { completed: false, score: 0, timeSpent: 0 };
        }
        
        const lesson = this.data.lessonProgress[lessonId];
        const wasCompleted = lesson.completed;
        
        lesson.score = Math.max(lesson.score, score);
        lesson.timeSpent += timeSpent;
        lesson.completed = score >= 60; // 60分及格
        
        // 如果是新完成的课程
        if (!wasCompleted && lesson.completed) {
            this.data.completedLessons++;
            this.addExperience(100);
        }
        
        this.saveData();
    }
    
    updateQuizStats(score, totalQuestions, correctAnswers) {
        this.data.totalQuizzes++;
        this.data.correctAnswers += correctAnswers;
        
        // 根据成绩给予经验值
        const expGained = Math.floor(score / 10) * 10;
        this.addExperience(expGained);
        
        this.saveData();
    }
    
    addExperience(exp) {
        this.data.totalExp += exp;
        
        // 检查是否升级
        const newLevel = this.calculateLevel(this.data.totalExp);
        if (newLevel > this.data.currentLevel) {
            this.data.currentLevel = newLevel;
            // 触发升级通知
            this.showLevelUpNotification(newLevel);
        }
    }
    
    calculateLevel(exp) {
        const levels = [0, 1000, 2500, 5000, 10000];
        for (let i = levels.length - 1; i >= 0; i--) {
            if (exp >= levels[i]) {
                return i + 1;
            }
        }
        return 1;
    }
    
    showLevelUpNotification(level) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification level-up';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎉</div>
                <div class="notification-text">
                    <h4>恭喜升级！</h4>
                    <p>您已达到等级 ${level}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 4000);
    }
    
    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }
    
    getData() {
        return this.data;
    }
}

// 创建全局数据管理器实例
const learningDataManager = new LearningDataManager();

// 更新统计数据
function updateStatsData() {
    const data = learningDataManager.getData();
    
    // 更新概览卡片
    const elements = {
        totalStudyTime: data.totalStudyTime.toFixed(1),
        completedLessons: data.completedLessons,
        correctAnswers: data.totalQuizzes > 0 ? Math.round((data.correctAnswers / (data.totalQuizzes * 5)) * 100) : 0, // 假设每个测验5题
        totalQuizzes: data.totalQuizzes
    };
    
    Object.keys(elements).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = elements[key];
        }
    });
    
    // 更新课程统计表格
    updateCourseStatsTable(data.lessonProgress);
}

// 检查并解锁成就
function checkAchievements(action, data) {
    let newAchievements = [];
    
    switch(action) {
        case 'lesson_completed':
            if (data.lessonId === 'lesson1') {
                newAchievements.push(unlockAchievement('first_lesson'));
            }
            break;
        case 'quiz_completed':
            if (data.score >= 90) {
                newAchievements.push(unlockAchievement('quiz_champion'));
            }
            break;
        case 'budget_created':
            newAchievements.push(unlockAchievement('budget_master'));
            break;
    }
    
    // 显示新获得的成就
    newAchievements.filter(Boolean).forEach(achievement => {
        showAchievementNotification(achievement);
    });
}

// 解锁成就
function unlockAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.completed) {
        achievement.completed = true;
        achievement.progress = 100;
        
        // 更新经验值
        addExperience(achievement.exp);
        
        return achievement;
    }
    return null;
}

// 显示成就通知
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${achievement.icon}</div>
            <div class="notification-text">
                <h4>成就解锁！</h4>
                <p>${achievement.title}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 添加动画样式
    setTimeout(() => notification.classList.add('show'), 100);
    
    // 3秒后移除
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// 添加经验值
function addExperience(exp) {
    // 这里应该更新用户的总经验值
    console.log(`获得 ${exp} 经验值！`);
}

// 更新现有的showTabContent函数
function showTabContent(targetId) {
    // 隐藏所有内容
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // 显示目标内容
    const targetContent = document.getElementById(targetId);
    if (targetContent) {
        targetContent.classList.add('active');
        
        // 如果是课程页面，初始化相应功能
        if (targetId.startsWith('lesson')) {
            initializeLessonFeatures(targetId);
        } else if (targetId === 'achievements') {
            initializeAchievements();
        } else if (targetId === 'stats') {
            initializeStats();
        }
    }
}

window.calculateBudget = calculateBudget;
window.checkAnswer = checkAnswer;
window.submitQuiz = submitQuiz;
window.checkPracticeAnswer = checkPracticeAnswer;
window.updateAllocation = updateAllocation;
window.checkAllocation = checkAllocation;
window.startQuiz = startQuiz;
window.submitQuizAnswer = submitQuizAnswer;
window.nextQuestion = nextQuestion;
window.showReview = showReview;
window.restartQuiz = restartQuiz;
// 页面初始化
function initializePage() {
    // 启动学习会话
    learningDataManager.startSession();
    
    // 页面卸载时结束会话
    window.addEventListener('beforeunload', () => {
        learningDataManager.endSession();
    });
    
    // 定期保存会话数据（每分钟）
    setInterval(() => {
        const data = learningDataManager.getData();
        learningDataManager.saveData();
    }, 60000);
}

// 增强现有的测验提交功能
function enhancedSubmitQuiz() {
    const originalSubmit = window.submitQuiz;
    if (originalSubmit) {
        window.submitQuiz = function() {
            const result = originalSubmit.apply(this, arguments);
            
            // 假设测验结果可以从DOM获取
            const scoreElement = document.querySelector('.quiz-score');
            if (scoreElement) {
                const score = parseInt(scoreElement.textContent) || 0;
                const correctAnswers = Math.floor(score / 20); // 假设每题20分
                learningDataManager.updateQuizStats(score, 5, correctAnswers);
                
                // 检查成就
                checkAchievements('quiz_completed', { score });
            }
            
            return result;
        };
    }
}

// 增强课程完成功能
function markLessonCompleted(lessonId, score = 100) {
    const timeSpent = Math.floor(Math.random() * 30) + 15; // 15-45分钟
    learningDataManager.updateLessonProgress(lessonId, score, timeSpent);
    
    // 检查成就
    checkAchievements('lesson_completed', { lessonId, score });
    
    // 更新显示
    if (document.getElementById('stats')) {
        updateStatsData();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    enhancedSubmitQuiz();
    
    // 延迟初始化拖拽练习，确保页面元素已加载
    setTimeout(() => {
        initializeDragDropExercise();
        initializeBudgetExercise();
    }, 100);
});

window.calculateBudget = calculateBudget;
window.checkAnswer = checkAnswer;
window.submitQuiz = submitQuiz;
window.checkPracticeAnswer = checkPracticeAnswer;
window.updateAllocation = updateAllocation;
window.checkAllocation = checkAllocation;
window.startQuiz = startQuiz;
window.submitQuizAnswer = submitQuizAnswer;
window.nextQuestion = nextQuestion;
window.showReview = showReview;
window.restartQuiz = restartQuiz;

// 拖拽练习功能
let draggedElement = null;

// 允许拖放
function allowDrop(ev) {
    ev.preventDefault();
    const dropArea = ev.currentTarget;
    dropArea.classList.add('drag-over');
}

// 开始拖拽
function dragStart(ev) {
    draggedElement = ev.target;
    ev.target.classList.add('dragging');
    playSound('pickup');
}

// 拖拽结束
function dragEnd(ev) {
    ev.target.classList.remove('dragging');
    // 移除所有拖拽悬停效果
    document.querySelectorAll('.drop-area').forEach(area => {
        area.classList.remove('drag-over');
    });
}

// 拖拽离开
function dragLeave(ev) {
    ev.currentTarget.classList.remove('drag-over');
}

// 放置元素
function drop(ev) {
    ev.preventDefault();
    const dropArea = ev.currentTarget;
    dropArea.classList.remove('drag-over');
    
    if (draggedElement) {
        // 检查是否已经在放置区域中
        if (!dropArea.contains(draggedElement)) {
            dropArea.appendChild(draggedElement);
            playSound('drop');
        }
        draggedElement = null;
    }
}

// 检查拖拽练习答案
function checkDragDropAnswer() {
    const needZone = document.querySelector('.drop-zone[data-category="need"] .drop-area');
    const wantZone = document.querySelector('.drop-zone[data-category="want"] .drop-area');
    const feedback = document.querySelector('.exercise-feedback');
    
    if (!needZone || !wantZone || !feedback) return;
    
    let correct = 0;
    let total = 0;
    let errors = [];
    
    // 检查需要区域
    const needItems = needZone.querySelectorAll('.draggable-item');
    needItems.forEach(item => {
        total++;
        if (item.dataset.category === 'need') {
            correct++;
            item.classList.add('success-animation');
        } else {
            errors.push(item.querySelector('.item-name').textContent + ' 应该放在"想要"区域');
            item.classList.add('error-animation');
        }
    });
    
    // 检查想要区域
    const wantItems = wantZone.querySelectorAll('.draggable-item');
    wantItems.forEach(item => {
        total++;
        if (item.dataset.category === 'want') {
            correct++;
            item.classList.add('success-animation');
        } else {
            errors.push(item.querySelector('.item-name').textContent + ' 应该放在"需要"区域');
            item.classList.add('error-animation');
        }
    });
    
    // 显示反馈
    if (correct === total && total === 6) {
        feedback.className = 'exercise-feedback success';
        feedback.innerHTML = '🎉 太棒了！你完全正确地区分了需要和想要！<br>💡 记住：需要是生活必需品，想要是可有可无的物品。';
        playSound('success');
        
        // 添加经验值和检查成就
        if (window.learningDataManager) {
            window.learningDataManager.addExperience(20);
            checkAchievements('exercise_completed');
        }
    } else if (correct > total / 2) {
        feedback.className = 'exercise-feedback partial';
        feedback.innerHTML = `👍 不错！你答对了 ${correct}/${total} 个。<br>❌ 需要调整：${errors.join('、')}`;
        playSound('partial');
    } else {
        feedback.className = 'exercise-feedback error';
        feedback.innerHTML = `😅 再试试吧！你答对了 ${correct}/${total} 个。<br>💭 提示：想想哪些是生活中必须要有的，哪些是可有可无的。`;
        playSound('error');
    }
    
    // 清除动画类
    setTimeout(() => {
        document.querySelectorAll('.draggable-item').forEach(item => {
            item.classList.remove('success-animation', 'error-animation');
        });
    }, 600);
}

// 重置拖拽练习
function resetDragDropExercise() {
    const draggableItems = document.querySelector('.draggable-items');
    const allItems = document.querySelectorAll('.draggable-item');
    const feedback = document.querySelector('.exercise-feedback');
    
    // 将所有物品移回原始区域
    allItems.forEach(item => {
        draggableItems.appendChild(item);
        item.classList.remove('success-animation', 'error-animation');
    });
    
    // 清除反馈
    if (feedback) {
        feedback.className = 'exercise-feedback';
        feedback.innerHTML = '';
    }
    
    playSound('reset');
}

// 音效播放函数
function playSound(type) {
    // 创建音频上下文（如果支持）
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        const audioContext = new (AudioContext || webkitAudioContext)();
        
        // 不同类型的音效频率
        const frequencies = {
            pickup: 440,    // A4
            drop: 523.25,   // C5
            success: 659.25, // E5
            error: 220,     // A3
            partial: 493.88, // B4
            reset: 349.23   // F4
        };
        
        const frequency = frequencies[type] || 440;
        
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        // 设置音量包络
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

// 初始化拖拽事件监听器
function initializeDragDropExercise() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });
    
    const dropAreas = document.querySelectorAll('.drop-area');
    dropAreas.forEach(area => {
        area.addEventListener('dragover', allowDrop);
        area.addEventListener('drop', drop);
        area.addEventListener('dragleave', dragLeave);
    });
}

// 导出函数到全局作用域
window.checkAchievements = checkAchievements;
window.initializeAchievements = initializeAchievements;
window.initializeStats = initializeStats;
window.markLessonCompleted = markLessonCompleted;
window.allowDrop = allowDrop;
window.drop = drop;
window.checkDragDropAnswer = checkDragDropAnswer;
window.resetDragDropExercise = resetDragDropExercise;
window.initializeDragDropExercise = initializeDragDropExercise;
window.learningDataManager = learningDataManager;

// 预算分配练习功能
let budgetDraggedElement = null;

function budgetAllowDrop(ev) {
    ev.preventDefault();
    ev.target.classList.add('drag-over');
}

function budgetDragStart(ev) {
    budgetDraggedElement = ev.target;
    ev.target.classList.add('dragging');
    playSound('pickup');
}

function budgetDragEnd(ev) {
    ev.target.classList.remove('dragging');
    // 清除所有拖拽状态
    document.querySelectorAll('.budget-category').forEach(zone => {
        zone.classList.remove('drag-over');
    });
}

function budgetDragLeave(ev) {
    ev.target.classList.remove('drag-over');
}

function budgetDrop(ev) {
    ev.preventDefault();
    ev.target.classList.remove('drag-over');
    
    if (budgetDraggedElement && ev.target.classList.contains('budget-category')) {
        ev.target.appendChild(budgetDraggedElement);
        playSound('drop');
        budgetDraggedElement = null;
    }
}

function checkBudgetAnswer() {
    const savingsZone = document.getElementById('savings-zone');
    const needsZone = document.getElementById('needs-zone');
    const wantsZone = document.getElementById('wants-zone');
    const feedback = document.getElementById('budget-feedback');
    
    if (!savingsZone || !needsZone || !wantsZone || !feedback) {
        console.error('预算分配练习元素未找到');
        return;
    }
    
    // 正确答案配置
    const correctAnswers = {
        savings: ['savings-item'],
        needs: ['study-supplies', 'transportation', 'meals'],
        wants: ['game-topup', 'snacks', 'entertainment']
    };
    
    let correct = 0;
    let total = 0;
    let feedback_messages = [];
    
    // 检查储蓄区域
    const savingsItems = Array.from(savingsZone.querySelectorAll('.budget-item'));
    savingsItems.forEach(item => {
        total++;
        const itemId = item.getAttribute('data-category');
        if (correctAnswers.savings.includes(itemId)) {
            correct++;
            item.classList.add('correct');
        } else {
            item.classList.add('incorrect');
            feedback_messages.push(`${item.textContent} 不应该放在储蓄类别中`);
        }
    });
    
    // 检查需求区域
    const needsItems = Array.from(needsZone.querySelectorAll('.budget-item'));
    needsItems.forEach(item => {
        total++;
        const itemId = item.getAttribute('data-category');
        if (correctAnswers.needs.includes(itemId)) {
            correct++;
            item.classList.add('correct');
        } else {
            item.classList.add('incorrect');
            feedback_messages.push(`${item.textContent} 不应该放在需求类别中`);
        }
    });
    
    // 检查想要区域
    const wantsItems = Array.from(wantsZone.querySelectorAll('.budget-item'));
    wantsItems.forEach(item => {
        total++;
        const itemId = item.getAttribute('data-category');
        if (correctAnswers.wants.includes(itemId)) {
            correct++;
            item.classList.add('correct');
        } else {
            item.classList.add('incorrect');
            feedback_messages.push(`${item.textContent} 不应该放在想要类别中`);
        }
    });
    
    // 显示结果
    const score = Math.round((correct / total) * 100);
    let message = '';
    
    if (score === 100) {
        message = `🎉 完美！你正确分配了所有预算项目！`;
        feedback.className = 'budget-feedback success';
        playSound('success');
        // 添加经验值
        addExperience(20);
        checkAchievements('budget_exercise', { score: 100 });
    } else if (score >= 70) {
        message = `👍 不错！你答对了 ${correct}/${total} 个项目。`;
        if (feedback_messages.length > 0) {
            message += `\n\n需要调整：\n${feedback_messages.join('\n')}`;
        }
        feedback.className = 'budget-feedback partial';
        playSound('partial');
        addExperience(10);
    } else {
        message = `💪 继续努力！你答对了 ${correct}/${total} 个项目。`;
        if (feedback_messages.length > 0) {
            message += `\n\n需要调整：\n${feedback_messages.join('\n')}`;
        }
        feedback.className = 'budget-feedback error';
        playSound('error');
    }
    
    feedback.textContent = message;
    feedback.style.display = 'block';
    
    // 添加动画效果
    if (score === 100) {
        document.querySelector('.budget-exercise').classList.add('bounce');
        setTimeout(() => {
            document.querySelector('.budget-exercise').classList.remove('bounce');
        }, 600);
    } else {
        document.querySelector('.budget-exercise').classList.add('shake');
        setTimeout(() => {
            document.querySelector('.budget-exercise').classList.remove('shake');
        }, 600);
    }
}

function resetBudgetExercise() {
    const itemsContainer = document.getElementById('budget-items');
    const feedback = document.getElementById('budget-feedback');
    
    if (!itemsContainer || !feedback) {
        console.error('预算分配练习元素未找到');
        return;
    }
    
    // 重置所有项目到原始位置
    const allItems = document.querySelectorAll('.budget-item');
    allItems.forEach(item => {
        item.classList.remove('correct', 'incorrect');
        itemsContainer.appendChild(item);
    });
    
    // 清除反馈
    feedback.style.display = 'none';
    feedback.textContent = '';
    
    // 清除拖拽状态
    document.querySelectorAll('.budget-category').forEach(zone => {
        zone.classList.remove('drag-over');
    });
    
    playSound('reset');
}

function initializeBudgetExercise() {
    const budgetItems = document.querySelectorAll('.budget-item');
    const budgetZones = document.querySelectorAll('.budget-category');
    
    // 为预算项目添加拖拽事件
    budgetItems.forEach(item => {
        item.addEventListener('dragstart', budgetDragStart);
        item.addEventListener('dragend', budgetDragEnd);
    });
    
    // 为预算分类区域添加拖放事件
    budgetZones.forEach(zone => {
        zone.addEventListener('dragover', budgetAllowDrop);
        zone.addEventListener('drop', budgetDrop);
        zone.addEventListener('dragleave', budgetDragLeave);
    });
    
    console.log('预算分配练习初始化完成');
}

// 导出预算练习函数到全局作用域
window.budgetAllowDrop = budgetAllowDrop;
window.budgetDrop = budgetDrop;
window.checkBudgetAnswer = checkBudgetAnswer;
window.resetBudgetExercise = resetBudgetExercise;
window.initializeBudgetExercise = initializeBudgetExercise;