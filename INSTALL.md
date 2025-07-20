# 安装指南

本文档将指导您如何在本地环境中安装和配置AgentBox项目。

## 📋 系统要求

### 基础环境
- **PHP**: 7.4 或更高版本
- **Web服务器**: Apache/Nginx 或 PHP内置服务器
- **浏览器**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### 可选组件
- **Git**: 用于版本控制
- **Composer**: PHP依赖管理（如需扩展）

## 🚀 快速安装

### 使用Git克隆

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/agentbox.git
cd agentbox

# 复制配置文件
cp config/config.example.json config/config.json
cp data/feishu_data.example.json data/feishu_data.json
```

## ⚙️ 配置说明

### 1. 基础配置

编辑 `config/config.json` 文件：

```json
{
    "app": {
        "name": "AgentBox",
        "subtitle": "AI架构演练沙盘",
        "sidebar_title": "AgentBox<br />AI架构演练沙盘",
        "main_console_title": "AI资源管理控制台"
    },
    "pages": {
        "index": "沙盘演练平台",
        "new": "AI资源管理控制台",
        "list": "AI资源管理控制台",
        "config": "AgentBox - AI架构演练沙盘 | 飞书API配置管理"
    },
    "theme": {
        "primary_color": "#1976d2",
        "secondary_color": "#666",
        "accent_color": "#FF8800"
    }
}
```

### 2. 飞书API配置（可选）

如果需要使用飞书多维表格集成功能，请配置：

```json
{
    "feishu": {
        "app_id": "your_feishu_app_id_here",
        "app_secret": "your_feishu_app_secret_here",
        "base_url": "https://open.feishu.cn/open-apis/bitable/v1/apps/YOUR_APP_ID/tables/YOUR_TABLE_ID/records/search",
        "page_size": 2000,
        "conversation_id": "123",
        "data_file_path": "data/feishu_data.json"
    }
}
```

#### 获取飞书API凭证

1. 访问 [飞书开放平台](https://open.feishu.cn/)
2. 创建企业自建应用
3. 获取 `App ID` 和 `App Secret`
4. 配置应用权限：
   - `bitable:app`
   - `bitable:app:readonly`

## 🌐 启动服务

### 使用PHP内置服务器（推荐用于开发）

```bash
# 在项目根目录执行
php -S localhost:8000

# 访问应用
# 主页: http://localhost:8000
# 沙盘: http://localhost:8000/index.php
# 资源管理: http://localhost:8000/new.php
# 资源列表: http://localhost:8000/list.php
# 配置管理: http://localhost:8000/config/config.php
```

### 使用Apache/Nginx

1. 将项目文件放置在Web服务器文档根目录
2. 确保Web服务器有读取权限
3. 访问对应的URL

#### Apache配置示例

```apache
<VirtualHost *:80>
    DocumentRoot "/path/to/agentbox"
    ServerName agentbox.local
    
    <Directory "/path/to/agentbox">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

#### Nginx配置示例

```nginx
server {
    listen 80;
    server_name agentbox.local;
    root /path/to/agentbox;
    index index.php index.html;
    
    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 📁 目录权限

确保以下目录具有写入权限：

```bash
# Linux/macOS
chmod 755 config/
chmod 644 config/config.json
chmod 755 data/
chmod 644 data/feishu_data.json

# Windows
# 通过文件属性设置相应权限
```

## 🔧 故障排除

### 常见问题

#### 1. 页面显示空白
- 检查PHP错误日志
- 确认PHP版本兼容性
- 验证文件权限设置

#### 2. 配置文件读取失败
- 确认 `config/config.json` 文件存在
- 检查JSON格式是否正确
- 验证文件读取权限

#### 3. 飞书API连接失败
- 验证API凭证正确性
- 检查网络连接
- 确认API权限配置

#### 4. 样式显示异常
- 清除浏览器缓存
- 检查CSS文件路径
- 验证静态资源访问权限

### 调试模式

在开发环境中启用PHP错误显示：

```php
// 在入口文件顶部添加
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
```

## 📊 性能优化

### 生产环境建议

1. **启用OPcache**
   ```ini
   ; php.ini
   opcache.enable=1
   opcache.memory_consumption=128
   opcache.max_accelerated_files=4000
   ```

2. **启用Gzip压缩**
   ```apache
   # .htaccess
   <IfModule mod_deflate.c>
       AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
   </IfModule>
   ```

3. **设置缓存头**
   ```apache
   # 静态资源缓存
   <IfModule mod_expires.c>
       ExpiresActive On
       ExpiresByType text/css "access plus 1 month"
       ExpiresByType application/javascript "access plus 1 month"
       ExpiresByType image/png "access plus 1 year"
   </IfModule>
   ```

## 🔄 更新升级

### Git方式更新

```bash
# 备份配置文件
cp config/config.json config/config.json.backup
cp data/feishu_data.json data/feishu_data.json.backup

# 拉取最新代码
git pull origin main

# 恢复配置文件
cp config/config.json.backup config/config.json
cp data/feishu_data.json.backup data/feishu_data.json
```

### 手动更新

1. 备份当前配置和数据文件
2. 下载新版本
3. 替换除配置文件外的所有文件
4. 恢复配置文件
5. 检查更新日志中的配置变更

## 📞 获取帮助

如果在安装过程中遇到问题：

- 查看 [故障排除文档](CONTRIBUTING.md#故障排除)
- 提交 [GitHub Issue](https://github.com/mumulab-cn/agentbox/issues)
- 查看 [项目文档](README.md)

---

安装完成后，您可以开始使用AgentBox进行AI架构设计和演练！🎉
