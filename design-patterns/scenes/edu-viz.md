# 学校课堂“动态可视化” Spec 提示词模板（SVG/Canvas/Three.js）

> 本模板适用于任意“生成工具”（或人工执行），用于生成课堂教学用的动态可视化页面（SVG/Canvas/WebGL）。
> 生成过程必须严格复用已克隆的模板目录与配置，不得另起脚手架，也不得生成 Java/后端/重型框架。

## 目标与范围
- 目标：为学校课堂快速生成“动态教学动效”网页，支持 2D/3D 场景、基础交互与动画，便于演示概念、过程或模型。
- 范围：纯前端静态页面（无需后端），包含场景构建（SVG/Canvas/Three.js）、动画时间轴、交互控制、批注/高亮、导出截图与打印。

## 技术与约束（请遵守）
- 技术栈（前端、纯静态）：`HTML + CSS + JavaScript (+ jQuery 可选)`。
- 渲染引擎（任选其一或组合）：
  - `SVG`（原生或轻量库，如 Snap.svg）
  - `Canvas 2D`（原生或轻量库，如 p5.js）
  - `WebGL (Three.js)`（通过 CDN 引入，适用于 3D 场景）
- 禁止项：
  - 不生成 Java 代码、不生成任何后端服务（Node/Express/Java/Spring 等）。
  - 不引入重型前端框架（React/Vue/Angular 等）与打包器（Webpack/Vite 等）。
  - 不生成复杂工程结构，只保留极简的 `index.html`、`style.css`、`app.js` 与 `data/`、`assets/`。
- 可选：提供一个极简本地预览方式（如 `http-server` 运行指引文本）。

## 变量清单（请先替换）
- `{{PROJECT_NAME}}`：项目名，例如 `classroom-dynamic-viz`
- `{{TEMPLATE_REPO_URL}}`：模板仓库地址，例如 `https://github.com/your-org/spec-templates-design-patterns.git`
- `{{render_engine}}`：渲染引擎，`svg | canvas | webgl-three`（可单选或多选）
- `{{subjects}}`：教学学科场景，例如 `数学, 物理, 生物, 地理`
- `{{data_source}}`（可选）：数据源，示例 `data/example.json` 或内联数据
- `{{modules}}`：功能模块，示例：`timeline, controls, annotations, zoom_pan, sprites, 3d_models`
- `{{interactions}}`：交互集合，示例：`play_pause, hover_highlight, drag_rotate, zoom_pan, speed_control, reset_view`
- `{{theme}}`：主题，示例：`浅色主题，主色 #3B82F6，高对比度可选`

## 用户输入字段与映射规则（通用生成工具可解析）
- 用户输入字段建议：
  - `page_title`：页面标题（控制面板与场景区标题用）。
  - `subject`：教学主题（用于文案与讲解步骤，不限定具体主题）。
  - `render_engine`：`svg | canvas | webgl-three`（可多选，决定场景搭建方式）。
  - `assets_path`：资源路径（如 `assets/`），包含 `sprites/`、`textures/`、`models/` 等子目录。
  - `dataset_path` 或 `dataset_inline`（可选）：数据源路径或内联 JSON/CSV 文本（用于数据驱动动效）。
  - `modules[]`：功能模块（如 `timeline|controls|annotations|zoom_pan|sprites|3d_models`）。
  - `animations[]`：动画片段集合（如 `intro|loop|sequence1|pulse|orbit`）。
  - `interactions[]`：交互集合（如 `play_pause|hover_highlight|drag_rotate|zoom_pan|speed_control|reset_view|annotations`）。
  - `theme.primary_color`、`theme.contrast_mode`：主题主色与高对比度开关。
- 映射规则：
  - `render_engine` 决定场景容器：`<svg id="scene">` 或 `<canvas id="scene">` 或 `<div id="webgl-scene">`。
  - 若提供 `dataset_inline`，优先使用；否则从 `dataset_path` 加载（可选）。
  - `modules[]` 决定控件与逻辑可见性（未启用的模块隐藏或不初始化）。
  - `interactions[]` 控制事件绑定与操作提示；未启用的交互不呈现。
  - 当 `render_engine=webgl-three` 且提供模型/纹理路径时，加载并展示；否则回退为程序化几何体。
  - `theme` 影响基础样式与对比度模式；需提供切换开关。

## 生成模式选择（请在使用时明确其一）
- 方案一：使用默认值快速生成（适合演示/试用）
  - 默认输入建议：
    - `page_title`：`课堂动态演示`
    - `subject`：`教学主题`
    - `render_engine`：`svg`
    - `modules[]`：`["timeline","controls","annotations","zoom_pan"]`
    - `animations[]`：`["intro","loop"]`
    - `interactions[]`：`["play_pause","hover_highlight","zoom_pan","annotations","speed_control","reset_view"]`
    - `theme.primary_color`：`#3B82F6`
    - `theme.contrast_mode`：`false`
  - 执行：直接按上述默认值生成场景与脚本，并在文档中注明可替换项。
- 方案二：询问用户提供更多信息（适用于正式课堂场景）
  - 建议最小提问集合：
    - 你的教学主题是什么？（`subject`）
    - 你希望用哪种渲染方式？（`svg/canvas/webgl-three` 的 `render_engine`）
    - 是否需要加载资源或数据？提供路径或粘贴文本。（`assets_path`、`dataset_path/dataset_inline`）
    - 需要哪些模块与交互？（`modules[]`、`interactions[]`）
    - 是否启用高对比度模式？主题主色为何？（`theme.*`）
  - 执行：根据回答填充字段并生成页面；未回答项回退到默认值。

## 结构要求
- 文件与目录：
  - `index.html`：主页面（包含控制面板与场景区）。
  - `style.css`：基础样式（响应式、对比度切换、打印优化）。
  - `app.js`：核心逻辑（场景构建、动画时间轴、交互控制、导出截图、打印）。
  - `data/`（可选）：示例数据（JSON/CSV）。
  - `assets/`：静态资源（`sprites/`、`textures/`、`models/`、图标）。
- 页面布局：
  - 左侧或顶部“控制面板”（下拉、开关、滑条、进度/速度控制），右侧“场景区”。
  - 场景区根据引擎选择：`<svg>`/`<canvas>`/`<div id="webgl-scene">`。
  - 控制面板包含：引擎选择（可选）、动画播放/暂停、速度滑条、重置视图、注释按钮、高对比度开关。

## 功能与交互要求
- 场景与动画：
  - 构建基本图形/模型与图层（SVG/Canvas 或 Three.js Mesh）。
  - 提供进入/更新的过渡动画；实现时间轴控制与播放速率调整。
- 交互：
  - 播放/暂停（时间轴），步进前进/后退（可选）、重置视图。
  - 高亮：鼠标悬停高亮、点击锁定高亮，显示元素详情（tooltip/辅助文本）。
  - 视图操作：`zoom/pan`（SVG/Canvas），`drag/rotate`（Three.js 轨道控制）。
  - 批注：提供“批注模式”，在场景上添加文本标记（覆盖层即可）。
  - 主题：支持高对比度模式切换（提升可读性与可访问性）。

## 导出与打印
- 导出当前场景截图：
  - `SVG`：导出 `.svg` 文件（或转为 PNG）。
  - `Canvas`：导出 PNG（`toDataURL`）。
  - `Three.js`：通过 `renderer.domElement.toDataURL()` 导出 PNG。
- 打印：支持浏览器打印为 PDF（隐藏控制面板，仅保留标题与场景）。

## 教学友好性与可访问性
- 教学提示：在 `index.html` 提供“讲解步骤”区域，列出关键讲点（例如：结构、过程、变化、异常/边界）。
- 键盘操作：空格播放/暂停、左右箭头步进、`+/-` 调整速度、`r` 重置、`a` 切换批注模式。
- ARIA 与语义化：控制面板控件添加 `aria-label` 与语义标签；为关键动画/交互提供辅助文本。

## 验收标准
- 启动后（本地静态预览或直接双击 `index.html` 打开）：
  - 默认加载最小场景并渲染一个基础动画。
  - 切换/配置交互正常，动画平滑，视图操作可用。
  - 悬停/点击高亮、批注模式可用，主题切换可用。
  - 能导出截图为 PNG/SVG，打印为 PDF 布局合理。
- 技术约束符合：无 Java/后端/重型框架/打包器；仅 `HTML+CSS+JS(+jQuery)` 与所选渲染引擎（CDN）。
- 代码与结构简洁：仅 `index.html`、`style.css`、`app.js`、`data/`、`assets/`，注释清晰，函数职责单一。

## 克隆模板到项目目录（给人类的操作指引）
```bash
git clone {{TEMPLATE_REPO_URL}} .
```

## 生成工具执行顺序（建议）
1. 明确生成模式（方案一/方案二）。
2. 若为方案二，发起最小提问并收集用户输入；未提供的字段采用默认值。
3. 读取并替换本提示词变量与用户输入，打印替换结果（用于复核）。
4. 复用已克隆模板目录，按约束填充留白实现与脚本（仅静态资源与前端代码）。
5. 写入或补充 `README.md` 与 `SPEC.md`（包含教学指引、快捷键、导出方式）。
6. 输出生成结果清单与下一步指引（如何加载自有资源/数据、如何扩展动效）。

## 最终生成指令段（可复制粘贴）
请基于我已在当前目录克隆的模板仓库，严格复用目录结构与配置文件，生成一个适用于学校课堂的“动态教学动效”纯前端静态页面项目：

- 项目名：`{{PROJECT_NAME}}`
- 渲染引擎：`{{render_engine}}`（仅限 `svg | canvas | webgl-three`，CDN 引入）
- 学科场景：`{{subjects}}`
- 资源与数据（可选）：`{{data_source}}` 与 `assets/`（sprites/textures/models）
- 模块：`{{modules}}`（时间轴、控件、批注、缩放/平移、精灵、3D 模型等）
- 交互：`{{interactions}}`（播放/暂停、悬停高亮、拖拽旋转、缩放/平移、速度控制、重置视图、批注）
- 主题：`{{theme}}`（含高对比度模式切换）

要求：
- 不得生成 Java/后端服务，不得引入重型前端框架或打包器；仅使用 `HTML + CSS + JS (+ jQuery)` 与所选渲染引擎。
- 保持极简结构：`index.html`、`style.css`、`app.js`、`data/`（可选）、`assets/`。
- 实现：场景构建、动画时间轴、悬停/点击高亮、视图操作（缩放/平移/旋转）、批注模式、导出截图（SVG/PNG）、打印 PDF、键盘快捷键。
- 提供 `README.md` 与 `SPEC.md`，写明教学讲解步骤与资源/数据替换方法。

完成后请打印：
- 目录树（含关键文件）
- 操作指引：如何加载/替换资源与数据、如何控制动画、如何导出截图/打印
- 偏离点说明（如有）