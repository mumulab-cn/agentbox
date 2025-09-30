# AgentBox - AI架构演练沙盘

一个基于Web的AI架构可视化设计和演练平台，帮助用户通过拖拽方式构建AI应用架构，并进行成本、时间、风险等多维度分析。

## 🚀 项目特性

- **可视化设计**: 通过拖拽方式构建AI应用架构图
- **多维度分析**: 支持时间、成本、人力、风险等属性管理
- **资源管理**: 集成AI平台、模型、数据、工具等资源库
- **实时统计**: 动态计算项目总体指标和ROI分析
- **飞书集成**: 支持从飞书多维表格导入数据 
- **响应式设计**: 支持桌面端和移动端访问

## 📁 项目结构

```
agentbox/
├── config/                 # 配置文件
│   ├── config.json         # 应用配置
│   └── config_reader.php   # 配置读取器
├── data/                   # 数据文件
│   └── feishu_data.json   # 飞书数据缓存
├── lib/                    # 工具库
│   └── fetch_feishu_data.php # 飞书数据获取
├── src/                    # 前端资源
│   ├── css/               # 样式文件
│   │   ├── index-page.css # 主页样式
│   │   ├── new-page.css   # 控制台样式
│   │   ├── list-page.css  # 列表页样式
│   │   ├── config-page.css # 配置页样式
│   │   ├── sandbox.css    # 沙盘样式
│   │   └── tailwind.min.css # Tailwind CSS
│   ├── images/            # 图片资源
│   │   └── ai-building-blocks/ # AI组件图标
│   └── js/                # JavaScript文件
│       ├── nodeManager.js # 节点管理器
│       ├── nodeAttributeEditor.js # 属性编辑器
│       ├── nodeAttributeManager.js # 属性管理器
│       ├── connectionManager.js # 连接管理器
│       ├── canvasDataManager.js # 画布数据管理
│       ├── statistics.js  # 统计分析
│       └── main.js        # 主要逻辑
├── index.php              # 沙盘演练页面
├── new.php                # AI资源管理控制台
├── list.php               # 资源列表页面
└── config.php             # 配置管理页面
```

## 🛠️ 技术栈

- **后端**: PHP 7.4+
- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **UI框架**: Tailwind CSS, Bootstrap Icons
- **JavaScript库**: jQuery, jQuery UI
- **数据格式**: JSON
- **API集成**: 飞书开放平台API


## 🚀 快速开始

### 环境要求

- PHP 7.4 或更高版本
- Web服务器 (Apache/Nginx/PHP内置服务器)
- 现代浏览器支持

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/agentbox.git
   cd agentbox
   ```

2. **配置Web服务器**
   
   使用PHP内置服务器:
   ```bash
   php -S localhost:8000
   ```
   
   或配置Apache/Nginx指向项目目录


3. **配置飞书集成** (可选)
   
   在配置页面填入飞书应用信息:
   - App ID
   - App Secret  
   - 多维表格API地址

### 使用说明

1. **访问沙盘**: `http://localhost:8000/index.php`
2. **管理控制台**: `http://localhost:8000/new.php`
3. **资源列表**: `http://localhost:8000/list.php`
4. **系统配置**: `http://localhost:8000/config.php`

## 🎯 核心功能说明

### 节点管理
- 支持多种节点类型 (平台、模型、工具等)
- 可自定义节点属性 (时间、成本、人力、风险)
- 支持节点连接和关系建立

### 属性分析
- 实时计算项目总时间、成本、人力投入
- 风险评估和TODO任务管理
- 可视化统计图表

### 数据集成
- 支持飞书多维表格数据导入
- JSON格式数据存储
- 灵活的数据结构设计

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目！


## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情


## 📞 联系方式

如有问题或建议，请通过以下方式联系:

- 提交 [Issue](https://github.com/mumulab-cn/agentbox/issues)
- 发送邮件至: cloud@mumulab.cn

  
---

⭐ 如果这个项目对你有帮助，请给它一个星标！


