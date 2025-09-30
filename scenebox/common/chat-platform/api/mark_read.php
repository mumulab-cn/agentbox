<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

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

// 验证必需参数
if (empty($platform) || empty($conversation_id)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '缺少必需参数：platform, conversation_id'
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

// 模拟标记已读的函数
function markAsReadOnPlatform($platform, $conversation_id) {
    // 这里是Mock实现，实际项目中需要调用对应平台的API
    
    // 模拟网络延迟
    usleep(200000); // 0.2秒延迟
    
    // 模拟成功率（98%成功率）
    $success_rate = 0.98;
    $random = mt_rand() / mt_getrandmax();
    
    if ($random > $success_rate) {
        throw new Exception('网络错误，标记已读失败');
    }
    
    // 根据平台返回不同的响应格式
    switch ($platform) {
        case 'feishu':
            return [
                'platform_response' => [
                    'code' => 0,
                    'msg' => 'success',
                    'data' => [
                        'conversation_id' => $conversation_id,
                        'read_time' => time()
                    ]
                ],
                'timestamp' => date('c')
            ];
            
        case 'wechat':
            return [
                'platform_response' => [
                    'errcode' => 0,
                    'errmsg' => 'ok',
                    'conversation_id' => $conversation_id
                ],
                'timestamp' => date('c')
            ];
            
        case 'dingtalk':
            return [
                'platform_response' => [
                    'errcode' => 0,
                    'errmsg' => 'ok',
                    'conversationId' => $conversation_id,
                    'readTime' => date('c')
                ],
                'timestamp' => date('c')
            ];
            
        default:
            throw new Exception('不支持的平台');
    }
}

// 记录已读状态到日志文件
function logReadStatus($platform, $conversation_id, $result) {
    $log_dir = '../logs';
    if (!is_dir($log_dir)) {
        mkdir($log_dir, 0755, true);
    }
    
    $log_file = $log_dir . '/read_status_' . date('Y-m-d') . '.log';
    $log_entry = [
        'timestamp' => date('c'),
        'platform' => $platform,
        'conversation_id' => $conversation_id,
        'action' => 'mark_read',
        'result' => $result,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    file_put_contents($log_file, json_encode($log_entry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

try {
    // 调用平台API标记已读
    $result = markAsReadOnPlatform($platform, $conversation_id);
    
    // 记录日志
    logReadStatus($platform, $conversation_id, $result);
    
    // 返回成功响应
    echo json_encode([
        'success' => true,
        'message' => '标记已读成功',
        'data' => [
            'platform' => $platform,
            'conversation_id' => $conversation_id,
            'timestamp' => $result['timestamp']
        ]
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    // 记录错误日志
    logReadStatus($platform, $conversation_id, ['error' => $e->getMessage()]);
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'error_code' => 'MARK_READ_FAILED'
    ], JSON_UNESCAPED_UNICODE);
}
?>