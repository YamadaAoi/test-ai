# 主页左侧导航栏组件

## 入口

- `src\components\navBar\NavBar.vue`

## 设计图

- 禁止直接读取zip文件，使用`npx mcp-sketch analyze -h`查看工具参数，并调用工具分析设计稿，参数如下：
  - file_path: `src\sketch\电磁信号保密监测器html.zip`
  - page_name: `新`
  - artboard_name: `设备管理-设备状态`
  - rect: `[0, 0, 240, 1276]`
  - assets_path: `src\assets\components\navBar`
- 结合`mcp-sketch analyze`返回的json和预览图片，只关注页面左侧的导航栏
- 灵活运用百分比和flex进行组件布局（慎用绝对定位），输出高质量自适应组件，保证90%组件还原度
- 罗列出左侧的导航栏所有用到的图片，优先使用css背景图片，减少使用img标签和直接导入图片

## 功能

- 作为公共组件，接受`vue-router`的`RouteRecordRaw[]`类型的导航栏`props`数据，渲染出对应的导航栏
- 数据格式如下：

```json
[
  {
    "path": "/portal/device",
    "name": "Device",
    "meta": {
      "label": "设备管理",
      "icon": "device.png"
    }
  }
]
```
- - 需要特别处理`meta`中的`icon`字段，在`src\router\index.ts`定义路由配置时，需要`import`对应的图片而不是直接使用字符串路径
- 点击导航栏项，跳转至对应的页面
- 监听`vue-router`当前路由路径，高亮显示对应的导航栏项
