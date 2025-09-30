# 聊天平台控制台

一个基于HTML、jQuery、PHP和Tailwind CSS构建的控制台风格聊天平台，支持统一管理飞书、企业微信、钉钉等多个平台的对话。

## 功能特性

- 🎨 **控制台风格界面** - 简洁的深色主题设计
- 📱 **多平台支持** - 支持飞书、企业微信、钉钉
- 💬 **实时消息管理** - 查看和回复多平台消息
- 🔄 **自动刷新** - 定期获取最新消息
- 📊 **未读消息统计** - 实时显示未读消息数量
- 🎯 **响应式设计** - 适配不同屏幕尺寸

## 技术栈

- **前端**: HTML5, jQuery, Tailwind CSS, Font Awesome
- **后端**: PHP 7.4+
- **服务器**: Apache/Nginx + PHP
- **数据**: Mock数据（可扩展为真实API对接）

## 项目结构

```
chat-platform/
├── index.html              # 主页面
├── js/
│   └── app.js             # 前端JavaScript逻辑
├── api/
│   ├── conversations.php  # 获取对话列表API
│   ├── send_message.php   # 发送消息API
│   └── mark_read.php      # 标记已读API
├── config/
│   └── config.php         # 配置文件
├── logs/                  # 日志目录
└── README.md             # 项目说明
```

## 安装部署

### 环境要求

- PHP 7.4 或更高版本
- Apache/Nginx 服务器
- 支持 mod_rewrite（可选）

### 部署步骤

1. **下载项目**
   ```bash
   git clone <repository-url>
   cd chat-platform
   ```

2. **配置服务器**
   - 将项目文件放置在Web服务器根目录下
   - 确保PHP已正确配置
   - 设置适当的文件权限

3. **配置权限**
   ```bash
   chmod 755 api/
   chmod 755 config/
   chmod 777 logs/
   ```

4. **访问应用**
   - 在浏览器中访问 `http://localhost/chat-platform/`
   - 或根据你的服务器配置访问相应URL

## 使用说明

### 基本操作

1. **选择平台**
   - 点击左侧菜单中的平台（飞书、企业微信、钉钉）
   - 系统会自动加载该平台的对话列表

2. **查看对话**
   - 在对话列表中点击任意对话
   - 右侧会显示该对话的消息历史

3. **发送消息**
   - 在底部输入框中输入消息内容
   - 点击发送按钮或按Enter键发送
   - 消息会自动同步到对应平台

4. **刷新数据**
   - 点击右上角的刷新按钮手动刷新
   - 系统每30秒自动刷新一次

### 界面说明

- **左侧菜单**: 平台选择和系统设置
- **对话列表**: 显示当前平台的所有对话
- **消息区域**: 显示选中对话的消息内容
- **输入框**: 发送新消息
- **状态指示**: 显示未读消息数量

## API接口

### 获取对话列表
```
GET /api/conversations.php?platform={platform}
```

### 发送消息
```
POST /api/send_message.php
Data: {
  platform: string,
  conversation_id: string,
  content: string
}
```

### 标记已读
```
POST /api/mark_read.php
Data: {
  platform: string,
  conversation_id: string
}
```

## 配置说明

### 平台配置

编辑 `config/config.php` 文件中的平台配置：

```php
$platform_config = [
    'feishu' => [
        'app_id' => 'your_feishu_app_id',
        'app_secret' => 'your_feishu_app_secret',
        // ...
    ],
    // ...
];
```

### 系统配置

```php
$system_config = [
    'debug' => true,              // 调试模式
    'refresh_interval' => 30,     // 刷新间隔（秒）
    'max_message_length' => 1000, // 最大消息长度
    // ...
];
```

## 开发说明

### Mock数据

当前版本使用Mock数据进行演示，包含：
- 模拟的对话列表
- 模拟的消息历史
- 模拟的发送响应

### 真实API对接

要对接真实的平台API，需要：

1. **获取API凭证**
   - 飞书：在飞书开放平台申请应用
   - 企业微信：在企业微信管理后台创建应用
   - 钉钉：在钉钉开放平台创建应用

2. **修改API实现**
   - 替换 `api/` 目录下的Mock实现
   - 调用真实的平台API接口
   - 处理认证和权限验证

3. **配置Webhook**
   - 设置各平台的Webhook回调
   - 实现消息接收处理逻辑

## 安全注意事项

- 🔐 **API密钥安全**: 不要在前端暴露API密钥
- 🛡️ **输入验证**: 对所有用户输入进行验证和过滤
- 🔒 **HTTPS**: 生产环境建议使用HTTPS
- 📝 **日志记录**: 记录重要操作和错误信息
- 🚫 **访问控制**: 实现适当的用户认证和授权

## 故障排除

### 常见问题

1. **页面无法加载**
   - 检查PHP是否正确安装和配置
   - 确认Web服务器正在运行
   - 检查文件权限设置

2. **API请求失败**
   - 查看浏览器开发者工具的网络面板
   - 检查 `logs/` 目录下的错误日志
   - 确认API文件路径正确

3. **消息发送失败**
   - 检查网络连接
   - 验证平台配置是否正确
   - 查看服务器错误日志

### 调试模式

在 `config/config.php` 中启用调试模式：
```php
$system_config['debug'] = true;
```

## 更新日志

### v1.0.0 (2024-01-XX)
- ✨ 初始版本发布
- 🎨 控制台风格界面设计
- 📱 多平台支持（飞书、企业微信、钉钉）
- 💬 基本消息收发功能
- 🔄 自动刷新机制

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 联系方式

如有问题或建议，请通过以下方式联系：
- 📧 Email: your-email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)