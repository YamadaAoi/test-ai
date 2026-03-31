# 主页入口组件

## 入口

- `src\views\portal\PortalPage.vue`

## 设计图

- 禁止直接读取zip文件，使用`npx mcp-sketch analyze -h`查看工具参数，并调用工具分析设计稿，参数如下：
  - file_path: `src\sketch\电磁信号保密监测器html.zip`
  - page_name: `新`
  - artboard_name: `设备管理-设备状态`
  - assets_path: `src\assets\components\navBar`
- 结合`mcp-sketch analyze`返回的json和预览图片
- 灵活运用百分比和flex进行组件布局（慎用绝对定位），输出高质量自适应组件，保证90%组件还原度
- 左侧导航栏组件和右侧顶部header在`src\components\navBar\NavBar.vue`和`src\components\header\CommonHeader.vue`目录下实现
- 右侧下部内容区域为动态路由展示区`<router-view />`，根据当前路由路径展示对应的组件

## 功能

- 作为主页入口组件，复用左侧导航栏和右侧顶部header，根据当前路由路径展示对应的组件
