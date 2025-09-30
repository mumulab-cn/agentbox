<?php
/**
 * 飞书API调试接口
 * 用于调试和查看飞书API的详细响应
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

$action = $_GET['action'] ?? 'debug_chats';

/**
 * 调试聊天列表获取
 */
function debugChatList() {
    try {
        $api = getFeishuAPI();
        
        // 获取访问令牌
        $reflection = new ReflectionClass($api);
        $method = $reflection->getMethod('getAccessToken');
        $method->setAccessible(true);
        $token = $method->invoke($api);
        
        writeLog('开始调试聊天列表获取', 'info', 'feishu');
        
        // 获取聊天列表
        $chat_data = $api->getChatList(10);
        
        $debug_info = [
            'token_length' => strlen($token),
            'chat_count' => count($chat_data['items'] ?? []),
            'has_more' => $chat_data['has_more'] ?? false,
            'page_token' => $chat_data['page_token'] ?? null,
            'raw_data' => $chat_data
        ];
        
        // 格式化聊天数据
        $formatted_chats = $api->formatChatData($chat_data);
        
        return [
            'success' => true,
            'message' => '聊天列表调试成功',
            'data' => [
                'debug_info' => $debug_info,
                'formatted_chats' => $formatted_chats,
                'test_time' => date('Y-m-d H:i:s')
            ]
        ];
        
    } catch (Exception $e) {
        writeLog('聊天列表调试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '聊天列表调试失败: ' . $e->getMessage(),
            'error_code' => 'DEBUG_CHAT_LIST_FAILED'
        ];
    }
}

/**
 * 调试消息获取
 */
function debugMessages() {
    try {
        $api = getFeishuAPI();
        
        // 先获取一个聊天ID
        $chat_data = $api->getChatList(1);
        
        if (empty($chat_data['items'])) {
            throw new Exception('没有可用的聊天进行测试');
        }
        
        $chat_id = $chat_data['items'][0]['chat_id'];
        $chat_name = $chat_data['items'][0]['name'] ?? '未知聊天';
        
        writeLog('开始调试消息获取: ' . $chat_id, 'info', 'feishu');
        
        // 尝试获取消息
        try {
            $message_data = $api->getChatMessages($chat_id, 5);
            $formatted_messages = $api->formatMessageData($message_data, $chat_id);
            
            $debug_info = [
                'chat_id' => $chat_id,
                'chat_name' => $chat_name,
                'message_count' => count($message_data['items'] ?? []),
                'has_more' => $message_data['has_more'] ?? false,
                'page_token' => $message_data['page_token'] ?? null,
                'raw_messages' => $message_data,
                'formatted_messages' => $formatted_messages
            ];
            
            return [
                'success' => true,
                'message' => '消息调试成功',
                'data' => [
                    'debug_info' => $debug_info,
                    'test_time' => date('Y-m-d H:i:s')
                ]
            ];
            
        } catch (Exception $e) {
            // 如果获取消息失败，返回详细错误信息
            return [
                'success' => false,
                'message' => '消息获取失败，但聊天列表正常',
                'data' => [
                    'chat_id' => $chat_id,
                    'chat_name' => $chat_name,
                    'error' => $e->getMessage(),
                    'available_chats' => $chat_data['items'],
                    'test_time' => date('Y-m-d H:i:s')
                ]
            ];
        }
        
    } catch (Exception $e) {
        writeLog('消息调试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '消息调试失败: ' . $e->getMessage(),
            'error_code' => 'DEBUG_MESSAGES_FAILED'
        ];
    }
}

/**
 * 调试完整对话获取流程
 */
function debugFullConversations() {
    try {
        writeLog('开始调试完整对话获取流程', 'info', 'feishu');
        
        // 调用真实的对话获取函数
        require_once 'conversations.php';
        $conversations = getRealFeishuConversations();
        
        $debug_info = [
            'total_conversations' => count($conversations),
            'conversations_with_messages' => count(array_filter($conversations, function($conv) {
                return !empty($conv['messages']);
            })),
            'total_messages' => array_sum(array_map(function($conv) {
                return count($conv['messages'] ?? []);
            }, $conversations))
        ];
        
        return [
            'success' => true,
            'message' => '完整对话调试成功',
            'data' => [
                'debug_info' => $debug_info,
                'conversations' => $conversations,
                'test_time' => date('Y-m-d H:i:s')
            ]
        ];
        
    } catch (Exception $e) {
        writeLog('完整对话调试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '完整对话调试失败: ' . $e->getMessage(),
            'error_code' => 'DEBUG_FULL_CONVERSATIONS_FAILED'
        ];
    }
}

/**
 * 调试API权限
 */
function debugPermissions() {
    try {
        $api = getFeishuAPI();
        
        $results = [];
        
        // 测试获取聊天列表权限
        try {
            $chat_data = $api->getChatList(1);
            $results['chat_list'] = [
                'success' => true,
                'message' => '聊天列表权限正常',
                'count' => count($chat_data['items'] ?? [])
            ];
        } catch (Exception $e) {
            $results['chat_list'] = [
                'success' => false,
                'message' => '聊天列表权限失败: ' . $e->getMessage()
            ];
        }
        
        // 测试获取用户信息权限
        try {
            // 尝试获取当前用户信息
            $user_info = $api->getUserInfo('me', 'user_id');
            $results['user_info'] = [
                'success' => true,
                'message' => '用户信息权限正常',
                'user_name' => $user_info['name'] ?? '未知'
            ];
        } catch (Exception $e) {
            $results['user_info'] = [
                'success' => false,
                'message' => '用户信息权限失败: ' . $e->getMessage()
            ];
        }
        
        return [
            'success' => true,
            'message' => '权限调试完成',
            'data' => [
                'permission_results' => $results,
                'test_time' => date('Y-m-d H:i:s')
            ]
        ];
        
    } catch (Exception $e) {
        writeLog('权限调试失败: ' . $e->getMessage(), 'error', 'feishu');
        return [
            'success' => false,
            'message' => '权限调试失败: ' . $e->getMessage(),
            'error_code' => 'DEBUG_PERMISSIONS_FAILED'
        ];
    }
}

try {
    switch ($action) {
        case 'debug_chats':
            $result = debugChatList();
            break;
            
        case 'debug_messages':
            $result = debugMessages();
            break;
            
        case 'debug_full':
            $result = debugFullConversations();
            break;
            
        case 'debug_permissions':
            $result = debugPermissions();
            break;
            
        default:
            $result = [
                'success' => false,
                'message' => '不支持的调试操作',
                'available_actions' => ['debug_chats', 'debug_messages', 'debug_full', 'debug_permissions']
            ];
    }
    
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '调试执行失败: ' . $e->getMessage(),
        'error_code' => 'DEBUG_EXECUTION_FAILED'
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
?>