# 贡献指南

感谢您对AgentBox项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告Bug
- 💡 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- ✨ 开发新功能

## 🚀 快速开始

### 环境准备

1. **系统要求**
   - PHP 7.4+
   - 现代浏览器
   - Git

2. **Fork和克隆项目**
   ```bash
   # Fork项目到你的GitHub账户
   # 然后克隆你的Fork
   git clone https://github.com/YOUR_USERNAME/agentbox.git
   cd agentbox
   ```

3. **设置开发环境**
   ```bash
   # 复制配置文件
   cp config/config.example.json config/config.json
   cp data/feishu_data.example.json data/feishu_data.json
   
   # 启动开发服务器
   php -S localhost:8000
   ```

## 📋 贡献流程

### 1. 创建Issue

在开始编码之前，请先创建一个Issue来描述：
- 要修复的Bug
- 要添加的新功能
- 要改进的文档

### 2. 创建分支

```bash
# 创建并切换到新分支
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 3. 开发和测试

- 编写代码
- 测试功能
- 确保代码符合项目规范

### 4. 提交代码

```bash
# 添加文件
git add .

# 提交（使用清晰的提交信息）
git commit -m "feat: 添加新的节点类型支持"
# 或
git commit -m "fix: 修复连接线显示问题"
```

### 5. 推送和创建PR

```bash
# 推送到你的Fork
git push origin feature/your-feature-name

# 在GitHub上创建Pull Request
```

## 📝 代码规范

### PHP代码规范

- 遵循PSR-4自动加载标准
- 使用4个空格缩进
- 类名使用PascalCase
- 方法名使用camelCase
- 常量使用UPPER_CASE

```php
<?php

class NodeManager
{
    private $nodes = [];
    
    public function createNode($name, $type)
    {
        // 实现代码
    }
}
```

### JavaScript代码规范

- 使用ES6+语法
- 使用2个空格缩进
- 使用camelCase命名
- 优先使用const和let

```javascript
class NodeManager {
  constructor() {
    this.nodes = [];
  }
  
  createNode(name, type) {
    // 实现代码
  }
}
```

### CSS代码规范

- 使用BEM命名规范
- 优先使用Tailwind CSS类
- 自定义样式使用语义化类名

```css
.node-manager {
  /* 组件样式 */
}

.node-manager__item {
  /* 元素样式 */
}

.node-manager__item--active {
  /* 修饰符样式 */
}
```

## 🐛 Bug报告

提交Bug报告时，请包含以下信息：

### Bug描述
- 简洁明确的Bug描述
- 预期行为vs实际行为

### 重现步骤
1. 访问页面 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

### 环境信息
- 操作系统: [如 Windows 10]
- 浏览器: [如 Chrome 91.0]
- PHP版本: [如 7.4.16]

### 截图
如果适用，请添加截图来帮助解释问题。

## 💡 功能建议

提交功能建议时，请包含：

- **问题描述**: 当前存在什么问题？
- **解决方案**: 你希望看到什么功能？
- **替代方案**: 你考虑过其他解决方案吗？
- **使用场景**: 这个功能在什么情况下有用？

## 📚 文档贡献

文档改进包括：
- 修正错别字和语法错误
- 添加缺失的文档
- 改进现有文档的清晰度
- 添加使用示例

## 🔍 代码审查

所有的Pull Request都需要经过代码审查：

- 确保代码符合项目规范
- 验证功能正常工作
- 检查是否有潜在的安全问题
- 确保文档已更新

## 📞 获取帮助

如果你在贡献过程中遇到问题：

- 查看现有的Issues和Discussions
- 创建新的Issue询问
- 在Pull Request中@维护者

## 🎉 贡献者认可

我们会在以下地方认可贡献者：
- README.md的贡献者列表
- 发布说明中的感谢
- 项目网站（如果有）

## 📄 许可证

通过贡献代码，你同意你的贡献将在MIT许可证下发布。

---

再次感谢你的贡献！🙏