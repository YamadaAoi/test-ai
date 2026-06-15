# AGENTS.md - 项目开发指南

## 快速开始

```bash
pnpm install          # 安装依赖
pnpm run dev          # 启动开发服务器 (http://localhost:5173)
pnpm run lint         # 代码检查 + 自动修复
pnpm run type-check    # TypeScript 类型检查
pnpm run build        # 生产构建 (先 type-check 再 vite build)
```

## 技术栈

- Vue 3.5+ / TypeScript 5.9+ / Vite 7.1+
- Element Plus (按需自动导入，`src/**/*.vue` 中无需手动导入)
- Pinia (setup store 语法)
- Vue Router 4 (懒加载)

## 目录结构约定

```
src/views/{page-name}/          # kebab-case，页面级
├── index.vue                   # 入口组件
├── doc/                        # 文档 (README.md, API.md)
└── modules/                    # 页面私有子组件
    ├── ComponentA.vue
    └── ComponentB.vue

src/components/{ComponentName}/ # PascalCase，公共组件
└── index.vue

src/api/{feature}/              # camelCase，接口定义
├── types.ts                    # 类型定义
└── index.ts                    # API 方法
```

**强制规则**：
- 页面弹窗/抽屉/复杂表单必须拆分为 `modules/` 下的独立组件
- 禁止在 `src/` 下创建独立样式文件，所有样式写在 `<style scoped lang="scss">`
- 使用 `@/` 别名引用 `src/` 下的模块，禁止 `../../`

## 代码规范

- Vue 组件顺序：`<script setup>` → `<template>` → `<style scoped>`
- 强制 `<script setup lang="ts">`，禁止 Options API
- 注释和 Git 提交信息**必须使用中文**
- 提交格式：`feat: 描述` / `fix: 描述` / `docs: 描述` 等
- **禁止自动提交**：AI 不得执行 `git add/commit/push`，除非用户明确要求

## 其他约定

- 路由懒加载：`component: () => import('@/views/xxx/index.vue')`
- 路由 `path` 和 `name` 必须唯一，以 `/` 开头
- API 请求复用 `src/utils/request.ts` 的 axios 实例
- 大屏图表使用 `BaseChart` 组件，禁止直接实例化 ECharts

## Sketch 工作流

使用 `.opencode/skills/sketch-workflow` 技能，流程：`sketch-init → sketch-pick → sketch-split → sketch-layout → sketch-draw`

**阶段职责边界**：
- `sketch-split`：只创建空白组件文件 + `.md` 描述文档，**不写代码**
- `sketch-layout`：配置路由 + 父组件的 `import` 和子容器 `div`
- `sketch-draw`：填充组件功能代码

**状态文件**：`sketch-cache/artboards/{page}-{artboard}.json`，记录当前阶段和组件状态

## 质量检查

修改代码后务必执行：
```bash
pnpm run lint && pnpm run type-check
```
