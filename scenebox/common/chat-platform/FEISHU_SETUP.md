# 飞书API对接配置指南

本文档详细说明如何配置飞书API以实现真实的聊天功能对接。

## 🚀 快速开始

### 1. 创建飞书应用

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 登录你的飞书账号
3. 点击「创建企业自建应用」
4. 填写应用基本信息：
   - 应用名称：聊天平台控制台
   - 应用描述：统一管理多平台聊天的控制台
   - 应用图标：上传应用图标

### 2. 获取应用凭证

1. 在应用管理页面，进入「凭证与基础信息」
2. 记录以下信息：
   - **App ID**：应用唯一标识
   - **App Secret**：应用密钥（请妥善保管）

### 3. 配置应用权限

在「权限管理」页面，添加以下权限：

#### 消息与群组权限
- `im:message` - 获取与发送单聊、群组消息
- `im:message:send_as_bot` - 以应用的身份发送消息
- `im:chat` - 获取群组信息
- `im:chat:readonly` - 获取用户或机器人所在的群列表

#### 通讯录权限
- `contact:user.id:readonly` - 获取用户 user ID
- `contact:user.base:readonly` - 获取用户基本信息

### 4. 配置事件订阅（可选）

如果需要实时接收消息，可以配置事件订阅：

1. 在「事件订阅」页面，启用事件订阅
2. 设置请求网址：`https://your-domain.com/webhook/feishu`
3. 订阅以下事件：
   - `im.message.receive_v1` - 接收消息
   - `im.chat.updated_v1` - 群组信息变更

### 5. 发布应用

1. 在「版本管理与发布」页面
2. 创建版本并发布到企业内部
3. 等待管理员审核通过

## ⚙️ 系统配置

### 方法一：通过配置页面

1. 访问 `http://localhost:8080/feishu_config.html`
2. 输入获取的 App ID 和 App Secret
3. 点击「保存配置」
4. 点击「测试连接」验证配置

### 方法二：直接修改配置文件

编辑 `config/config.php` 文件：

```php
$platform_config = [
    'feishu' => [
        'name' => '飞书',
        'app_id' => 'cli_xxxxxxxxxx', // 替换为你的App ID
        'app_secret' => 'xxxxxxxxxx', // 替换为你的App Secret
        'api_base_url' => 'https://open.feishu.cn/open-apis/',
        'webhook_url' => '',
        'enabled' => true,
        'color' => 'blue'
    ],
    // ...
];
```

## 🧪 测试API连接

### 使用测试接口

访问以下URL进行API测试：

```bash
# 测试基本连接
GET http://localhost:8080/api/test_feishu.php?action=test_connection

# 测试获取聊天列表
GET http://localhost:8080/api/test_feishu.php?action=test_chat_list

# 测试发送消息API
GET http://localhost:8080/api/test_feishu.php?action=test_send_message

# 运行完整测试
GET http://localhost:8080/api/test_feishu.php?action=full_test
```

### 测试结果说明

- ✅ **连接成功**：能够获取访问令牌
- ✅ **聊天列表**：能够获取用户的聊天列表
- ✅ **发送消息**：API调用格式正确

## 🔧 使用真实API

配置完成后，在主界面：

1. 选择「飞书」平台
2. 点击右上角的「Mock数据」按钮切换为「真实API」
3. 现在可以看到真实的飞书聊天记录
4. 发送的消息将直接发送到飞书

## 📋 API功能说明

### 已实现功能

- ✅ 获取聊天列表（群聊和私聊）
- ✅ 获取聊天消息历史
- ✅ 发送文本消息
- ✅ 获取用户基本信息
- ✅ 访问令牌自动管理

### 计划功能

- 🔄 实时消息推送（Webhook）
- 🔄 发送富文本消息
- 🔄 文件上传和下载
- 🔄 群组管理功能

## 🔒 安全注意事项

1. **保护应用密钥**
   - 不要在前端代码中暴露 App Secret
   - 定期更换应用密钥
   - 使用环境变量存储敏感信息

2. **权限最小化**
   - 只申请必要的权限
   - 定期审查权限使用情况

3. **访问控制**
   - 限制API访问来源
   - 实现用户认证机制
   - 记录API调用日志

## 🐛 常见问题

### Q: 获取访问令牌失败

**A:** 检查以下项目：
- App ID 和 App Secret 是否正确
- 应用是否已发布到企业
- 网络连接是否正常

### Q: 无法获取聊天列表

**A:** 确认以下权限：
- 是否有 `im:chat:readonly` 权限
- 应用是否已被用户授权
- 用户是否在相关群组中

### Q: 发送消息失败

**A:** 检查以下内容：
- 是否有 `im:message` 权限
- 目标聊天是否存在
- 消息内容是否符合格式要求

### Q: API调用频率限制

**A:** 飞书API有调用频率限制：
- 每个应用每分钟最多调用 1000 次
- 建议实现请求缓存和重试机制

## 📞 技术支持

- [飞书开放平台文档](https://open.feishu.cn/document/)
- [API参考文档](https://open.feishu.cn/document/server-docs/)
- [开发者社区](https://open.feishu.cn/community/)

## 📝 更新日志

### v1.0.0
- ✨ 初始版本
- ✅ 基本API对接功能
- ✅ 消息收发功能
- ✅ 配置管理界面

---

**注意**：本文档基于飞书开放平台API v1.0编写，如有API更新请参考官方最新文档。