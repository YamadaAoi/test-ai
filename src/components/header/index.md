# 公共头部组件

## 入口

- `src\components\header\Header.vue`

## 设计图

- 禁止直接解压zip文件，使用`mcp-sketch_sketch_html_analyze`工具分析设计稿，参数如下：
- - file_path: `src\sketch\电磁信号保密监测器html.zip`
- - page_name: `新`
- - artboard_name: `登录`
- - assets_path: `src\assets\components\header`
- 结合json数据和预览图片，灵活运用百分比和flex进行页面布局（绝对定位是无奈之举，能不用就不用！），输出高质量自适应布局页面，保证90%页面还原度
- 妥善处理json里的图片，优先使用css背景图片，减少使用img标签

## 功能

- 