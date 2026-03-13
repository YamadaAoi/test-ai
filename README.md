# test-ai - 测试纯 ai 编写简单前端工程能力

## 项目概况

- `vue3 SPA ts`项目
- 路由采用`vue-router`按需加载
- 状态管理采用`pinia`
- UI组件库采用`elemnt-plus`

## 工程结构

```
src/
└── api/                                  # 请求接口
└── assets/                               # 静态资源
└── components/                           # 复用组件
│   └── **/doc/                           # 组件功能描述
│       └── sketch/*.json                 # sketch设计核心文件
│       └── sketch/assets/*.(png|jpg)     # 设计用图标、图片
└── hooks/                                # vue hooks
├── router/                               # 路由文件夹
│   └── index.ts                          # 路由入口文件
├── stores/                               # 状态管理文件夹
└── utils/                                # 公共方法
└── views/                                # 各路由页面
│   └── **/doc/                           # 菜单业务描述
│       └── sketch/*.json                 # sketch设计核心文件
│       └── sketch/assets/*.(png|jpg)     # 设计用图标、图片
├── App.vue                               # 根组件
├── main.ts                               # 入口
```
