<?php
/**
 * 飞书API对接模块
 * 提供获取聊天记录和发送消息的功能
 */

require_once '../config/config.php';

class FeishuAPI {
    private $app_id;
    private $app_secret;
    private $base_url;
    private $access_token;
    private $token_expires_at;
    
    public function __construct() {
        $config = getPlatformConfig('feishu');
        $this->app_id = $config['app_id'];
        $this->app_secret = $config['app_secret'];
        $this->app_secret = 'FeFAwLJnlO1g2a0CsHmoKbztSVXnCHdT';
        $this->base_url = $config['api_base_url'];
        $this->access_token = null;
        $this->token_expires_at = 0;
    }
    
    /**
     * 获取访问令牌
     */
    private function getAccessToken() {
        // 检查token是否过期
        if ($this->access_token && time() < $this->token_expires_at - 300) {
            return $this->access_token;
        }
        
        $url = $this->base_url . 'auth/v3/tenant_access_token/internal';
        $data = [
            'app_id' => $this->app_id,
            'app_secret' => $this->app_secret
        ];
        
        $response = $this->makeRequest('POST', $url, $data);
        
        if ($response && $response['code'] === 0) {
            $this->access_token = $response['tenant_access_token'];
            $this->token_expires_at = time() + $response['expire'];
            writeLog('飞书访问令牌获取成功', 'info', 'feishu');
            return $this->access_token;
        } else {
            $error = $response['msg'] ?? '获取访问令牌失败';
            writeLog('飞书访问令牌获取失败: ' . $error, 'error', 'feishu');
            throw new Exception('获取飞书访问令牌失败: ' . $error);
        }
    }
    
    /**
     * 获取聊天列表
     */
    public function getChatList($page_size = 20, $page_token = '') {
        $token = $this->getAccessToken();
        $url = $this->base_url . 'im/v1/chats';
        
        $params = [
            'page_size' => $page_size
        ];
        
        if ($page_token) {
            $params['page_token'] = $page_token;
        }
        
        $url .= '?' . http_build_query($params);
        
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ];
        
        $response = $this->makeRequest('GET', $url, null, $headers);
        
        if ($response && $response['code'] === 0) {
            writeLog('成功获取聊天列表，数量: ' . count($response['data']['items'] ?? []), 'info', 'feishu');
            return $response['data'];
        } else {
            $error = $response['msg'] ?? '获取聊天列表失败';
            writeLog('获取飞书聊天列表失败: ' . $error, 'error', 'feishu');
            throw new Exception('获取聊天列表失败: ' . $error);
        }
    }
    
    /**
     * 获取所有聊天列表（包含分页）
     */
    public function getAllChats($max_chats = 50) {
        $all_chats = [];
        $page_token = '';
        $page_size = 20;
        
        do {
            try {
                $result = $this->getChatList($page_size, $page_token);
                
                if (isset($result['items']) && is_array($result['items'])) {
                    $all_chats = array_merge($all_chats, $result['items']);
                }
                
                $page_token = $result['page_token'] ?? '';
                $has_more = $result['has_more'] ?? false;
                
                // 限制最大获取数量
                if (count($all_chats) >= $max_chats) {
                    $all_chats = array_slice($all_chats, 0, $max_chats);
                    break;
                }
                
            } catch (Exception $e) {
                writeLog('获取聊天列表分页失败: ' . $e->getMessage(), 'error', 'feishu');
                break;
            }
            
        } while ($has_more && $page_token);
        
        writeLog('总共获取到聊天数量: ' . count($all_chats), 'info', 'feishu');
        
        return [
            'items' => $all_chats,
            'total_count' => count($all_chats)
        ];
    }
    
    /**
     * 获取聊天消息历史
     */
    public function getChatMessages($chat_id, $page_size = 20, $page_token = '') {
        $token = $this->getAccessToken();
        $url = $this->base_url . 'im/v1/messages';
        
        $params = [
            'container_id_type' => 'chat',
            'container_id' => $chat_id,
            'page_size' => $page_size,
            'sort_type' => 'ByCreateTimeDesc'
        ];
        
        if ($page_token) {
            $params['page_token'] = $page_token;
        }
        
        $url .= '?' . http_build_query($params);
        
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ];
        
        $response = $this->makeRequest('GET', $url, null, $headers);
        
        if ($response && $response['code'] === 0) {
            return $response['data'];
        } else {
            $error = $response['msg'] ?? '获取消息历史失败';
            writeLog('获取飞书消息历史失败: ' . $error, 'error', 'feishu');
            
            // 如果是参数错误，尝试使用不同的API
            if (strpos($error, 'invalid container_id_type') !== false) {
                return $this->getChatMessagesAlternative($chat_id, $page_size, $page_token);
            }
            
            throw new Exception('获取消息历史失败: ' . $error);
        }
    }
    
    /**
     * 备用方法：通过不同的API获取消息
     */
    private function getChatMessagesAlternative($chat_id, $page_size = 20, $page_token = '') {
        $token = $this->getAccessToken();
        
        // 尝试使用聊天历史API
        $url = $this->base_url . 'im/v1/chats/' . $chat_id . '/messages';
        
        $params = [
            'page_size' => $page_size,
            'sort_type' => 'ByCreateTimeDesc'
        ];
        
        if ($page_token) {
            $params['page_token'] = $page_token;
        }
        
        $url .= '?' . http_build_query($params);
        
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ];
        
        try {
            $response = $this->makeRequest('GET', $url, null, $headers);
            
            if ($response && $response['code'] === 0) {
                writeLog('使用备用API成功获取消息: ' . $chat_id, 'info', 'feishu');
                return $response['data'];
            }
        } catch (Exception $e) {
            writeLog('备用API也失败: ' . $e->getMessage(), 'error', 'feishu');
        }
        
        // 如果都失败了，返回空数据
        writeLog('所有消息获取方法都失败，返回空数据: ' . $chat_id, 'warning', 'feishu');
        return ['items' => [], 'has_more' => false, 'page_token' => ''];
    }
    
    /**
     * 发送文本消息
     */
    public function sendTextMessage($chat_id, $content) {
        $token = $this->getAccessToken();
        $url = $this->base_url . 'im/v1/messages?receive_id_type=chat_id';
        
        $data = [
            'receive_id' => $chat_id,
            'msg_type' => 'text',
            'content' => json_encode([
                'text' => $content
            ], JSON_UNESCAPED_UNICODE)
        ];
        
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ];
        
        $response = $this->makeRequest('POST', $url, $data, $headers);
        
        if ($response && $response['code'] === 0) {
            writeLog('飞书消息发送成功: ' . $content, 'info', 'feishu');
            return $response['data'];
        } else {
            $error = $response['msg'] ?? '发送消息失败';
            writeLog('飞书消息发送失败: ' . $error, 'error', 'feishu');
            throw new Exception('发送消息失败: ' . $error);
        }
    }
    
    /**
     * 获取用户信息
     */
    public function getUserInfo($user_id, $user_id_type = 'user_id') {
        $token = $this->getAccessToken();
        $url = $this->base_url . 'contact/v3/users/' . $user_id;
        
        $params = [
            'user_id_type' => $user_id_type
        ];
        
        $url .= '?' . http_build_query($params);
        
        $headers = [
            'Authorization: Bearer ' . $token,
            'Content-Type: application/json'
        ];
        
        $response = $this->makeRequest('GET', $url, null, $headers);
        
        if ($response && $response['code'] === 0) {
            return @$response['data']['user'];
        } else {
            $error = $response['msg'] ?? '获取用户信息失败';
            writeLog('获取飞书用户信息失败: ' . $error, 'error', 'feishu');
            return null;
        }
    }
    
    /**
     * 发送HTTP请求
     */
    private function makeRequest($method, $url, $data = null, $headers = []) {
        $ch = curl_init();
        
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);
        
        if (!empty($headers)) {
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        }
        
        if ($data && ($method === 'POST' || $method === 'PUT')) {
            if (is_array($data)) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data, JSON_UNESCAPED_UNICODE));
                if (empty($headers)) {
                    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
                }
            } else {
                curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            }
        }
        
        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        
        curl_close($ch);
        
        if ($error) {
            writeLog('CURL错误: ' . $error, 'error', 'feishu');
            throw new Exception('网络请求失败: ' . $error);
        }
        
        if ($http_code >= 400) {
            writeLog('HTTP错误: ' . $http_code . ' - ' . $response, 'error', 'feishu');
            throw new Exception('HTTP请求失败: ' . $http_code);
        }
        
        $decoded = json_decode($response, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            writeLog('JSON解析错误: ' . json_last_error_msg(), 'error', 'feishu');
            throw new Exception('响应解析失败');
        }
        
        return $decoded;
    }
    
    /**
     * 格式化聊天数据为统一格式
     */
    public function formatChatData($chat_data) {
        $formatted_chats = [];
        
        if (isset($chat_data['items'])) {
            foreach ($chat_data['items'] as $chat) {
                $formatted_chats[] = [
                    'id' => $chat['chat_id'],
                    'name' => $chat['name'] ?? '未命名群聊',
                    'type' => @$chat['chat_type'] === 'p2p' ? 'private' : 'group',
                    'avatar' => $chat['avatar'] ?? '',
                    'description' => $chat['description'] ?? '',
                    'member_count' => $chat['member_count'] ?? 0,
                    'unread_count' => 0, // 需要单独获取
                    'last_message_time' => date('c'),
                    'messages' => []
                ];
            }
        }
        
        return $formatted_chats;
    }
    
    /**
     * 格式化消息数据为统一格式
     */
    public function formatMessageData($message_data, $chat_id) {
        $formatted_messages = [];
        
        if (isset($message_data['items']) && is_array($message_data['items'])) {
            // 按时间顺序排列消息（最新的在最后）
            $messages = $message_data['items'];
            usort($messages, function($a, $b) {
                return ($a['create_time'] ?? 0) - ($b['create_time'] ?? 0);
            });
            
            foreach ($messages as $message) {
                $content = '';
                
                // 解析消息内容
                try {
                    if ($message['msg_type'] === 'text') {
                        if (isset($message['body']['content'])) {
                            $content_data = json_decode($message['body']['content'], true);
                            $content = $content_data['text'] ?? $message['body']['content'];
                        } else {
                            $content = '[文本消息]';
                        }
                    } elseif ($message['msg_type'] === 'image') {
                        $content = '[图片消息]';
                    } elseif ($message['msg_type'] === 'file') {
                        $content = '[文件消息]';
                    } elseif ($message['msg_type'] === 'audio') {
                        $content = '[语音消息]';
                    } elseif ($message['msg_type'] === 'video') {
                        $content = '[视频消息]';
                    } elseif ($message['msg_type'] === 'sticker') {
                        $content = '[表情包]';
                    } elseif ($message['msg_type'] === 'rich_text') {
                        $content = '[富文本消息]';
                    } else {
                        $content = '[' . ($message['msg_type'] ?? '未知') . '消息]';
                    }
                } catch (Exception $e) {
                    $content = '[消息解析失败]';
                    writeLog('消息内容解析失败: ' . $e->getMessage(), 'warning', 'feishu');
                }
                
                // 获取发送者信息（简化处理，避免过多API调用）
                $sender_id = $message['sender']['id'] ?? 'unknown';
                $sender_name = $message['sender']['sender_type'] === 'user' ? '用户' : '机器人';
                
                // 尝试从缓存或简单方式获取用户名
                if ($sender_id !== 'unknown') {
                    try {
                        // 根据ID格式确定用户ID类型
                        $user_id_type = 'user_id';
                        if (strpos($sender_id, 'ou_') === 0) {
                            $user_id_type = 'open_id';
                        } elseif (strpos($sender_id, 'cli_') === 0) {
                            // 应用ID，跳过用户信息获取
                            $sender_name = '应用';
                        } else {
                            $user_id_type = 'user_id';
                        }
                        
                        if (strpos($sender_id, 'cli_') !== 0) {
                            $sender_info = $this->getUserInfo($sender_id, $user_id_type);
                            if ($sender_info && isset($sender_info['name'])) {
                                $sender_name = $sender_info['name'];
                            }
                        }
                    } catch (Exception $e) {
                        // 如果获取用户信息失败，使用默认名称
                        $sender_name = '用户_' . substr($sender_id, -4);
                        writeLog('获取发送者信息失败: ' . $sender_id . ' - ' . $e->getMessage(), 'warning', 'feishu');
                    }
                }
                
                // 判断发送者类型
                $sender_type = 'other';
                if (strpos($sender_id, 'cli_') === 0 || $sender_name === '应用') {
                    $sender_type = 'app';
                }
                
                $formatted_messages[] = [
                    'id' => $message['message_id'] ?? uniqid(),
                    'content' => $content,
                    'sender_type' => $sender_type,
                    'sender_name' => $sender_name,
                    'sender_id' => $sender_id,
                    'timestamp' => isset($message['create_time']) ? date('c', $message['create_time'] / 1000) : date('c'),
                    'msg_type' => $message['msg_type'] ?? 'unknown'
                ];
            }
        }
        
        return $formatted_messages;
    }
}

/**
 * 飞书API实例
 */
function getFeishuAPI() {
    static $instance = null;
    if ($instance === null) {
        $instance = new FeishuAPI();
    }
    return $instance;
}

/**
 * 测试飞书API连接
 */
function testFeishuConnection1() {
    try {
        $api = getFeishuAPI();
        $chats = $api->getChatList(1);
        return [
            'success' => true,
            'message' => '飞书API连接成功',
            'data' => $chats
        ];
    } catch (Exception $e) {
        return [
            'success' => false,
            'message' => '飞书API连接失败: ' . $e->getMessage()
        ];
    }
}
?>