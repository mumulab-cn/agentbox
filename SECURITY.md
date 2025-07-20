# 安全指南

本文档提供了AgentBox项目的安全配置和最佳实践指南。

## 🔒 安全概述

AgentBox作为一个AI架构演练沙盘工具，处理的数据可能包含敏感的业务信息。请遵循以下安全指南确保系统安全。

## 🛡️ 配置文件安全

### 敏感信息保护

**重要**: 以下文件包含敏感信息，绝不应提交到版本控制系统：

- `config/config.json` - 包含API密钥和配置信息
- `data/feishu_data.json` - 包含业务数据
- 任何包含真实API凭证的文件

### 配置文件权限

```bash
# Linux/macOS 权限设置
chmod 600 config/config.json          # 仅所有者可读写
chmod 600 data/feishu_data.json       # 仅所有者可读写
chmod 755 config/                     # 目录权限
chmod 755 data/                       # 目录权限

# 确保Web服务器用户可以读取
chown www-data:www-data config/config.json
chown www-data:www-data data/feishu_data.json
```

## 🔐 API安全

### 飞书API安全配置

1. **API凭证管理**
   ```json
   {
     "feishu": {
       "app_id": "使用环境变量或安全存储",
       "app_secret": "使用环境变量或安全存储",
       "base_url": "确保使用HTTPS"
     }
   }
   ```

2. **环境变量配置**（推荐）
   ```bash
   # .env 文件（不要提交到Git）
   FEISHU_APP_ID=your_app_id_here
   FEISHU_APP_SECRET=your_app_secret_here
   ```

3. **API权限最小化**
   - 仅授予必要的API权限
   - 定期审查和更新权限
   - 使用只读权限（如果可能）

### API调用安全

- 始终使用HTTPS进行API调用
- 实施API调用频率限制
- 记录API调用日志用于审计
- 验证API响应数据

## 🌐 Web服务器安全

### Apache安全配置

```apache
# .htaccess 安全配置

# 禁止访问敏感文件
<Files "config.json">
    Require all denied
</Files>

<Files "*.json">
    <RequireAll>
        Require all denied
        Require local
    </RequireAll>
</Files>

# 禁止目录浏览
Options -Indexes

# 安全头设置
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"

# 隐藏服务器信息
ServerTokens Prod
ServerSignature Off
```

### Nginx安全配置

```nginx
server {
    listen 443 ssl http2;
    server_name agentbox.yourdomain.com;
    
    # SSL配置
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # 禁止访问敏感文件
    location ~* \.(json)$ {
        deny all;
        return 404;
    }
    
    location ~ /\. {
        deny all;
        return 404;
    }
    
    # 隐藏Nginx版本
    server_tokens off;
}
```

## 🔍 输入验证和数据安全

### PHP安全编码

```php
// 输入验证示例
function validateInput($input, $type = 'string') {
    switch ($type) {
        case 'string':
            return filter_var($input, FILTER_SANITIZE_STRING);
        case 'email':
            return filter_var($input, FILTER_VALIDATE_EMAIL);
        case 'url':
            return filter_var($input, FILTER_VALIDATE_URL);
        case 'int':
            return filter_var($input, FILTER_VALIDATE_INT);
        default:
            return false;
    }
}

// XSS防护
function escapeOutput($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

// CSRF防护
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
```

### 数据存储安全

- 敏感数据加密存储
- 定期备份数据
- 实施数据访问控制
- 数据传输加密

## 🚨 安全监控

### 日志记录

```php
// 安全事件日志记录
function logSecurityEvent($event, $details = []) {
    $logEntry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'event' => $event,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'details' => $details
    ];
    
    error_log(json_encode($logEntry), 3, 'logs/security.log');
}

// 使用示例
logSecurityEvent('config_access', ['file' => 'config.json']);
logSecurityEvent('api_call', ['endpoint' => 'feishu_api']);
```

### 监控指标

- 异常登录尝试
- 配置文件访问
- API调用频率
- 错误率监控
- 文件完整性检查

## 🔄 安全更新

### 定期安全检查

1. **依赖更新**
   ```bash
   # 检查PHP版本
   php -v
   
   # 检查已知漏洞
   # 使用安全扫描工具
   ```

2. **配置审计**
   - 定期审查配置文件
   - 检查文件权限
   - 验证API权限
   - 更新密钥和凭证

3. **代码审计**
   - 静态代码分析
   - 安全代码审查
   - 渗透测试

## 🚫 安全最佳实践

### 开发环境

- 使用不同的API凭证
- 启用详细错误日志
- 定期更新开发工具
- 使用版本控制

### 生产环境

- 禁用错误显示
- 启用HTTPS
- 实施访问控制
- 定期安全扫描
- 监控系统资源

### 部署安全

```bash
# 生产环境部署检查清单

# 1. 移除开发文件
rm -f .env.example
rm -f composer.json
rm -f package.json

# 2. 设置正确权限
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
chmod 600 config/config.json

# 3. 清理临时文件
rm -rf tmp/*
rm -rf logs/*.log

# 4. 验证配置
php -l config/config_reader.php
```

## 🆘 安全事件响应

### 发现安全问题时

1. **立即响应**
   - 隔离受影响系统
   - 收集证据和日志
   - 评估影响范围

2. **修复措施**
   - 应用安全补丁
   - 更新受影响凭证
   - 加强监控

3. **事后分析**
   - 分析根本原因
   - 更新安全策略
   - 改进防护措施

## 📞 安全联系

如果发现安全漏洞，请通过以下方式报告：

- **邮箱**: security@yourdomain.com
- **加密通信**: 使用PGP加密
- **私有报告**: 通过GitHub私有漏洞报告

### 负责任的披露

我们承诺：
- 在24小时内确认收到报告
- 在合理时间内提供修复
- 在修复完成后公开致谢
- 不对善意的安全研究采取法律行动

---

**记住**: 安全是一个持续的过程，需要定期审查和更新安全措施。🔒