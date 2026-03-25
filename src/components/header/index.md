# 主页右侧顶部header组件

## 入口

- `src\components\header\CommonHeader.vue`

## 设计图

- 禁止直接解压zip文件，使用`mcp-sketch_sketch_html_analyze`工具分析设计稿，参数如下：
- - file_path: `src\sketch\电磁信号保密监测器html.zip`
- - page_name: `新`
- - artboard_name: `设备管理-设备状态`
- - rect: `[240, 0, 1680, 64]`
- - assets_path: `src\assets\components\header`
- 结合`mcp-sketch_sketch_html_analyze`返回的json和预览图片，只关注页面右侧顶部的header
- 灵活运用百分比和flex进行组件布局（慎用绝对定位），输出高质量自适应组件，保证90%组件还原度
- 罗列出左侧的导航栏所有用到的图片，优先使用css背景图片，减少使用img标签和直接导入图片

## 功能

- 在组件左侧展示当前路由菜单名称面包屑，如`主页 / 设备管理`，监听`vue-router`当前路由路径，实时更新面包屑
- 在组件右侧展示一排功能按钮图标和当前登录用户名
