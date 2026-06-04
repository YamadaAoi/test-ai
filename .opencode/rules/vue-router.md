---
name: Vue Router最佳实践
trigger: always_on
---

# Vue Router Rules

- 所有页面组件需要按需导入！！！例如：`component: () => import('../views/login/LoginPage.vue')`
- 路由配置的`path`需要唯一，不能重复！！！例如：`path: '/login'`，并且以绝对路径开头，例如`path: '/portal/user'`
- 路由配置的`name`需要唯一，不能重复！！！例如：`name: 'Login'`
