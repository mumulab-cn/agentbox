# Flask 示例应用

这是一个使用 Flask 框架构建的完整示例应用，展示了现代 Web 开发的最佳实践。

## 功能特性

- **用户管理系统** - 完整的用户 CRUD 操作
- **博客系统** - 文章发布、分类管理、多视图展示
- **智能搜索** - 全文搜索功能，支持用户和文章搜索
- **RESTful API** - 完整的 API 接口，支持 JSON 数据交换
- **响应式设计** - 支持多设备访问
- **现代化 UI** - 基于 Bootstrap 5 的美观界面

## 技术栈

### 后端
- Python 3.x
- Flask 2.x
- Jinja2 模板引擎
- 内存数据存储（演示用）

### 前端
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Font Awesome 图标

## 快速开始

### 1. 环境要求

- Python 3.7+
- pip 包管理器

### 2. 安装依赖

```bash
# 克隆或下载项目到本地
cd data_bi

# 安装 Python 依赖
pip install -r requirements.txt
```

### 3. 运行应用

```bash
# 启动 Flask 开发服务器
python app.py
```

应用将在 `http://localhost:5000` 启动。

### 4. 访问应用

打开浏览器访问以下地址：

- **首页**: http://localhost:5000/
- **用户管理**: http://localhost:5000/users
- **博客系统**: http://localhost:5000/blog
- **搜索功能**: http://localhost:5000/search
- **关于页面**: http://localhost:5000/about

## API 接口

### 用户 API

- `GET /api/users` - 获取所有用户
- `GET /api/users/<id>` - 获取指定用户

### 博客 API

- `GET /api/posts` - 获取所有文章
- `GET /api/posts/<id>` - 获取指定文章

### 示例请求

```bash
# 获取所有用户
curl http://localhost:5000/api/users

# 获取指定用户
curl http://localhost:5000/api/users/1

# 获取所有文章
curl http://localhost:5000/api/posts
```

## 项目结构

```
data_bi/
├── app.py                 # 主应用文件
├── requirements.txt       # Python 依赖
├── README.md             # 项目说明
├── templates/            # 模板文件
│   ├── base.html         # 基础模板
│   ├── index.html        # 首页
│   ├── users.html        # 用户列表
│   ├── user_detail.html  # 用户详情
│   ├── add_user.html     # 添加用户
│   ├── blog.html         # 博客列表
│   ├── search.html       # 搜索页面
│   └── about.html        # 关于页面
├── index.html            # 数据BI流程页面
└── web_scraping_demo.html # 网页爬取示例
```

## 主要功能说明

### 用户管理

- 查看用户列表（卡片和列表两种视图）
- 查看用户详细信息
- 添加新用户（带表单验证）
- 用户数据统计

### 博客系统

- 文章列表展示（网格和列表视图切换）
- 文章分类管理
- 文章统计信息
- 响应式设计

### 搜索功能

- 全文搜索用户和文章
- 搜索选项配置
- 搜索结果分类显示
- 搜索建议和技巧

### API 接口

- RESTful 设计
- JSON 数据格式
- 错误处理
- 跨域支持

## 开发说明

### 添加新功能

1. 在 `app.py` 中添加新的路由
2. 在 `templates/` 目录下创建对应的模板文件
3. 更新导航菜单（在 `base.html` 中）

### 自定义样式

- 主要样式定义在 `base.html` 的 `<style>` 标签中
- 使用 Bootstrap 5 的工具类进行快速样式调整
- 支持自定义 CSS 变量

### 数据存储

当前使用内存存储演示数据，生产环境建议：

- 使用 SQLite/PostgreSQL/MySQL 数据库
- 集成 SQLAlchemy ORM
- 添加数据迁移功能

## 部署建议

### 开发环境

```bash
# 使用 Flask 开发服务器
python app.py
```

### 生产环境

```bash
# 使用 Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker 部署

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 许可证

MIT License - 详见 LICENSE 文件

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- 邮箱: admin@example.com
- GitHub: [项目地址]

---

**感谢使用 Flask 示例应用！** 🚀