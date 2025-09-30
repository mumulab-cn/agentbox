<?php
require_once 'config.php';
require_once 'feishu_api.php';
require_once 'utils.php';

// 设置响应头
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    $feishu = new FeishuAPI();
    
    // 测试参数
    $chat_id = $_GET['chat_id'] ?? 'oc_d021b2fa609489b7417d723becc87af8';
    $message = $_GET['message'] ?? '测试消息 - ' . date('Y-m-d H:i:s');
    
    echo "<h2>飞书发送消息调试</h2>";
    echo "<p>Chat ID: {$chat_id}</p>";
    echo "<p>Message: {$message}</p>";
    echo "<hr>";
    
    // 获取访问令牌
    echo "<h3>1. 获取访问令牌</h3>";
    $token = $feishu->getAccessToken();
    echo "<p>Token: " . substr($token, 0, 20) . "...</p>";
    
    // 构建请求
    echo "<h3>2. 构建请求</h3>";
    $url = 'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id';
    echo "<p>URL: {$url}</p>";
    
    $data = [
        'receive_id' => $chat_id,
        'msg_type' => 'text',
        'content' => json_encode([
            'text' => $message
        ], JSON_UNESCAPED_UNICODE)
    ];
    
    echo "<p>Request Data:</p>";
    echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre>";
    
    $headers = [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json'
    ];
    
    echo "<p>Headers:</p>";
    echo "<pre>" . implode("\n", $headers) . "</pre>";
    
    // 发送请求
    echo "<h3>3. 发送请求</h3>";
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => json_encode($data, JSON_UNESCAPED_UNICODE)
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    echo "<p>HTTP Code: {$http_code}</p>";
    
    if ($error) {
        echo "<p style='color: red;'>CURL Error: {$error}</p>";
    }
    
    echo "<p>Response:</p>";
    echo "<pre>" . htmlspecialchars($response) . "</pre>";
    
    // 解析响应
    $decoded = json_decode($response, true);
    if ($decoded) {
        echo "<h3>4. 解析结果</h3>";
        if ($decoded['code'] === 0) {
            echo "<p style='color: green;'>✅ 发送成功!</p>";
        } else {
            echo "<p style='color: red;'>❌ 发送失败: " . ($decoded['msg'] ?? '未知错误') . "</p>";
            if (isset($decoded['error'])) {
                echo "<p>详细错误信息:</p>";
                echo "<pre>" . json_encode($decoded['error'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "</pre>";
            }
        }
    }
    
} catch (Exception $e) {
    echo "<p style='color: red;'>异常: " . $e->getMessage() . "</p>";
}
?>