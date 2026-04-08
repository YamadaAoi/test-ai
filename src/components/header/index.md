# 主页右侧顶部header组件

## 入口

- `src\components\header\CommonHeader.vue`

## 设计图

- 分析设计稿`src\sketch\电磁信号保密监测器html.zip`里的`新`-`设备管理-设备状态`画板头部`[240,0,1680,64]`，切图存到`src\assets\components\header`

## 功能

- 在组件左侧展示当前路由菜单名称面包屑，如`主页 / 设备管理`，监听`vue-router`当前路由路径，实时更新面包屑
- 在组件右侧展示一排功能按钮图标和当前登录用户名
