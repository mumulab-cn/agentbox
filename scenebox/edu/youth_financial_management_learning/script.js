// 全局变量
let spendingData = JSON.parse(localStorage.getItem('spendingData')) || [];
let budgetSettings = JSON.parse(localStorage.getItem('budgetSettings')) || {
    monthly: 0,
    singleLimit: 0,
    dailyLimit: 0
};

// 图表实例
let spendingChart = null;
let analysisChart = null;

// 页面加载完成后初始化
$(document).ready(function() {
    initializeApp();
    bindEvents();
    updateDashboard();
    generateSuggestions();
    
    // 学习中心按钮点击事件
    $('#learnBtn').click(function() {
        window.location.href = 'learn.html';
    });
    
    // 导出数据按钮点击事件
    $('#exportBtn').click(function() {
        exportData();
    });
    
    // 清除数据按钮点击事件
    $('#clearDataBtn').click(function() {
        clearAllData();
    });
});

// 初始化应用
function initializeApp() {
    // 如果没有数据，添加一些示例数据
    if (spendingData.length === 0) {
        addSampleData();
    }
    
    // 设置当前日期为默认值
    $('#date').val(new Date().toISOString().split('T')[0]);
    
    // 初始化图表
    initializeCharts();
    
    // 更新预算设置显示
    updateBudgetDisplay();
    
    // 更新记录列表
    updateRecordsList();
    
    // 更新分析页面
    updateAnalysis();
}

// 添加示例数据
function addSampleData() {
    const sampleData = [
        { id: 1, game: '王者荣耀', amount: 68, date: '2024-01-15', note: '购买皮肤' },
        { id: 2, game: '原神', amount: 98, date: '2024-01-18', note: '月卡充值' },
        { id: 3, game: '和平精英', amount: 30, date: '2024-01-20', note: '战令通行证' },
        { id: 4, game: '王者荣耀', amount: 128, date: '2024-01-25', note: '限定皮肤' },
        { id: 5, game: '原神', amount: 648, date: '2024-01-28', note: '创世结晶' }
    ];
    
    spendingData = sampleData;
    localStorage.setItem('spendingData', JSON.stringify(spendingData));
    
    // 设置默认预算
    budgetSettings = {
        monthly: 500,
        singleLimit: 200,
        dailyLimit: 100
    };
    localStorage.setItem('budgetSettings', JSON.stringify(budgetSettings));
}

// 绑定事件
function bindEvents() {
    // 菜单项切换
    $('.menu-item').click(function() {
        const tabId = $(this).data('tab');
        switchTab(tabId);
    });
    
    // 添加记录按钮
    $('#addRecordBtn').click(function() {
        $('#recordModal').show();
    });
    
    // 关闭模态框
    $('.close').click(function() {
        $('#recordModal').hide();
    });
    
    // 点击模态框外部关闭
    $(window).click(function(event) {
        if (event.target.id === 'recordModal') {
            $('#recordModal').hide();
        }
    });
    
    // 提交记录表单
    $('#recordForm').submit(function(e) {
        e.preventDefault();
        addRecord();
    });
    
    // 保存预算设置
    $('#saveBudgetBtn').click(function() {
        saveBudgetSettings();
    });
    
    // 重置预算设置按钮
    $('#resetBudgetBtn').click(function() {
        resetBudgetSettings();
    });
    
    // 过滤器变化
    $('#gameFilter, #monthFilter').change(function() {
        updateRecordsList();
    });
}

// 切换标签
function switchTab(tabId) {
    $('.menu-item').removeClass('active');
    $('.tab-content').removeClass('active');
    
    $(`.menu-item[data-tab="${tabId}"]`).addClass('active');
    $(`#${tabId}`).addClass('active');
    
    // 根据标签更新内容
    switch(tabId) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'records':
            updateRecordsList();
            break;
        case 'budget':
            updateBudgetDisplay();
            break;
        case 'analysis':
            updateAnalysis();
            break;
        case 'suggestions':
            generateSuggestions();
            break;
    }
}

// 添加记录
function addRecord() {
    const gameName = $('#gameName').val();
    const amount = parseFloat($('#amount').val());
    const date = $('#date').val();
    const note = $('#note').val();
    
    // 验证输入
    if (!gameName || !amount || !date) {
        showMessage('请填写所有必填字段', 'error');
        return;
    }
    
    // 检查单次充值限制
    if (budgetSettings.singleLimit > 0 && amount > budgetSettings.singleLimit) {
        if (!confirm(`充值金额超过单次限制(¥${budgetSettings.singleLimit})，是否继续？`)) {
            return;
        }
    }
    
    // 检查每日充值限制
    const todaySpent = getTodaySpending(date);
    if (budgetSettings.dailyLimit > 0 && (todaySpent + amount) > budgetSettings.dailyLimit) {
        if (!confirm(`今日充值将超过每日限制(¥${budgetSettings.dailyLimit})，是否继续？`)) {
            return;
        }
    }
    
    // 添加记录
    const newRecord = {
        id: Date.now(),
        game: gameName,
        amount: amount,
        date: date,
        note: note
    };
    
    spendingData.push(newRecord);
    localStorage.setItem('spendingData', JSON.stringify(spendingData));
    
    // 重置表单
    $('#recordForm')[0].reset();
    $('#date').val(new Date().toISOString().split('T')[0]);
    $('#recordModal').hide();
    
    // 更新显示
    updateDashboard();
    updateRecordsList();
    updateAnalysis();
    generateSuggestions();
    
    showMessage('记录添加成功！', 'success');
}

// 获取今日消费
function getTodaySpending(targetDate = null) {
    const today = targetDate || new Date().toISOString().split('T')[0];
    return spendingData
        .filter(record => record.date === today)
        .reduce((sum, record) => sum + record.amount, 0);
}

// 获取本月消费
function getMonthlySpending() {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return spendingData
        .filter(record => record.date.startsWith(currentMonth))
        .reduce((sum, record) => sum + record.amount, 0);
}

// 更新仪表板
function updateDashboard() {
    const monthlySpent = getMonthlySpending();
    const todaySpent = getTodaySpending();
    
    $('#monthlySpent').text(`¥${monthlySpent.toFixed(2)}`);
    $('#todaySpent').text(`¥${todaySpent.toFixed(2)}`);
    $('#monthlyBudget').text(`¥${budgetSettings.monthly}`);
    
    // 更新进度条
    const progressPercentage = budgetSettings.monthly > 0 ? 
        Math.min((monthlySpent / budgetSettings.monthly) * 100, 100) : 0;
    $('#monthlyProgress').css('width', `${progressPercentage}%`);
    
    // 更新消费趋势
    updateSpendingTrend();
    
    // 检查警告
    checkAlerts(monthlySpent, todaySpent);
    
    // 更新图表
    updateSpendingChart();
}

// 更新消费趋势
function updateSpendingTrend() {
    const last7Days = getLast7DaysSpending();
    const avg = last7Days.reduce((sum, day) => sum + day.amount, 0) / 7;
    const todaySpent = getTodaySpending();
    
    let trend = '📊 正常';
    if (todaySpent > avg * 1.5) {
        trend = '📈 偏高';
    } else if (todaySpent < avg * 0.5) {
        trend = '📉 偏低';
    }
    
    $('#spendingTrend').text(trend);
}

// 获取最近7天消费数据
function getLast7DaysSpending() {
    const result = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const amount = getTodaySpending(dateStr);
        result.push({ date: dateStr, amount: amount });
    }
    return result;
}

// 检查警告
function checkAlerts(monthlySpent, todaySpent) {
    const alerts = [];
    
    // 月度预算警告
    if (budgetSettings.monthly > 0) {
        const percentage = (monthlySpent / budgetSettings.monthly) * 100;
        if (percentage >= 90) {
            alerts.push('月度预算即将用完！');
        } else if (percentage >= 75) {
            alerts.push('月度预算已使用75%，请注意控制消费。');
        }
    }
    
    // 每日限制警告
    if (budgetSettings.dailyLimit > 0 && todaySpent >= budgetSettings.dailyLimit * 0.8) {
        alerts.push('今日消费接近每日限制，建议暂停充值。');
    }
    
    // 显示警告
    if (alerts.length > 0) {
        $('#alertMessage').html(alerts.join('<br>'));
        $('#alertCard').show();
    } else {
        $('#alertCard').hide();
    }
}

// 初始化图表
function initializeCharts() {
    // 消费趋势图表
    const ctx1 = document.getElementById('spendingChart').getContext('2d');
    spendingChart = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '每日消费',
                data: [],
                borderColor: 'rgb(102, 126, 234)',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '最近7天消费趋势'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '¥' + value;
                        }
                    }
                }
            }
        }
    });
    
    // 分析图表
    const ctx2 = document.getElementById('analysisChart').getContext('2d');
    analysisChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '游戏消费分布'
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// 更新消费图表
function updateSpendingChart() {
    const last7Days = getLast7DaysSpending();
    
    spendingChart.data.labels = last7Days.map(day => {
        const date = new Date(day.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    spendingChart.data.datasets[0].data = last7Days.map(day => day.amount);
    spendingChart.update();
}

// 更新记录列表
function updateRecordsList() {
    let filteredData = [...spendingData];
    
    // 应用过滤器
    const gameFilter = $('#gameFilter').val();
    const monthFilter = $('#monthFilter').val();
    
    if (gameFilter) {
        filteredData = filteredData.filter(record => record.game === gameFilter);
    }
    
    if (monthFilter) {
        filteredData = filteredData.filter(record => record.date.startsWith(monthFilter));
    }
    
    // 按日期排序（最新的在前）
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 更新过滤器选项
    updateFilterOptions();
    
    // 渲染记录列表
    const recordsHtml = filteredData.map(record => `
        <div class="record-item">
            <div class="record-info">
                <h4>${record.game}</h4>
                <p>${record.date} ${record.note ? '- ' + record.note : ''}</p>
            </div>
            <div class="record-amount">¥${record.amount.toFixed(2)}</div>
        </div>
    `).join('');
    
    if (recordsHtml) {
        $('#recordsList').html(recordsHtml);
    } else {
        $('#recordsList').html(`
            <div class="empty-state">
                <h3>暂无记录</h3>
                <p>点击"添加记录"按钮开始记录您的游戏充值</p>
            </div>
        `);
    }
}

// 更新过滤器选项
function updateFilterOptions() {
    // 游戏过滤器
    const games = [...new Set(spendingData.map(record => record.game))];
    const gameOptions = games.map(game => `<option value="${game}">${game}</option>`).join('');
    $('#gameFilter').html('<option value="">所有游戏</option>' + gameOptions);
    
    // 月份过滤器
    const months = [...new Set(spendingData.map(record => record.date.slice(0, 7)))];
    months.sort().reverse();
    const monthOptions = months.map(month => {
        const date = new Date(month + '-01');
        const monthName = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
        return `<option value="${month}">${monthName}</option>`;
    }).join('');
    $('#monthFilter').html('<option value="">所有月份</option>' + monthOptions);
}

// 保存预算设置
function saveBudgetSettings() {
    const monthly = parseFloat($('#monthlyBudgetInput').val()) || 0;
    const singleLimit = parseFloat($('#singleLimitInput').val()) || 0;
    const dailyLimit = parseFloat($('#dailyLimitInput').val()) || 0;
    const cooldown = parseFloat($('#cooldownInput').val()) || 24;
    
    budgetSettings = {
        monthly: monthly,
        singleLimit: singleLimit,
        dailyLimit: dailyLimit,
        cooldown: cooldown
    };
    
    localStorage.setItem('budgetSettings', JSON.stringify(budgetSettings));
    
    updateBudgetDisplay();
    updateDashboard();
    
    showMessage('预算设置已保存！', 'success');
}

// 重置预算设置
function resetBudgetSettings() {
    if (confirm('确定要重置所有预算设置吗？')) {
        budgetSettings = { monthly: 0, singleLimit: 0, dailyLimit: 0, cooldown: 24 };
        localStorage.setItem('budgetSettings', JSON.stringify(budgetSettings));
        updateBudgetDisplay();
        updateDashboard();
        showMessage('预算设置已重置', 'success');
    }
}

// 更新预算显示
function updateBudgetDisplay() {
    $('#monthlyBudgetInput').val(budgetSettings.monthly);
    $('#singleLimitInput').val(budgetSettings.singleLimit);
    $('#dailyLimitInput').val(budgetSettings.dailyLimit);
    
    // 更新预算使用情况
    const monthlySpent = getMonthlySpending();
    const percentage = budgetSettings.monthly > 0 ? 
        Math.min((monthlySpent / budgetSettings.monthly) * 100, 100) : 0;
    const remaining = Math.max(0, budgetSettings.monthly - monthlySpent);
    
    // 更新预算概览卡片
    $('#currentBudgetAmount').text(budgetSettings.monthly > 0 ? `¥${budgetSettings.monthly}` : '¥0');
    $('#budgetStatusText').text(budgetSettings.monthly > 0 ? 
        (percentage > 100 ? '预算已超支' : percentage > 80 ? '预算紧张' : '预算充足') : 
        '未设置预算');
    $('#remainingBudgetAmount').text(`¥${remaining.toFixed(2)}`);
    
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = lastDay.getDate() - today.getDate();
    $('#remainingDays').text(`本月剩余${daysLeft}天`);
    
    // 更新进度条
    $('#budgetUsed').css('width', `${percentage}%`);
    $('#budgetPercentage').text(`${percentage.toFixed(1)}%`);
    $('#usedAmount').text(`¥${monthlySpent.toFixed(2)}`);
    $('#remainingAmount').text(`¥${remaining.toFixed(2)}`);
    
    // 根据使用情况改变颜色
    const budgetUsedElement = document.getElementById('budgetUsed');
    if (budgetUsedElement) {
        if (percentage > 90) {
            budgetUsedElement.style.backgroundColor = '#ea4335';
        } else if (percentage > 70) {
            budgetUsedElement.style.backgroundColor = '#fbbc04';
        } else {
            budgetUsedElement.style.backgroundColor = '#34a853';
        }
    }
}

// 更新分析页面
function updateAnalysis() {
    // 消费模式分析
    analyzeSpendingPattern();
    
    // 热门游戏分析
    analyzeTopGames();
    
    // 消费频率分析
    analyzeSpendingFrequency();
    
    // 更新分析图表
    updateAnalysisChart();
}

// 分析消费模式
function analyzeSpendingPattern() {
    const monthlySpent = getMonthlySpending();
    const avgDaily = monthlySpent / new Date().getDate();
    
    let pattern = '';
    if (avgDaily < 10) {
        pattern = '💚 理性消费型：您的消费习惯很好，能够有效控制游戏充值。';
    } else if (avgDaily < 30) {
        pattern = '💛 适度消费型：消费水平适中，建议继续保持理性。';
    } else if (avgDaily < 50) {
        pattern = '🧡 偏高消费型：消费较高，建议设置更严格的预算限制。';
    } else {
        pattern = '❤️ 高频消费型：消费频率很高，强烈建议控制充值行为。';
    }
    
    $('#spendingPattern').html(pattern);
}

// 分析热门游戏
function analyzeTopGames() {
    const gameStats = {};
    spendingData.forEach(record => {
        gameStats[record.game] = (gameStats[record.game] || 0) + record.amount;
    });
    
    const sortedGames = Object.entries(gameStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
    
    const topGamesHtml = sortedGames.map(([game, amount], index) => {
        const emoji = ['🥇', '🥈', '🥉'][index];
        return `<div>${emoji} ${game}: ¥${amount.toFixed(2)}</div>`;
    }).join('');
    
    $('#topGames').html(topGamesHtml || '暂无数据');
}

// 分析消费频率
function analyzeSpendingFrequency() {
    const totalRecords = spendingData.length;
    const totalDays = Math.max(1, Math.ceil((Date.now() - new Date(spendingData[0]?.date || Date.now()).getTime()) / (1000 * 60 * 60 * 24)));
    const frequency = totalRecords / totalDays;
    
    let frequencyText = '';
    if (frequency < 0.1) {
        frequencyText = '📅 低频充值：平均10天以上充值一次';
    } else if (frequency < 0.3) {
        frequencyText = '📅 中频充值：平均3-10天充值一次';
    } else if (frequency < 1) {
        frequencyText = '📅 高频充值：平均1-3天充值一次';
    } else {
        frequencyText = '📅 超高频充值：几乎每天都有充值';
    }
    
    $('#spendingFrequency').html(frequencyText);
}

// 更新分析图表
function updateAnalysisChart() {
    const gameStats = {};
    spendingData.forEach(record => {
        gameStats[record.game] = (gameStats[record.game] || 0) + record.amount;
    });
    
    const games = Object.keys(gameStats);
    const amounts = Object.values(gameStats);
    
    analysisChart.data.labels = games;
    analysisChart.data.datasets[0].data = amounts;
    analysisChart.update();
}

// 生成个性化建议
function generateSuggestions() {
    const suggestions = [];
    const monthlySpent = getMonthlySpending();
    const avgDaily = monthlySpent / new Date().getDate();
    
    // 基于消费水平的建议
    if (avgDaily > 30) {
        suggestions.push({
            title: '💰 控制消费频率',
            content: '您的日均消费较高，建议设置每周充值限制，避免冲动消费。可以尝试每周只在固定时间进行充值。'
        });
    }
    
    // 基于预算使用情况的建议
    if (budgetSettings.monthly > 0) {
        const percentage = (monthlySpent / budgetSettings.monthly) * 100;
        if (percentage > 80) {
            suggestions.push({
                title: '⚠️ 预算警告',
                content: '本月预算使用已超过80%，建议暂停非必要充值，优先考虑已购买内容的使用价值。'
            });
        }
    }
    
    // 基于游戏分布的建议
    const gameStats = {};
    spendingData.forEach(record => {
        gameStats[record.game] = (gameStats[record.game] || 0) + record.amount;
    });
    
    const topGame = Object.entries(gameStats).sort(([,a], [,b]) => b - a)[0];
    if (topGame && topGame[1] > monthlySpent * 0.6) {
        suggestions.push({
            title: '🎮 游戏消费集中',
            content: `您在${topGame[0]}上的消费占总消费的${((topGame[1]/monthlySpent)*100).toFixed(1)}%，建议多样化游戏体验，避免过度依赖单一游戏。`
        });
    }
    
    // 理财建议
    suggestions.push({
        title: '💡 理财小贴士',
        content: '建议将游戏充值预算控制在月收入的5-10%以内，剩余资金可以考虑储蓄或投资，培养良好的理财习惯。'
    });
    
    // 健康游戏建议
    suggestions.push({
        title: '🌟 健康游戏',
        content: '游戏充值前先问自己：这个购买是否真的必要？是否会影响学习和生活？适度游戏，理性消费。'
    });
    
    // 渲染建议
    const suggestionsHtml = suggestions.map(suggestion => `
        <div class="suggestion-item">
            <h4>${suggestion.title}</h4>
            <p>${suggestion.content}</p>
        </div>
    `).join('');
    
    $('#suggestionsList').html(suggestionsHtml);
}

// 显示消息
function showMessage(message, type = 'success') {
    const messageHtml = `<div class="message ${type}">${message}</div>`;
    
    // 在当前活动的标签页顶部显示消息
    const activeTab = $('.tab-content.active');
    activeTab.prepend(messageHtml);
    
    // 3秒后自动移除消息
    setTimeout(() => {
        $('.message').fadeOut(500, function() {
            $(this).remove();
        });
    }, 3000);
}

// 导出数据功能
function exportData() {
    const data = {
        spendingData: spendingData,
        budgetSettings: budgetSettings,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `financial_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showMessage('数据导出成功', 'success');
}

// 清除所有数据功能
function clearAllData() {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
        if (confirm('请再次确认：这将删除所有充值记录和设置！')) {
            spendingData = [];
            budgetSettings = { monthly: 0, singleLimit: 0, dailyLimit: 0, cooldown: 24 };
            
            localStorage.removeItem('spendingData');
            localStorage.removeItem('budgetSettings');
            
            updateRecordsList();
            updateAnalysis();
            updateBudgetDisplay();
            updateDashboard();
            
            showMessage('所有数据已清除', 'success');
        }
    }
}

// 更新学习统计
function updateLearningStats() {
    // 从localStorage获取学习进度
    const learningProgress = JSON.parse(localStorage.getItem('learningProgress')) || {};
    
    // 更新统计数据
    const completedCourses = Object.values(learningProgress).filter(progress => progress >= 100).length;
    const totalScore = Object.values(learningProgress).reduce((sum, progress) => sum + (progress >= 100 ? 100 : 0), 0);
    const studyTime = parseInt(localStorage.getItem('totalStudyTime')) || 0;
    
    $('#completedCourses').text(completedCourses);
    $('#totalScore').text(totalScore);
    $('#studyTime').text(studyTime);
    
    // 更新课程进度
    const course1Progress = learningProgress['course1'] || 0;
    $('#course1Progress').text(`${course1Progress}%`);
    $('#course1ProgressBar').css('width', `${course1Progress}%`);
}