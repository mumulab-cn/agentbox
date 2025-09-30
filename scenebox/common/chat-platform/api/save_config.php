<?php
/**
 * 配置保存接口
 * 用于保存飞书API配置信息
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once '../config/config.php';

// 只允许POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => '只允许POST请求',
        'error_code' => 'METHOD_NOT_ALLOWED'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 获取POST数据
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '无效的JSON数据',
        'error_code' => 'INVALID_JSON'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$platform = $input['platform'] ?? '';
$app_id = trim($input['app_id'] ?? '');
$app_secret = trim($input['app_secret'] ?? '');
$enabled = $input['enabled'] ?? true;

// 验证输入
if (empty($platform)) {
    echo json_encode([
        'success' => false,
        'message' => '平台参数不能为空',
        'error_code' => 'PLATFORM_REQUIRED'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!in_array($platform, ['feishu', 'wechat', 'dingtalk'])) {
    echo json_encode([
        'success' => false,
        'message' => '不支持的平台类型',
        'error_code' => 'INVALID_PLATFORM'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (empty($app_id) || empty($app_secret)) {
    echo json_encode([
        'success' => false,
        'message' => 'App ID和App Secret不能为空',
        'error_code' => 'CREDENTIALS_REQUIRED'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 验证App ID格式（飞书App ID通常以cli_开头）
if ($platform === 'feishu' && !preg_match('/^cli_[a-zA-Z0-9]+$/', $app_id)) {
    echo json_encode([
        'success' => false,
        'message' => '飞书App ID格式不正确，应以cli_开头',
        'error_code' => 'INVALID_APP_ID_FORMAT'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    // 读取当前配置文件
    $config_file = '../config/config.php';
    $config_content = file_get_contents($config_file);
    
    if ($config_content === false) {
        throw new Exception('无法读取配置文件');
    }
    
    // 备份原配置文件
    $backup_file = '../config/config_backup_' . date('Y-m-d_H-i-s') . '.php';
    file_put_contents($backup_file, $config_content);
    
    // 更新配置
    $updated_config = updatePlatformConfig($config_content, $platform, [
        'app_id' => $app_id,
        'app_secret' => $app_secret,
        'enabled' => $enabled
    ]);
    
    // 写入新配置
    if (file_put_contents($config_file, $updated_config) === false) {
        throw new Exception('无法写入配置文件');
    }
    
    // 记录日志
    writeLog("配置已更新 - 平台: {$platform}, App ID: {$app_id}", 'info', $platform);
    
    echo json_encode([
        'success' => true,
        'message' => '配置保存成功',
        'data' => [
            'platform' => $platform,
            'app_id' => $app_id,
            'enabled' => $enabled,
            'backup_file' => basename($backup_file),
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    // 记录错误日志
    writeLog("配置保存失败 - 平台: {$platform}, 错误: " . $e->getMessage(), 'error', $platform);
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '配置保存失败: ' . $e->getMessage(),
        'error_code' => 'SAVE_FAILED'
    ], JSON_UNESCAPED_UNICODE);
}

/**
 * 更新平台配置
 */
function updatePlatformConfig($config_content, $platform, $new_config) {
    // 使用正则表达式找到并替换对应平台的配置
    $pattern = "/('{$platform}'\s*=>\s*\[)(.*?)(\],?\s*(?='\w+'\s*=>|\];))/s";
    
    $replacement = function($matches) use ($new_config, $platform) {
        $current_config = getPlatformConfig($platform);
        
        // 合并配置
        $merged_config = array_merge($current_config, $new_config);
        
        // 构建新的配置数组字符串
        $config_lines = [];
        foreach ($merged_config as $key => $value) {
            if (is_bool($value)) {
                $value_str = $value ? 'true' : 'false';
            } elseif (is_string($value)) {
                $value_str = "'" . addslashes($value) . "'";
            } else {
                $value_str = var_export($value, true);
            }
            $config_lines[] = "        '{$key}' => {$value_str}";
        }
        
        return $matches[1] . "\n" . implode(",\n", $config_lines) . "\n    " . $matches[3];
    };
    
    $updated_content = preg_replace_callback($pattern, $replacement, $config_content);
    
    if ($updated_content === null) {
        throw new Exception('配置更新失败，正则表达式错误');
    }
    
    return $updated_content;
}

/**
 * 获取配置信息（用于读取当前配置）
 */
function getConfigInfo() {
    try {
        $platform = $_GET['platform'] ?? 'feishu';
        $config = getPlatformConfig($platform);
        
        // 隐藏敏感信息
        $safe_config = $config;
        if (isset($safe_config['app_secret'])) {
            $safe_config['app_secret'] = str_repeat('*', strlen($safe_config['app_secret']));
        }
        
        echo json_encode([
            'success' => true,
            'message' => '配置获取成功',
            'data' => $safe_config
        ], JSON_UNESCAPED_UNICODE);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => '配置获取失败: ' . $e->getMessage(),
            'error_code' => 'GET_CONFIG_FAILED'
        ], JSON_UNESCAPED_UNICODE);
    }
}

// 如果是GET请求，返回配置信息
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getConfigInfo();
}
?>