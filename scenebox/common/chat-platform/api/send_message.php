<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 引入飞书API
require_once 'feishu_api.php';

// 只允许POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => '只允许POST请求'
    ]);
    exit;
}

// 获取POST参数
$platform = $_POST['platform'] ?? '';
$conversation_id = $_POST['conversation_id'] ?? '';
$content = $_POST['content'] ?? '';
$use_real_api = $_POST['use_real_api'] ?? 'false'; // 是否使用真实API

// 验证必需参数
if (empty($platform) || empty($conversation_id) || empty($content)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '缺少必需参数：platform, conversation_id, content'
    ]);
    exit;
}

// 验证消息内容长度
if (strlen($content) > 1000) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '消息内容过长，最多1000个字符'
    ]);
    exit;
}

// 验证平台
$allowed_platforms = ['feishu', 'wechat', 'dingtalk'];
if (!in_array($platform, $allowed_platforms)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '不支持的平台类型'
    ]);
    exit;
}

// 模拟发送消息的函数
function sendMessageToPlatform($platform, $conversation_id, $content) {
    // 这里是Mock实现，实际项目中需要调用对应平台的API
    
    // 模拟网络延迟
    usleep(500000); // 0.5秒延迟
    
    // 模拟发送成功率（95%成功率）
    $success_rate = 0.95;
    $random = mt_rand() / mt_getrandmax();
    
    if ($random > $success_rate) {
        throw new Exception('网络错误，消息发送失败');
    }
    
    // 根据平台返回不同的响应格式
    switch ($platform) {
        case 'feishu':
            return [
                'platform_message_id' => 'feishu_msg_' . time() . '_' . mt_rand(1000, 9999),
                'status' => 'sent',
                'timestamp' => date('c'),
                'platform_response' => [
                    'code' => 0,
                    'msg' => 'success',
                    'data' => [
                        'message_id' => 'om_' . md5($content . time())
                    ]
                ]
            ];
            
        case 'wechat':
            return [
                'platform_message_id' => 'wechat_msg_' . time() . '_' . mt_rand(1000, 9999),
                'status' => 'sent',
                'timestamp' => date('c'),
                'platform_response' => [
                    'errcode' => 0,
                    'errmsg' => 'ok',
                    'msgid' => 'wechat_' . md5($content . time())
                ]
            ];
            
        case 'dingtalk':
            return [
                'platform_message_id' => 'dingtalk_msg_' . time() . '_' . mt_rand(1000, 9999),
                'status' => 'sent',
                'timestamp' => date('c'),
                'platform_response' => [
                    'errcode' => 0,
                    'errmsg' => 'ok',
                    'messageId' => 'dingtalk_' . md5($content . time())
                ]
            ];
            
        default:
            throw new Exception('不支持的平台');
    }
}

// 记录消息到日志文件（模拟数据持久化）
function logMessage($platform, $conversation_id, $content, $result) {
    $log_dir = '../logs';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_file = $log_dir . '/messages_' . date('Y-m-d') . '.log';
    $log_entry = [
        'timestamp' => date('c'),
        'platform' => $platform,
        'conversation_id' => $conversation_id,
        'content' => $content,
        'result' => $result,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    file_put_contents($log_file, json_encode($log_entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

// 使用真实飞书API发送消息
function sendRealFeishuMessage($conversation_id, $content) {
    try {
        $api = getFeishuAPI();
        $result = $api->sendTextMessage($conversation_id, $content);
        
        return [
            'platform_message_id' => $result['message_id'] ?? 'feishu_' . time(),
            'status' => 'sent',
            'timestamp' => date('c'),
            'platform_response' => $result
        ];
    } catch (Exception $e) {
        writeLog('飞书消息发送失败: ' . $e->getMessage(), 'error', 'feishu');
        throw $e;
    }
}

try {
    if ($platform === 'feishu' && $use_real_api === 'true') {
        // 使用真实飞书API发送消息
        $result = sendRealFeishuMessage($conversation_id, $content);
        writeLog('使用真实飞书API发送消息成功: ' . $content, 'info', 'feishu');
    } else {
        // 使用Mock发送
        $result = sendMessageToPlatform($platform, $conversation_id, $content);
    }
    
    // 记录消息日志
    logMessage($platform, $conversation_id, $content, $result);
    
    // 返回成功响应
    echo json_encode([
        'success' => true,
        'message' => '消息发送成功',
        'data' => [
            'platform' => $platform,
            'conversation_id' => $conversation_id,
            'content' => $content,
            'platform_message_id' => $result['platform_message_id'],
            'status' => $result['status'],
            'timestamp' => $result['timestamp'],
            'data_source' => ($platform === 'feishu' && $use_real_api === 'true') ? 'real_api' : 'mock'
        ]
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    // 记录错误日志
    logMessage($platform, $conversation_id, $content, ['error' => $e->getMessage()]);
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_code' => 'SEND_FAILED',
        'platform' => $platform,
        'data_source' => ($platform === 'feishu' && $use_real_api === 'true') ? 'real_api' : 'mock'
    ], JSON_UNESCAPED_UNICODE);
}
?>