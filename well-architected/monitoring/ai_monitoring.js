// AI平台监控中心可视化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有监控图表
    initServerResourceChart();
    initContainerResourceChart();
    initDatabasePerformanceChart();
    initNetworkPerformanceChart();
    initModelPerformanceChart();
    initModelLatencyChart();
    initModelThroughputChart();
    initApplicationPerformanceChart();
    initUserExperienceChart();
    initAlertTrendsChart();
    
    // 绑定筛选按钮事件
    document.getElementById('applyFilter').addEventListener('click', function() {
        // 模拟数据刷新
        showNotification('监控数据已更新');
        
        // 重新加载所有图表（实际应用中应该根据筛选条件请求新数据）
        setTimeout(() => {
            refreshAllCharts();
        }, 500);
    });
    
    // 绑定时间范围选择事件
    document.getElementById('timeRange').addEventListener('change', function() {
        if (this.value === 'custom') {
            // 显示自定义日期选择器（实际实现中）
            alert('在实际应用中，这里会显示日期选择器');
        } else {
            // 根据选择的时间范围更新图表
            refreshAllCharts();
        }
    });
    
    // 绑定监控层级选择事件
    document.getElementById('monitorLayer').addEventListener('change', function() {
        const selectedLayer = this.value;
        
        // 根据选择的监控层级显示/隐藏相应的部分
        const layers = ['infrastructure', 'model', 'application', 'user'];
        
        if (selectedLayer === 'all') {
            // 显示所有层级
            layers.forEach(layer => {
                const elements = document.querySelectorAll(`.${layer}-layer`);
                elements.forEach(el => el.style.display = 'block');
            });
        } else {
            // 只显示选中的层级
            layers.forEach(layer => {
                const elements = document.querySelectorAll(`.${layer}-layer`);
                elements.forEach(el => {
                    el.style.display = layer === selectedLayer ? 'block' : 'none';
                });
            });
        }
    });
    
    // 模拟实时数据更新
    startRealTimeUpdates();
});

// 刷新所有图表
function refreshAllCharts() {
    initServerResourceChart();
    initContainerResourceChart();
    initDatabasePerformanceChart();
    initNetworkPerformanceChart();
    initModelPerformanceChart();
    initModelLatencyChart();
    initModelThroughputChart();
    initApplicationPerformanceChart();
    initUserExperienceChart();
    initAlertTrendsChart();
}

// 显示通知
function showNotification(message) {
    const notificationArea = document.createElement('div');
    notificationArea.className = 'alert alert-info alert-dismissible fade show';
    notificationArea.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // 添加到页面顶部
    const container = document.querySelector('main.container');
    container.insertBefore(notificationArea, container.firstChild);
    
    // 5秒后自动消失
    setTimeout(() => {
        notificationArea.remove();
    }, 5000);
}

// 模拟实时数据更新
function startRealTimeUpdates() {
    // 每30秒更新一次数据
    setInterval(() => {
        // 随机选择一个图表进行更新
        const charts = [
            'serverResourceChart',
            'containerResourceChart',
            'modelPerformanceChart',
            'applicationPerformanceChart'
        ];
        
        const randomChart = charts[Math.floor(Math.random() * charts.length)];
        
        // 更新选中的图表
        switch(randomChart) {
            case 'serverResourceChart':
                updateServerResourceChart();
                break;
            case 'containerResourceChart':
                updateContainerResourceChart();
                break;
            case 'modelPerformanceChart':
                updateModelPerformanceChart();
                break;
            case 'applicationPerformanceChart':
                updateApplicationPerformanceChart();
                break;
        }
        
        // 随机生成告警
        if (Math.random() < 0.2) { // 20%的概率生成告警
            generateRandomAlert();
        }
    }, 30000);
}

// 生成随机告警
function generateRandomAlert() {
    const alertTypes = ['critical', 'warning', 'info'];
    const alertSources = ['服务器CPU使用率过高', '模型响应时间异常', '应用API错误率上升', '数据库连接数接近上限', '网络延迟增加'];
    
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const alertSource = alertSources[Math.floor(Math.random() * alertSources.length)];
    
    let alertClass = '';
    let alertIcon = '';
    
    switch(alertType) {
        case 'critical':
            alertClass = 'alert-danger';
            alertIcon = 'bi-exclamation-triangle-fill';
            break;
        case 'warning':
            alertClass = 'alert-warning';
            alertIcon = 'bi-exclamation-circle-fill';
            break;
        case 'info':
            alertClass = 'alert-info';
            alertIcon = 'bi-info-circle-fill';
            break;
    }
    
    const alertMessage = `<i class="bi ${alertIcon}"></i> <strong>${alertType === 'critical' ? '严重告警' : alertType === 'warning' ? '警告' : '信息'}</strong>: ${alertSource}`;
    
    // 显示告警通知
    const notificationArea = document.createElement('div');
    notificationArea.className = `alert ${alertClass} alert-dismissible fade show`;
    notificationArea.innerHTML = `
        ${alertMessage}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // 添加到告警区域
    const alertsContainer = document.getElementById('alertsContainer');
    if (alertsContainer) {
        alertsContainer.insertBefore(notificationArea, alertsContainer.firstChild);
        
        // 更新告警计数
        updateAlertCounts();
    } else {
        // 如果没有专门的告警区域，添加到页面顶部
        const container = document.querySelector('main.container');
        container.insertBefore(notificationArea, container.firstChild);
    }
}

// 更新告警计数
function updateAlertCounts() {
    const alertsContainer = document.getElementById('alertsContainer');
    if (!alertsContainer) return;
    
    const criticalAlerts = alertsContainer.querySelectorAll('.alert-danger').length;
    const warningAlerts = alertsContainer.querySelectorAll('.alert-warning').length;
    const infoAlerts = alertsContainer.querySelectorAll('.alert-info').length;
    
    // 更新告警计数显示
    const totalAlerts = criticalAlerts + warningAlerts + infoAlerts;
    document.querySelector('.monitor-value:nth-child(2)').textContent = totalAlerts;
    
    const alertLabel = document.querySelector('.monitor-label:last-child');
    if (alertLabel) {
        alertLabel.innerHTML = `
            <span class="alert-status alert-critical"></span> ${criticalAlerts}个严重 
            <span class="alert-status alert-warning"></span> ${warningAlerts}个警告
        `;
    }
}

// 服务器资源使用率图表
function initServerResourceChart() {
    const chartDom = document.getElementById('serverResourceChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['CPU使用率', '内存使用率', '磁盘I/O', '网络流量']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
            }
        ],
        yAxis: [
            {
                type: 'value',
                max: 100,
                name: '百分比 (%)',
                nameLocation: 'end'
            }
        ],
        series: [
            {
                name: 'CPU使用率',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [30, 40, 35, 50, 60, 40, 35, 30]
            },
            {
                name: '内存使用率',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [50, 55, 60, 65, 70, 65, 60, 55]
            },
            {
                name: '磁盘I/O',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [20, 25, 30, 35, 40, 35, 30, 25]
            },
            {
                name: '网络流量',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [40, 45, 50, 55, 60, 55, 50, 45]
            }
        ]
    };
    myChart.setOption(option);
    
    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 更新服务器资源使用率图表
function updateServerResourceChart() {
    const chartDom = document.getElementById('serverResourceChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = myChart.getOption();
    
    // 模拟数据变化
    for (let i = 0; i < option.series.length; i++) {
        const lastValue = option.series[i].data[option.series[i].data.length - 1];
        // 在上一个值的基础上随机增减，但保持在合理范围内
        let newValue = lastValue + (Math.random() * 10 - 5);
        newValue = Math.max(10, Math.min(90, newValue)); // 保持在10-90之间
        
        // 移除第一个数据点，添加新数据点
        option.series[i].data.shift();
        option.series[i].data.push(newValue);
    }
    
    // 更新时间轴
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(timeStr);
    
    myChart.setOption(option);
}

// 容器资源监控图表
function initContainerResourceChart() {
    const chartDom = document.getElementById('containerResourceChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['CPU使用率', '内存使用率', '网络I/O']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['模型服务1', '模型服务2', '应用服务1', '应用服务2', '数据库', '缓存', '网关']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '百分比 (%)',
                max: 100
            }
        ],
        series: [
            {
                name: 'CPU使用率',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [70, 65, 40, 35, 50, 30, 25]
            },
            {
                name: '内存使用率',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [80, 75, 50, 45, 60, 40, 35]
            },
            {
                name: '网络I/O',
                type: 'bar',
                emphasis: {
                    focus:'series'
                },
                data: [20, 25, 10, 15, 30, 15, 10]
            }
        ]
    };
    myChart.setOption(option);
}