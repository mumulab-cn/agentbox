$(document).ready(function() {
    // 侧边栏导航点击事件
    $('.sidebar-item').click(function(e) {
        e.preventDefault();
        
        // 移除所有活动状态
        $('.sidebar-item').removeClass('active');
        $('.content-section').removeClass('active');
        
        // 添加当前项的活动状态
        $(this).addClass('active');
        
        // 获取目标section
        const targetSection = $(this).data('section');
        
        // 如果目标section存在，显示它；否则加载对应页面
        if ($('#' + targetSection).length) {
            $('#' + targetSection).addClass('active');
        } else {
            loadPageContent(targetSection);
        }
    });

    // 设备预测维护页面内容
    function getPredictiveMaintenanceContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">设备预测维护</h1>
                <p class="text-gray-600 mt-2">基于AI算法预测设备故障，制定预防性维护计划，降低停机风险</p>
            </div>
            
            <!-- 设备健康概览 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">设备总数</p>
                            <p class="text-2xl font-bold text-blue-600">156</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <i class="fas fa-cogs text-blue-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-arrow-up text-green-500 mr-1"></i>
                            <span>在线设备 152台</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">健康设备</p>
                            <p class="text-2xl font-bold text-green-600">128</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-lg">
                            <i class="fas fa-heart text-green-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-check text-green-500 mr-1"></i>
                            <span>健康率 82%</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">预警设备</p>
                            <p class="text-2xl font-bold text-yellow-600">20</p>
                        </div>
                        <div class="p-3 bg-yellow-100 rounded-lg">
                            <i class="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-clock text-yellow-500 mr-1"></i>
                            <span>需要关注</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">故障设备</p>
                            <p class="text-2xl font-bold text-red-600">4</p>
                        </div>
                        <div class="p-3 bg-red-100 rounded-lg">
                            <i class="fas fa-times-circle text-red-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-wrench text-red-500 mr-1"></i>
                            <span>需要维修</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 预测维护计划 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">本周维护计划</h3>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">8项任务</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div class="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-1">
                                        <h4 class="font-medium text-gray-900">压力机#003 - 紧急维护</h4>
                                        <span class="text-xs text-red-600 font-medium">高优先级</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-2">预测故障概率: 85% | 建议立即维护</p>
                                    <div class="flex items-center text-xs text-gray-500">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>今日 14:00-16:00</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>张工程师</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex items-start p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div class="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-1">
                                        <h4 class="font-medium text-gray-900">传送带#002 - 预防性维护</h4>
                                        <span class="text-xs text-yellow-600 font-medium">中优先级</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-2">预测故障概率: 45% | 建议本周内维护</p>
                                    <div class="flex items-center text-xs text-gray-500">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>明日 09:00-11:00</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>李技师</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex items-start p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                                <div class="flex-1">
                                    <div class="flex items-center justify-between mb-1">
                                        <h4 class="font-medium text-gray-900">机械臂#001 - 定期保养</h4>
                                        <span class="text-xs text-green-600 font-medium">低优先级</span>
                                    </div>
                                    <p class="text-sm text-gray-600 mb-2">预测故障概率: 15% | 定期保养计划</p>
                                    <div class="flex items-center text-xs text-gray-500">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>周五 13:00-15:00</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>王师傅</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">设备健康评分</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-6">
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-robot text-blue-600 mr-2"></i>
                                        <span class="text-sm font-medium text-gray-700">机械臂#001</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="text-sm text-gray-500 mr-2">95分</span>
                                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">优秀</span>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 95%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-cog text-purple-600 mr-2"></i>
                                        <span class="text-sm font-medium text-gray-700">传送带#002</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="text-sm text-gray-500 mr-2">78分</span>
                                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">良好</span>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 78%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-industry text-orange-600 mr-2"></i>
                                        <span class="text-sm font-medium text-gray-700">压力机#003</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="text-sm text-gray-500 mr-2">45分</span>
                                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">警告</span>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                            </div>
                            
                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <div class="flex items-center">
                                        <i class="fas fa-fire text-red-600 mr-2"></i>
                                        <span class="text-sm font-medium text-gray-700">加热炉#004</span>
                                    </div>
                                    <div class="flex items-center">
                                        <span class="text-sm text-gray-500 mr-2">25分</span>
                                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">故障</span>
                                    </div>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 25%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 故障预测分析 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">故障预测趋势</h3>
                            <select class="text-sm border border-gray-300 rounded-md px-3 py-1">
                                <option>未来7天</option>
                                <option>未来30天</option>
                                <option>未来90天</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="h-64 flex items-end justify-between space-x-2">
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-green-500 rounded-t" style="height: 40px;"></div>
                                <span class="text-xs text-gray-500 mt-2">周一</span>
                                <span class="text-xs text-green-600">5%</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-green-500 rounded-t" style="height: 60px;"></div>
                                <span class="text-xs text-gray-500 mt-2">周二</span>
                                <span class="text-xs text-green-600">8%</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-yellow-500 rounded-t" style="height: 120px;"></div>
                                <span class="text-xs text-gray-500 mt-2">周三</span>
                                <span class="text-xs text-yellow-600">25%</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-red-500 rounded-t" style="height: 180px;"></div>
                                <span class="text-xs text-gray-500 mt-2">周四</span>
                                <span class="text-xs text-red-600">45%</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-red-500 rounded-t" style="height: 200px;"></div>
                                <span class="text-xs text-gray-500 mt-2">周五</span>
                                <span class="text-xs text-red-600">52%</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">维护成本分析</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-blue-600 mb-2">¥128,500</div>
                                <p class="text-sm text-gray-600">本月预计维护成本</p>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div class="text-center p-4 bg-green-50 rounded-lg">
                                    <div class="text-xl font-bold text-green-600">¥45,200</div>
                                    <p class="text-xs text-gray-600 mt-1">预防性维护</p>
                                </div>
                                <div class="text-center p-4 bg-red-50 rounded-lg">
                                    <div class="text-xl font-bold text-red-600">¥83,300</div>
                                    <p class="text-xs text-gray-600 mt-1">故障维修</p>
                                </div>
                            </div>
                            
                            <div class="pt-4 border-t border-gray-200">
                                <div class="flex justify-between items-center text-sm mb-2">
                                    <span class="text-gray-600">成本节约:</span>
                                    <span class="font-medium text-green-600">-32%</span>
                                </div>
                                <div class="flex justify-between items-center text-sm mb-2">
                                    <span class="text-gray-600">停机时间:</span>
                                    <span class="font-medium text-blue-600">-45%</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600">设备可用率:</span>
                                    <span class="font-medium text-green-600">+18%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 维护记录和AI建议 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">最近维护记录</h3>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看全部</button>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div class="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-check text-green-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900">机械臂#001 - 定期保养</h4>
                                    <p class="text-sm text-gray-600">更换润滑油，检查传动系统</p>
                                    <div class="flex items-center text-xs text-gray-500 mt-1">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>2024-01-15 14:30</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>王师傅</span>
                                    </div>
                                </div>
                                <span class="text-xs text-green-600 font-medium">已完成</span>
                            </div>
                            
                            <div class="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-wrench text-blue-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900">传送带#002 - 故障维修</h4>
                                    <p class="text-sm text-gray-600">更换磨损皮带，调整张力</p>
                                    <div class="flex items-center text-xs text-gray-500 mt-1">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>2024-01-12 09:15</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>李技师</span>
                                    </div>
                                </div>
                                <span class="text-xs text-blue-600 font-medium">已完成</span>
                            </div>
                            
                            <div class="flex items-start p-3 border border-gray-200 rounded-lg">
                                <div class="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                    <i class="fas fa-clock text-yellow-600"></i>
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900">压力机#003 - 紧急维护</h4>
                                    <p class="text-sm text-gray-600">液压系统检修，更换密封件</p>
                                    <div class="flex items-center text-xs text-gray-500 mt-1">
                                        <i class="fas fa-calendar mr-1"></i>
                                        <span>2024-01-16 14:00</span>
                                        <i class="fas fa-user ml-3 mr-1"></i>
                                        <span>张工程师</span>
                                    </div>
                                </div>
                                <span class="text-xs text-yellow-600 font-medium">进行中</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">AI智能建议</h3>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">AI分析</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                                <div class="flex items-start">
                                    <i class="fas fa-brain text-purple-600 mt-1 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-purple-900 mb-2">优化维护策略</h4>
                                        <p class="text-sm text-purple-700 mb-3">基于历史数据分析，建议将压力机#003的维护周期从30天调整为25天，可降低故障风险35%。</p>
                                        <button class="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700">采纳建议</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                                <div class="flex items-start">
                                    <i class="fas fa-chart-line text-blue-600 mt-1 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-blue-900 mb-2">备件库存优化</h4>
                                        <p class="text-sm text-blue-700 mb-3">预测未来30天内传送带皮带需求量为3条，建议提前采购以避免停机等待。</p>
                                        <button class="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">查看详情</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 bg-gradient-to-r from-green-50 to-yellow-50 border border-green-200 rounded-lg">
                                <div class="flex items-start">
                                    <i class="fas fa-leaf text-green-600 mt-1 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-green-900 mb-2">能耗优化建议</h4>
                                        <p class="text-sm text-green-700 mb-3">机械臂#001在非高峰时段可降低运行速度20%，预计每月节约电费1,200元。</p>
                                        <button class="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700">应用设置</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

});

    // 智能生产监控页面内容
    function getProductionMonitoringContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">智能生产监控</h1>
                <p class="text-gray-600 mt-2">实时监控生产线状态、设备运行情况和生产效率指标</p>
            </div>
            
            <!-- 实时监控概览 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">生产线状态</p>
                            <p class="text-2xl font-bold text-green-600">运行中</p>
                        </div>
                        <div class="p-3 bg-green-100 rounded-lg">
                            <i class="fas fa-play text-green-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-arrow-up text-green-500 mr-1"></i>
                            <span>正常运行 8小时</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">当日产量</p>
                            <p class="text-2xl font-bold text-blue-600">2,456</p>
                        </div>
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <i class="fas fa-boxes text-blue-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-arrow-up text-green-500 mr-1"></i>
                            <span>较昨日 +12%</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">设备效率</p>
                            <p class="text-2xl font-bold text-purple-600">87.5%</p>
                        </div>
                        <div class="p-3 bg-purple-100 rounded-lg">
                            <i class="fas fa-tachometer-alt text-purple-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-arrow-up text-green-500 mr-1"></i>
                            <span>较上周 +3.2%</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-600">质量合格率</p>
                            <p class="text-2xl font-bold text-orange-600">99.2%</p>
                        </div>
                        <div class="p-3 bg-orange-100 rounded-lg">
                            <i class="fas fa-check-circle text-orange-600 text-xl"></i>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center text-sm text-gray-500">
                            <i class="fas fa-arrow-up text-green-500 mr-1"></i>
                            <span>较上月 +0.8%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 生产线监控 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">生产线实时状态</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">生产线A</h4>
                                        <p class="text-sm text-gray-600">装配工序</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-green-600">运行中</p>
                                    <p class="text-xs text-gray-500">效率: 92%</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">生产线B</h4>
                                        <p class="text-sm text-gray-600">包装工序</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-green-600">运行中</p>
                                    <p class="text-xs text-gray-500">效率: 88%</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">生产线C</h4>
                                        <p class="text-sm text-gray-600">质检工序</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-yellow-600">维护中</p>
                                    <p class="text-xs text-gray-500">预计: 30分钟</p>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                <div class="flex items-center">
                                    <div class="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                    <div>
                                        <h4 class="font-medium text-gray-900">生产线D</h4>
                                        <p class="text-sm text-gray-600">喷涂工序</p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium text-red-600">故障</p>
                                    <p class="text-xs text-gray-500">需要维修</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">设备运行监控</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-robot text-blue-600 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-900">机械臂#001</h4>
                                        <p class="text-sm text-gray-600">温度: 45°C | 振动: 正常</p>
                                    </div>
                                </div>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">正常</span>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-cog text-purple-600 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-900">传送带#002</h4>
                                        <p class="text-sm text-gray-600">速度: 2.5m/s | 负载: 78%</p>
                                    </div>
                                </div>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">正常</span>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-industry text-orange-600 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-900">压力机#003</h4>
                                        <p class="text-sm text-gray-600">压力: 850bar | 循环: 1200次</p>
                                    </div>
                                </div>
                                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">警告</span>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-fire text-red-600 mr-3"></i>
                                    <div>
                                        <h4 class="font-medium text-gray-900">加热炉#004</h4>
                                        <p class="text-sm text-gray-600">温度: 1250°C | 能耗: 高</p>
                                    </div>
                                </div>
                                <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">异常</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 生产数据图表 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">产量趋势</h3>
                            <select class="text-sm border border-gray-300 rounded-md px-3 py-1">
                                <option>今日</option>
                                <option>本周</option>
                                <option>本月</option>
                            </select>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="h-64 flex items-end justify-between space-x-2">
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-blue-500 rounded-t" style="height: 120px;"></div>
                                <span class="text-xs text-gray-500 mt-2">08:00</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-blue-500 rounded-t" style="height: 150px;"></div>
                                <span class="text-xs text-gray-500 mt-2">10:00</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-blue-500 rounded-t" style="height: 180px;"></div>
                                <span class="text-xs text-gray-500 mt-2">12:00</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-blue-500 rounded-t" style="height: 160px;"></div>
                                <span class="text-xs text-gray-500 mt-2">14:00</span>
                            </div>
                            <div class="flex flex-col items-center">
                                <div class="w-8 bg-blue-500 rounded-t" style="height: 200px;"></div>
                                <span class="text-xs text-gray-500 mt-2">16:00</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">设备效率分析</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">生产线A</span>
                                    <span class="text-sm text-gray-500">92%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 92%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">生产线B</span>
                                    <span class="text-sm text-gray-500">88%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 88%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">生产线C</span>
                                    <span class="text-sm text-gray-500">65%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-yellow-600 h-2 rounded-full" style="width: 65%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-sm font-medium text-gray-700">生产线D</span>
                                    <span class="text-sm text-gray-500">0%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 0%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 实时报警和操作面板 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">实时报警</h3>
                            <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">2个活跃</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="space-y-3">
                            <div class="flex items-start p-3 bg-red-50 border border-red-200 rounded-lg">
                                <i class="fas fa-exclamation-triangle text-red-500 mt-1 mr-3"></i>
                                <div class="flex-1">
                                    <h4 class="font-medium text-red-900">设备故障</h4>
                                    <p class="text-sm text-red-700">生产线D加热炉温度异常，需要立即检修</p>
                                    <p class="text-xs text-red-600 mt-1">2分钟前</p>
                                </div>
                                <button class="text-red-600 hover:text-red-800 text-sm">处理</button>
                            </div>
                            
                            <div class="flex items-start p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <i class="fas fa-exclamation-circle text-yellow-500 mt-1 mr-3"></i>
                                <div class="flex-1">
                                    <h4 class="font-medium text-yellow-900">效率警告</h4>
                                    <p class="text-sm text-yellow-700">压力机#003循环次数接近维护阈值</p>
                                    <p class="text-xs text-yellow-600 mt-1">15分钟前</p>
                                </div>
                                <button class="text-yellow-600 hover:text-yellow-800 text-sm">查看</button>
                            </div>
                            
                            <div class="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                <div class="flex-1">
                                    <h4 class="font-medium text-green-900">维护完成</h4>
                                    <p class="text-sm text-green-700">生产线C质检设备维护已完成，可恢复生产</p>
                                    <p class="text-xs text-green-600 mt-1">1小时前</p>
                                </div>
                                <button class="text-green-600 hover:text-green-800 text-sm">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">快速操作</h3>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-2 gap-4">
                            <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <i class="fas fa-play text-green-600 text-2xl mb-2"></i>
                                <span class="text-sm font-medium text-gray-900">启动生产线</span>
                            </button>
                            
                            <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <i class="fas fa-pause text-yellow-600 text-2xl mb-2"></i>
                                <span class="text-sm font-medium text-gray-900">暂停生产</span>
                            </button>
                            
                            <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <i class="fas fa-tools text-blue-600 text-2xl mb-2"></i>
                                <span class="text-sm font-medium text-gray-900">维护模式</span>
                            </button>
                            
                            <button class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <i class="fas fa-download text-purple-600 text-2xl mb-2"></i>
                                <span class="text-sm font-medium text-gray-900">导出报告</span>
                            </button>
                        </div>
                        
                        <div class="mt-6 pt-6 border-t border-gray-200">
                            <h4 class="font-medium text-gray-900 mb-3">生产计划</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600">今日目标:</span>
                                    <span class="font-medium">3,000件</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600">当前进度:</span>
                                    <span class="font-medium text-blue-600">2,456件 (82%)</span>
                                </div>
                                <div class="flex justify-between items-center text-sm">
                                    <span class="text-gray-600">预计完成:</span>
                                    <span class="font-medium text-green-600">18:30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 加载页面内容的函数
    function loadPageContent(sectionId) {
        // 隐藏默认dashboard
        $('#dashboard').removeClass('active');
        
        let content = '';
        
        switch(sectionId) {
            case 'ai-assessment':
                content = getAIAssessmentContent();
                break;
            case 'data-collection':
                content = getDataCollectionContent();
                break;
            case 'gpu-resources':
                content = getGPUResourcesContent();
                break;
            case 'tool-platforms':
                content = getToolPlatformsContent();
                break;
            case 'prompt-list':
                content = getPromptListContent();
                break;
            case 'agent-list':
                content = getAgentListContent();
                break;
            case 'product-design':
                content = getProductDesignContent();
                break;
            case 'knowledge-rag':
                content = getKnowledgeRAGContent();
                break;
            case 'visual-inspection':
                content = getVisualInspectionContent();
                break;
            case 'supply-chain':
                content = getSupplyChainContent();
                break;
            case 'manufacturing-scenario1':
                content = getProductionMonitoringContent();
                break;
            case 'manufacturing-scenario2':
                content = getPredictiveMaintenanceContent();
                break;
            case 'smart-customer-service':
                content = getSmartCustomerServiceContent();
                break;
            case 'data-analysis':
                content = getDataAnalysisContent();
                break;
            case 'smart-recommendation':
                content = getSmartRecommendationContent();
                break;
            case 'other-scenarios':
                content = getOtherScenariosContent();
                break;
            default:
                content = '<div class="text-center py-12"><h2 class="text-xl text-gray-600">页面正在开发中...</h2></div>';
        }
        
        // 移除现有的动态内容
        $('.dynamic-content').remove();
        
        // 添加新内容
        $('#main-content').append('<div class="content-section active dynamic-content" id="' + sectionId + '">' + content + '</div>');
    }
    
    // AI转型评估页面内容
    function getAIAssessmentContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">AI转型评估</h1>
                <p class="text-gray-600 mt-2">全面评估企业AI转型准备度，制定个性化转型方案</p>
            </div>
            
            <!-- 评估进度条 -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">评估进度</h3>
                    <span class="text-sm text-gray-600">第 1 步，共 4 步</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: 25%"></div>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-500">
                    <span>基础信息</span>
                    <span>技术能力</span>
                    <span>数据准备</span>
                    <span>组织准备</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- 转型准备度指标 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">转型准备度</h3>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">技术基础</span>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 75%"></div>
                                </div>
                                <span class="text-sm font-medium">75%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">数据准备</span>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 60%"></div>
                                </div>
                                <span class="text-sm font-medium">60%</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">组织准备</span>
                            <div class="flex items-center">
                                <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div class="bg-yellow-500 h-2 rounded-full" style="width: 45%"></div>
                                </div>
                                <span class="text-sm font-medium">45%</span>
                            </div>
                        </div>
                        <div class="border-t pt-4 mt-4">
                            <div class="flex items-center justify-between">
                                <span class="text-sm font-semibold text-gray-900">综合评分</span>
                                <span class="text-lg font-bold text-blue-600">B+</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 快速建议 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">快速建议</h3>
                    <div class="space-y-3">
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-900">优先级：高</p>
                                <p class="text-xs text-gray-600">建立AI治理框架和数据管理体系</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-900">优先级：中</p>
                                <p class="text-xs text-gray-600">开展AI技能培训和人才储备</p>
                            </div>
                        </div>
                        <div class="flex items-start space-x-3">
                            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                                <p class="text-sm font-medium text-gray-900">优先级：低</p>
                                <p class="text-xs text-gray-600">选择合适的AI应用场景试点</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 评估结果概览 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">评估结果</h3>
                    <div class="text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
                            <span class="text-2xl font-bold text-blue-600">B+</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-3">您的企业具备良好的AI转型基础</p>
                        <div class="space-y-2 text-xs text-left">
                            <div class="flex justify-between">
                                <span class="text-gray-600">推荐方案数</span>
                                <span class="font-medium">5个</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">预期ROI</span>
                                <span class="font-medium text-green-600">180%</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">实施周期</span>
                                <span class="font-medium">6-12个月</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- 多步骤评估问卷 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">详细评估问卷</h3>
                    <div id="assessment-form">
                        <!-- 第一步：基础信息 -->
                        <div class="assessment-step active" data-step="1">
                            <h4 class="font-medium text-gray-900 mb-4">第一步：基础信息</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">企业规模</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择企业规模</option>
                                        <option value="small">小型企业 (50人以下)</option>
                                        <option value="medium">中型企业 (50-500人)</option>
                                        <option value="large">大型企业 (500人以上)</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">所属行业</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择行业</option>
                                        <option value="manufacturing">制造业</option>
                                        <option value="retail">零售业</option>
                                        <option value="finance">金融业</option>
                                        <option value="healthcare">医疗健康</option>
                                        <option value="logistics">物流运输</option>
                                        <option value="other">其他</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">年营业额</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择年营业额</option>
                                        <option value="under1m">100万以下</option>
                                        <option value="1m-10m">100万-1000万</option>
                                        <option value="10m-100m">1000万-1亿</option>
                                        <option value="over100m">1亿以上</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 第二步：技术能力 -->
                        <div class="assessment-step" data-step="2" style="display: none;">
                            <h4 class="font-medium text-gray-900 mb-4">第二步：技术能力评估</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">当前数字化成熟度</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="radio" name="digitalization" value="1" class="mr-2">
                                            <span class="text-sm">Level 1 - 传统运营：主要依赖人工和纸质记录</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="digitalization" value="2" class="mr-2">
                                            <span class="text-sm">Level 2 - 基础数字化：使用基础ERP/MES系统</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="digitalization" value="3" class="mr-2">
                                            <span class="text-sm">Level 3 - 集成化：系统间有数据集成和自动化</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="digitalization" value="4" class="mr-2">
                                            <span class="text-sm">Level 4 - 智能化：有预测分析和智能决策支持</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="digitalization" value="5" class="mr-2">
                                            <span class="text-sm">Level 5 - 自主化：全面AI驱动的自主运营</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">制造执行系统(MES)部署情况</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择MES部署情况</option>
                                        <option value="none">未部署MES系统</option>
                                        <option value="basic">基础MES - 生产计划和追踪</option>
                                        <option value="advanced">高级MES - 包含质量管理和设备集成</option>
                                        <option value="integrated">集成MES - 与ERP/PLM/SCM全面集成</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">工业物联网(IIoT)应用程度</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" name="iiot_applications" value="sensors" class="mr-2">
                                            <span class="text-sm">设备传感器监控</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="iiot_applications" value="scada" class="mr-2">
                                            <span class="text-sm">SCADA系统集成</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="iiot_applications" value="edge_computing" class="mr-2">
                                            <span class="text-sm">边缘计算部署</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="iiot_applications" value="digital_twin" class="mr-2">
                                            <span class="text-sm">数字孪生应用</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">数据分析能力</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择数据分析能力</option>
                                        <option value="basic">基础报表 - 历史数据查询和简单统计</option>
                                        <option value="descriptive">描述性分析 - 仪表板和KPI监控</option>
                                        <option value="diagnostic">诊断性分析 - 根因分析和异常检测</option>
                                        <option value="predictive">预测性分析 - 趋势预测和预警</option>
                                        <option value="prescriptive">规范性分析 - 优化建议和自动决策</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 第三步：数据准备度 -->
                        <div class="assessment-step" data-step="3" style="display: none;">
                            <h4 class="font-medium text-gray-900 mb-4">第三步：数据准备度评估</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">生产数据收集覆盖率</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="radio" name="data_coverage" value="low" class="mr-2">
                                            <span class="text-sm">低覆盖率 (&lt;30%) - 少量关键设备有数据采集</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="data_coverage" value="medium" class="mr-2">
                                            <span class="text-sm">中等覆盖率 (30-70%) - 主要生产线有数据采集</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="data_coverage" value="high" class="mr-2">
                                            <span class="text-sm">高覆盖率 (&gt;70%) - 全面的设备和工艺数据采集</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">数据质量状况</label>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs text-gray-600 mb-1">数据完整性</label>
                                            <select class="w-full p-2 border border-gray-300 rounded-md text-sm">
                                                <option value="poor">差 - 大量缺失数据</option>
                                                <option value="fair">一般 - 部分缺失</option>
                                                <option value="good">良好 - 少量缺失</option>
                                                <option value="excellent">优秀 - 数据完整</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-600 mb-1">数据准确性</label>
                                            <select class="w-full p-2 border border-gray-300 rounded-md text-sm">
                                                <option value="poor">差 - 错误率&gt;10%</option>
                                                <option value="fair">一般 - 错误率5-10%</option>
                                                <option value="good">良好 - 错误率1-5%</option>
                                                <option value="excellent">优秀 - 错误率&lt;1%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">历史数据积累</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择历史数据积累情况</option>
                                        <option value="limited">&lt;6个月 - 数据积累有限</option>
                                        <option value="basic">6个月-2年 - 基础数据积累</option>
                                        <option value="substantial">2-5年 - 充足的历史数据</option>
                                        <option value="extensive">&gt;5年 - 丰富的长期数据</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">数据类型覆盖</label>
                                    <div class="grid grid-cols-2 gap-2">
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="production" class="mr-2">
                                            <span class="text-sm">生产数据</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="quality" class="mr-2">
                                            <span class="text-sm">质量数据</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="equipment" class="mr-2">
                                            <span class="text-sm">设备数据</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="energy" class="mr-2">
                                            <span class="text-sm">能耗数据</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="supply_chain" class="mr-2">
                                            <span class="text-sm">供应链数据</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" name="data_types" value="customer" class="mr-2">
                                            <span class="text-sm">客户数据</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 第四步：组织准备度 -->
                        <div class="assessment-step" data-step="4" style="display: none;">
                            <h4 class="font-medium text-gray-900 mb-4">第四步：组织准备度评估</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">高层管理支持度</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="radio" name="management_support" value="low" class="mr-2">
                                            <span class="text-sm">低 - 缺乏明确的AI战略和投资承诺</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="management_support" value="medium" class="mr-2">
                                            <span class="text-sm">中 - 有初步AI规划但资源投入有限</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="management_support" value="high" class="mr-2">
                                            <span class="text-sm">高 - 有明确AI战略和充足资源支持</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">AI人才储备</label>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs text-gray-600 mb-1">数据科学家</label>
                                            <select class="w-full p-2 border border-gray-300 rounded-md text-sm">
                                                <option value="0">0人</option>
                                                <option value="1-2">1-2人</option>
                                                <option value="3-5">3-5人</option>
                                                <option value="5+">5人以上</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label class="block text-xs text-gray-600 mb-1">AI工程师</label>
                                            <select class="w-full p-2 border border-gray-300 rounded-md text-sm">
                                                <option value="0">0人</option>
                                                <option value="1-2">1-2人</option>
                                                <option value="3-5">3-5人</option>
                                                <option value="5+">5人以上</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">变革管理能力</label>
                                    <div class="space-y-2">
                                        <label class="flex items-center">
                                            <input type="radio" name="change_management" value="weak" class="mr-2">
                                            <span class="text-sm">弱 - 员工抗拒变化，缺乏培训体系</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="change_management" value="moderate" class="mr-2">
                                            <span class="text-sm">中等 - 有基础培训，部分员工接受新技术</span>
                                        </label>
                                        <label class="flex items-center">
                                            <input type="radio" name="change_management" value="strong" class="mr-2">
                                            <span class="text-sm">强 - 完善的培训体系，员工积极拥抱变化</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">预算投入意愿</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option value="">请选择AI项目预算投入</option>
                                        <option value="low">&lt;年营收1% - 试点性投入</option>
                                        <option value="medium">1-3%年营收 - 战略性投入</option>
                                        <option value="high">3-5%年营收 - 大规模投入</option>
                                        <option value="aggressive">&gt;5%年营收 - 激进式投入</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 导航按钮 -->
                        <div class="flex justify-between mt-6">
                            <button id="prev-step" class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" style="display: none;">上一步</button>
                            <button id="next-step" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">下一步</button>
                        </div>
                    </div>
                </div>
                
                <!-- AI方案推荐 -->
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">AI方案推荐</h3>
                    <div class="space-y-4">
                        <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h4 class="font-medium text-blue-900">智能质检系统</h4>
                                    <p class="text-blue-700 text-sm mt-1">基于计算机视觉的产品质量检测</p>
                                    <div class="mt-2">
                                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ROI: 150%</span>
                                        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-1">周期: 3个月</span>
                                        <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded ml-1">匹配度: 95%</span>
                                    </div>
                                </div>
                                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium" onclick="showSolutionDetails('quality-inspection')">详情</button>
                            </div>
                        </div>
                        
                        <div class="p-4 bg-green-50 rounded-lg border border-green-200">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h4 class="font-medium text-green-900">预测性维护</h4>
                                    <p class="text-green-700 text-sm mt-1">基于IoT数据的设备故障预测</p>
                                    <div class="mt-2">
                                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ROI: 200%</span>
                                        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-1">周期: 4个月</span>
                                        <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded ml-1">匹配度: 88%</span>
                                    </div>
                                </div>
                                <button class="text-green-600 hover:text-green-800 text-sm font-medium" onclick="showSolutionDetails('predictive-maintenance')">详情</button>
                            </div>
                        </div>
                        
                        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div class="flex items-start justify-between">
                                <div class="flex-1">
                                    <h4 class="font-medium text-yellow-900">智能客服系统</h4>
                                    <p class="text-yellow-700 text-sm mt-1">基于NLP的自动客户服务</p>
                                    <div class="mt-2">
                                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">ROI: 120%</span>
                                        <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-1">周期: 2个月</span>
                                        <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded ml-1">匹配度: 82%</span>
                                    </div>
                                </div>
                                <button class="text-yellow-600 hover:text-yellow-800 text-sm font-medium" onclick="showSolutionDetails('smart-customer-service')">详情</button>
                            </div>
                        </div>
                        
                        <div class="flex space-x-2 mt-4">
                            <button class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm" onclick="generateAssessmentReport()">生成完整报告</button>
                            <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm" onclick="startImplementation()">开始实施</button>
                        </div>
                        
                        <!-- AI转型评估报告 -->
                        <div id="assessment-report" class="mt-6 p-4 bg-gray-50 rounded-lg border" style="display: none;">
                            <div class="flex items-center justify-between mb-4">
                                <h4 class="font-semibold text-gray-900">AI转型评估报告</h4>
                                <button onclick="downloadReport()" class="text-blue-600 hover:text-blue-800 text-sm">
                                    <i class="fas fa-download mr-1"></i>下载PDF
                                </button>
                            </div>
                            <div id="report-content">
                                <!-- 报告内容将动态生成 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 方案详情模态框 -->
            <div id="solution-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
                        <div class="p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-xl font-semibold text-gray-900" id="modal-title">方案详情</h3>
                                <button onclick="closeSolutionModal()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div id="modal-content">
                                <!-- 动态内容将在这里显示 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <script>
                // 评估步骤导航
                let currentStep = 1;
                const totalSteps = 4;
                let assessmentData = {};
                
                document.getElementById('next-step').addEventListener('click', function() {
                    if (currentStep < totalSteps) {
                        // 保存当前步骤数据
                        saveCurrentStepData();
                        
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'none';
                        currentStep++;
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'block';
                        
                        // 更新按钮状态
                        document.getElementById('prev-step').style.display = currentStep > 1 ? 'block' : 'none';
                        document.getElementById('next-step').textContent = currentStep === totalSteps ? '完成评估' : '下一步';
                    } else {
                        // 完成评估
                        saveCurrentStepData();
                        completeAssessment();
                    }
                });
                
                document.getElementById('prev-step').addEventListener('click', function() {
                    if (currentStep > 1) {
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'none';
                        currentStep--;
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'block';
                        
                        // 更新按钮状态
                        document.getElementById('prev-step').style.display = currentStep > 1 ? 'block' : 'none';
                        document.getElementById('next-step').textContent = currentStep === totalSteps ? '完成评估' : '下一步';
                    }
                });
                
                // 保存当前步骤数据
                function saveCurrentStepData() {
                    const currentStepElement = document.querySelector('[data-step="' + currentStep + '"]');
                    const inputs = currentStepElement.querySelectorAll('input, select');
                    
                    inputs.forEach(input => {
                        if (input.type === 'radio' || input.type === 'checkbox') {
                            if (input.checked) {
                                if (!assessmentData[input.name]) assessmentData[input.name] = [];
                                if (input.type === 'radio') {
                                    assessmentData[input.name] = input.value;
                                } else {
                                    assessmentData[input.name].push(input.value);
                                }
                            }
                        } else {
                            assessmentData[input.name || 'field_' + Math.random()] = input.value;
                        }
                    });
                }
                
                // 完成评估
                function completeAssessment() {
                    // 计算评估分数
                    const scores = calculateAssessmentScores();
                    
                    // 更新准备度指标
                    updateReadinessIndicators(scores);
                    
                    // 显示评估完成提示
                    alert('评估完成！请查看右侧的转型准备度指标和AI方案推荐。');
                }
                
                // 计算评估分数
                function calculateAssessmentScores() {
                    const scores = {
                        technical: 0,
                        data: 0,
                        organizational: 0,
                        overall: 0
                    };
                    
                    // 技术能力评分
                    const digitalizationScore = parseInt(assessmentData.digitalization) || 1;
                    scores.technical = Math.min(digitalizationScore * 20, 100);
                    
                    // 数据准备度评分
                    let dataScore = 0;
                    if (assessmentData.data_coverage === 'high') dataScore += 40;
                    else if (assessmentData.data_coverage === 'medium') dataScore += 25;
                    else dataScore += 10;
                    
                    if (assessmentData.data_types && assessmentData.data_types.length > 3) dataScore += 30;
                    else if (assessmentData.data_types && assessmentData.data_types.length > 1) dataScore += 20;
                    else dataScore += 10;
                    
                    scores.data = Math.min(dataScore + 30, 100);
                    
                    // 组织准备度评分
                    let orgScore = 0;
                    if (assessmentData.management_support === 'high') orgScore += 40;
                    else if (assessmentData.management_support === 'medium') orgScore += 25;
                    else orgScore += 10;
                    
                    if (assessmentData.change_management === 'strong') orgScore += 35;
                    else if (assessmentData.change_management === 'moderate') orgScore += 20;
                    else orgScore += 10;
                    
                    scores.organizational = Math.min(orgScore + 25, 100);
                    
                    // 综合评分
                    scores.overall = Math.round((scores.technical + scores.data + scores.organizational) / 3);
                    
                    return scores;
                }
                
                // 更新准备度指标
                function updateReadinessIndicators(scores) {
                    document.getElementById('tech-score').textContent = scores.technical + '%';
                    document.getElementById('data-score').textContent = scores.data + '%';
                    document.getElementById('org-score').textContent = scores.organizational + '%';
                    document.getElementById('overall-score').textContent = scores.overall + '%';
                    
                    // 更新进度条
                    document.querySelector('#tech-progress .bg-blue-600').style.width = scores.technical + '%';
                    document.querySelector('#data-progress .bg-green-600').style.width = scores.data + '%';
                    document.querySelector('#org-progress .bg-purple-600').style.width = scores.organizational + '%';
                    document.querySelector('#overall-progress .bg-indigo-600').style.width = scores.overall + '%';
                }
                
                // 生成评估报告
                function generateAssessmentReport() {
                    const scores = calculateAssessmentScores();
                    const reportContent = generateReportContent(scores);
                    
                    document.getElementById('report-content').innerHTML = reportContent;
                    document.getElementById('assessment-report').style.display = 'block';
                    
                    // 滚动到报告位置
                    document.getElementById('assessment-report').scrollIntoView({ behavior: 'smooth' });
                }
                
                // 生成报告内容
                function generateReportContent(scores) {
                    const currentDate = new Date().toLocaleDateString('zh-CN');
                    const readinessLevel = getReadinessLevel(scores.overall);
                    const recommendations = getRecommendations(scores);
                    const roiPrediction = calculateROIPrediction(scores);
                    
                    return '<div class="space-y-6">' +
                        '<!-- 报告头部 -->' +
                        '<div class="border-b pb-4">' +
                            '<h3 class="text-lg font-semibold text-gray-900">智能制造AI转型评估报告</h3>' +
                            '<p class="text-sm text-gray-600 mt-1">评估日期：' + currentDate + ' | 基于埃森哲AI成熟度模型</p>' +
                        '</div>' +
                        
                        '<!-- 执行摘要 -->' +
                        '<div>' +
                            '<h4 class="font-medium text-gray-900 mb-3">执行摘要</h4>' +
                            '<div class="bg-' + readinessLevel.color + '-50 border border-' + readinessLevel.color + '-200 rounded-lg p-4">' +
                                '<div class="flex items-center mb-2">' +
                                    '<span class="inline-block w-3 h-3 bg-' + readinessLevel.color + '-500 rounded-full mr-2"></span>' +
                                    '<span class="font-medium text-' + readinessLevel.color + '-900">' + readinessLevel.title + '</span>' +
                                    '<span class="ml-2 text-sm text-' + readinessLevel.color + '-700">(综合评分: ' + scores.overall + '%)</span>' +
                                '</div>' +
                                '<p class="text-sm text-' + readinessLevel.color + '-800">' + readinessLevel.description + '</p>' +
                            '</div>' +
                        '</div>'
                            +
                            '<!-- 详细评估结果 -->' +
                            '<div>' +
                                '<h4 class="font-medium text-gray-900 mb-3">详细评估结果</h4>' +
                                '<div class="grid grid-cols-3 gap-4">' +
                                    '<div class="text-center p-3 bg-blue-50 rounded-lg">' +
                                        '<div class="text-2xl font-bold text-blue-600">' + scores.technical + '%</div>' +
                                        '<div class="text-sm text-blue-800">技术基础</div>' +
                                        '<div class="text-xs text-blue-600 mt-1">' + getTechnicalAssessment(scores.technical) + '</div>' +
                                    '</div>' +
                                    '<div class="text-center p-3 bg-green-50 rounded-lg">' +
                                        '<div class="text-2xl font-bold text-green-600">' + scores.data + '%</div>' +
                                        '<div class="text-sm text-green-800">数据准备</div>' +
                                        '<div class="text-xs text-green-600 mt-1">' + getDataAssessment(scores.data) + '</div>' +
                                    '</div>' +
                                    '<div class="text-center p-3 bg-purple-50 rounded-lg">' +
                                        '<div class="text-2xl font-bold text-purple-600">' + scores.organizational + '%</div>' +
                                        '<div class="text-sm text-purple-800">组织准备</div>' +
                                        '<div class="text-xs text-purple-600 mt-1">' + getOrganizationalAssessment(scores.organizational) + '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            
                            '<!-- 转型路径建议 -->' +
                            '<div>' +
                                '<h4 class="font-medium text-gray-900 mb-3">转型路径建议</h4>' +
                                '<div class="space-y-3">' +
                                    recommendations.map(function(rec, index) {
                                        return '<div class="flex items-start p-3 bg-gray-50 rounded-lg">' +
                                            '<span class="inline-block w-6 h-6 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center justify-center mr-3 mt-0.5">' + (index + 1) + '</span>' +
                                            '<div class="flex-1">' +
                                                '<h5 class="font-medium text-gray-900">' + rec.phase + '</h5>' +
                                                '<p class="text-sm text-gray-600 mt-1">' + rec.description + '</p>' +
                                                '<div class="flex items-center mt-2 text-xs text-gray-500">' +
                                                    '<span class="mr-4">⏱️ ' + rec.duration + '</span>' +
                                                    '<span class="mr-4">💰 ' + rec.investment + '</span>' +
                                                    '<span>📈 ' + rec.expectedROI + '</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
                                    }).join('') +
                                '</div>' +
                            '</div>' +
                            
                            '<!-- ROI预测 -->' +
                            '<div>' +
                                '<h4 class="font-medium text-gray-900 mb-3">投资回报预测</h4>' +
                                '<div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">' +
                                    '<div class="grid grid-cols-2 gap-4">' +
                                        '<div>' +
                                            '<h5 class="font-medium text-gray-900 mb-2">预期收益</h5>' +
                                            '<ul class="text-sm text-gray-700 space-y-1">' +
                                                roiPrediction.benefits.map(function(benefit) { return '<li>• ' + benefit + '</li>'; }).join('')
                                            '</ul>' +
                                        '</div>' +
                                        '<div>' +
                                            '<h5 class="font-medium text-gray-900 mb-2">关键指标</h5>' +
                                            '<div class="space-y-2">' +
                                                '<div class="flex justify-between">' +
                                                    '<span class="text-sm text-gray-600">预期ROI:</span>' +
                                                    '<span class="font-medium text-green-600">' + roiPrediction.roi + '</span>' +
                                                '</div>' +
                                                '<div class="flex justify-between">' +
                                                    '<span class="text-sm text-gray-600">回收周期:</span>' +
                                                    '<span class="font-medium text-blue-600">' + roiPrediction.paybackPeriod + '</span>' +
                                                '</div>' +
                                                '<div class="flex justify-between">' +
                                                    '<span class="text-sm text-gray-600">风险等级:</span>' +
                                                    '<span class="font-medium text-' + roiPrediction.riskLevel.color + '-600">' + roiPrediction.riskLevel.level + '</span>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            
                            '<!-- 下一步行动 -->' +
                            '<div>' +
                                '<h4 class="font-medium text-gray-900 mb-3">建议的下一步行动</h4>' +
                                '<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">' +
                                    '<div class="flex items-start">' +
                                        '<i class="fas fa-lightbulb text-yellow-500 mt-1 mr-3"></i>' +
                                        '<div>' +
                                            '<h5 class="font-medium text-yellow-900 mb-2">立即行动项</h5>' +
                                            '<ul class="text-sm text-yellow-800 space-y-1">' +
                                                '<li>• 成立AI转型项目组，明确责任人和时间表</li>' +
                                                '<li>• 进行详细的数据审计和清理工作</li>' +
                                                '<li>• 选择1-2个高价值、低风险的试点项目</li>' +
                                                '<li>• 制定员工培训和变革管理计划</li>' +
                                                '<li>• 建立AI项目的成功衡量指标和监控机制</li>' +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
                }
                
                // 获取准备度等级
                function getReadinessLevel(score) {
                    if (score >= 80) {
                        return {
                            title: '高度准备就绪',
                            color: 'green',
                            description: '您的企业已具备良好的AI转型基础，可以开始实施全面的AI转型计划。建议优先推进高价值AI应用场景。'
                        };
                    } else if (score >= 60) {
                        return {
                            title: '基本准备就绪',
                            color: 'blue',
                            description: '您的企业具备一定的AI转型基础，建议先完善数据基础设施，然后逐步推进AI应用。'
                        };
                    } else if (score >= 40) {
                        return {
                            title: '需要准备',
                            color: 'yellow',
                            description: '您的企业需要在技术、数据和组织方面进行更多准备工作，建议从基础数字化改造开始。'
                        };
                    } else {
                        return {
                            title: '准备不足',
                            color: 'red',
                            description: '建议先完成基础的数字化转型，建立必要的技术基础设施和数据收集能力。'
                        };
                    }
                }
                
                // 获取技术评估
                function getTechnicalAssessment(score) {
                    if (score >= 80) return '技术基础扎实';
                    if (score >= 60) return '技术基础良好';
                    if (score >= 40) return '技术基础一般';
                    return '技术基础薄弱';
                }
                
                // 获取数据评估
                function getDataAssessment(score) {
                    if (score >= 80) return '数据资产丰富';
                    if (score >= 60) return '数据基础良好';
                    if (score >= 40) return '数据准备一般';
                    return '数据基础薄弱';
                }
                
                // 获取组织评估
                function getOrganizationalAssessment(score) {
                    if (score >= 80) return '组织高度支持';
                    if (score >= 60) return '组织基本支持';
                    if (score >= 40) return '组织支持一般';
                    return '组织支持不足';
                }
                
                // 获取转型建议
                function getRecommendations(scores) {
                    const recommendations = [];
                    
                    if (scores.overall >= 70) {
                        recommendations.push(
                            {
                                phase: '第一阶段：AI试点项目',
                                description: '选择2-3个高价值AI应用场景进行试点，如智能质检、预测性维护等',
                                duration: '3-6个月',
                                investment: '中等投入',
                                expectedROI: '150-200%'
                            },
                            {
                                phase: '第二阶段：规模化部署',
                                description: '基于试点成果，将成功的AI应用扩展到更多业务场景',
                                duration: '6-12个月',
                                investment: '大规模投入',
                                expectedROI: '200-300%'
                            },
                            {
                                phase: '第三阶段：智能化运营',
                                description: '建立端到端的智能化运营体系，实现全面的AI驱动决策',
                                duration: '12-24个月',
                                investment: '持续投入',
                                expectedROI: '300%+'
                            }
                        );
                    } else if (scores.overall >= 50) {
                        recommendations.push(
                            {
                                phase: '第一阶段：基础设施完善',
                                description: '完善数据收集和存储基础设施，提升数据质量和覆盖率',
                                duration: '3-6个月',
                                investment: '中等投入',
                                expectedROI: '基础建设'
                            },
                            {
                                phase: '第二阶段：AI能力建设',
                                description: '建立AI团队，开展员工培训，选择1-2个简单AI项目试点',
                                duration: '6-9个月',
                                investment: '中等投入',
                                expectedROI: '100-150%'
                            },
                            {
                                phase: '第三阶段：逐步扩展',
                                description: '基于试点经验，逐步扩展AI应用到更多业务场景',
                                duration: '9-18个月',
                                investment: '逐步增加',
                                expectedROI: '150-250%'
                            }
                        );
                    } else {
                        recommendations.push(
                            {
                                phase: '第一阶段：数字化基础',
                                description: '完成基础的数字化改造，建立ERP、MES等核心业务系统',
                                duration: '6-12个月',
                                investment: '大规模投入',
                                expectedROI: '数字化收益'
                            },
                            {
                                phase: '第二阶段：数据治理',
                                description: '建立数据治理体系，提升数据质量和管理能力',
                                duration: '6-9个月',
                                investment: '中等投入',
                                expectedROI: '管理效率提升'
                            },
                            {
                                phase: '第三阶段：AI准备',
                                description: '培养AI人才，建立AI项目管理能力，为未来AI应用做准备',
                                duration: '3-6个月',
                                investment: '小规模投入',
                                expectedROI: '能力建设'
                            }
                        );
                    }
                    
                    return recommendations;
                }
                
                // 计算ROI预测
                function calculateROIPrediction(scores) {
                    let roi, paybackPeriod, riskLevel, benefits;
                    
                    if (scores.overall >= 70) {
                        roi = '180-250%';
                        paybackPeriod = '12-18个月';
                        riskLevel = { level: '低风险', color: 'green' };
                        benefits = [
                            '生产效率提升20-30%',
                            '质量缺陷率降低50-70%',
                            '设备故障率减少40-60%',
                            '能耗成本降低15-25%',
                            '人工成本节省30-40%'
                        ];
                    } else if (scores.overall >= 50) {
                        roi = '120-180%';
                        paybackPeriod = '18-24个月';
                        riskLevel = { level: '中等风险', color: 'yellow' };
                        benefits = [
                            '生产效率提升15-25%',
                            '质量缺陷率降低30-50%',
                            '设备故障率减少25-40%',
                            '能耗成本降低10-20%',
                            '人工成本节省20-30%'
                        ];
                    } else {
                        roi = '80-120%';
                        paybackPeriod = '24-36个月';
                        riskLevel = { level: '高风险', color: 'red' };
                        benefits = [
                            '生产效率提升10-20%',
                            '质量缺陷率降低20-30%',
                            '设备故障率减少15-25%',
                            '能耗成本降低5-15%',
                            '人工成本节省15-25%'
                        ];
                    }
                    
                    return { roi, paybackPeriod, riskLevel, benefits };
                }
                
                // 开始实施
                function startImplementation() {
                    alert('感谢您的信任！我们的AI转型专家将在24小时内与您联系，制定详细的实施计划。');
                }
                
                // 下载报告
                function downloadReport() {
                    // 这里可以集成PDF生成库，如jsPDF
                    alert('报告下载功能开发中，您可以先保存当前页面或截图保存报告内容。');
                }
                        
                        // 更新进度条
                        const progress = (currentStep / totalSteps) * 100;
                        document.querySelector('.bg-blue-600').style.width = progress + '%';
                    }
                });
                
                document.getElementById('prev-step').addEventListener('click', function() {
                    if (currentStep > 1) {
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'none';
                        currentStep--;
                        document.querySelector('[data-step="' + currentStep + '"]').style.display = 'block';
                        
                        // 更新按钮状态
                        document.getElementById('prev-step').style.display = currentStep > 1 ? 'block' : 'none';
                        document.getElementById('next-step').textContent = '下一步';
                        
                        // 更新进度条
                        const progress = (currentStep / totalSteps) * 100;
                        document.querySelector('.bg-blue-600').style.width = progress + '%';
                    }
                });
                
                // 方案详情模态框
                function showSolutionDetails(solutionType) {
                    const modal = document.getElementById('solution-modal');
                    const title = document.getElementById('modal-title');
                    const content = document.getElementById('modal-content');
                    
                    let solutionData = {
                        'quality-inspection': {
                            title: '智能质检系统详情',
                            content: '<div class="space-y-4">' +
                                '<div class="bg-blue-50 p-4 rounded-lg">' +
                                    '<h4 class="font-medium text-blue-900 mb-2">方案概述</h4>' +
                                    '<p class="text-blue-700 text-sm">采用深度学习和计算机视觉技术，实现产品质量的自动化检测，提高检测精度和效率。</p>' +
                                '</div>' +
                                '<div class="grid grid-cols-2 gap-4">' +
                                    '<div class="bg-gray-50 p-3 rounded">' +
                                        '<h5 class="font-medium text-gray-900 text-sm">技术栈</h5>
                                            <ul class="text-xs text-gray-600 mt-1 space-y-1">
                                                <li>• OpenCV + TensorFlow</li>
                                                <li>• YOLO目标检测</li>
                                                <li>• 边缘计算部署</li>
                                            </ul>' +
                                        '</div>' +
                                        '<div class="bg-gray-50 p-3 rounded">' +
                                            '<h5 class="font-medium text-gray-900 text-sm">预期效果</h5>' +
                                            '<ul class="text-xs text-gray-600 mt-1 space-y-1">' +
                                                '<li>• 检测精度 >99%</li>' +
                                                '<li>• 效率提升 300%</li>' +
                                                '<li>• 人工成本降低 60%</li>' +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="bg-green-50 p-4 rounded-lg">' +
                                        '<h4 class="font-medium text-green-900 mb-2">实施计划</h4>' +
                                        '<div class="space-y-2 text-sm text-green-700">' +
                                            '<div class="flex justify-between">' +
                                                '<span>第1个月：需求分析和数据收集</span>' +
                                                '<span class="text-xs bg-green-100 px-2 py-1 rounded">准备阶段</span>' +
                                            '</div>' +
                                            '<div class="flex justify-between">' +
                                                '<span>第2个月：模型训练和优化</span>' +
                                                '<span class="text-xs bg-yellow-100 px-2 py-1 rounded">开发阶段</span>' +
                                            '</div>' +
                                            '<div class="flex justify-between">' +
                                                '<span>第3个月：系统集成和测试</span>' +
                                                '<span class="text-xs bg-blue-100 px-2 py-1 rounded">部署阶段</span>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'
                        },
                        'predictive-maintenance': {
                            title: '预测性维护详情',
                            content: '<div class="space-y-4">' +
                                '<div class="bg-green-50 p-4 rounded-lg">' +
                                    '<h4 class="font-medium text-green-900 mb-2">方案概述</h4>' +
                                    '<p class="text-green-700 text-sm">通过IoT传感器收集设备运行数据，使用机器学习算法预测设备故障，实现主动维护。</p>' +
                                '</div>' +
                                '<div class="grid grid-cols-2 gap-4">' +
                                    '<div class="bg-gray-50 p-3 rounded">' +
                                        '<h5 class="font-medium text-gray-900 text-sm">核心功能</h5>' +
                                        '<ul class="text-xs text-gray-600 mt-1 space-y-1">' +
                                            '<li>• 实时监控设备状态</li>' +
                                            '<li>• 故障预测算法</li>' +
                                            '<li>• 维护计划优化</li>' +
                                        '</ul>' +
                                    '</div>' +
                                    '<div class="bg-gray-50 p-3 rounded">' +
                                        '<h5 class="font-medium text-gray-900 text-sm">业务价值</h5>' +
                                        '<ul class="text-xs text-gray-600 mt-1 space-y-1">' +
                                            '<li>• 减少停机时间 80%</li>' +
                                            '<li>• 维护成本降低 40%</li>' +
                                            '<li>• 设备寿命延长 25%</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        },
                        'smart-customer-service': {
                            title: '智能客服系统详情',
                            content: '<div class="space-y-4">' +
                                '<div class="bg-yellow-50 p-4 rounded-lg">' +
                                    '<h4 class="font-medium text-yellow-900 mb-2">方案概述</h4>' +
                                    '<p class="text-yellow-700 text-sm">基于自然语言处理技术，提供24/7智能客户服务，提升客户满意度和服务效率。</p>' +
                                '</div>' +
                                '<div class="grid grid-cols-2 gap-4">' +
                                    '<div class="bg-gray-50 p-3 rounded">' +
                                        '<h5 class="font-medium text-gray-900 text-sm">主要特性</h5>' +
                                        '<ul class="text-xs text-gray-600 mt-1 space-y-1">' +
                                            '<li>• 多轮对话理解</li>' +
                                            '<li>• 知识库问答</li>' +
                                            '<li>• 情感分析</li>' +
                                        '</ul>' +
                                    '</div>' +
                                    '<div class="bg-gray-50 p-3 rounded">' +
                                        '<h5 class="font-medium text-gray-900 text-sm">服务提升</h5>' +
                                        '<ul class="text-xs text-gray-600 mt-1 space-y-1">' +
                                            '<li>• 响应时间 <1秒</li>' +
                                            '<li>• 问题解决率 85%</li>' +
                                            '<li>• 客户满意度 >4.5</li>' +
                                        '</ul>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'
                        }
                    };
                    
                    if (solutionData[solutionType]) {
                        title.textContent = solutionData[solutionType].title;
                        content.innerHTML = solutionData[solutionType].content;
                        modal.classList.remove('hidden');
                    }
                }
                
                function closeSolutionModal() {
                    document.getElementById('solution-modal').classList.add('hidden');
                }
            </script>
        `;    }
    
    // 智能客服页面内容
    function getSmartCustomerServiceContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">智能客服</h1>
                <p class="text-gray-600 mt-2">基于大模型的智能客服系统，提供7x24小时客户服务支持</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">今日咨询</h3>
                        <i class="fas fa-comments text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">1,247</div>
                    <p class="text-gray-600 text-sm">比昨日 +12%</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">解决率</h3>
                        <i class="fas fa-check-circle text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">94.2%</div>
                    <p class="text-gray-600 text-sm">自动解决问题</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">满意度</h3>
                        <i class="fas fa-star text-yellow-500"></i>
                    </div>
                    <div class="text-2xl font-bold text-yellow-500 mb-2">4.8</div>
                    <p class="text-gray-600 text-sm">用户评分</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">实时对话</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4 mb-4 h-64 overflow-y-auto">
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-100 p-2 rounded-full">
                                    <i class="fas fa-user text-blue-600"></i>
                                </div>
                                <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                                    <p class="text-sm">你好，我想了解一下你们的产品质量检测服务</p>
                                    <span class="text-xs text-gray-500">14:32</span>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-3 justify-end">
                                <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                                    <p class="text-sm">您好！我们提供基于AI的智能质量检测服务，包括视觉检测、缺陷识别等。请问您需要检测什么类型的产品？</p>
                                    <span class="text-xs text-blue-200">14:32</span>
                                </div>
                                <div class="bg-blue-600 p-2 rounded-full">
                                    <i class="fas fa-robot text-white"></i>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-3">
                                <div class="bg-blue-100 p-2 rounded-full">
                                    <i class="fas fa-user text-blue-600"></i>
                                </div>
                                <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                                    <p class="text-sm">主要是电子产品的外观检测，比如手机屏幕的划痕检测</p>
                                    <span class="text-xs text-gray-500">14:33</span>
                                </div>
                            </div>
                            
                            <div class="flex items-start space-x-3 justify-end">
                                <div class="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                                    <p class="text-sm">我们的视觉检测系统非常适合电子产品外观检测，检测精度可达99.2%，支持划痕、污点、变形等多种缺陷检测。您需要了解具体的技术方案吗？</p>
                                    <span class="text-xs text-blue-200">14:33</span>
                                </div>
                                <div class="bg-blue-600 p-2 rounded-full">
                                    <i class="fas fa-robot text-white"></i>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex space-x-2">
                            <input type="text" class="flex-1 p-2 border border-gray-300 rounded-md" placeholder="输入消息...">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">知识库管理</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-medium text-gray-900">产品介绍</h4>
                                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已训练</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-2">包含所有产品的详细介绍和技术参数</p>
                                <div class="text-xs text-gray-500">文档数量: 156 | 最后更新: 2025-01-15</div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-medium text-gray-900">常见问题</h4>
                                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已训练</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-2">客户常见问题及标准回答</p>
                                <div class="text-xs text-gray-500">问答对: 892 | 最后更新: 2025-01-14</div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-2">
                                    <h4 class="font-medium text-gray-900">技术文档</h4>
                                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">训练中</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-2">技术规格和实施指南</p>
                                <div class="text-xs text-gray-500">文档数量: 67 | 预计完成: 2小时后</div>
                            </div>
                            
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">添加新知识</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 数据分析页面内容
    function getDataAnalysisContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">数据分析</h1>
                <p class="text-gray-600 mt-2">基于AI的智能数据分析，提供生产数据洞察和预测分析</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">数据源</h3>
                        <i class="fas fa-database text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">12</div>
                    <p class="text-gray-600 text-sm">已连接系统</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">实时数据</h3>
                        <i class="fas fa-stream text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">2.4M</div>
                    <p class="text-gray-600 text-sm">条/小时</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">分析模型</h3>
                        <i class="fas fa-brain text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">8</div>
                    <p class="text-gray-600 text-sm">运行中</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">预测准确率</h3>
                        <i class="fas fa-bullseye text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">92.1%</div>
                    <p class="text-gray-600 text-sm">平均准确率</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">生产效率趋势</h3>
                    </div>
                    <div class="p-6">
                        <div class="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-chart-line text-gray-400 text-4xl mb-4"></i>
                                <p class="text-gray-500">生产效率趋势图</p>
                                <p class="text-gray-400 text-sm mt-2">显示过去30天的生产效率变化</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">质量分析</h3>
                    </div>
                    <div class="p-6">
                        <div class="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-chart-pie text-gray-400 text-4xl mb-4"></i>
                                <p class="text-gray-500">质量分布图</p>
                                <p class="text-gray-400 text-sm mt-2">产品质量等级分布统计</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">分析报告</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">生成报告</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-file-alt text-blue-600 mr-3"></i>
                                <h4 class="font-medium text-gray-900">生产效率分析</h4>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">本月生产效率较上月提升8.2%，主要得益于设备优化和流程改进</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>2025-01-15</span>
                                <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-exclamation-triangle text-yellow-600 mr-3"></i>
                                <h4 class="font-medium text-gray-900">异常检测报告</h4>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">检测到3号生产线温度异常，建议进行设备检查和维护</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>2025-01-14</span>
                                <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center mb-3">
                                <i class="fas fa-chart-bar text-green-600 mr-3"></i>
                                <h4 class="font-medium text-gray-900">质量趋势预测</h4>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">基于历史数据预测，下周产品合格率预计保持在98.5%以上</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>2025-01-13</span>
                                <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 智能推荐页面内容
    function getSmartRecommendationContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">智能推荐</h1>
                <p class="text-gray-600 mt-2">基于AI算法的智能推荐系统，提供个性化的产品和服务推荐</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">推荐精度</h3>
                        <i class="fas fa-bullseye text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">89.3%</div>
                    <p class="text-gray-600 text-sm">用户接受率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">日推荐量</h3>
                        <i class="fas fa-rocket text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">15.2K</div>
                    <p class="text-gray-600 text-sm">个性化推荐</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">转化率</h3>
                        <i class="fas fa-chart-line text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">12.8%</div>
                    <p class="text-gray-600 text-sm">推荐转化</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">产品推荐</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-blue-100 p-3 rounded-lg">
                                        <i class="fas fa-microchip text-blue-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">智能芯片检测设备</h4>
                                        <p class="text-gray-600 text-sm">基于您的生产需求推荐</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">匹配度: 95%</span>
                                            <span class="text-gray-500 text-xs">预计ROI: +25%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">查看详情</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-green-100 p-3 rounded-lg">
                                        <i class="fas fa-robot text-green-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">自动化装配机器人</h4>
                                        <p class="text-gray-600 text-sm">提升生产效率的理想选择</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">匹配度: 88%</span>
                                            <span class="text-gray-500 text-xs">预计ROI: +18%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">查看详情</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-purple-100 p-3 rounded-lg">
                                        <i class="fas fa-eye text-purple-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">视觉检测系统升级</h4>
                                        <p class="text-gray-600 text-sm">增强现有检测能力</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">匹配度: 92%</span>
                                            <span class="text-gray-500 text-xs">预计ROI: +30%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">服务推荐</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-orange-100 p-3 rounded-lg">
                                        <i class="fas fa-tools text-orange-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">预防性维护服务</h4>
                                        <p class="text-gray-600 text-sm">减少设备故障停机时间</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">推荐指数: 9.2</span>
                                            <span class="text-gray-500 text-xs">节约成本: 15%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">了解更多</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-red-100 p-3 rounded-lg">
                                        <i class="fas fa-graduation-cap text-red-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">AI技能培训课程</h4>
                                        <p class="text-gray-600 text-sm">提升团队AI应用能力</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">推荐指数: 8.7</span>
                                            <span class="text-gray-500 text-xs">效率提升: 20%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">了解更多</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center space-x-4">
                                    <div class="bg-indigo-100 p-3 rounded-lg">
                                        <i class="fas fa-cloud text-indigo-600"></i>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-medium text-gray-900">云端数据分析平台</h4>
                                        <p class="text-gray-600 text-sm">增强数据处理和分析能力</p>
                                        <div class="flex items-center mt-2">
                                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">推荐指数: 9.5</span>
                                            <span class="text-gray-500 text-xs">处理速度: +40%</span>
                                        </div>
                                    </div>
                                    <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">了解更多</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">推荐算法配置</h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-medium text-gray-900 mb-4">推荐权重设置</h4>
                            <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-sm text-gray-600">历史行为</span>
                                        <span class="text-sm font-medium">40%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-blue-600 h-2 rounded-full" style="width: 40%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-sm text-gray-600">相似用户</span>
                                        <span class="text-sm font-medium">30%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-green-600 h-2 rounded-full" style="width: 30%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span class="text-sm text-gray-600">内容特征</span>
                                        <span class="text-sm font-medium">30%</span>
                                    </div>
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div class="bg-purple-600 h-2 rounded-full" style="width: 30%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-medium text-gray-900 mb-4">推荐策略</h4>
                            <div class="space-y-3">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-3" checked>
                                    <span class="text-sm text-gray-700">基于协同过滤</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-3" checked>
                                    <span class="text-sm text-gray-700">内容相似度匹配</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-3">
                                    <span class="text-sm text-gray-700">深度学习推荐</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-3" checked>
                                    <span class="text-sm text-gray-700">实时行为分析</span>
                                </label>
                            </div>
                            <button class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">保存配置</button>
                        </div>
                    </div>
                </div>
            </div>
        `;    }
    
    // 知识库RAG检索页面内容
    function getKnowledgeRAGContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">知识库RAG检索</h1>
                <p class="text-gray-600 mt-2">基于RAG技术的智能知识检索系统，快速获取相关技术文档和解决方案</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">文档总数</h3>
                        <i class="fas fa-file-alt text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">12,847</div>
                    <p class="text-gray-600 text-sm">已索引文档</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">检索精度</h3>
                        <i class="fas fa-bullseye text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">96.8%</div>
                    <p class="text-gray-600 text-sm">语义匹配准确率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">响应时间</h3>
                        <i class="fas fa-clock text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">0.8s</div>
                    <p class="text-gray-600 text-sm">平均检索时间</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">智能检索</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">检索问题</label>
                                <textarea class="w-full p-3 border border-gray-300 rounded-md" rows="3" placeholder="请输入您要查询的问题，支持自然语言描述...">如何提高产品质量检测的准确率？</textarea>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">文档类型</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option>全部类型</option>
                                        <option>技术文档</option>
                                        <option>操作手册</option>
                                        <option>案例研究</option>
                                        <option>标准规范</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">时间范围</label>
                                    <select class="w-full p-2 border border-gray-300 rounded-md">
                                        <option>不限时间</option>
                                        <option>最近1个月</option>
                                        <option>最近3个月</option>
                                        <option>最近1年</option>
                                    </select>
                                </div>
                            </div>
                            
                            <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center">
                                <i class="fas fa-search mr-2"></i>
                                智能检索
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">检索结果</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4 max-h-96 overflow-y-auto">
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="font-medium text-gray-900">视觉检测系统优化指南</h4>
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">相关度: 98%</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-3">详细介绍了如何通过算法优化、数据增强和模型调优来提高视觉检测系统的准确率，包含多个实际案例...</p>
                                <div class="flex justify-between items-center text-xs text-gray-500">
                                    <span>技术文档 | 2025-01-10</span>
                                    <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="font-medium text-gray-900">AI质检最佳实践案例</h4>
                                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">相关度: 95%</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-3">分析了多家制造企业成功实施AI质检系统的经验，总结了提高检测准确率的关键因素和实施策略...</p>
                                <div class="flex justify-between items-center text-xs text-gray-500">
                                    <span>案例研究 | 2025-01-08</span>
                                    <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-start mb-2">
                                    <h4 class="font-medium text-gray-900">质量检测标准规范</h4>
                                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">相关度: 87%</span>
                                </div>
                                <p class="text-gray-600 text-sm mb-3">国际质量检测标准的详细说明，包括检测精度要求、测试方法和验证流程，为系统优化提供标准依据...</p>
                                <div class="flex justify-between items-center text-xs text-gray-500">
                                    <span>标准规范 | 2025-01-05</span>
                                    <button class="text-blue-600 hover:text-blue-800">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">知识库管理</h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="bg-blue-100 p-4 rounded-lg mb-3">
                                <i class="fas fa-book text-blue-600 text-2xl"></i>
                            </div>
                            <h4 class="font-medium text-gray-900 mb-1">技术文档</h4>
                            <p class="text-2xl font-bold text-blue-600 mb-1">3,247</p>
                            <p class="text-gray-600 text-sm">份文档</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="bg-green-100 p-4 rounded-lg mb-3">
                                <i class="fas fa-clipboard-list text-green-600 text-2xl"></i>
                            </div>
                            <h4 class="font-medium text-gray-900 mb-1">操作手册</h4>
                            <p class="text-2xl font-bold text-green-600 mb-1">1,856</p>
                            <p class="text-gray-600 text-sm">份手册</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="bg-purple-100 p-4 rounded-lg mb-3">
                                <i class="fas fa-lightbulb text-purple-600 text-2xl"></i>
                            </div>
                            <h4 class="font-medium text-gray-900 mb-1">案例研究</h4>
                            <p class="text-2xl font-bold text-purple-600 mb-1">892</p>
                            <p class="text-gray-600 text-sm">个案例</p>
                        </div>
                        
                        <div class="text-center">
                            <div class="bg-orange-100 p-4 rounded-lg mb-3">
                                <i class="fas fa-certificate text-orange-600 text-2xl"></i>
                            </div>
                            <h4 class="font-medium text-gray-900 mb-1">标准规范</h4>
                            <p class="text-2xl font-bold text-orange-600 mb-1">456</p>
                            <p class="text-gray-600 text-sm">项标准</p>
                        </div>
                    </div>
                    
                    <div class="mt-6 flex justify-center space-x-4">
                        <button class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">上传文档</button>
                        <button class="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700">批量导入</button>
                        <button class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">重建索引</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 视觉质检页面内容
    function getVisualInspectionContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">视觉质检</h1>
                <p class="text-gray-600 mt-2">基于计算机视觉的智能质量检测系统，实现产品缺陷的自动识别和分类</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">检测精度</h3>
                        <i class="fas fa-bullseye text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">99.2%</div>
                    <p class="text-gray-600 text-sm">缺陷识别准确率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">检测速度</h3>
                        <i class="fas fa-tachometer-alt text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">150</div>
                    <p class="text-gray-600 text-sm">张/分钟</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">今日检测</h3>
                        <i class="fas fa-eye text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">8,247</div>
                    <p class="text-gray-600 text-sm">张图片</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">缺陷率</h3>
                        <i class="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-red-600 mb-2">2.1%</div>
                    <p class="text-gray-600 text-sm">产品缺陷率</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">实时检测</h3>
                    </div>
                    <div class="p-6">
                        <div class="bg-gray-100 rounded-lg p-8 text-center mb-4">
                            <i class="fas fa-camera text-gray-400 text-4xl mb-4"></i>
                            <p class="text-gray-500">实时检测画面</p>
                            <p class="text-gray-400 text-sm mt-2">摄像头实时画面将在此显示</p>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center">
                                <div class="text-lg font-bold text-green-600">合格</div>
                                <div class="text-2xl font-bold text-green-600">97.9%</div>
                            </div>
                            <div class="text-center">
                                <div class="text-lg font-bold text-red-600">不合格</div>
                                <div class="text-2xl font-bold text-red-600">2.1%</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">缺陷分类统计</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-red-500 rounded mr-3"></div>
                                    <span class="text-gray-700">划痕</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900">45%</div>
                                    <div class="text-xs text-gray-500">127件</div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                                    <span class="text-gray-700">污点</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900">28%</div>
                                    <div class="text-xs text-gray-500">79件</div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                                    <span class="text-gray-700">变形</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900">15%</div>
                                    <div class="text-xs text-gray-500">42件</div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                                    <span class="text-gray-700">尺寸偏差</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900">8%</div>
                                    <div class="text-xs text-gray-500">23件</div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <div class="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                                    <span class="text-gray-700">其他</span>
                                </div>
                                <div class="text-right">
                                    <div class="font-bold text-gray-900">4%</div>
                                    <div class="text-xs text-gray-500">11件</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">检测历史</h3>
                        <div class="flex space-x-2">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">导出报告</button>
                            <button class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">设置参数</button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品批次</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">检测数量</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">合格率</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">主要缺陷</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-15 14:30</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A2025011501</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,250</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">98.2%</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">划痕</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">查看详情</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-15 13:15</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A2025011502</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">980</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">97.8%</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">污点</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">查看详情</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-15 12:00</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">A2025011503</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,100</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">95.5%</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">变形</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">查看详情</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 供应链把控页面内容
    function getSupplyChainContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">供应链把控</h1>
                <p class="text-gray-600 mt-2">智能供应链管理系统，实现供应商评估、库存优化和风险预警</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">供应商数量</h3>
                        <i class="fas fa-truck text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">156</div>
                    <p class="text-gray-600 text-sm">活跃供应商</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">库存周转率</h3>
                        <i class="fas fa-sync-alt text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">8.2</div>
                    <p class="text-gray-600 text-sm">次/年</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">准时交付率</h3>
                        <i class="fas fa-clock text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">96.8%</div>
                    <p class="text-gray-600 text-sm">按时交付</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">成本节约</h3>
                        <i class="fas fa-dollar-sign text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">12.5%</div>
                    <p class="text-gray-600 text-sm">较去年同期</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">供应商评估</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <div>
                                        <h4 class="font-medium text-gray-900">华东精密制造有限公司</h4>
                                        <p class="text-gray-600 text-sm">电子元器件供应商</p>
                                    </div>
                                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">A级</span>
                                </div>
                                <div class="grid grid-cols-3 gap-4 text-sm">
                                    <div class="text-center">
                                        <div class="text-gray-600">质量评分</div>
                                        <div class="font-bold text-green-600">9.2</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">交付评分</div>
                                        <div class="font-bold text-blue-600">8.8</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">成本评分</div>
                                        <div class="font-bold text-purple-600">8.5</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <div>
                                        <h4 class="font-medium text-gray-900">南方材料科技股份</h4>
                                        <p class="text-gray-600 text-sm">原材料供应商</p>
                                    </div>
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">B级</span>
                                </div>
                                <div class="grid grid-cols-3 gap-4 text-sm">
                                    <div class="text-center">
                                        <div class="text-gray-600">质量评分</div>
                                        <div class="font-bold text-green-600">8.5</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">交付评分</div>
                                        <div class="font-bold text-blue-600">7.8</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">成本评分</div>
                                        <div class="font-bold text-purple-600">9.1</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <div>
                                        <h4 class="font-medium text-gray-900">北方物流集团</h4>
                                        <p class="text-gray-600 text-sm">物流服务商</p>
                                    </div>
                                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">C级</span>
                                </div>
                                <div class="grid grid-cols-3 gap-4 text-sm">
                                    <div class="text-center">
                                        <div class="text-gray-600">质量评分</div>
                                        <div class="font-bold text-green-600">7.2</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">交付评分</div>
                                        <div class="font-bold text-blue-600">6.8</div>
                                    </div>
                                    <div class="text-center">
                                        <div class="text-gray-600">成本评分</div>
                                        <div class="font-bold text-purple-600">8.0</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">风险预警</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                                    <h4 class="font-medium text-red-800">高风险预警</h4>
                                </div>
                                <p class="text-red-700 text-sm mb-2">供应商"西部电子"连续3次延期交付，建议启动备选供应商</p>
                                <div class="text-xs text-red-600">风险等级: 高 | 影响订单: 15个</div>
                            </div>
                            
                            <div class="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-exclamation-circle text-yellow-600 mr-2"></i>
                                    <h4 class="font-medium text-yellow-800">中风险预警</h4>
                                </div>
                                <p class="text-yellow-700 text-sm mb-2">原材料价格上涨15%，建议调整采购策略或寻找替代供应商</p>
                                <div class="text-xs text-yellow-600">风险等级: 中 | 影响成本: +8%</div>
                            </div>
                            
                            <div class="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                                    <h4 class="font-medium text-blue-800">库存预警</h4>
                                </div>
                                <p class="text-blue-700 text-sm mb-2">核心零部件库存不足，预计7天后断货，建议紧急补货</p>
                                <div class="text-xs text-blue-600">当前库存: 120件 | 安全库存: 500件</div>
                            </div>
                            
                            <div class="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                                <div class="flex items-center mb-2">
                                    <i class="fas fa-check-circle text-green-600 mr-2"></i>
                                    <h4 class="font-medium text-green-800">优化建议</h4>
                                </div>
                                <p class="text-green-700 text-sm mb-2">发现新的优质供应商，质量评分9.5，成本降低12%</p>
                                <div class="text-xs text-green-600">供应商: 东南精工 | 预计节约: ¥50万/年</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">采购订单管理</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">新建订单</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">供应商</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">交付日期</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PO2025011501</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">华东精密制造</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">电子元器件</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥125,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已发货</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-18</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PO2025011502</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">南方材料科技</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">原材料</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥80,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">生产中</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-20</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PO2025011503</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">西部电子</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">传感器</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">1,500</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥95,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">延期</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-22</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 其他制造场景页面内容
    function getOtherScenariosContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">其他制造场景</h1>
                <p class="text-gray-600 mt-2">探索更多AI在制造业中的创新应用场景和解决方案</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">活跃场景</h3>
                        <i class="fas fa-cogs text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">24</div>
                    <p class="text-gray-600 text-sm">个应用场景</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">部署率</h3>
                        <i class="fas fa-chart-line text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">87.5%</div>
                    <p class="text-gray-600 text-sm">场景覆盖率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">效率提升</h3>
                        <i class="fas fa-rocket text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">35%</div>
                    <p class="text-gray-600 text-sm">平均效率提升</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-blue-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-robot text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">智能装配</h3>
                                <p class="text-gray-600 text-sm">自动化装配线优化</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">基于机器视觉和机器人技术的智能装配系统，实现精密零部件的自动化装配和质量控制。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已部署</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-green-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-leaf text-green-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">能耗优化</h3>
                                <p class="text-gray-600 text-sm">智能能源管理系统</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">通过AI算法分析生产设备能耗模式，优化能源配置，降低生产成本，提高能源利用效率。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已部署</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-purple-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-wrench text-purple-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">预测性维护</h3>
                                <p class="text-gray-600 text-sm">设备故障预测系统</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">利用传感器数据和机器学习算法，预测设备故障时间，提前安排维护，减少停机损失。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已部署</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-orange-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-chart-bar text-orange-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">生产调度</h3>
                                <p class="text-gray-600 text-sm">智能排产优化系统</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">基于订单需求和资源约束，智能优化生产计划和设备调度，提高生产效率和交付准时率。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">测试中</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-red-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-shield-alt text-red-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">安全监控</h3>
                                <p class="text-gray-600 text-sm">智能安全管理系统</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">通过视频分析和传感器监测，实时识别安全隐患，保障生产环境和人员安全。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">已部署</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-indigo-100 p-3 rounded-lg mr-4">
                                <i class="fas fa-microscope text-indigo-600 text-xl"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">材料检测</h3>
                                <p class="text-gray-600 text-sm">智能材料分析系统</p>
                            </div>
                        </div>
                        <p class="text-gray-700 text-sm mb-4">利用光谱分析和机器学习技术，快速检测原材料成分和质量，确保产品质量稳定性。</p>
                        <div class="flex justify-between items-center">
                            <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">开发中</span>
                            <button class="text-blue-600 hover:text-blue-800 text-sm">查看详情</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">场景部署统计</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">新增场景</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">场景名称</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">应用领域</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部署状态</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">效率提升</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">成本节约</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部署时间</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">智能装配系统</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">自动化装配</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已部署</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+42%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥180万/年</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-08-15</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">管理</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">能耗优化系统</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">能源管理</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已部署</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+28%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥95万/年</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-09-20</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">管理</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">预测性维护</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">设备维护</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已部署</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+35%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥120万/年</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-10-10</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">管理</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">生产调度优化</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">生产计划</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">测试中</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">预计+25%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">预计¥80万/年</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2025-01-05</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">管理</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">安全监控系统</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">安全管理</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已部署</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">+15%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥60万/年</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2023-11-12</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">管理</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Agent列表页面内容
    function getAgentListContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Agent列表</h1>
                <p class="text-gray-600 mt-2">智能制造场景的Agent管理，包含功能特点和应用系统</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">质检Agent</h3>
                        <i class="fas fa-robot text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">6</div>
                    <p class="text-gray-600 text-sm">视觉质检、缺陷检测等</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">生产Agent</h3>
                        <i class="fas fa-cogs text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">8</div>
                    <p class="text-gray-600 text-sm">生产调度、设备监控等</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">分析Agent</h3>
                        <i class="fas fa-chart-bar text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">4</div>
                    <p class="text-gray-600 text-sm">数据分析、预测维护等</p>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">Agent管理</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">部署新Agent</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="border border-gray-200 rounded-lg p-6">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-lg font-medium text-gray-900">智能质检Agent</h4>
                                    <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">质检类</span>
                                </div>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">运行中</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">基于计算机视觉的产品缺陷检测，支持多种产品类型的自动化质量检测</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">应用系统:</span>
                                    <span class="font-medium">MES、质检系统</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">检测精度:</span>
                                    <span class="font-medium">99.2%</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">处理速度:</span>
                                    <span class="font-medium">150张/分钟</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">配置</button>
                                <button class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">日志</button>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-6">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-lg font-medium text-gray-900">生产调度Agent</h4>
                                    <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">生产类</span>
                                </div>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">运行中</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">智能生产调度优化，根据订单需求和设备状态自动安排生产计划</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">应用系统:</span>
                                    <span class="font-medium">ERP、MES</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">优化效率:</span>
                                    <span class="font-medium">+15%</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">响应时间:</span>
                                    <span class="font-medium">< 5秒</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">配置</button>
                                <button class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">日志</button>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-6">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-lg font-medium text-gray-900">预测维护Agent</h4>
                                    <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1">分析类</span>
                                </div>
                                <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">运行中</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">基于设备运行数据预测故障，提前安排维护计划，减少停机时间</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">应用系统:</span>
                                    <span class="font-medium">设备管理系统</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">预测准确率:</span>
                                    <span class="font-medium">87%</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">停机减少:</span>
                                    <span class="font-medium">-30%</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">配置</button>
                                <button class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">日志</button>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-6">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-lg font-medium text-gray-900">供应链优化Agent</h4>
                                    <span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-1">供应链</span>
                                </div>
                                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">待部署</span>
                            </div>
                            <p class="text-gray-600 text-sm mb-4">智能供应链管理，优化采购决策和库存管理，降低运营成本</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">应用系统:</span>
                                    <span class="font-medium">SCM、ERP</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">成本节约:</span>
                                    <span class="font-medium">预计12%</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">库存优化:</span>
                                    <span class="font-medium">预计-20%</span>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm">部署</button>
                                <button class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm">配置</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 产品辅助设计页面内容
    function getProductDesignContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">产品辅助设计</h1>
                <p class="text-gray-600 mt-2">利用AI技术辅助产品设计，提高设计效率和创新能力</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">设计项目</h3>
                        <i class="fas fa-drafting-compass text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">28</div>
                    <p class="text-gray-600 text-sm">个活跃项目</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">设计效率</h3>
                        <i class="fas fa-tachometer-alt text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">+45%</div>
                    <p class="text-gray-600 text-sm">效率提升</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">AI模型</h3>
                        <i class="fas fa-brain text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">12</div>
                    <p class="text-gray-600 text-sm">个可用模型</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">3D模型</h3>
                        <i class="fas fa-cube text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">156</div>
                    <p class="text-gray-600 text-sm">个已生成</p>
                </div>
            </div>
            
            <!-- AI手机原型设计区域 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">AI手机原型设计</h3>
                            <p class="text-gray-600 text-sm mt-1">通过AI生成手机原型图，调整参数后生成3D模型</p>
                        </div>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" onclick="generatePhonePrototype()">开始设计</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- 参数调整面板 -->
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-900 mb-4">设计参数</h4>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">屏幕尺寸</label>
                                <select class="w-full border border-gray-300 rounded-md px-3 py-2" id="screenSize">
                                    <option value="5.5">5.5英寸</option>
                                    <option value="6.1" selected>6.1英寸</option>
                                    <option value="6.7">6.7英寸</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">机身材质</label>
                                <select class="w-full border border-gray-300 rounded-md px-3 py-2" id="material">
                                    <option value="aluminum">铝合金</option>
                                    <option value="glass" selected>玻璃</option>
                                    <option value="ceramic">陶瓷</option>
                                    <option value="titanium">钛合金</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">主色调</label>
                                <div class="grid grid-cols-4 gap-2">
                                    <div class="w-8 h-8 bg-black rounded cursor-pointer border-2 border-blue-500" onclick="selectColor('black')"></div>
                                    <div class="w-8 h-8 bg-white rounded cursor-pointer border border-gray-300" onclick="selectColor('white')"></div>
                                    <div class="w-8 h-8 bg-blue-500 rounded cursor-pointer" onclick="selectColor('blue')"></div>
                                    <div class="w-8 h-8 bg-red-500 rounded cursor-pointer" onclick="selectColor('red')"></div>
                                    <div class="w-8 h-8 bg-green-500 rounded cursor-pointer" onclick="selectColor('green')"></div>
                                    <div class="w-8 h-8 bg-purple-500 rounded cursor-pointer" onclick="selectColor('purple')"></div>
                                    <div class="w-8 h-8 bg-yellow-500 rounded cursor-pointer" onclick="selectColor('gold')"></div>
                                    <div class="w-8 h-8 bg-pink-500 rounded cursor-pointer" onclick="selectColor('pink')"></div>
                                </div>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">摄像头配置</label>
                                <select class="w-full border border-gray-300 rounded-md px-3 py-2" id="camera">
                                    <option value="single">单摄</option>
                                    <option value="dual">双摄</option>
                                    <option value="triple" selected>三摄</option>
                                    <option value="quad">四摄</option>
                                </select>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">边框风格</label>
                                <select class="w-full border border-gray-300 rounded-md px-3 py-2" id="frameStyle">
                                    <option value="rounded" selected>圆润</option>
                                    <option value="sharp">方正</option>
                                    <option value="curved">曲面</option>
                                </select>
                            </div>
                            
                            <button class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700" onclick="updatePhoneDesign()">更新设计</button>
                            <button class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700" onclick="generate3DModel()">生成3D模型</button>
                        </div>
                        
                        <!-- 2D原型图预览 -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-4">2D原型图</h4>
                            <div class="bg-gray-100 rounded-lg p-6 text-center" id="prototype2D">
                                <div class="inline-block bg-black rounded-3xl p-2" style="width: 180px; height: 320px; position: relative;">
                                    <!-- 屏幕 -->
                                    <div class="bg-gray-900 rounded-2xl" style="width: 164px; height: 304px; position: relative;">
                                        <!-- 刘海 -->
                                        <div class="bg-black rounded-b-xl mx-auto" style="width: 60px; height: 20px;"></div>
                                        <!-- 屏幕内容 -->
                                        <div class="bg-blue-500 rounded-2xl mt-2" style="width: 156px; height: 276px; margin: 4px;"></div>
                                    </div>
                                    <!-- 摄像头模块 -->
                                    <div class="absolute top-4 right-4 bg-gray-700 rounded-lg" style="width: 40px; height: 40px;" id="cameraModule">
                                        <div class="grid grid-cols-2 gap-1 p-1">
                                            <div class="bg-gray-600 rounded-full w-3 h-3"></div>
                                            <div class="bg-gray-600 rounded-full w-3 h-3"></div>
                                            <div class="bg-gray-600 rounded-full w-3 h-3"></div>
                                            <div class="bg-gray-500 rounded-full w-3 h-3"></div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-sm text-gray-600 mt-4">AI生成的手机原型图</p>
                            </div>
                            
                            <div class="mt-4 space-y-2">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">设计评分:</span>
                                    <span class="font-semibold text-green-600">8.7/10</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">美观度:</span>
                                    <span class="font-semibold text-blue-600">9.2/10</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">实用性:</span>
                                    <span class="font-semibold text-purple-600">8.5/10</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 3D模型预览 -->
                        <div>
                            <h4 class="font-semibold text-gray-900 mb-4">3D模型预览</h4>
                            <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 text-center" id="model3D" style="height: 400px; position: relative;">
                                <div id="phone3DModel" class="hidden">
                                    <!-- 3D手机模型 -->
                                    <div class="inline-block transform rotate-12" style="perspective: 1000px;">
                                        <div class="bg-black rounded-3xl shadow-2xl" style="width: 160px; height: 280px; transform: rotateY(-15deg) rotateX(5deg); position: relative;">
                                            <!-- 正面屏幕 -->
                                            <div class="bg-gray-900 rounded-2xl m-2" style="width: 144px; height: 264px; position: relative;">
                                                <div class="bg-blue-500 rounded-2xl m-2" style="width: 128px; height: 248px;"></div>
                                            </div>
                                            <!-- 侧面厚度效果 -->
                                            <div class="absolute -right-2 top-0 bg-gray-800 rounded-r-3xl" style="width: 8px; height: 280px; transform: skewY(-2deg);"></div>
                                            <!-- 摄像头突起 -->
                                            <div class="absolute top-4 right-2 bg-gray-700 rounded-lg shadow-lg" style="width: 36px; height: 36px; transform: translateZ(4px);">
                                                <div class="grid grid-cols-2 gap-1 p-1">
                                                    <div class="bg-gray-600 rounded-full w-2.5 h-2.5"></div>
                                                    <div class="bg-gray-600 rounded-full w-2.5 h-2.5"></div>
                                                    <div class="bg-gray-600 rounded-full w-2.5 h-2.5"></div>
                                                    <div class="bg-gray-500 rounded-full w-2.5 h-2.5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="model3DPlaceholder">
                                    <i class="fas fa-cube text-6xl text-gray-400 mb-4"></i>
                                    <p class="text-gray-600">点击\"生成3D模型\"查看立体效果</p>
                                    <div class="mt-4">
                                        <div class="inline-flex items-center space-x-2 text-sm text-gray-500">
                                            <i class="fas fa-mouse"></i>
                                            <span>支持鼠标拖拽旋转</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-4 grid grid-cols-3 gap-2">
                                <button class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded" onclick="rotate3DModel('left')">← 左转</button>
                                <button class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded" onclick="reset3DModel()">重置</button>
                                <button class="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded" onclick="rotate3DModel('right')">右转 →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">设计工具</h3>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <i class="fas fa-palette text-2xl text-blue-600 mb-2"></i>
                                <p class="text-sm font-medium text-gray-900">色彩生成</p>
                            </div>
                            <div class="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <i class="fas fa-shapes text-2xl text-green-600 mb-2"></i>
                                <p class="text-sm font-medium text-gray-900">形状优化</p>
                            </div>
                            <div class="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <i class="fas fa-cube text-2xl text-purple-600 mb-2"></i>
                                <p class="text-sm font-medium text-gray-900">3D建模</p>
                            </div>
                            <div class="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <i class="fas fa-magic text-2xl text-orange-600 mb-2"></i>
                                <p class="text-sm font-medium text-gray-900">智能优化</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">最近项目</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div class="flex items-center">
                                    <div class="bg-blue-100 p-2 rounded-lg mr-3">
                                        <i class="fas fa-mobile-alt text-blue-600"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">智能手机设计</p>
                                        <p class="text-sm text-gray-600">进行中</p>
                                    </div>
                                </div>
                                <span class="text-sm text-gray-500">2小时前</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div class="flex items-center">
                                    <div class="bg-green-100 p-2 rounded-lg mr-3">
                                        <i class="fas fa-laptop text-green-600"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">笔记本外观</p>
                                        <p class="text-sm text-gray-600">已完成</p>
                                    </div>
                                </div>
                                <span class="text-sm text-gray-500">1天前</span>
                            </div>
                            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div class="flex items-center">
                                    <div class="bg-purple-100 p-2 rounded-lg mr-3">
                                        <i class="fas fa-headphones text-purple-600"></i>
                                    </div>
                                    <div>
                                        <p class="font-medium text-gray-900">耳机造型</p>
                                        <p class="text-sm text-gray-600">评审中</p>
                                    </div>
                                </div>
                                <span class="text-sm text-gray-500">3天前</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">设计项目列表</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">新建项目</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">项目名称</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">进度</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">AI智能手机原型</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">消费电子</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">设计中</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">85%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-16</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">编辑</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">智能手机外观设计</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">消费电子</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已完成</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-15</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">查看</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">工业设备外壳</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">工业设备</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已完成</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-10</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">查看</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">汽车内饰设计</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">汽车配件</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">评审中</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">90%</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-01-08</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button class="text-blue-600 hover:text-blue-900">编辑</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <script>
                // 手机设计相关JavaScript函数
                function generatePhonePrototype() {
                    // 模拟AI生成原型图的过程
                    const prototype = document.getElementById('prototype2D');
                    prototype.innerHTML = '<div class="loading mx-auto mb-4"></div><p class="text-gray-600">AI正在生成手机原型图...</p>';
                    
                    setTimeout(() => {
                        updatePhoneDesign();
                    }, 2000);
                }
                
                function updatePhoneDesign() {
                    const screenSize = document.getElementById('screenSize').value;
                    const material = document.getElementById('material').value;
                    const camera = document.getElementById('camera').value;
                    const frameStyle = document.getElementById('frameStyle').value;
                    
                    // 更新2D原型图
                    const prototype = document.getElementById('prototype2D');
                    let phoneWidth = screenSize === '5.5' ? '160px' : screenSize === '6.1' ? '180px' : '200px';
                    let phoneHeight = screenSize === '5.5' ? '280px' : screenSize === '6.1' ? '320px' : '360px';
                    let borderRadius = frameStyle === 'rounded' ? 'rounded-3xl' : frameStyle === 'sharp' ? 'rounded-lg' : 'rounded-2xl';
                    
                    prototype.innerHTML = 
                        '<div class="inline-block bg-black ' + borderRadius + ' p-2" style="width: ' + phoneWidth + '; height: ' + phoneHeight + '; position: relative;">' +
                            '<div class="bg-gray-900 ' + (borderRadius === 'rounded-3xl' ? 'rounded-2xl' : borderRadius === 'rounded-lg' ? 'rounded' : 'rounded-xl') + '" style="width: calc(100% - 16px); height: calc(100% - 16px); position: relative;">' +
                                '<div class="bg-black rounded-b-xl mx-auto" style="width: 60px; height: 20px;"></div>' +
                                '<div class="bg-blue-500 ' + (borderRadius === 'rounded-3xl' ? 'rounded-2xl' : borderRadius === 'rounded-lg' ? 'rounded' : 'rounded-xl') + ' mt-2" style="width: calc(100% - 16px); height: calc(100% - 40px); margin: 8px;"></div>' +
                            '</div>' +
                            getCameraModule(camera) +
                        '</div>' +
                        '<p class="text-sm text-gray-600 mt-4">AI生成的手机原型图 (' + screenSize + '英寸, ' + getMaterialName(material) + ')</p>';
                }
                
                function getCameraModule(camera) {
                    const modules = {
                        'single': '<div class="absolute top-4 right-4 bg-gray-700 rounded-full w-8 h-8"><div class="bg-gray-600 rounded-full w-6 h-6 m-1"></div></div>',
                        'dual': '<div class="absolute top-4 right-4 bg-gray-700 rounded-lg w-10 h-6"><div class="flex space-x-1 p-1"><div class="bg-gray-600 rounded-full w-4 h-4"></div><div class="bg-gray-600 rounded-full w-4 h-4"></div></div></div>',
                        'triple': '<div class="absolute top-4 right-4 bg-gray-700 rounded-lg w-10 h-10"><div class="grid grid-cols-2 gap-1 p-1"><div class="bg-gray-600 rounded-full w-3 h-3"></div><div class="bg-gray-600 rounded-full w-3 h-3"></div><div class="bg-gray-600 rounded-full w-3 h-3 col-span-2 mx-auto"></div></div></div>',
                        'quad': '<div class="absolute top-4 right-4 bg-gray-700 rounded-lg w-10 h-10"><div class="grid grid-cols-2 gap-1 p-1"><div class="bg-gray-600 rounded-full w-3 h-3"></div><div class="bg-gray-600 rounded-full w-3 h-3"></div><div class="bg-gray-600 rounded-full w-3 h-3"></div><div class="bg-gray-500 rounded-full w-3 h-3"></div></div></div>'
                    };
                    return modules[camera] || modules['triple'];
                }
                
                function getMaterialName(material) {
                    const names = {
                        'aluminum': '铝合金',
                        'glass': '玻璃',
                        'ceramic': '陶瓷',
                        'titanium': '钛合金'
                    };
                    return names[material] || '玻璃';
                }
                
                function selectColor(color) {
                    // 移除所有颜色选择的边框
                    document.querySelectorAll('[onclick*=\"selectColor\"]').forEach(el => {
                        el.classList.remove('border-blue-500', 'border-2');
                        if (el.classList.contains('bg-white')) {
                            el.classList.add('border', 'border-gray-300');
                        }
                    });
                    
                    // 为选中的颜色添加边框
                    event.target.classList.add('border-blue-500', 'border-2');
                    if (event.target.classList.contains('bg-white')) {
                        event.target.classList.remove('border-gray-300');
                    }
                }
                
                function generate3DModel() {
                    const placeholder = document.getElementById('model3DPlaceholder');
                    const model = document.getElementById('phone3DModel');
                    
                    placeholder.innerHTML = '<div class="loading mx-auto mb-4"></div><p class="text-gray-600">正在生成3D模型...</p>';
                    
                    setTimeout(() => {
                        placeholder.classList.add('hidden');
                        model.classList.remove('hidden');
                    }, 3000);
                }
                
                function rotate3DModel(direction) {
                    const model = document.querySelector('#phone3DModel > div > div');
                    if (model) {
                        let currentRotation = model.style.transform.match(/rotateY\\(([^)]+)\\)/);
                        let currentY = currentRotation ? parseInt(currentRotation[1]) : -15;
                        
                        if (direction === 'left') {
                            currentY -= 30;
                        } else if (direction === 'right') {
                            currentY += 30;
                        }
                        
                        model.style.transform = 'rotateY(' + currentY + 'deg) rotateX(5deg)';
                    }
                }
                
                function reset3DModel() {
                    const model = document.querySelector('#phone3DModel > div > div');
                    if (model) {
                        model.style.transform = 'rotateY(-15deg) rotateX(5deg)';
                    }
                }
            </script>
        `;
    }
    
    // 数据收集整理页面内容
    function getDataCollectionContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">数据收集整理</h1>
                <p class="text-gray-600 mt-2">企业内部各类数据的收集、整理和管理</p>
            </div>
            
            <!-- 数据总览 -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">数据总量</h3>
                        <i class="fas fa-database text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">15.8TB</div>
                    <p class="text-gray-600 text-sm">总存储量</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">数据源</h3>
                        <i class="fas fa-plug text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">28</div>
                    <p class="text-gray-600 text-sm">个数据源</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">实时同步率</h3>
                        <i class="fas fa-sync text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">96.5%</div>
                    <p class="text-gray-600 text-sm">同步成功率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">数据质量</h3>
                        <i class="fas fa-check-circle text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">98.2%</div>
                    <p class="text-gray-600 text-sm">质量评分</p>
                </div>
            </div>
            
            <!-- 数据分类展示 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div class="p-6 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900">企业内部数据分类</h3>
                </div>
                <div class="p-6">
                    <div class="flex flex-wrap gap-2 mb-6">
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="switchDataCategory('production')">生产运营</button>
                        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onclick="switchDataCategory('quality')">质量检测</button>
                        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onclick="switchDataCategory('supply')">供应链</button>
                        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onclick="switchDataCategory('finance')">财务业务</button>
                        <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" onclick="switchDataCategory('hr')">人力资源</button>
                    </div>
                    
                    <div id="production-data" class="data-category-content">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('production-line', '生产线数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">生产线数据</h4>
                                <p class="text-gray-600 text-sm mb-2">设备运行状态、产量统计、效率分析</p>
                                <span class="text-blue-600 font-medium">1,234条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('equipment', '设备监控数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">设备监控数据</h4>
                                <p class="text-gray-600 text-sm mb-2">温度、压力、振动等传感器数据</p>
                                <span class="text-blue-600 font-medium">5,678条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('energy', '能耗数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">能耗数据</h4>
                                <p class="text-gray-600 text-sm mb-2">电力、燃气、水资源消耗统计</p>
                                <span class="text-blue-600 font-medium">892条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('maintenance', '维护记录')">
                                <h4 class="font-semibold text-gray-900 mb-2">维护记录</h4>
                                <p class="text-gray-600 text-sm mb-2">设备保养、故障维修、备件更换</p>
                                <span class="text-blue-600 font-medium">456条</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="quality-data" class="data-category-content hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('inspection', '质检报告')">
                                <h4 class="font-semibold text-gray-900 mb-2">质检报告</h4>
                                <p class="text-gray-600 text-sm mb-2">产品质量检测结果、合格率统计</p>
                                <span class="text-green-600 font-medium">2,156条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('defect', '缺陷分析')">
                                <h4 class="font-semibold text-gray-900 mb-2">缺陷分析</h4>
                                <p class="text-gray-600 text-sm mb-2">产品缺陷类型、原因分析、改进措施</p>
                                <span class="text-green-600 font-medium">789条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('testing', '测试数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">测试数据</h4>
                                <p class="text-gray-600 text-sm mb-2">材料测试、性能测试、环境测试</p>
                                <span class="text-green-600 font-medium">1,345条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('certification', '认证记录')">
                                <h4 class="font-semibold text-gray-900 mb-2">认证记录</h4>
                                <p class="text-gray-600 text-sm mb-2">ISO认证、行业标准认证记录</p>
                                <span class="text-green-600 font-medium">234条</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="supply-data" class="data-category-content hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('supplier', '供应商信息')">
                                <h4 class="font-semibold text-gray-900 mb-2">供应商信息</h4>
                                <p class="text-gray-600 text-sm mb-2">供应商档案、评级、合作历史</p>
                                <span class="text-purple-600 font-medium">567条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('inventory', '库存数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">库存数据</h4>
                                <p class="text-gray-600 text-sm mb-2">原材料、半成品、成品库存统计</p>
                                <span class="text-purple-600 font-medium">3,421条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('logistics', '物流信息')">
                                <h4 class="font-semibold text-gray-900 mb-2">物流信息</h4>
                                <p class="text-gray-600 text-sm mb-2">运输记录、配送状态、成本分析</p>
                                <span class="text-purple-600 font-medium">1,876条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('procurement', '采购记录')">
                                <h4 class="font-semibold text-gray-900 mb-2">采购记录</h4>
                                <p class="text-gray-600 text-sm mb-2">采购订单、价格变动、交付周期</p>
                                <span class="text-purple-600 font-medium">923条</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="finance-data" class="data-category-content hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('revenue', '营收数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">营收数据</h4>
                                <p class="text-gray-600 text-sm mb-2">销售收入、利润分析、成本核算</p>
                                <span class="text-orange-600 font-medium">1,234条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('budget', '预算管理')">
                                <h4 class="font-semibold text-gray-900 mb-2">预算管理</h4>
                                <p class="text-gray-600 text-sm mb-2">年度预算、部门预算、执行情况</p>
                                <span class="text-orange-600 font-medium">456条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('investment', '投资分析')">
                                <h4 class="font-semibold text-gray-900 mb-2">投资分析</h4>
                                <p class="text-gray-600 text-sm mb-2">设备投资、技术投资、ROI分析</p>
                                <span class="text-orange-600 font-medium">189条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('cashflow', '现金流')">
                                <h4 class="font-semibold text-gray-900 mb-2">现金流</h4>
                                <p class="text-gray-600 text-sm mb-2">资金流入流出、周转率、风险评估</p>
                                <span class="text-orange-600 font-medium">678条</span>
                            </div>
                        </div>
                    </div>
                    
                    <div id="hr-data" class="data-category-content hidden">
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('employee', '员工档案')">
                                <h4 class="font-semibold text-gray-900 mb-2">员工档案</h4>
                                <p class="text-gray-600 text-sm mb-2">基本信息、技能评估、培训记录</p>
                                <span class="text-indigo-600 font-medium">2,345条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('performance', '绩效数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">绩效数据</h4>
                                <p class="text-gray-600 text-sm mb-2">工作效率、KPI达成、考核结果</p>
                                <span class="text-indigo-600 font-medium">1,567条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('attendance', '考勤数据')">
                                <h4 class="font-semibold text-gray-900 mb-2">考勤数据</h4>
                                <p class="text-gray-600 text-sm mb-2">出勤统计、加班记录、请假管理</p>
                                <span class="text-indigo-600 font-medium">8,901条</span>
                            </div>
                            <div class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onclick="showDataDetails('training', '培训记录')">
                                <h4 class="font-semibold text-gray-900 mb-2">培训记录</h4>
                                <p class="text-gray-600 text-sm mb-2">技能培训、安全培训、证书管理</p>
                                <span class="text-indigo-600 font-medium">1,234条</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 数据源管理 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">数据源管理</h3>
                        <div class="flex gap-2">
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="addDataSource()">添加数据源</button>
                            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onclick="syncAllData()">同步所有数据</button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <input type="text" placeholder="搜索数据源..." class="px-4 py-2 border border-gray-300 rounded-lg w-64">
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b border-gray-200">
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">数据源名称</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">类型</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">状态</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">数据量</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">最后更新</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">生产线传感器A</td>
                                    <td class="py-3 px-4">实时数据</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">活跃</span></td>
                                    <td class="py-3 px-4">1.2GB</td>
                                    <td class="py-3 px-4">2024-01-15 14:30</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="previewData('sensor-a')">预览</button>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">配置</button>
                                        <button class="text-blue-600 hover:text-blue-800">详情</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">质检系统</td>
                                    <td class="py-3 px-4">批量数据</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">活跃</span></td>
                                    <td class="py-3 px-4">856MB</td>
                                    <td class="py-3 px-4">2024-01-15 12:15</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="previewData('quality-system')">预览</button>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">配置</button>
                                        <button class="text-blue-600 hover:text-blue-800">详情</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">ERP系统</td>
                                    <td class="py-3 px-4">业务数据</td>
                                    <td class="py-3 px-4"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">同步中</span></td>
                                    <td class="py-3 px-4">3.4GB</td>
                                    <td class="py-3 px-4">2024-01-15 10:45</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="previewData('erp-system')">预览</button>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">配置</button>
                                        <button class="text-blue-600 hover:text-blue-800">详情</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">财务系统</td>
                                    <td class="py-3 px-4">财务数据</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">活跃</span></td>
                                    <td class="py-3 px-4">234MB</td>
                                    <td class="py-3 px-4">2024-01-15 09:20</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="previewData('finance-system')">预览</button>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">配置</button>
                                        <button class="text-blue-600 hover:text-blue-800">详情</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">人事系统</td>
                                    <td class="py-3 px-4">人力资源</td>
                                    <td class="py-3 px-4"><span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">离线</span></td>
                                    <td class="py-3 px-4">145MB</td>
                                    <td class="py-3 px-4">2024-01-14 18:45</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2" onclick="previewData('hr-system')">预览</button>
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">配置</button>
                                        <button class="text-blue-600 hover:text-blue-800">详情</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- 数据详情模态框 -->
            <div id="dataDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h3 id="dataDetailsTitle" class="text-lg font-semibold text-gray-900">数据详情</h3>
                                <button class="text-gray-400 hover:text-gray-600" onclick="closeDataDetails()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div id="dataDetailsContent" class="p-6">
                            <!-- 动态内容 -->
                        </div>
                        <div class="p-6 border-t border-gray-200 flex gap-2">
                            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="exportData()">导出数据</button>
                            <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" onclick="analyzeData()">数据分析</button>
                            <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors" onclick="closeDataDetails()">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 数据预览模态框 -->
            <div id="dataPreviewModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
                <div class="flex items-center justify-center min-h-screen p-4">
                    <div class="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200">
                            <div class="flex justify-between items-center">
                                <h3 id="dataPreviewTitle" class="text-lg font-semibold text-gray-900">数据预览</h3>
                                <button class="text-gray-400 hover:text-gray-600" onclick="closeDataPreview()">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div id="dataPreviewContent" class="p-6">
                            <!-- 动态内容 -->
                        </div>
                        <div class="p-6 border-t border-gray-200">
                            <button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors" onclick="closeDataPreview()">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // GPU资源汇总页面内容
    function getGPUResourcesContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">GPU资源汇总</h1>
                <p class="text-gray-600 mt-2">企业内部GPU资源、基础设施和云端资源管理</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">本地GPU</h3>
                        <i class="fas fa-microchip text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">8</div>
                    <p class="text-gray-600 text-sm">RTX 4090 / A100</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">云端GPU</h3>
                        <i class="fas fa-cloud text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">16</div>
                    <p class="text-gray-600 text-sm">AWS / 阿里云</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">使用率</h3>
                        <i class="fas fa-chart-pie text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">75%</div>
                    <p class="text-gray-600 text-sm">平均利用率</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">月成本</h3>
                        <i class="fas fa-dollar-sign text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">¥28K</div>
                    <p class="text-gray-600 text-sm">包含云端费用</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">GPU资源监控</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium text-gray-700">GPU-01 (RTX 4090)</span>
                                    <span class="text-sm text-gray-500">85%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-blue-600 h-2 rounded-full" style="width: 85%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium text-gray-700">GPU-02 (A100)</span>
                                    <span class="text-sm text-gray-500">92%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-red-600 h-2 rounded-full" style="width: 92%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-medium text-gray-700">云端集群</span>
                                    <span class="text-sm text-gray-500">68%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-600 h-2 rounded-full" style="width: 68%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-900">资源调度</h3>
                    </div>
                    <div class="p-6">
                        <div class="space-y-4">
                            <div class="p-4 bg-blue-50 rounded-lg">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4 class="font-medium text-blue-900">模型训练任务</h4>
                                        <p class="text-blue-700 text-sm">质检模型优化</p>
                                    </div>
                                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">运行中</span>
                                </div>
                            </div>
                            <div class="p-4 bg-yellow-50 rounded-lg">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4 class="font-medium text-yellow-900">推理服务</h4>
                                        <p class="text-yellow-700 text-sm">实时质检API</p>
                                    </div>
                                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">队列中</span>
                                </div>
                            </div>
                            <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">添加新任务</button>
                        </div>
                    </div>
                </div>
            </div>
        `;  
    }

    // 工具平台管理页面内容
    function getToolPlatformsContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">工具平台管理</h1>
                <p class="text-gray-600 mt-2">管理扣子、Dify等工具平台及其工作流、插件、API</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">扣子平台</h3>
                        <i class="fas fa-puzzle-piece text-blue-600"></i>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">工作流</span>
                            <span class="text-sm font-medium">12个</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">插件</span>
                            <span class="text-sm font-medium">8个</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">API调用</span>
                            <span class="text-sm font-medium">1.2K/日</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Dify平台</h3>
                        <i class="fas fa-robot text-green-600"></i>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">应用</span>
                            <span class="text-sm font-medium">6个</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">知识库</span>
                            <span class="text-sm font-medium">4个</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">对话次数</span>
                            <span class="text-sm font-medium">850/日</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">MCP连接</h3>
                        <i class="fas fa-link text-purple-600"></i>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">活跃连接</span>
                            <span class="text-sm font-medium">5个</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">数据传输</span>
                            <span class="text-sm font-medium">2.1GB</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm text-gray-600">响应时间</span>
                            <span class="text-sm font-medium">120ms</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">平台工作流管理</h3>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">新建工作流</button>
                    </div>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full">
                            <thead>
                                <tr class="border-b border-gray-200">
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">工作流名称</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">平台</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">类型</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">状态</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">最后运行</th>
                                    <th class="text-left py-3 px-4 font-medium text-gray-900">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">质检图像处理</td>
                                    <td class="py-3 px-4">扣子</td>
                                    <td class="py-3 px-4">图像分析</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">运行中</span></td>
                                    <td class="py-3 px-4">2分钟前</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">编辑</button>
                                        <button class="text-red-600 hover:text-red-800">停止</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">生产数据分析</td>
                                    <td class="py-3 px-4">Dify</td>
                                    <td class="py-3 px-4">数据处理</td>
                                    <td class="py-3 px-4"><span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">运行中</span></td>
                                    <td class="py-3 px-4">5分钟前</td>
                                    <td class="py-3 px-4">
                                        <button class="text-blue-600 hover:text-blue-800 mr-2">编辑</button>
                                        <button class="text-red-600 hover:text-red-800">停止</button>
                                    </td>
                                </tr>
                                <tr class="border-b border-gray-100">
                                    <td class="py-3 px-4">供应链优化</td>
                                    <td class="py-3 px-4">扣子</td>
                                    <td class="py-3 px-4">决策支持</td>
                                    <td class="py-3 px-4"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">待启动</span></td>
                                    <td class="py-3 px-4">1小时前</td>
                                    <td class="py-3 px-4">
                                        <button class="text-green-600 hover:text-green-800 mr-2">启动</button>
                                        <button class="text-blue-600 hover:text-blue-800">编辑</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Prompt列表页面内容
    function getPromptListContent() {
        return `
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Prompt提示词列表</h1>
                <p class="text-gray-600 mt-2">企业内部Prompt提示词库管理</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">质检类</h3>
                        <i class="fas fa-search text-blue-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-blue-600 mb-2">24</div>
                    <p class="text-gray-600 text-sm">质量检测相关提示词</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">生产类</h3>
                        <i class="fas fa-cogs text-green-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-green-600 mb-2">18</div>
                    <p class="text-gray-600 text-sm">生产管理相关提示词</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">设计类</h3>
                        <i class="fas fa-drafting-compass text-purple-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-purple-600 mb-2">12</div>
                    <p class="text-gray-600 text-sm">产品设计相关提示词</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">分析类</h3>
                        <i class="fas fa-chart-line text-orange-600"></i>
                    </div>
                    <div class="text-2xl font-bold text-orange-600 mb-2">15</div>
                    <p class="text-gray-600 text-sm">数据分析相关提示词</p>
                </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="text-lg font-semibold text-gray-900">Prompt库管理</h3>
                        <div class="flex space-x-2">
                            <input type="text" placeholder="搜索Prompt..." class="px-3 py-2 border border-gray-300 rounded-md">
                            <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">新建Prompt</button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <h4 class="font-medium text-gray-900">产品缺陷检测</h4>
                                    <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">质检类</span>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
                                    <button class="text-green-600 hover:text-green-800"><i class="fas fa-copy"></i></button>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">分析产品图像，识别表面缺陷、尺寸偏差等质量问题...</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>使用次数: 156</span>
                                <span>更新时间: 2025-01-15</span>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <h4 class="font-medium text-gray-900">生产效率优化</h4>
                                    <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">生产类</span>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
                                    <button class="text-green-600 hover:text-green-800"><i class="fas fa-copy"></i></button>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">基于生产数据分析，提供设备调优和流程改进建议...</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>使用次数: 89</span>
                                <span>更新时间: 2025-01-12</span>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <h4 class="font-medium text-gray-900">产品设计评估</h4>
                                    <span class="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1">设计类</span>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
                                    <button class="text-green-600 hover:text-green-800"><i class="fas fa-copy"></i></button>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">评估产品设计的可制造性、成本效益和市场潜力...</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>使用次数: 67</span>
                                <span>更新时间: 2025-01-10</span>
                            </div>
                        </div>
                        
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <h4 class="font-medium text-gray-900">供应链风险分析</h4>
                                    <span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-1">分析类</span>
                                </div>
                                <div class="flex space-x-2">
                                    <button class="text-blue-600 hover:text-blue-800"><i class="fas fa-edit"></i></button>
                                    <button class="text-green-600 hover:text-green-800"><i class="fas fa-copy"></i></button>
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm mb-3">分析供应链数据，识别潜在风险点和优化机会...</p>
                            <div class="flex justify-between items-center text-xs text-gray-500">
                                <span>使用次数: 43</span>
                                <span>更新时间: 2025-01-08</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }