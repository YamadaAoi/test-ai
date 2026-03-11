# test-ai - 测试纯 ai 编写简单前端工程能力

## 项目概况

- `vue3 SPA ts`项目
- 路由采用`vue-router`按需加载
- 状态管理采用`pinia`
- UI组件库采用`elemnt-plus`

## 工程结构

```
doc/
└── **/*.md                               # 项目基本约束
src/
└── api/                                  # 请求接口
└── assets/                               # 静态资源
└── components/                           # 复用组件
│   └── **/doc/                           # 组件功能描述
│       └── preview/*.(png|jpg)           # 组件预览图
└── hooks/                                # vue hooks
├── router/                               # 路由文件夹
│   └── index.ts                          # 路由入口文件
├── stores/                               # 状态管理文件夹
└── utils/                                # 公共方法
└── views/                                # 各路由页面
│   └── **/doc/                           # 菜单业务描述
│       └── preview/*.(png|jpg)           # 菜单预览图
├── App.vue                               # 根组件
├── main.ts                               # 入口
```
