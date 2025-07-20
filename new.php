<?php
require_once 'config/config_reader.php';
$pageTitle = getPageTitle('new');
$appName = getAppName();
$appSubtitle = getAppSubtitle();
$mainConsoleTitle = getMainConsoleTitle();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle); ?></title>
    <link href="src/css/tailwind.min.css" rel="stylesheet">
    <link href="src/css/bootstrap-icons.css" rel="stylesheet">
    <link href="src/css/new-page.css" rel="stylesheet">
</head>
<body class="bg-gray-50 font-sans">
    <!-- 移动端遮罩层 -->
    <div id="mobile-overlay" class="mobile-overlay hidden"></div>
    
    <!-- 侧边栏 -->
    <div id="sidebar" class="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 sidebar-transition border-r border-gray-200">
        <!-- Logo区域 -->
        <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <i class="bi bi-cloud text-white text-lg"></i>
                    </div>
                    <div class="logo-text">
                        <h1 class="text-lg font-semibold text-gray-900"><?php echo htmlspecialchars($appName); ?></h1>
                        <p class="text-xs text-gray-500"><?php echo htmlspecialchars($appSubtitle); ?></p>
                    </div>
                </div>
                <button id="sidebar-toggle" class="p-2 rounded-lg hover:bg-gray-100 transition-colors tooltip" data-tooltip="折叠菜单">
                    <i class="bi bi-list text-gray-600"></i>
                </button>
            </div>
        </div>

        <!-- 导航菜单 -->
        <nav class="p-4 space-y-2 overflow-y-auto h-full pb-32">
            <!-- 核心功能 -->
            <div class="mb-6">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 nav-text">核心功能</h3>
                <div class="space-y-1">
                    <a href="#" onclick="showContent('overview')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="全景图">
                        <i class="bi bi-grid-3x3-gap text-lg mr-3 google-blue"></i>
                        <span class="font-medium nav-text">全景图</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'overview')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('dashboard')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="Dashboard">
                        <i class="bi bi-speedometer2 text-lg mr-3 google-green"></i>
                        <span class="font-medium nav-text">Dashboard</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'dashboard')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('logs')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="日志">
                        <i class="bi bi-journal-text text-lg mr-3 google-orange"></i>
                        <span class="font-medium nav-text">日志</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'logs')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                </div>
            </div>

            <!-- 数字资产 -->
            <div class="mb-6">
                <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 nav-text">数字资产</h3>
                <div class="space-y-1">
                    <a href="#" onclick="showContent('platform')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="基础平台" data-count="0">
                        <i class="bi bi-server text-lg mr-3 google-blue"></i>
                        <span class="font-medium nav-text">基础平台</span>
                        <span class="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full" id="platform-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'platform')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('model')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="AI模型" data-count="0">
                        <i class="bi bi-cpu text-lg mr-3 google-green"></i>
                        <span class="font-medium nav-text">AI模型</span>
                        <span class="ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full" id="model-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'model')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('data')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="数据资源" data-count="0">
                        <i class="bi bi-database text-lg mr-3 google-orange"></i>
                        <span class="font-medium nav-text">数据资源</span>
                        <span class="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full" id="data-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'data')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('tool')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="工具管理" data-count="0">
                        <i class="bi bi-tools text-lg mr-3 google-red"></i>
                        <span class="font-medium nav-text">工具管理</span>
                        <span class="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full" id="tool-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'tool')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('prompt')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="提示工程" data-count="0">
                        <i class="bi bi-chat-square-text text-lg mr-3 google-blue"></i>
                        <span class="font-medium nav-text">提示工程</span>
                        <span class="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full" id="prompt-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'prompt')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('agent')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="智能代理" data-count="0">
                        <i class="bi bi-robot text-lg mr-3 google-green"></i>
                        <span class="font-medium nav-text">智能代理</span>
                        <span class="ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full" id="agent-count">0</span>
                        <button class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'agent')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                    <a href="#" onclick="showContent('dataview')" class="nav-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 group tooltip" data-tooltip="数据">
                        <i class="bi bi-bar-chart text-lg mr-3 google-purple"></i>
                        <span class="font-medium nav-text">数据</span>
                        <button class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" onclick="event.stopPropagation(); toggleFavorite(this, 'dataview')">
                            <i class="bi bi-star text-gray-400 hover:text-yellow-500"></i>
                        </button>
                    </a>
                </div>
            </div>
        </nav>

        <!-- 底部用户信息 -->
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <i class="bi bi-person text-white text-lg"></i>
                </div>
                <div class="flex-1 user-info">
                    <p class="text-sm font-medium text-gray-900 nav-text">管理员</p>
                    <p class="text-xs text-gray-500 nav-text">admin@ai-console.com</p>
                </div>
                <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors tooltip" data-tooltip="设置">
                    <i class="bi bi-gear text-gray-500"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- 子菜单栏 -->
    <div id="submenu" class="fixed left-64 top-0 h-full w-64 bg-white shadow-lg z-40 sidebar-transition border-r border-gray-200 hidden">
        <div class="p-4 border-b border-gray-100">
            <h2 id="submenu-title" class="text-lg font-semibold text-gray-900">子菜单</h2>
        </div>
        <nav class="p-4 space-y-1 overflow-y-auto h-full">
            <div id="submenu-items">
                <!-- 动态加载的子菜单项 -->
            </div>
        </nav>
    </div>

    <!-- 主内容区 -->
    <div id="main-content" class="ml-64 content-transition">
        <!-- 顶部导航栏 -->
        <header class="glass-effect sticky top-0 z-40 border-b border-gray-200">
            <div class="flex items-center justify-between px-6 py-4">
                <div class="flex items-center space-x-4">
                    <!-- 移动端菜单按钮 -->
                    <button id="mobile-menu-toggle" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                    
                    <nav class="flex items-center space-x-2 text-sm">
                        <span class="text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" onclick="showContent('overview')">控制台</span>
                        <i class="bi bi-chevron-right text-gray-400 text-xs"></i>
                        <span id="current-page" class="text-gray-900 font-medium">概览</span>
                        <span id="current-subpage" class="hidden">
                            <i class="bi bi-chevron-right text-gray-400 text-xs"></i>
                            <span class="text-gray-900 font-medium"></span>
                        </span>
                    </nav>
                </div>
                
                <div class="flex items-center space-x-4">
                    <!-- 搜索框 -->
                    <div class="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <i class="bi bi-search text-gray-400 mr-2"></i>
                        <input type="text" placeholder="搜索资源..." class="bg-transparent border-none outline-none text-sm w-64" id="search-input">
                    </div>
                    
                    <!-- 移动端搜索按钮 -->
                    <button id="mobile-search-toggle" class="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <i class="bi bi-search text-gray-600"></i>
                    </button>
                    
                    <!-- 刷新按钮 -->
                    <button onclick="loadData()" class="p-2 rounded-full hover:bg-gray-100 transition-colors tooltip" data-tooltip="刷新数据">
                        <i class="bi bi-arrow-clockwise text-gray-600"></i>
                    </button>
                    
                    <!-- 通知 -->
                    <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative tooltip" data-tooltip="通知">
                        <i class="bi bi-bell text-gray-600"></i>
                        <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    </button>
                </div>
            </div>
            
            <!-- 移动端搜索栏 -->
            <div id="mobile-search" class="hidden px-6 pb-4 sm:hidden">
                <div class="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <i class="bi bi-search text-gray-400 mr-2"></i>
                    <input type="text" placeholder="搜索资源..." class="bg-transparent border-none outline-none text-sm w-full" id="mobile-search-input">
                </div>
            </div>
        </header>

        <!-- 内容区域 -->
        <main class="p-6" id="content-area">
            <!-- 其他内容页面将在这里动态加载 -->
            <div id="dynamic-content" class="hidden1">
                <!-- 动态内容区域 -->
            </div>

            <!-- 默认概览页面 -->
            <div id="overview-content">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">AI资源管理控制台</h1>
                    <p class="text-gray-600">统一管理和监控您的AI资源</p>
                </div>

                <!-- 统计卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="bi bi-server text-blue-600 text-xl"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">基础平台</p>
                                <p class="text-2xl font-bold text-gray-900" id="overview-platform-count">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <i class="bi bi-cpu text-green-600 text-xl"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">AI模型</p>
                                <p class="text-2xl font-bold text-gray-900" id="overview-model-count">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <i class="bi bi-tools text-orange-600 text-xl"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">工具资源</p>
                                <p class="text-2xl font-bold text-gray-900" id="overview-tool-count">0</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <i class="bi bi-collection text-purple-600 text-xl"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium text-gray-600">总资源</p>
                                <p class="text-2xl font-bold text-gray-900" id="overview-total-count">0</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 最近活动 -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="p-6 border-b border-gray-200">
                        <h2 class="text-lg font-semibold text-gray-900">最近活动</h2>
                    </div>
                    <div class="p-6">
                        <div id="recent-activities" class="space-y-4">
                            <!-- 动态加载的活动列表 -->
                        </div>
                    </div>
                </div>
            </div>

            
        </main>
    </div>

    <script>
        let allData = [];
        let filteredData = [];
        let currentView = 'overview';

        // 页面加载时初始化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM内容已加载');
            // 检查关键元素是否存在
            const overviewContent = document.getElementById('overview-content');
            const dynamicContent = document.getElementById('dynamic-content');
            const contentArea = document.getElementById('content-area');
            
            console.log('overview-content存在:', !!overviewContent);
            console.log('dynamic-content存在:', !!dynamicContent);
            console.log('content-area存在:', !!contentArea);
            
            loadData();
            setupSearch();
        });

        // 加载数据
        async function loadData() {
            try {
                console.log('开始加载数据...');
                
                // 移除加载状态显示
                
                console.log('发送请求到: data/feishu_data.json');
                const response = await fetch('data/feishu_data.json');
                console.log('响应状态:', response.status, response.statusText);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                console.log('开始解析JSON数据...');
                allData = await response.json();
                console.log('JSON解析完成，数据条数:', allData.length);
                
                filteredData = allData;
                updateCounts();
                updateRecentActivities();
                
                if (currentView !== 'overview') {
                    showContent(currentView);
                } else {
                    // 等待DOM完全渲染后再操作
                    await new Promise(resolve => setTimeout(resolve, 50));
                    
                    // 隐藏加载状态，显示概览内容
                    const overviewContent = document.getElementById('overview-content');
                    const dynamicContent = document.getElementById('dynamic-content');
                    const contentArea = document.getElementById('content-area');
                    
                    if (overviewContent) {
                        overviewContent.style.display = 'block';
                        console.log('显示概览内容');
                    } else {
                        console.error('找不到overview-content元素');
                    }
                    
                    if (dynamicContent) {
                        //dynamicContent.style.display = 'none';
                    } else {
                        console.warn('找不到dynamic-content元素，但这是正常的');
                    }
                    
                    // 重新更新统计数据
                    updateCounts();
                    updateRecentActivities();
                }
                
                console.log('数据加载完成:', allData.length, '条记录');
            } catch (error) {
                console.error('加载数据失败:', error);
                showError('无法加载数据，请检查网络连接或稍后重试。', 'loadData');
            }
        }

        // 更新统计数据
        function updateCounts() {
            const counts = {
                platform: allData.filter(item => item.分类 && item.分类.includes('A1')).length,
                model: allData.filter(item => item.分类 && item.分类.includes('A2')).length,
                data: allData.filter(item => item.分类 && item.分类.includes('A3')).length,
                tool: allData.filter(item => item.分类 && item.分类.includes('A4')).length,
                prompt: allData.filter(item => item.分类 && item.分类.includes('A5')).length,
                agent: allData.filter(item => item.分类 && item.分类.includes('A6')).length
            };

            // 更新侧边栏计数（添加空值检查）
            const platformCountEl = document.getElementById('platform-count');
            const modelCountEl = document.getElementById('model-count');
            const dataCountEl = document.getElementById('data-count');
            const toolCountEl = document.getElementById('tool-count');
            const promptCountEl = document.getElementById('prompt-count');
            const agentCountEl = document.getElementById('agent-count');
            
            if (platformCountEl) platformCountEl.textContent = counts.platform;
            if (modelCountEl) modelCountEl.textContent = counts.model;
            if (dataCountEl) dataCountEl.textContent = counts.data;
            if (toolCountEl) toolCountEl.textContent = counts.tool;
            if (promptCountEl) promptCountEl.textContent = counts.prompt;
            if (agentCountEl) agentCountEl.textContent = counts.agent;
            
            // 更新导航项的data-count属性
            updateNavItemCounts(counts);

            // 更新概览页面计数（添加空值检查）
            const overviewPlatformCountEl = document.getElementById('overview-platform-count');
            const overviewModelCountEl = document.getElementById('overview-model-count');
            const overviewToolCountEl = document.getElementById('overview-tool-count');
            const overviewTotalCountEl = document.getElementById('overview-total-count');
            
            if (overviewPlatformCountEl) overviewPlatformCountEl.textContent = counts.platform;
            if (overviewModelCountEl) overviewModelCountEl.textContent = counts.model;
            if (overviewToolCountEl) overviewToolCountEl.textContent = counts.tool;
            if (overviewTotalCountEl) overviewTotalCountEl.textContent = allData.length;
        }

        // 更新导航项计数属性
        function updateNavItemCounts(counts) {
            const navItems = {
                platform: document.querySelector('[onclick*="platform"]'),
                model: document.querySelector('[onclick*="model"]'),
                data: document.querySelector('[onclick*="data"]'),
                tool: document.querySelector('[onclick*="tool"]'),
                prompt: document.querySelector('[onclick*="prompt"]'),
                agent: document.querySelector('[onclick*="agent"]')
            };
            
            Object.keys(navItems).forEach(key => {
                const navItem = navItems[key];
                if (navItem && counts[key] !== undefined) {
                    navItem.setAttribute('data-count', counts[key]);
                }
            });
        }
        
        // 更新最近活动
        function updateRecentActivities() {
            const recentItems = allData
                .filter(item => item.时间)
                .sort((a, b) => b.时间 - a.时间)
                .slice(0, 5);

            const activitiesHtml = recentItems.map(item => {
                const name = item.名称 && item.名称[0] ? item.名称[0].text : '未知';
                const category = item.分类 || '未分类';
                const time = new Date(item.时间).toLocaleString('zh-CN');
                
                return `
                    <div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="bi bi-plus text-blue-600 text-sm"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900">${name}</p>
                            <p class="text-xs text-gray-500">${category} • ${time}</p>
                        </div>
                    </div>
                `;
            }).join('');

            const recentActivitiesEl = document.getElementById('recent-activities');
            if (recentActivitiesEl) {
                recentActivitiesEl.innerHTML = activitiesHtml || '<p class="text-gray-500 text-center py-4">暂无活动记录</p>';
            }
        }

        // 显示内容
        function showContent(type) {
            currentView = type;
            
            // 更新导航状态
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            if (event && event.target) {
                const navItem = event.target.closest('.nav-item');
                if (navItem) {
                    navItem.classList.add('active');
                }
            }

            // 更新面包屑
            const pageNames = {
                overview: '全景图',
                dashboard: 'Dashboard',
                logs: '日志',
                platform: '基础平台',
                model: 'AI模型',
                data: '数据资源',
                tool: '工具管理',
                prompt: '提示工程',
                agent: '智能代理',
                dataview: '数据'
            };
            const currentPageElement = document.getElementById('current-page');
            const currentSubpageElement = document.getElementById('current-subpage');
            
            if (currentPageElement) {
                currentPageElement.textContent = pageNames[type] || '概览';
            }
            if (currentSubpageElement) {
                currentSubpageElement.style.display = 'none';
            }

            if (type === 'overview' || type === 'dashboard' || type === 'logs') {
                // 隐藏子菜单
                hideSubmenu();
                const overviewContent = document.getElementById('overview-content');
                const dynamicContent = document.getElementById('dynamic-content');
                
                if (overviewContent) {
                    overviewContent.style.display = type === 'overview' ? 'block' : 'none';
                }
                if (dynamicContent) {
                    //dynamicContent.style.display = type === 'overview' ? 'none' : 'block';
                }
                if (type !== 'overview') {
                    loadCategoryContent(type);
                }
            } else if (type === 'dataview') {
                // 特殊处理数据菜单，显示mumulab.cn的iframe
                hideSubmenu();
                const overviewContent = document.getElementById('overview-content');
                const dynamicContent = document.getElementById('dynamic-content');
                
                if (overviewContent) {
                    overviewContent.style.display = 'none';
                }
                if (dynamicContent) {
                    dynamicContent.style.display = 'block';
                    dynamicContent.innerHTML = `
                        <div class="h-full">
                            <iframe src="https://mumulab.cn" 
                                    class="w-full h-screen border-0" 
                                    frameborder="0" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                    `;
                }
            } else {
                // 显示子菜单和分类内容
                showSubmenu(type);
                const overviewContent = document.getElementById('overview-content');
                const dynamicContent = document.getElementById('dynamic-content');
                
                if (overviewContent) {
                    overviewContent.style.display = 'none';
                }
                if (dynamicContent) {
                    dynamicContent.style.display = 'block';
                }
                loadCategoryContent(type);
            }
        }

        // 显示子菜单
        function showSubmenu(category) {
            const submenu = document.getElementById('submenu');
            const mainContent = document.getElementById('main-content');
            const sidebar = document.getElementById('sidebar');
            
            if (submenu) {
                submenu.classList.remove('hidden');
            }
            if (mainContent && sidebar) {
                // 根据侧边栏是否折叠来设置不同的margin
                if (sidebar.classList.contains('sidebar-collapsed')) {
                    mainContent.classList.remove('ml-16');
                    mainContent.classList.add('ml-80');
                } else {
                    mainContent.classList.remove('ml-64');
                    mainContent.classList.add('ml-128');
                }
            }
            
            const categoryMap = {
                platform: 'A1',
                model: 'A2',
                data: 'A3',
                tool: 'A4',
                prompt: 'A5',
                agent: 'A6'
            };
            
            const categoryNames = {
                platform: '基础平台',
                model: 'AI模型',
                data: '数据资源',
                tool: '工具管理',
                prompt: '提示工程',
                agent: '智能代理'
            };
            
            const submenuTitle = document.getElementById('submenu-title');
            if (submenuTitle) {
                submenuTitle.textContent = categoryNames[category];
            }
            
            const categoryCode = categoryMap[category];
            const categoryData = allData.filter(item => 
                item.分类 && item.分类.includes(categoryCode)
            );
            
            const submenuHtml = categoryData.map((item, index) => {
                const name = item.名称 && item.名称[0] ? item.名称[0].text : '未知';
                return `
                    <a href="#" onclick="showItemDetail('${category}', ${index})" class="submenu-item flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <i class="bi bi-circle text-xs mr-3 text-gray-400"></i>
                        <span class="text-sm">${name}</span>
                    </a>
                `;
            }).join('');
            
            const submenuItems = document.getElementById('submenu-items');
            if (submenuItems) {
                submenuItems.innerHTML = submenuHtml;
            }
            
            // 默认选中第一个项目
            if (categoryData.length > 0) {
                setTimeout(() => showItemDetail(category, 0), 100);
            }
        }

        // 隐藏子菜单
        function hideSubmenu() {
            const submenu = document.getElementById('submenu');
            const mainContent = document.getElementById('main-content');
            const sidebar = document.getElementById('sidebar');
            
            if (submenu) {
                submenu.classList.add('hidden');
            }
            if (mainContent && sidebar) {
                // 根据侧边栏是否折叠来设置不同的margin
                if (sidebar.classList.contains('sidebar-collapsed')) {
                    mainContent.classList.remove('ml-80');
                    mainContent.classList.add('ml-16');
                } else {
                    mainContent.classList.remove('ml-128');
                    mainContent.classList.add('ml-64');
                }
            }
        }

        // 显示项目详情
        function showItemDetail(category, index) {
            // 更新子菜单选中状态
            const submenuItems = document.querySelectorAll('.submenu-item');
            submenuItems.forEach(item => {
                item.classList.remove('bg-blue-100', 'text-blue-600');
            });
            if (submenuItems[index]) {
                submenuItems[index].classList.add('bg-blue-100', 'text-blue-600');
            }
            
            const categoryMap = {
                platform: 'A1',
                model: 'A2',
                data: 'A3',
                tool: 'A4',
                prompt: 'A5',
                agent: 'A6'
            };
            
            const categoryCode = categoryMap[category];
            const categoryData = allData.filter(item => 
                item.分类 && item.分类.includes(categoryCode)
            );
            
            const item = categoryData[index];
            if (!item) return;
            
            const name = item.名称 && item.名称[0] ? item.名称[0].text : '未知';
            const time = item.时间 ? new Date(item.时间).toLocaleDateString('zh-CN') : '未知';
            const good = item.Good && item.Good[0] ? item.Good[0].text : '';
            const bad = item.Bad && item.Bad[0] ? item.Bad[0].text : '';
            const cost = item.Cost && item.Cost[0] ? item.Cost[0].text : '';
            const link = item.链接 && item.链接[0] ? item.链接[0].text : '';
            
            // 添加到最近访问
            const categoryNames = {
                platform: '基础平台',
                model: 'AI模型',
                data: '数据资源',
                tool: '工具管理',
                prompt: '提示工程',
                agent: '智能代理'
            };
            
            addToRecentlyViewed({
                id: `${category}-${index}`,
                name: name,
                category: categoryNames[category],
                item: item
            });
            
            // 更新面包屑
            const currentSubpage = document.getElementById('current-subpage');
            if (currentSubpage) {
                currentSubpage.style.display = 'inline';
                const subpageSpan = currentSubpage.querySelector('span');
                if (subpageSpan) {
                    subpageSpan.textContent = name;
                }
            }
            
            const itemId = `${category}-${index}`;
            const isFavorited = localStorage.getItem(`item-favorite-${itemId}`) === 'true';
            
            const detailHtml = `
                <div class="max-w-4xl">
                    <div class="mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <h1 class="text-3xl font-bold text-gray-900">${name}</h1>
                            <div class="flex items-center space-x-3">
                                <button onclick="toggleItemFavorite('${itemId}', this)" class="px-3 py-1 ${isFavorited ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'} rounded-full text-sm hover:bg-opacity-80 transition-colors">
                                    <svg class="w-4 h-4 inline mr-1" fill="${isFavorited ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                    </svg>${isFavorited ? '已收藏' : '收藏'}
                                </button>
                                <span class="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">${item.分类}</span>
                            </div>
                        </div>
                        <p class="text-gray-600">创建时间：${time}</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        ${good ? `
                        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                            <div class="flex items-center mb-3">
                                <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                <h3 class="text-lg font-semibold text-green-800">优势特点</h3>
                            </div>
                            <p class="text-green-700">${good}</p>
                        </div>
                        ` : ''}
                        
                        ${bad ? `
                        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div class="flex items-center mb-3">
                                <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                                </svg>
                                <h3 class="text-lg font-semibold text-red-800">注意事项</h3>
                            </div>
                            <p class="text-red-700">${bad}</p>
                        </div>
                        ` : ''}
                        
                        ${cost ? `
                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div class="flex items-center mb-3">
                                <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
                                </svg>
                                <h3 class="text-lg font-semibold text-yellow-800">成本信息</h3>
                            </div>
                            <p class="text-yellow-700">${cost}</p>
                        </div>
                        ` : ''}
                        
                        ${link ? `
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <div class="flex items-center mb-3">
                                <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                                </svg>
                                <h3 class="text-lg font-semibold text-blue-800">相关链接</h3>
                            </div>
                            <div class="mb-3">
                                <a href="${link}" target="_blank" class="text-blue-600 hover:text-blue-800 underline break-all" onclick="trackLinkClick('${name}', '${link}')">${link}</a>
                            </div>
                            <div class="mt-4">
                                <button onclick="toggleIframe('${link}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                    预览链接内容
                                </button>
                            </div>
                        </div>
                        ` : ''}
                    </div>

                    <div class="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">详细信息</h3>
                        <div class="space-y-3">
                            <div class="flex items-center">
                                <span class="text-sm font-medium text-gray-500 w-20">分类：</span>
                                <span class="text-sm text-gray-900">${item.分类}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-sm font-medium text-gray-500 w-20">视图：</span>
                                <span class="text-sm text-gray-900">${item.视图 || '未设置'}</span>
                            </div>
                            <div class="flex items-center">
                                <span class="text-sm font-medium text-gray-500 w-20">状态：</span>
                                <span class="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">活跃</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 相关链接iframe容器 -->
                    <div id="iframe-container" class="hidden mt-6">
                        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                <h3 class="text-lg font-semibold text-gray-900">链接预览</h3>
                                <button onclick="closeIframe()" class="text-gray-500 hover:text-gray-700 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>
                            <div class="relative">
                                <iframe id="link-iframe" src="" class="w-full h-96 border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"></iframe>
                                <div id="iframe-loading" class="absolute inset-0 bg-white flex items-center justify-center">
                                    <div class="text-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                        <p class="text-gray-600">正在加载链接内容...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            let dynamicContentElement = document.getElementById('dynamic-content');
            
            if (!dynamicContentElement) {
                console.log('dynamic-content元素不存在，正在创建...');
                const contentArea = document.getElementById('content-area');
                if (contentArea) {
                    // 创建dynamic-content元素
                    dynamicContentElement = document.createElement('div');
                    dynamicContentElement.id = 'dynamic-content';
                    dynamicContentElement.className = 'hidden';
                    contentArea.appendChild(dynamicContentElement);
                    console.log('dynamic-content元素已创建');
                } else {
                    console.error('找不到content-area元素，无法创建dynamic-content');
                    return;
                }
            }
            
            // 隐藏overview-content，显示dynamic-content
            const overviewContent = document.getElementById('overview-content');
            if (overviewContent) {
                overviewContent.style.display = 'none';
            }
            
            dynamicContentElement.innerHTML = detailHtml;
            dynamicContentElement.style.display = 'block';
            dynamicContentElement.classList.remove('hidden');
            console.log('详情内容已加载到dynamic-content');
        }
        
        // 收藏项目功能
        function toggleItemFavorite(itemId, button) {
            const isFavorited = localStorage.getItem(`item-favorite-${itemId}`) === 'true';
            
            if (isFavorited) {
                localStorage.removeItem(`item-favorite-${itemId}`);
                button.innerHTML = `
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>收藏
                `;
                button.className = 'px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm hover:bg-opacity-80 transition-colors';
            } else {
                localStorage.setItem(`item-favorite-${itemId}`, 'true');
                button.innerHTML = `
                    <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>已收藏
                `;
                button.className = 'px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm hover:bg-opacity-80 transition-colors';
            }
        }
        
        // 跟踪链接点击
        function trackLinkClick(name, link) {
            console.log(`用户点击了链接: ${name} - ${link}`);
            // 这里可以添加分析代码
        }
        
        // 切换iframe显示
        function toggleIframe(url) {
            const iframeContainer = document.getElementById('iframe-container');
            const iframe = document.getElementById('link-iframe');
            const loadingDiv = document.getElementById('iframe-loading');
            
            if (iframeContainer.classList.contains('hidden')) {
                // 显示iframe容器
                iframeContainer.classList.remove('hidden');
                loadingDiv.style.display = 'flex';
                
                // 设置iframe源地址
                iframe.src = url;
                
                // 监听iframe加载完成
                iframe.onload = function() {
                    loadingDiv.style.display = 'none';
                };
                
                // 设置加载超时
                setTimeout(() => {
                    if (loadingDiv.style.display !== 'none') {
                        loadingDiv.innerHTML = `
                            <div class="text-center">
                                <svg class="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <p class="text-gray-600">加载超时，请检查链接是否有效</p>
                                <button onclick="closeIframe()" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    关闭预览
                                </button>
                            </div>
                        `;
                    }
                }, 10000); // 10秒超时
                
                // 滚动到iframe位置
                setTimeout(() => {
                    iframeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                // 隐藏iframe容器
                closeIframe();
            }
        }
        
        // 关闭iframe
        function closeIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const iframe = document.getElementById('link-iframe');
            const loadingDiv = document.getElementById('iframe-loading');
            
            iframeContainer.classList.add('hidden');
            iframe.src = '';
            loadingDiv.style.display = 'flex';
            loadingDiv.innerHTML = `
                <div class="text-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p class="text-gray-600">正在加载链接内容...</p>
                </div>
            `;
        }

        // 加载分类内容
        function loadCategoryContent(category) {
            const categoryMap = {
                platform: 'A1',
                model: 'A2',
                data: 'A3',
                tool: 'A4',
                prompt: 'A5',
                agent: 'A6'
            };

            const categoryCode = categoryMap[category];
            const categoryData = allData.filter(item => 
                item.分类 && item.分类.includes(categoryCode)
            );

            const categoryNames = {
                platform: '基础平台',
                model: 'AI模型',
                data: '数据资源',
                tool: '工具管理',
                prompt: '提示工程',
                agent: '智能代理'
            };

            const contentHtml = `
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900 mb-2">${categoryNames[category]}</h1>
                    <p class="text-gray-600">共 ${categoryData.length} 个资源</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${categoryData.map(item => {
                        const name = item.名称 && item.名称[0] ? item.名称[0].text : '未知';
                        const time = item.时间 ? new Date(item.时间).toLocaleDateString('zh-CN') : '未知';
                        const good = item.Good && item.Good[0] ? item.Good[0].text : '';
                        const bad = item.Bad && item.Bad[0] ? item.Bad[0].text : '';
                        const cost = item.Cost && item.Cost[0] ? item.Cost[0].text : '';
                        
                        return `
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 card-hover">
                                <div class="flex items-start justify-between mb-4">
                                    <h3 class="text-lg font-semibold text-gray-900">${name}</h3>
                                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">${item.分类}</span>
                                </div>
                                
                                ${good ? `<div class="mb-2"><span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">优点: ${good}</span></div>` : ''}
                                ${bad ? `<div class="mb-2"><span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">缺点: ${bad}</span></div>` : ''}
                                ${cost ? `<div class="mb-2"><span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">成本: ${cost}</span></div>` : ''}
                                
                                <div class="mt-4 pt-4 border-t border-gray-100">
                                    <p class="text-xs text-gray-500">更新时间: ${time}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            let dynamicContent = document.getElementById('dynamic-content');
            console.log('dynamic-content元素:', dynamicContent);
            
            if (!dynamicContent) {
                console.log('dynamic-content元素不存在，正在创建...');
                const contentArea = document.getElementById('content-area');
                if (contentArea) {
                    // 创建dynamic-content元素
                    dynamicContent = document.createElement('div');
                    dynamicContent.id = 'dynamic-content';
                    dynamicContent.className = 'hidden';
                    contentArea.appendChild(dynamicContent);
                    console.log('dynamic-content元素已创建');
                } else {
                    console.error('找不到content-area元素，无法创建dynamic-content');
                    return;
                }
            }
            
            // 隐藏overview-content，显示dynamic-content
            const overviewContent = document.getElementById('overview-content');
            if (overviewContent) {
                overviewContent.style.display = 'none';
            }
            
            dynamicContent.innerHTML = contentHtml;
            dynamicContent.style.display = 'block';
            dynamicContent.classList.remove('hidden');
            console.log('分类内容已加载到dynamic-content');
        }

        // 设置搜索功能
        function setupSearch() {
            const searchInput = document.getElementById('search-input');
            searchInput.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase();
                if (query) {
                    filteredData = allData.filter(item => {
                        const name = item.名称 && item.名称[0] ? item.名称[0].text.toLowerCase() : '';
                        const category = item.分类 ? item.分类.toLowerCase() : '';
                        return name.includes(query) || category.includes(query);
                    });
                } else {
                    filteredData = allData;
                }
                
                if (currentView !== 'overview') {
                    loadCategoryContent(currentView);
                }
            });
        }

        // 收藏功能
        function toggleFavorite(button, itemId) {
            const icon = button.querySelector('i');
            const navItem = button.closest('.nav-item');
            
            if (icon.classList.contains('bi-star')) {
                icon.classList.remove('bi-star');
                icon.classList.add('bi-star-fill');
                icon.classList.add('text-yellow-500');
                navItem.classList.add('favorited');
                localStorage.setItem(`favorite-${itemId}`, 'true');
            } else {
                icon.classList.remove('bi-star-fill');
                icon.classList.add('bi-star');
                icon.classList.remove('text-yellow-500');
                navItem.classList.remove('favorited');
                localStorage.removeItem(`favorite-${itemId}`);
            }
        }

        // 加载收藏状态
        function loadFavorites() {
            const favoriteItems = ['overview', 'dashboard', 'logs', 'platform', 'model', 'data', 'tool', 'prompt', 'agent'];
            favoriteItems.forEach(itemId => {
                if (localStorage.getItem(`favorite-${itemId}`) === 'true') {
                    const navItem = document.querySelector(`[onclick*="${itemId}"]`);
                    if (navItem) {
                        const button = navItem.querySelector('button');
                        if (button) {
                            const icon = button.querySelector('i');
                            icon.classList.remove('bi-star');
                            icon.classList.add('bi-star-fill');
                            icon.classList.add('text-yellow-500');
                            navItem.classList.add('favorited');
                        }
                    }
                }
            });
        }

        // 侧边栏折叠功能
        document.getElementById('sidebar-toggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('main-content');
            const submenu = document.getElementById('submenu');
            
            sidebar.classList.toggle('sidebar-collapsed');
            
            if (sidebar.classList.contains('sidebar-collapsed')) {
                if (!submenu.classList.contains('hidden')) {
                    mainContent.classList.remove('ml-128');
                    mainContent.classList.add('ml-80');
                } else {
                    mainContent.classList.remove('ml-64');
                    mainContent.classList.add('ml-16');
                }
            } else {
                if (!submenu.classList.contains('hidden')) {
                    mainContent.classList.remove('ml-80');
                    mainContent.classList.add('ml-128');
                } else {
                    mainContent.classList.remove('ml-16');
                    mainContent.classList.add('ml-64');
                }
            }
        });

        // 移动端菜单控制
        document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('hidden');
        });
        
        // 移动端遮罩层点击关闭菜单
        document.getElementById('mobile-overlay').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            
            sidebar.classList.remove('mobile-open');
            overlay.classList.add('hidden');
        });
        
        // 移动端搜索控制
        document.getElementById('mobile-search-toggle').addEventListener('click', function() {
            const mobileSearch = document.getElementById('mobile-search');
            mobileSearch.classList.toggle('hidden');
            
            if (!mobileSearch.classList.contains('hidden')) {
                document.getElementById('mobile-search-input').focus();
            }
        });
        
        // 搜索功能
        function handleSearch(event) {
            const query = event.target.value.toLowerCase();
            const items = document.querySelectorAll('.submenu-item, .content-item');
            
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        // 面包屑导航点击返回
        function goBackToBreadcrumb() {
            const breadcrumbText = document.getElementById('breadcrumb-text').textContent;
            const categoryMap = {
                '基础平台': 'A1',
                'AI模型': 'A2',
                '数据': 'A3',
                '工具': 'A4',
                '提示词': 'A5',
                '智能体': 'A6'
            };
            
            if (categoryMap[breadcrumbText]) {
                showSubmenu(categoryMap[breadcrumbText], breadcrumbText);
            }
        }
        
        // 最近访问功能
        function addToRecentlyViewed(item) {
            let recent = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
            
            // 移除已存在的项目
            recent = recent.filter(r => r.id !== item.id);
            
            // 添加到开头
            recent.unshift({
                id: item.id,
                name: item.name || item.名称,
                category: item.category,
                timestamp: Date.now()
            });
            
            // 只保留最近10个
            recent = recent.slice(0, 10);
            
            localStorage.setItem('recently-viewed', JSON.stringify(recent));
        }
        
        function showRecentlyViewed() {
            const recent = JSON.parse(localStorage.getItem('recently-viewed') || '[]');
            
            if (recent.length === 0) {
                showContent('overview');
                return;
            }
            
            let html = `
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-4">最近访问</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            `;
            
            recent.forEach(item => {
                const timeAgo = getTimeAgo(item.timestamp);
                html += `
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer" 
                         onclick="showItemDetail('${item.id}')">
                        <h3 class="font-medium text-gray-900 mb-2">${item.name}</h3>
                        <p class="text-sm text-gray-500 mb-1">${item.category}</p>
                        <p class="text-xs text-gray-400">${timeAgo}</p>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
            
            document.getElementById('content-area').innerHTML = html;
            updateBreadcrumb('最近访问');
        }
        
        function getTimeAgo(timestamp) {
            const now = Date.now();
            const diff = now - timestamp;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(diff / 3600000);
            const days = Math.floor(diff / 86400000);
            
            if (days > 0) return `${days}天前`;
            if (hours > 0) return `${hours}小时前`;
            if (minutes > 0) return `${minutes}分钟前`;
            return '刚刚';
        }
        
        // 键盘导航
        document.addEventListener('keydown', function(event) {
            const submenuItems = document.querySelectorAll('#submenu .submenu-item:not([style*="display: none"])');
            const currentActive = document.querySelector('#submenu .submenu-item.active');
            
            if (submenuItems.length === 0) return;
            
            let currentIndex = Array.from(submenuItems).indexOf(currentActive);
            
            switch(event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    currentIndex = (currentIndex + 1) % submenuItems.length;
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    currentIndex = currentIndex <= 0 ? submenuItems.length - 1 : currentIndex - 1;
                    break;
                case 'Enter':
                    if (currentActive) {
                        event.preventDefault();
                        currentActive.click();
                    }
                    return;
                default:
                    return;
            }
            
            // 移除所有活动状态
            submenuItems.forEach(item => item.classList.remove('active'));
            
            // 添加新的活动状态
            if (submenuItems[currentIndex]) {
                submenuItems[currentIndex].classList.add('active');
                submenuItems[currentIndex].scrollIntoView({ block: 'nearest' });
            }
        });
        
        // 错误处理
        
        function showError(message, retryCallback) {
            const contentArea = document.getElementById('content-area');
            contentArea.innerHTML = `
                <div class="error-message text-center">
                    <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.876c1.07 0 1.94-.86 1.94-1.93V8.07c0-1.07-.87-1.93-1.94-1.93H5.062C3.992 6.14 3.122 7 3.122 8.07v8.93c0 1.07.87 1.93 1.94 1.93z"/>
                    </svg>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
                    <p class="text-gray-600 mb-4">${message}</p>
                    <button onclick="${retryCallback}" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        重试
                    </button>
                </div>
            `;
        }
        
        // 虚拟滚动实现
        function createVirtualScroll(container, items, renderItem, itemHeight = 60) {
            const containerHeight = container.clientHeight;
            const visibleCount = Math.ceil(containerHeight / itemHeight) + 2;
            let startIndex = 0;
            
            function render() {
                const endIndex = Math.min(startIndex + visibleCount, items.length);
                const visibleItems = items.slice(startIndex, endIndex);
                
                container.innerHTML = '';
                container.style.paddingTop = `${startIndex * itemHeight}px`;
                container.style.paddingBottom = `${(items.length - endIndex) * itemHeight}px`;
                
                visibleItems.forEach((item, index) => {
                    const element = renderItem(item, startIndex + index);
                    container.appendChild(element);
                });
            }
            
            container.addEventListener('scroll', function() {
                const newStartIndex = Math.floor(container.scrollTop / itemHeight);
                if (newStartIndex !== startIndex) {
                    startIndex = newStartIndex;
                    render();
                }
            });
            
            render();
        }
        
        // 移动端菜单控制
        function toggleMobileMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('hidden');
        }
        
        function closeMobileMenu() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            
            sidebar.classList.remove('mobile-open');
            overlay.classList.add('hidden');
        }
        
        // 移动端搜索切换
        function toggleMobileSearch() {
            const searchBar = document.getElementById('mobile-search-bar');
            searchBar.classList.toggle('hidden');
            
            if (!searchBar.classList.contains('hidden')) {
                document.getElementById('mobile-search-input').focus();
            }
        }
        
        // 通用搜索功能
        function performSearch(query) {
            if (!query.trim()) {
                showContent('overview');
                return;
            }
            
            const results = allData.filter(item => {
                const name = item.名称 && item.名称[0] ? item.名称[0].text.toLowerCase() : '';
                const category = item.分类 ? item.分类.toLowerCase() : '';
                const good = item.Good && item.Good[0] ? item.Good[0].text.toLowerCase() : '';
                const bad = item.Bad && item.Bad[0] ? item.Bad[0].text.toLowerCase() : '';
                
                return name.includes(query.toLowerCase()) || 
                       category.includes(query.toLowerCase()) ||
                       good.includes(query.toLowerCase()) ||
                       bad.includes(query.toLowerCase());
            });
            
            displaySearchResults(results, query);
        }
        
        function displaySearchResults(results, query) {
            const contentArea = document.getElementById('content-area');
            
            if (results.length === 0) {
                contentArea.innerHTML = `
                    <div class="text-center py-12">
                        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">未找到相关结果</h3>
                        <p class="text-gray-600">尝试使用其他关键词搜索</p>
                    </div>
                `;
                return;
            }
            
            let html = `
                <div class="mb-6">
                    <h2 class="text-xl font-semibold text-gray-900 mb-2">搜索结果</h2>
                    <p class="text-gray-600">找到 ${results.length} 个与 "${query}" 相关的结果</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            `;
            
            results.forEach(item => {
                const name = item.名称 && item.名称[0] ? item.名称[0].text : '未知';
                const time = item.时间 ? new Date(item.时间).toLocaleDateString('zh-CN') : '未知';
                const good = item.Good && item.Good[0] ? item.Good[0].text : '';
                const bad = item.Bad && item.Bad[0] ? item.Bad[0].text : '';
                
                html += `
                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">${name}</h3>
                            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">${item.分类}</span>
                        </div>
                        
                        ${good ? `<div class="mb-2"><span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">优点: ${good.substring(0, 50)}${good.length > 50 ? '...' : ''}</span></div>` : ''}
                        ${bad ? `<div class="mb-2"><span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">缺点: ${bad.substring(0, 50)}${bad.length > 50 ? '...' : ''}</span></div>` : ''}
                        
                        <div class="mt-4 pt-4 border-t border-gray-100">
                            <p class="text-xs text-gray-500">更新时间: ${time}</p>
                        </div>
                    </div>
                `;
            });
            
            html += '</div>';
            contentArea.innerHTML = html;
            updateBreadcrumb('搜索结果');
        }
        
        // 面包屑导航返回功能
        function goToCategory(category) {
            const categoryMap = {
                '基础平台': 'platform',
                'AI模型': 'model',
                '数据资源': 'data',
                '工具管理': 'tool',
                '提示工程': 'prompt',
                '智能代理': 'agent'
            };
            
            if (categoryMap[category]) {
                showSubmenu(categoryMap[category], category);
            }
        }
        
        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 确保DOM完全渲染后再加载数据
            setTimeout(() => {
                loadData();
                loadFavorites();
            }, 100);
            
            // 检查是否为移动设备
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.add('mobile-closed');
            }
            
            // 设置搜索事件监听
            const searchInput = document.getElementById('search-input');
            const mobileSearchInput = document.getElementById('mobile-search-input');
            
            if (searchInput) {
                searchInput.addEventListener('input', function(e) {
                    performSearch(e.target.value);
                });
            }
            
            if (mobileSearchInput) {
                mobileSearchInput.addEventListener('input', function(e) {
                    performSearch(e.target.value);
                });
            }
        });
        
        // 窗口大小改变时的响应式处理
        window.addEventListener('resize', function() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('mobile-overlay');
            
            if (window.innerWidth > 768) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.add('hidden');
            } else {
                sidebar.classList.add('mobile-closed');
            }
        });
    </script>
</body>
</html>