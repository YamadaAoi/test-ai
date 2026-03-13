# Agent Coding Guidelines

This document provides guidelines for AI agents working in this Vue 3 + TypeScript project.

## Project Overview

- **Framework**: Vue 3.5.22 with Composition API
- **State Management**: Pinia 3.0.3
- **UI Library**: Element Plus 2.13.5
- **Build Tool**: Vite 7.1.11
- **Language**: TypeScript ~5.9.0
- **Node Version**: ^20.19.0 || >=22.12.0

## Commands

```bash
npm run dev          # Start dev server
npm run preview      # Preview production build
npm run build        # Full build with type-check
npm run build-only   # Vite build only
npm run type-check   # vue-tsc type checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier format (src/ only)
npm run test:unit                       # Run all unit tests
npm run test:unit -- --run               # Run tests once (non-watch)
npm run test:unit src/__tests__/App.spec.ts  # Run single test file
npm run test:unit -- --run -t "test name"     # Run single test by name
```

## Code Style

### General Rules

- Use **TypeScript** for all files; avoid `any` when possible
- Use **ESLint + Prettier** for formatting; run `npm run lint` before committing
- Use **Composition API** with `<script setup>` for Vue components

### File Organization

```
src/
├── api/           # API request functions
├── components/    # Reusable Vue components
├── views/         # Page components
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── utils/         # Utility functions
├── __tests__/     # Unit tests
└── assets/        # Static assets
```

### Imports

Use **path aliases**: `@/` maps to `src/`. Order: external libraries → internal modules.

```typescript
import { ref, computed } from 'vue' // External
import { defineStore } from 'pinia' // External
import request from '@/utils/request' // Internal
import { useUserStore } from '@/stores/user' // Internal
```

### Naming Conventions

| Type        | Convention  | Example         |
| ----------- | ----------- | --------------- |
| Files (Vue) | PascalCase  | `LoginPage.vue` |
| Files (TS)  | camelCase   | `loginReq.ts`   |
| Components  | PascalCase  | `LoginPage`     |
| Functions   | camelCase   | `login()`       |
| Variables   | camelCase   | `userName`      |
| Constants   | UPPER_SNAKE | `API_BASE_URL`  |
| Interfaces  | PascalCase  | `LoginParams`   |
| Stores      | useXxxStore | `useUserStore`  |

### TypeScript Guidelines

- Use `interface` for object shapes, `type` for unions/aliases
- Export interfaces alongside API functions
- Avoid `any`; use `unknown` when uncertain

### Vue Component Patterns

Use `<script setup lang="ts">` with Composition API:

```vue
<template>
  <div class="name">{{ msg }}</div>
</template>
<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ change: [value: string] }>()
const msg = ref('Hello')
</script>
<style scoped>
.name {
  color: red;
}
</style>
```

### Routing

Use **lazy loading** for all route components:

```typescript
component: () => import('../views/login/LoginPage.vue')
```

### API/Request Patterns

Use the shared `request` instance from `@/utils/request`. Define interfaces in the same file. Handle errors with try-catch and throw meaningful errors.

```typescript
interface LoginParams {
  userName: string
  password: string
}
interface LoginResult {
  code: number
  data?: { token: string }
  msg?: string
}
export async function login(params: LoginParams): Promise<boolean> {
  const result = await request<LoginResult>({
    url: '/login',
    method: 'post',
    data: params
  })
  if (result.code === 0 && result.data) {
    saveAuth(result.data.token)
    return true
  }
  throw new Error(result.msg || 'Login failed')
}
```

### Error Handling

- Use try-catch for async operations
- Throw descriptive errors with messages
- Handle HTTP errors in axios interceptors (see `src/utils/request.ts`)

### Pinia Stores

Use the setup store syntax:

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})
```

### Testing

- Place tests in `src/__tests__/` or co-located with `*.spec.ts`
- Use `@vue/test-utils` for component testing
- Use `vitest` as the test runner

### CSS/Sass

- Use `<style scoped>` for component-specific styles
- Use SCSS syntax (project has `sass-embedded`)

### Additional Notes

- Element Plus icons available via `@element-plus/icons-vue`
- Environment variables use `VITE_` prefix (e.g., `import.meta.env.VITE_API_BASE`)
- Auto-imports configured for Vue, Pinia, and Element Plus components
