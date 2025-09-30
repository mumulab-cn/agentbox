// AI应用成本分析可视化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有图表
    initCostTrendChart();
    initCostBreakdownChart();
    initAppCostRankChart();
    
    // 绑定筛选按钮事件
    document.getElementById('applyFilter').addEventListener('click', function() {
        // 模拟数据刷新
        showNotification('成本数据已更新');
        
        // 重新加载所有图表（实际应用中应该根据筛选条件请求新数据）
        setTimeout(() => {
            initCostTrendChart();
            initCostBreakdownChart();
            initAppCostRankChart();
        }, 500);
    });
    
    // 绑定时间范围选择事件
    document.getElementById('timeRange').addEventListener('change', function() {
        if (this.value === 'custom') {
            // 显示自定义日期选择器（实际实现中）
            alert('在实际应用中，这里会显示日期选择器');
        }
    });
    
    // 绑定TCO表单提交事件
    document.getElementById('tcoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        calculateTCO();
    });
});

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

// 成本趋势图表
function initCostTrendChart() {
    const chartDom = document.getElementById('costTrendChart');
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
            data: ['模型调用成本', '数据处理成本', '存储成本', '计算资源成本', '总成本'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        series: [
            {
                name: '模型调用成本',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [5200, 5800, 6100, 5900, 6500, 5100, 4800]
            },
            {
                name: '数据处理成本',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [2100, 2300, 2500, 2400, 2600, 2200, 2000]
            },
            {
                name: '存储成本',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [1200, 1200, 1300, 1300, 1400, 1400, 1500]
            },
            {
                name: '计算资源成本',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [1800, 2000, 2200, 2100, 2300, 1900, 1700]
            },
            {
                name: '总成本',
                type: 'line',
                emphasis: {
                    focus: 'series'
                },
                data: [10300, 11300, 12100, 11700, 12800, 10600, 10000],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };
    myChart.setOption(option);
    
    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 成本构成分析图表
function initCostBreakdownChart() {
    const chartDom = document.getElementById('costBreakdownChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['模型调用成本', '数据处理成本', '存储成本', '计算资源成本', '其他成本']
        },
        series: [
            {
                name: '成本构成',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 25400, name: '模型调用成本' },
                    { value: 10800, name: '数据处理成本' },
                    { value: 5200, name: '存储成本' },
                    { value: 8900, name: '计算资源成本' },
                    { value: 2100, name: '其他成本' }
                ]
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 应用成本排名图表
function initAppCostRankChart() {
    const chartDom = document.getElementById('appCostRankChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: '{b}: ¥{c}'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        yAxis: {
            type: 'category',
            data: ['智能客服', '内容生成器', '数据分析平台', '文档处理', '图像识别', '语音转写'],
            axisTick: {
                alignWithLabel: true
            }
        },
        series: [
            {
                name: '月度成本',
                type: 'bar',
                barWidth: '60%',
                data: [12500, 9800, 7600, 6200, 5100, 4400],
                itemStyle: {
                    color: function(params) {
                        // 为不同的应用设置不同的颜色
                        const colorList = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'];
                        return colorList[params.dataIndex];
                    }
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '¥{c}'
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 计算TCO
function calculateTCO() {
    // 获取表单数据
    const usagePeriod = parseInt(document.getElementById('usagePeriod').value);
    const monthlyUsage = parseInt(document.getElementById('monthlyUsage').value) || 0;
    const storageNeeds = parseInt(document.getElementById('storageNeeds').value) || 0;
    
    if (monthlyUsage === 0 || storageNeeds === 0) {
        alert('请输入有效的调用量和存储需求');
        return;
    }
    
    // 模拟TCO计算（实际应用中应该有更复杂的计算逻辑）
    const modelCostPerCall = 0.8; // 假设每次调用平均成本0.8元
    const storageCostPerGB = 0.5; // 假设每GB存储成本0.5元/月
    const computeCostFactor = 1.2; // 计算资源成本因子
    const maintenanceFactor = 0.15; // 维护成本因子（占总成本的15%）
    
    // 计算各项成本
    const modelCost = modelCostPerCall * monthlyUsage * 12 * usagePeriod;
    const storageCost = storageCostPerGB * storageNeeds * 12 * usagePeriod;
    const computeCost = modelCost * computeCostFactor;
    const maintenanceCost = (modelCost + storageCost + computeCost) * maintenanceFactor;
    
    const totalCost = modelCost + storageCost + computeCost + maintenanceCost;
    
    // 显示结果区域
    document.getElementById('tcoResult').classList.remove('d-none');
    
    // 初始化TCO图表
    const chartDom = document.getElementById('tcoChart');
    const myChart = echarts.init(chartDom);
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['模型调用成本', '存储成本', '计算资源成本', '维护成本']
        },
        series: [
            {
                name: 'TCO构成',
                type: 'pie',
                radius: '50%',
                data: [
                    { value: modelCost.toFixed(2), name: '模型调用成本' },
                    { value: storageCost.toFixed(2), name: '存储成本' },
                    { value: computeCost.toFixed(2), name: '计算资源成本' },
                    { value: maintenanceCost.toFixed(2), name: '维护成本' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    
    // 在图表下方添加总成本信息
    const tcoResultDiv = document.getElementById('tcoResult');
    const totalCostInfo = document.createElement('div');
    totalCostInfo.className = 'alert alert-primary mt-3';
    totalCostInfo.innerHTML = `
        <h5>总拥有成本(TCO)分析结果</h5>
        <p class="mb-1"><strong>总成本(${usagePeriod}年):</strong> ¥${totalCost.toFixed(2)}</p>
        <p class="mb-1"><strong>年均成本:</strong> ¥${(totalCost / usagePeriod).toFixed(2)}</p>
        <p class="mb-1"><strong>月均成本:</strong> ¥${(totalCost / usagePeriod / 12).toFixed(2)}</p>
        <p class="mb-0"><strong>单次调用平均成本:</strong> ¥${(totalCost / (monthlyUsage * 12 * usagePeriod)).toFixed(4)}</p>
    `;
    
    // 移除之前的总成本信息（如果有）
    const oldTotalCostInfo = tcoResultDiv.querySelector('.alert');
    if (oldTotalCostInfo) {
        oldTotalCostInfo.remove();
    }
    
    tcoResultDiv.appendChild(totalCostInfo);
}