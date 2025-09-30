// AI应用统计数据可视化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有图表
    initAgentUsageChart();
    initModelCharts();
    initDataResourceChart();
    initUserBehaviorCharts();
    initSystemPerformanceChart();
    
    // 绑定筛选按钮事件
    document.getElementById('applyFilter').addEventListener('click', function() {
        // 模拟数据刷新
        showNotification('数据已更新');
        
        // 重新加载所有图表（实际应用中应该根据筛选条件请求新数据）
        setTimeout(() => {
            initAgentUsageChart();
            initModelCharts();
            initDataResourceChart();
            initUserBehaviorCharts();
            initSystemPerformanceChart();
        }, 500);
    });
    
    // 绑定时间范围选择事件
    document.getElementById('timeRange').addEventListener('change', function() {
        if (this.value === 'custom') {
            // 显示自定义日期选择器（实际实现中）
            alert('在实际应用中，这里会显示日期选择器');
        }
    });
    
    // 绑定导出报告按钮事件
    const exportButtons = document.querySelectorAll('.export-btn');
    exportButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            alert(`报告将以${format}格式导出（实际应用中）`);
        });
    });
});

// Agent应用使用统计图表
function initAgentUsageChart() {
    const chartDom = document.getElementById('agentUsageChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: 'Agent应用使用趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['调用次数', '活跃用户', '新增应用'],
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '调用次数',
                type: 'line',
                data: [12000, 13200, 15100, 14800, 16700, 12500, 11000],
                smooth: true
            },
            {
                name: '活跃用户',
                type: 'line',
                data: [2200, 2400, 2600, 2800, 3100, 2500, 2300],
                smooth: true
            },
            {
                name: '新增应用',
                type: 'bar',
                data: [120, 132, 101, 134, 90, 50, 40]
            }
        ]
    };
    myChart.setOption(option);
    
    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 模型使用统计图表
function initModelCharts() {
    // 模型使用量图表
    const usageChartDom = document.getElementById('modelUsageChart');
    if (usageChartDom) {
        const usageChart = echarts.init(usageChartDom);
        const usageOption = {
            title: {
                text: '模型调用分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['GPT-4', 'Claude 3', 'LLaMA 3', 'Embedding模型', '多模态模型']
            },
            series: [
                {
                    name: '调用次数',
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
                        { value: 45621, name: 'GPT-4' },
                        { value: 32458, name: 'Claude 3' },
                        { value: 28974, name: 'LLaMA 3' },
                        { value: 125847, name: 'Embedding模型' },
                        { value: 18542, name: '多模态模型' }
                    ]
                }
            ]
        };
        usageChart.setOption(usageOption);
        window.addEventListener('resize', function() {
            usageChart.resize();
        });
    }
    
    // 模型性能图表
    const perfChartDom = document.getElementById('modelPerformanceChart');
    if (perfChartDom) {
        const perfChart = echarts.init(perfChartDom);
        const perfOption = {
            title: {
                text: '模型性能对比',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['响应时间(秒)', '成功率(%)'],
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['GPT-4', 'Claude 3', 'LLaMA 3', 'Embedding', '多模态']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '响应时间',
                    min: 0,
                    max: 3,
                    position: 'left',
                    axisLabel: {
                        formatter: '{value}秒'
                    }
                },
                {
                    type: 'value',
                    name: '成功率',
                    min: 95,
                    max: 100,
                    position: 'right',
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }
            ],
            series: [
                {
                    name: '响应时间(秒)',
                    type: 'bar',
                    data: [1.2, 0.9, 1.5, 0.3, 2.1]
                },
                {
                    name: '成功率(%)',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [99.8, 99.5, 98.9, 99.9, 98.2],
                    markLine: {
                        data: [{ type: 'average', name: '平均值' }]
                    }
                }
            ]
        };
        perfChart.setOption(perfOption);
        window.addEventListener('resize', function() {
            perfChart.resize();
        });
    }
}

// 数据资源统计图表
function initDataResourceChart() {
    const chartDom = document.getElementById('dataResourceChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '数据资源增长趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['知识库数量', '数据集数量', '总存储容量(GB)'],
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: [
            {
                type: 'value',
                name: '数量',
                position: 'left'
            },
            {
                type: 'value',
                name: '容量(GB)',
                position: 'right'
            }
        ],
        series: [
            {
                name: '知识库数量',
                type: 'line',
                data: [42, 65, 78, 86, 95, 110, 128],
                smooth: true
            },
            {
                name: '数据集数量',
                type: 'line',
                data: [120, 145, 168, 190, 212, 235, 256],
                smooth: true
            },
            {
                name: '总存储容量(GB)',
                type: 'line',
                yAxisIndex: 1,
                data: [350, 480, 650, 820, 950, 1100, 1230],
                smooth: true
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 用户行为分析图表
function initUserBehaviorCharts() {
    // 用户活跃度图表
    const activityChartDom = document.getElementById('userActivityChart');
    if (activityChartDom) {
        const activityChart = echarts.init(activityChartDom);
        const activityOption = {
            title: {
                text: '用户活跃度分析',
                left: 'center'
            },
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
                data: ['日活用户', '周活用户', '月活用户', '新增用户'],
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1周', '2周', '3周', '4周', '5周', '6周', '7周', '8周']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '日活用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [1200, 1320, 1400, 1580, 1650, 1720, 1850, 1920]
                },
                {
                    name: '周活用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [2800, 3100, 3500, 3800, 4200, 4500, 4800, 5100]
                },
                {
                    name: '月活用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [3500, 4000, 4500, 5000, 5200, 5500, 5700, 6000]
                },
                {
                    name: '新增用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [300, 280, 250, 320, 280, 220, 240, 250]
                }
            ]
        };
        activityChart.setOption(activityOption);
        window.addEventListener('resize', function() {
            activityChart.resize();
        });
    }
    
    // 用户反馈分析图表
    const feedbackChartDom = document.getElementById('userFeedbackChart');
    if (feedbackChartDom) {
        const feedbackChart = echarts.init(feedbackChartDom);
        const feedbackOption = {
            title: {
                text: '用户反馈分析',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: '反馈类型',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        { value: 1048, name: '问题反馈' },
                        { value: 735, name: '建议反馈' },
                        { value: 580, name: '其他反馈' }
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
        feedbackChart.setOption(feedbackOption);
        window.addEventListener('resize', function() {
            feedbackChart.resize();
        });
    }
}

// 系统性能图表
function initSystemPerformanceChart() {
    const chartDom = document.getElementById('systemPerformanceChart');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '系统性能监控',
            left: 'center'
        },
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
            data: ['CPU使用率', '内存使用率', '网络延迟', '系统负载'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '使用率(%)',
                min: 0,
                max: 100,
                position: 'left'
            },
            {
                type: 'value',
                name: '延迟(ms)',
                min: 0,
                max: 200,
                position: 'right'
            }
        ],
        series: [
            {
                name: 'CPU使用率',
                type: 'line',
                data: [30, 40, 60, 70, 65, 50, 35],
                smooth: true
            },
            {
                name: '内存使用率',
                type: 'line',
                data: [50, 55, 65, 75, 70, 60, 55],
                smooth: true
            },
            {
                name: '网络延迟',
                type: 'line',
                yAxisIndex: 1,
                data: [20, 30, 50, 40, 60, 45, 25],
                smooth: true
            },
            {
                name: '系统负载',
                type: 'line',
                data: [25, 35, 55, 75, 65, 45, 30],
                smooth: true
            }
        ]
    };
    myChart.setOption(option);
    
    // 窗口大小变化时重新调整图表大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });
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
    if (container) {
        container.insertBefore(notificationArea, container.firstChild);
        
        // 5秒后自动消失
        setTimeout(() => {
            notificationArea.remove();
        }, 5000);
    }
}