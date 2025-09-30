<?php
/**
 * 配置读取器
 * 用于在其他PHP文件中读取应用配置
 */

function getConfig() {
    $configFile = __DIR__ . '/./config.json';
    
    // 默认配置
    $defaultConfig = [
        'app' => [
            'name' => 'AgentBox',
            'subtitle' => 'AI架构演练沙盘',
            'sidebar_title' => 'AgentBox<br />AI架构演练沙盘',
            'main_console_title' => 'AI资源管理控制台'
        ],
        'pages' => [
            'index' => '沙盘演练平台',
            'new' => 'AI资源管理控制台',
            'list' => '资源列表',
            'config' => 'AgentBox - AI架构演练沙盘 | 飞书API配置管理'
        ],
        'theme' => [
            'primary_color' => '#1976d2',
            'secondary_color' => '#666',
            'accent_color' => '#FF8800'
        ],
        'feishu' => [
            'app_id' => '',
            'app_secret' => '',
            'base_url' => '',
            'page_size' => 2000,
            'conversation_id' => '123',
            'data_file_path' => 'data/feishu_data.json'
        ]
    ];
    
    // 如果配置文件存在，读取并合并
    if (file_exists($configFile)) {
        $savedConfig = json_decode(file_get_contents($configFile), true);
        if ($savedConfig) {
            $defaultConfig = array_merge_recursive($defaultConfig, $savedConfig);
        }
    }
    
    return $defaultConfig;
}

function getAppConfig() {
    $config = getConfig();
    return $config['app'];
}

function getFeishuConfig() {
    $config = getConfig();
    return $config['feishu'];
}

/**
 * 获取页面标题
 * @param string $page 页面名称 (index, new, list, config)
 * @return string 页面标题
 */
function getPageTitle($page) {
    $config = getConfig();
    return isset($config['pages'][$page]) ? $config['pages'][$page] : $config['app']['name'];
}

/**
 * 获取应用名称
 * @return string 应用名称
 */
function getAppName() {
    $config = getConfig();
    return $config['app']['name'][0];
}

/**
 * 获取应用副标题
 * @return string 应用副标题
 */
function getAppSubtitle() {
    $config = getConfig();
    return $config['app']['subtitle'][0];
}

/**
 * 获取侧边栏标题
 * @return string 侧边栏标题
 */
function getSidebarTitle() {
    $config = getConfig();
    return $config['app']['sidebar_title'];
}

/**
 * 获取主控制台标题
 * @return string 主控制台标题
 */
function getMainConsoleTitle() {
    $config = getConfig();
    return $config['app']['main_console_title'];
}

/**
 * 获取主题颜色
 * @param string $type 颜色类型 (primary_color, secondary_color, accent_color)
 * @return string 颜色值
 */
function getThemeColor($type = 'primary_color') {
    $config = getConfig();
    return isset($config['theme'][$type]) ? $config['theme'][$type] : '#1976d2';
}
?>