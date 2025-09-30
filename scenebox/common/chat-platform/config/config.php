<?php
// 聊天平台配置文件

// 数据库配置（如果需要）
define('DB_HOST', 'localhost');
define('DB_NAME', 'chat_platform');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// 平台API配置
$platform_config = [
    'feishu' => [
        'name' => '飞书',
        'app_id' => 'cli_a53174d753fa100c',
        'app_secret' => '••••••••••••••••',
        'api_base_url' => 'https://open.feishu.cn/open-apis/',
        'webhook_url' => '',
        'enabled' => true,
        'color' => 'blue'
    ],
    'wechat' => [
        'name' => '企业微信',
        'corp_id' => 'your_wechat_corp_id',
        'corp_secret' => 'your_wechat_corp_secret',
        'agent_id' => 'your_wechat_agent_id',
        'api_base_url' => 'https://qyapi.weixin.qq.com/cgi-bin/',
        'webhook_url' => '',
        'enabled' => true,
        'color' => 'green'
    ],
    'dingtalk' => [
        'name' => '钉钉',
        'app_key' => 'your_dingtalk_app_key',
        'app_secret' => 'your_dingtalk_app_secret',
        'api_base_url' => 'https://oapi.dingtalk.com/',
        'webhook_url' => '',
        'enabled' => true,
        'color' => 'orange'
    ]
];

// 系统配置
$system_config = [
    'app_name' => '聊天平台控制台',
    'version' => '1.0.0',
    'debug' => true,
    'timezone' => 'Asia/Shanghai',
    'language' => 'zh-CN',
    'max_message_length' => 1000,
    'refresh_interval' => 30, // 秒
    'log_enabled' => true,
    'log_level' => 'info'
];

// 设置时区
date_default_timezone_set($system_config['timezone']);

// 错误报告设置
if ($system_config['debug']) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// 获取平台配置
function getPlatformConfig($platform = null) {
    global $platform_config;
    
    if ($platform) {
        return $platform_config[$platform] ?? null;
    }
    
    return $platform_config;
}

// 获取系统配置
function getSystemConfig($key = null) {
    global $system_config;
    
    if ($key) {
        return $system_config[$key] ?? null;
    }
    
    return $system_config;
}

// 日志记录函数
function writeLog($message, $level = 'info', $platform = null) {
    if (!getSystemConfig('log_enabled')) {
        return;
    }
    
    $log_dir = __DIR__ . '/../logs';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_file = $log_dir . '/app_' . date('Y-m-d') . '.log';
    $timestamp = date('Y-m-d H:i:s');
    $platform_str = $platform ? "[{$platform}]" : '';
    $log_entry = "[{$timestamp}] [{$level}] {$platform_str} {$message}" . PHP_EOL;
    
    file_put_contents($log_file, $log_entry, FILE_APPEND | LOCK_EX);
}

// API响应格式化函数
function apiResponse($success = true, $message = '', $data = null, $code = 200) {
    http_response_code($code);
    
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('c')
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    return json_encode($response, JSON_UNESCAPED_UNICODE);
}

// 验证平台是否支持
function validatePlatform($platform) {
    $config = getPlatformConfig($platform);
    return $config && $config['enabled'];
}

// 获取所有启用的平台
function getEnabledPlatforms() {
    $platforms = [];
    foreach (getPlatformConfig() as $key => $config) {
        if ($config['enabled']) {
            $platforms[$key] = $config;
        }
    }
    return $platforms;
}

// 安全函数：清理输入
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// 生成UUID
function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}

// 检查API限制
function checkRateLimit($platform, $action = 'default') {
    // 简单的内存限制检查（实际项目中应该使用Redis或数据库）
    $rate_limits = [
        'feishu' => [
        'name' => '飞书',
        'app_id' => 'cli_a53174d753fa100c',
        'app_secret' => '••••••••••••••••',
        'api_base_url' => 'https://open.feishu.cn/open-apis/',
        'webhook_url' => '',
        'enabled' => true,
        'color' => 'blue'
    ],
        'wechat' => ['send_message' => 100, 'get_conversations' => 1000],
        'dingtalk' => ['send_message' => 100, 'get_conversations' => 1000]
    ];
    
    // 这里只是示例，实际实现需要更复杂的逻辑
    return true;
}

// 加密敏感信息
function encryptSensitiveData($data, $key = null) {
    if (!$key) {
        $key = 'your_encryption_key_here'; // 实际项目中应该从环境变量获取
    }
    return base64_encode(openssl_encrypt($data, 'AES-256-CBC', $key, 0, substr(md5($key), 0, 16)));
}

// 解密敏感信息
function decryptSensitiveData($encrypted_data, $key = null) {
    if (!$key) {
        $key = 'your_encryption_key_here';
    }
    return openssl_decrypt(base64_decode($encrypted_data), 'AES-256-CBC', $key, 0, substr(md5($key), 0, 16));
}

// 初始化日志
writeLog('Chat Platform initialized', 'info');
?>