# 项目初始化配置 (Project Initialization)

> ️ **注意**：本文档由架构师 Agent 自动扫描生成，所有结论均基于项目现有配置文件与源码，严禁臆测。

## 1. 技术栈与依赖 (Tech Stack)

- **基础框架**: Vue 3.5.22
- **核心语言**: TypeScript 5.9.0
- **UI 组件库**: Element Plus 2.13.5
  - **导入方式**: 按需自动导入（使用 unplugin-vue-components 和 unplugin-auto-import）
- **状态管理**: Pinia 3.0.3（setup store 语法）
- **网络请求**: Axios 1.13.6
- **构建工具**: Vite 7.1.11

## 2. 代码风格与规范 (Code Style & Conventions)

### 格式化规则

- **缩进**: 2 个空格（tabWidth: 2）
- **引号**: 单引号（singleQuote: true）
- **分号**: 无分号（semi: false）
- **尾随逗号**: 无（trailingComma: 'none'）

### 编码规范

- **ESLint 规则集**: Vue 3 + TypeScript 推荐规则（@vue/eslint-config-typescript）
- **严格模式**: TypeScript 严格模式（通过 tsconfig.app.json 继承 @vue/tsconfig/tsconfig.dom.json）
- **组件命名**: 
  - 页面级组件：kebab-case（如 `user-management`）
  - 公共组件：PascalCase（如 `UserCard`）
- **组件编写范式**:
  - Vue 3 Composition API with `<script setup lang="ts">`
  - 强制使用 `<script setup>` 语法糖，禁止 Options API

## 3. 项目目录结构 (Project Structure)

| 模块类型 | 约定路径 | 命名规范 | 备注 |
| -------- | -------- | -------- | ---- |
| 公共组件 | `src/components/{ComponentName}/` | PascalCase 目录名 | 如 `src/components/UserAvatar/` |
| 入口页面 | `src/views/{page-name}/` | kebab-case 目录名 | 如 `src/views/user-management/` |
| 业务组件 | `src/views/{page-name}/modules/{componentName}.vue` | camelCase 文件名 | 如 `src/views/user-management/modules/UserForm.vue` |
| API 接口 | `src/api/{feature}/` | camelCase 目录名 | 如 `src/api/login/`，包含 `types.ts` 和 `index.ts` |
| 静态资源 | `src/assets/` | - | 图片、字体、全局样式等 |

## 4. 路由 (Routing)

- **路由配置方式**: 懒加载（动态导入）
- **路由文件位置**: `src/router/index.ts`

## 5. 样式方案(CSS)

- **CSS 解决方案**: Scoped CSS with SCSS（使用 sass-embedded）

## 6. 本地开发服务器 (Dev Server)

- **启动命令**: `pnpm run dev`（实际执行 `vite`）
- **构建工具**: Vite
- **构建工具版本**: 7.1.11
- **监听端口**: 5173（Vite 默认端口）
- **端口来源**: 默认推断（配置文件中未指定端口）

## 7. 质量工具与脚本 (Quality Tools & Scripts)

- **包管理器**: pnpm（根据 scripts 推断）
- **代码格式化命令**: `pnpm run format`（执行 `prettier --write src/`）
- **代码检查命令**: `pnpm run lint`（执行 `eslint . --fix --cache`）
- **类型检查命令**: `pnpm run type-check`（执行 `vue-tsc --build`）