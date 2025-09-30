<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// 获取请求参数
$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'upload':
        handleFileUpload();
        break;
    case 'chat':
        handleChatRequest();
        break;
    case 'save_canvas':
        handleSaveCanvas();
        break;
    case 'load_canvas':
        handleLoadCanvas();
        break;
    case 'get_products':
        handleGetProducts();
        break;
    case 'ocr_demo':
        handleOCRDemo();
        break;
    default:
        sendResponse(false, '无效的操作');
}

function handleFileUpload() {
    if (!isset($_FILES['files'])) {
        sendResponse(false, '没有上传文件');
        return;
    }

    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $uploadedFiles = [];
    $files = $_FILES['files'];
    
    // 处理多文件上传
    if (is_array($files['name'])) {
        for ($i = 0; $i < count($files['name']); $i++) {
            $file = [
                'name' => $files['name'][$i],
                'type' => $files['type'][$i],
                'tmp_name' => $files['tmp_name'][$i],
                'error' => $files['error'][$i],
                'size' => $files['size'][$i]
            ];
            $result = processFile($file, $uploadDir);
            if ($result) {
                $uploadedFiles[] = $result;
            }
        }
    } else {
        $result = processFile($files, $uploadDir);
        if ($result) {
            $uploadedFiles[] = $result;
        }
    }

    if (empty($uploadedFiles)) {
        sendResponse(false, '文件上传失败');
    } else {
        sendResponse(true, '文件上传成功', ['files' => $uploadedFiles]);
    }
}

function processFile($file, $uploadDir) {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return false;
    }

    // 检查文件大小 (10MB)
    if ($file['size'] > 10 * 1024 * 1024) {
        return false;
    }

    // 检查文件类型
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 
                     'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!in_array($file['type'], $allowedTypes)) {
        return false;
    }

    $fileName = time() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        return [
            'original_name' => $file['name'],
            'file_name' => $fileName,
            'file_path' => $targetPath,
            'file_size' => $file['size'],
            'file_type' => $file['type'],
            'upload_time' => date('Y-m-d H:i:s')
        ];
    }

    return false;
}

function handleChatRequest() {
    $input = json_decode(file_get_contents('php://input'), true);
    $message = $input['message'] ?? '';

    if (empty($message)) {
        sendResponse(false, '消息不能为空');
        return;
    }

    // 简单的聊天机器人逻辑
    $response = generateChatResponse($message);
    
    sendResponse(true, '回复成功', ['response' => $response]);
}

function generateChatResponse($message) {
    $message = strtolower($message);
    
    // 产品相关问答
    $responses = [
        'ocr' => '我们的OCR技术具有以下优势：\n1. 支持100+种证照识别\n2. 识别准确率达99%以上\n3. 支持50+种语言\n4. 提供多种部署方式：公有云API、私有化部署、端侧SDK\n\n您想了解哪个具体功能呢？',
        '文字识别' => '智能文字识别服务包括：\n• 证件识别：身份证、护照、驾驶证等\n• 票据识别：发票、银行单据、财务报表\n• 文档扫描：合同、协议等文档\n• 多语言识别：支持全球50+主流语言\n\n需要详细了解哪个功能？',
        '大数据' => '我们的商业大数据服务提供：\n• 企业信息查询：工商信息、股权结构\n• 风险评估：信用风险、经营风险\n• 产业链分析：供应链关系分析\n• 营销拓客：精准客户挖掘\n\n这些服务可以帮助您做出更好的商业决策。',
        '银行' => '银行数字化解决方案包括：\n• 移动开户：身份验证、资料录入\n• 信贷风控：风险评估、背景调查\n• 客户管理：客户画像、关系挖掘\n• 合规监管：反洗钱、KYC等\n\n已服务超过125家世界500强企业。',
        '保险' => '保险数字化方案涵盖：\n• 移动投保：快速投保流程\n• 理赔审核：智能理赔处理\n• 风险评估：保险风险分析\n• 流程优化：提升运营效率\n\n帮助保险公司降本增效。',
        '价格' => '我们提供灵活的定价方案：\n• 按调用量计费：适合小规模使用\n• 包年包月：适合大规模部署\n• 私有化部署：一次性授权\n\n具体价格请联系销售团队',
        '部署' => '我们支持多种部署方式：\n• 公有云API：快速接入，按需付费\n• 私有化部署：数据安全，本地处理\n• 端侧SDK：离线使用，实时响应\n• AIoT集成：硬件设备集成\n\n可根据您的需求选择最适合的方案。'
    ];
    
    // 关键词匹配
    foreach ($responses as $keyword => $response) {
        if (strpos($message, $keyword) !== false) {
            return $response;
        }
    }
    
    // 默认回复
    return '感谢您的咨询！我是AI助手。\n\n我可以为您介绍：\n• 智能文字识别(OCR)技术\n• 商业大数据服务\n• 行业解决方案\n• 产品价格和部署方式\n\n请告诉我您想了解什么，或者直接联系我们';
}

function handleSaveCanvas() {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendResponse(false, '无效的数据格式');
        return;
    }
    
    $canvasData = [
        'components' => $input['components'] ?? [],
        'uploaded_files' => $input['uploaded_files'] ?? [],
        'save_time' => date('Y-m-d H:i:s'),
        'version' => '1.0'
    ];
    
    $fileName = 'canvas_' . date('Ymd_His') . '.json';
    $filePath = 'saves/' . $fileName;
    
    if (!is_dir('saves/')) {
        mkdir('saves/', 0777, true);
    }
    
    if (file_put_contents($filePath, json_encode($canvasData, JSON_UNESCAPED_UNICODE))) {
        sendResponse(true, '画布保存成功', ['file_name' => $fileName]);
    } else {
        sendResponse(false, '画布保存失败');
    }
}

function handleLoadCanvas() {
    $fileName = $_GET['file'] ?? '';
    
    if (empty($fileName)) {
        sendResponse(false, '文件名不能为空');
        return;
    }
    
    $filePath = 'saves/' . $fileName;
    
    if (!file_exists($filePath)) {
        sendResponse(false, '文件不存在');
        return;
    }
    
    $canvasData = json_decode(file_get_contents($filePath), true);
    
    if ($canvasData) {
        sendResponse(true, '画布加载成功', $canvasData);
    } else {
        sendResponse(false, '文件格式错误');
    }
}

function handleGetProducts() {
    $products = [
        'ocr' => [
            'name' => '智能文字识别',
            'modules' => [
                ['name' => '证件识别', 'description' => '身份证、护照、驾驶证等100+证照识别'],
                ['name' => '票据识别', 'description' => '发票、银行单据、财务报表识别'],
                ['name' => '文档扫描', 'description' => '合同、协议等文档智能扫描识别'],
                ['name' => '多语言识别', 'description' => '支持50+全球主流语言识别']
            ]
        ],
        'data' => [
            'name' => '商业大数据服务',
            'modules' => [
                ['name' => '企业信息查询', 'description' => '工商信息、股权结构、经营状况查询'],
                ['name' => '风险评估', 'description' => '企业信用风险、经营风险评估'],
                ['name' => '产业链分析', 'description' => '供应链关系、产业布局分析'],
                ['name' => '营销拓客', 'description' => '精准客户挖掘、潜在客户推荐']
            ]
        ],
        'solution' => [
            'name' => '行业解决方案',
            'modules' => [
                ['name' => '银行数字化', 'description' => '移动开户、信贷风控、客户管理'],
                ['name' => '保险数字化', 'description' => '移动投保、理赔审核、风险评估'],
                ['name' => '智慧政务', 'description' => '证件办理、信息采集、流程优化'],
                ['name' => '供应链金融', 'description' => '供应商管理、风险控制、资金流转']
            ]
        ]
    ];
    
    sendResponse(true, '获取产品信息成功', $products);
}

function handleOCRDemo() {
    // 模拟OCR识别结果
    $demoResults = [
        'text' => '这是一个OCR识别演示结果。\n识别准确率：99.2%\n处理时间：0.8秒\n识别语言：中文',
        'confidence' => 0.992,
        'processing_time' => 0.8,
        'language' => 'zh-CN',
        'regions' => [
            ['x' => 10, 'y' => 10, 'width' => 200, 'height' => 30, 'text' => '示例文本1'],
            ['x' => 10, 'y' => 50, 'width' => 180, 'height' => 25, 'text' => '示例文本2']
        ]
    ];
    
    sendResponse(true, 'OCR识别完成', $demoResults);
}

function sendResponse($success, $message, $data = null) {
    $response = [
        'success' => $success,
        'message' => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

// 错误处理
function handleError($errno, $errstr, $errfile, $errline) {
    sendResponse(false, "系统错误: $errstr");
}

set_error_handler('handleError');
?>