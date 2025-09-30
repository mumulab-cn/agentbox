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

// 获取平台参数
$platform = $_GET['platform'] ?? '';
$use_real_api = $_GET['real_api'] ?? 'true'; // 是否使用真实API

if (empty($platform)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => '平台参数不能为空'
    ]);
    exit;
}

// Mock数据生成函数
function generateMockConversations($platform) {
    $conversations = [];
    
    // 根据不同平台生成不同的Mock数据
    switch ($platform) {
        case 'feishu':
            $conversations = [
                [
                    'id' => 'feishu_conv_1',
                    'name' => '产品团队群',
                    'type' => 'group',
                    'avatar' => '',
                    'unread_count' => 3,
                    'last_message_time' => date('c', strtotime('-10 minutes')),
                    'messages' => [
                        [
                            'id' => 'msg_1',
                            'content' => '大家好，今天的产品评审会议改到下午3点',
                            'sender_type' => 'other',
                            'sender_name' => '张三',
                            'sender_id' => 'user_1',
                            'timestamp' => date('c', strtotime('-2 hours'))
                        ],
                        [
                            'id' => 'msg_2',
                            'content' => '收到，我会准时参加',
                            'sender_type' => 'self',
                            'sender_name' => '我',
                            'sender_id' => 'self',
                            'timestamp' => date('c', strtotime('-1 hour 50 minutes'))
                        ],
                        [
                            'id' => 'msg_3',
                            'content' => '需要准备什么材料吗？',
                            'sender_type' => 'other',
                            'sender_name' => '李四',
                            'sender_id' => 'user_2',
                            'timestamp' => date('c', strtotime('-1 hour 30 minutes'))
                        ],
                        [
                            'id' => 'msg_4',
                            'content' => '请准备上周的用户反馈报告',
                            'sender_type' => 'other',
                            'sender_name' => '张三',
                            'sender_id' => 'user_1',
                            'timestamp' => date('c', strtotime('-10 minutes'))
                        ]
                    ]
                ],
                [
                    'id' => 'feishu_conv_2',
                    'name' => '王五',
                    'type' => 'private',
                    'avatar' => '',
                    'unread_count' => 1,
                    'last_message_time' => date('c', strtotime('-30 minutes')),
                    'messages' => [
                        [
                            'id' => 'msg_5',
                            'content' => '你好，关于项目进度有个问题想咨询一下',
                            'sender_type' => 'other',
                            'sender_name' => '王五',
                            'sender_id' => 'user_3',
                            'timestamp' => date('c', strtotime('-30 minutes'))
                        ]
                    ]
                ]
            ];
            break;
            
        case 'wechat':
            $conversations = [
                [
                    'id' => 'wechat_conv_1',
                    'name' => '技术部门',
                    'type' => 'group',
                    'avatar' => '',
                    'unread_count' => 5,
                    'last_message_time' => date('c', strtotime('-5 minutes')),
                    'messages' => [
                        [
                            'id' => 'msg_6',
                            'content' => '服务器维护已完成',
                            'sender_type' => 'other',
                            'sender_name' => '运维小组',
                            'sender_id' => 'user_4',
                            'timestamp' => date('c', strtotime('-1 hour'))
                        ],
                        [
                            'id' => 'msg_7',
                            'content' => '辛苦了！',
                            'sender_type' => 'self',
                            'sender_name' => '我',
                            'sender_id' => 'self',
                            'timestamp' => date('c', strtotime('-55 minutes'))
                        ],
                        [
                            'id' => 'msg_8',
                            'content' => '新版本已部署到测试环境',
                            'sender_type' => 'other',
                            'sender_name' => '开发小李',
                            'sender_id' => 'user_5',
                            'timestamp' => date('c', strtotime('-5 minutes'))
                        ]
                    ]
                ],
                [
                    'id' => 'wechat_conv_2',
                    'name' => '赵六',
                    'type' => 'private',
                    'avatar' => '',
                    'unread_count' => 0,
                    'last_message_time' => date('c', strtotime('-2 hours')),
                    'messages' => [
                        [
                            'id' => 'msg_9',
                            'content' => '明天的会议资料发给你了',
                            'sender_type' => 'self',
                            'sender_name' => '我',
                            'sender_id' => 'self',
                            'timestamp' => date('c', strtotime('-2 hours'))
                        ]
                    ]
                ]
            ];
            break;
            
        case 'dingtalk':
            $conversations = [
                [
                    'id' => 'dingtalk_conv_1',
                    'name' => '销售团队',
                    'type' => 'group',
                    'avatar' => '',
                    'unread_count' => 2,
                    'last_message_time' => date('c', strtotime('-15 minutes')),
                    'messages' => [
                        [
                            'id' => 'msg_10',
                            'content' => '本月销售目标完成情况如何？',
                            'sender_type' => 'other',
                            'sender_name' => '销售经理',
                            'sender_id' => 'user_6',
                            'timestamp' => date('c', strtotime('-1 hour'))
                        ],
                        [
                            'id' => 'msg_11',
                            'content' => '目前完成了80%，预计月底能达标',
                            'sender_type' => 'other',
                            'sender_name' => '小王',
                            'sender_id' => 'user_7',
                            'timestamp' => date('c', strtotime('-45 minutes'))
                        ],
                        [
                            'id' => 'msg_12',
                            'content' => '很好，继续加油！',
                            'sender_type' => 'other',
                            'sender_name' => '销售经理',
                            'sender_id' => 'user_6',
                            'timestamp' => date('c', strtotime('-15 minutes'))
                        ]
                    ]
                ],
                [
                    'id' => 'dingtalk_conv_2',
                    'name' => '客户服务',
                    'type' => 'group',
                    'avatar' => '',
                    'unread_count' => 1,
                    'last_message_time' => date('c', strtotime('-1 hour')),
                    'messages' => [
                        [
                            'id' => 'msg_13',
                            'content' => '有客户反馈系统登录问题',
                            'sender_type' => 'other',
                            'sender_name' => '客服小张',
                            'sender_id' => 'user_8',
                            'timestamp' => date('c', strtotime('-1 hour'))
                        ]
                    ]
                ]
            ];
            break;
            
        default:
            $conversations = [];
    }
    
    return $conversations;
}

// 获取真实飞书对话数据
function getRealFeishuConversations() {
    try {
        $api = getFeishuAPI();
        
        // 获取所有聊天列表
        $chat_data = $api->getAllChats(30); // 获取最多30个聊天
        $conversations = $api->formatChatData($chat_data);
        
        writeLog('开始获取 ' . count($conversations) . ' 个对话的消息', 'info', 'feishu');
        
        // 为每个对话获取最新20条消息
        foreach ($conversations as &$conversation) {
            try {
                writeLog('正在获取对话消息: ' . $conversation['id'] . ' - ' . $conversation['name'], 'info', 'feishu');
                
                // 获取20条消息
                $message_data = $api->getChatMessages($conversation['id'], 20);
                $conversation['messages'] = $api->formatMessageData($message_data, $conversation['id']);
                
                // 设置最后消息时间和未读数量
                if (!empty($conversation['messages'])) {
                    $last_message = end($conversation['messages']);
                    $conversation['last_message_time'] = $last_message['timestamp'];
                    $conversation['unread_count'] = rand(0, 5); // 模拟未读数量
                } else {
                    $conversation['last_message_time'] = date('c', strtotime('-1 hour'));
                    $conversation['unread_count'] = 0;
                }
                
                writeLog('成功获取对话消息: ' . $conversation['id'] . '，消息数量: ' . count($conversation['messages']), 'info', 'feishu');
                
            } catch (Exception $e) {
                writeLog('获取对话消息失败: ' . $conversation['id'] . ' - ' . $e->getMessage(), 'error', 'feishu');
                $conversation['messages'] = [];
                $conversation['last_message_time'] = date('c', strtotime('-1 hour'));
                $conversation['unread_count'] = 0;
            }
        }
        
        // 按最后消息时间排序
        usort($conversations, function($a, $b) {
            return strtotime($b['last_message_time']) - strtotime($a['last_message_time']);
        });
        
        writeLog('成功获取飞书对话数据，总数: ' . count($conversations), 'info', 'feishu');
        return $conversations;
        
    } catch (Exception $e) {
        writeLog('获取飞书对话失败: ' . $e->getMessage(), 'error', 'feishu');
        throw $e;
    }
}

try {
    if ($platform === 'feishu' && $use_real_api === 'true') {
        // 使用真实飞书API
        $conversations = getRealFeishuConversations();
        writeLog('使用真实飞书API获取对话成功', 'info', 'feishu');
    } else {
        // 使用Mock数据
        $conversations = generateMockConversations($platform);
    }
    
    echo json_encode([
        'success' => true,
        'platform' => $platform,
        'conversations' => $conversations,
        'total' => count($conversations),
        'timestamp' => date('c'),
        'data_source' => ($platform === 'feishu' && $use_real_api === 'true') ? 'real_api' : 'mock'
    ], JSON_UNESCAPED_UNICODE);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => '服务器内部错误: ' . $e->getMessage(),
        'platform' => $platform,
        'data_source' => ($platform === 'feishu' && $use_real_api === 'true') ? 'real_api' : 'mock'
    ], JSON_UNESCAPED_UNICODE);
}
?>