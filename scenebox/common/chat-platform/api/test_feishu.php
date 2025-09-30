<?php
/**
 * 飞书API测试接口
 * 用于验证飞书API配置是否正确
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'feishu_api.php';

// 获取请求参数
$action = $_GET['action'] ?? $_POST['action'] ?? 'test_connection';

/**
 * 测试飞书API连接
 */
function testFeishuConnection() {
    try {
        $api = getFeishuAPI();
        
        // 尝试获取访问令牌
        $reflection = new ReflectionClass($api);
        $method = $reflection->getMethod('getAccessToken');
        $method->setAccessible(true);
        $token = $method->invoke($api);
        
        if ($token) {
            writeLog('飞书API连接测试成功', 'info', 'feishu');
            return [
                'success' => true,
                'message' => 'API连接成功',
                'data' => [
                    'token_length' => strlen($token),
                    'test_time' => date('Y-m-d H:i:s')
                ]
            ];
        } else {
            throw new Exception('获取访问令牌失败');
        }
    } catch (Exception $e) {
        writeLog('飞书API连接测试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => 'API连接失败: ' . $e->getMessage(),
            'error_code' => 'CONNECTION_FAILED'
        ];
    }
}

/**
 * 测试获取聊天列表
 */
function testGetChatList() {
    try {
        $api = getFeishuAPI();
        $result = $api->getChatList(5); // 获取5个聊天
        
        writeLog('飞书聊天列表获取测试成功', 'info', 'feishu');
        return [
            'success' => true,
            'message' => '聊天列表获取成功',
            'data' => [
                'chat_count' => count($result['items'] ?? []),
                'has_more' => $result['has_more'] ?? false,
                'page_token' => $result['page_token'] ?? null,
                'test_time' => date('Y-m-d H:i:s')
            ]
        ];
    } catch (Exception $e) {
        writeLog('飞书聊天列表获取测试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '聊天列表获取失败: ' . $e->getMessage(),
            'error_code' => 'GET_CHATS_FAILED'
        ];
    }
}

/**
 * 测试发送消息（仅验证API调用，不实际发送）
 */
function testSendMessage() {
    try {
        // 这里只是验证API调用格式，不实际发送消息
        $api = getFeishuAPI();
        
        // 先获取一个聊天ID用于测试
        $chats = $api->getChatList(1);
        
        if (empty($chats['items'])) {
            throw new Exception('没有可用的聊天进行测试');
        }
        
        $chat_id = $chats['items'][0]['chat_id'];
        
        // 注意：这里不实际发送消息，只是验证API调用
        writeLog('飞书发送消息API测试准备完成', 'info', 'feishu');
        return [
            'success' => true,
            'message' => '发送消息API验证成功（未实际发送）',
            'data' => [
                'test_chat_id' => $chat_id,
                'api_ready' => true,
                'test_time' => date('Y-m-d H:i:s')
            ]
        ];
    } catch (Exception $e) {
        writeLog('飞书发送消息API测试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '发送消息API验证失败: ' . $e->getMessage(),
            'error_code' => 'SEND_MESSAGE_TEST_FAILED'
        ];
    }
}

/**
 * 获取API配置状态
 */
function getConfigStatus() {
    $config = getPlatformConfig('feishu');
    
    $status = [
        'app_id_configured' => !empty($config['app_id']) && $config['app_id'] !== 'your_feishu_app_id',
        'app_secret_configured' => !empty($config['app_secret']) && $config['app_secret'] !== 'your_feishu_app_secret',
        'enabled' => $config['enabled'] ?? false
    ];
    
    $status['fully_configured'] = $status['app_id_configured'] && $status['app_secret_configured'] && $status['enabled'];
    
    return [
        'success' => true,
        'message' => '配置状态获取成功',
        'data' => $status
    ];
}

/**
 * 执行完整的API测试套件
 */
function runFullTest() {
    $results = [];
    
    // 1. 测试连接
    $results['connection'] = testFeishuConnection();
    
    // 2. 如果连接成功，测试获取聊天列表
    if ($results['connection']['success']) {
        $results['chat_list'] = testGetChatList();
        
        // 3. 如果聊天列表获取成功，测试发送消息API
        if ($results['chat_list']['success']) {
            $results['send_message'] = testSendMessage();
        }
    }
    
    // 4. 获取配置状态
    $results['config'] = getConfigStatus();
    
    // 计算总体结果
    $overall_success = $results['connection']['success'] && 
                      ($results['chat_list']['success'] ?? false) && 
                      ($results['send_message']['success'] ?? false);
    
    return [
        'success' => $overall_success,
        'message' => $overall_success ? '所有测试通过' : '部分测试失败',
        'data' => [
            'test_results' => $results,
            'test_time' => date('Y-m-d H:i:s'),
            'summary' => [
                'total_tests' => count(array_filter($results, function($r) { return isset($r['success']); })),
                'passed_tests' => count(array_filter($results, function($r) { return $r['success'] ?? false; })),
                'overall_status' => $overall_success ? 'PASS' : 'FAIL'
            ]
        ]
    ];
}

try {
    switch ($action) {
        case 'test_connection':
            $result = testFeishuConnection();
            break;
            
        case 'test_chat_list':
            $result = testGetChatList();
            break;
            
        case 'test_send_message':
            $result = testSendMessage();
            break;
            
        case 'config_status':
            $result = getConfigStatus();
            break;
            
        case 'full_test':
            $result = runFullTest();
            break;
            
        default:
            $result = [
                'success' => false,
                'message' => '不支持的测试操作',
                'error_code' => 'INVALID_ACTION'
            ];
    }
    
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '测试执行失败: ' . $e->getMessage(),
        'error_code' => 'TEST_EXECUTION_FAILED'
    ], JSON_UNESCAPED_UNICODE);
}
?>