# Agent Coding Guidelines

Guidelines for AI agents working in this Vue 3 + TypeScript project.

## Tech Stack

| Package      | Version                 |
| ------------ | ----------------------- |
| Vue          | ^3.5.22                 |
| Pinia        | ^3.0.3                  |
| Element Plus | ^2.13.5                 |
| Vite         | ^7.1.11                 |
| TypeScript   | ~5.9.0                  |
| Vitest       | ^3.2.4                  |
| Node         | ^20.19.0 \|\| >=22.12.0 |

## Commands

```bash
npm run dev          # Start dev server (auto-opens browser)
npm run preview      # Preview production build
npm run build        # Full build with type-check
npm run build-only   # Vite build only (no type-check)
npm run type-check   # vue-tsc type checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier format (src/ only)

# Testing
npm run test:unit                                  # Run all tests (watch mode)
npm run test:unit -- --run                          # Run once, no watch
npm run test:unit src/__tests__/App.spec.ts         # Single file
npm run test:unit -- --run -t "test name"           # Single test by name
```

Run `npm run lint` and `npm run type-check` before finishing any task.

## Project Structure

```
src/
├── api/           # API request functions + interfaces
├── components/    # Reusable Vue components
├── views/         # Page-level components (lazy loaded)
├── router/        # Vue Router config
├── stores/        # Pinia stores (setup syntax)
├── utils/         # Utilities (request, auth)
├── __tests__/     # Unit tests (*.spec.ts)
├── assets/        # Static assets
├── App.vue        # Root component
└── main.ts        # Entry point
mock/              # Mock API data (vite-plugin-mock)
```

## Code Style

### Formatting (Prettier + EditorConfig)

No semicolons, single quotes, no trailing commas, 2-space indent, 80 char line width, LF line endings. Arrow functions omit parens when single param.

### Imports

Use `@/` alias (maps to `src/`). Order: external → internal.

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'
```

**Auto-imports**: Element Plus components are auto-imported via `unplugin-auto-import`. Omit these imports in `.vue` files. Explicit imports required in `.ts` files.

### Naming

| Type       | Convention  | Example         |
| ---------- | ----------- | --------------- |
| Vue files  | PascalCase  | `LoginPage.vue` |
| TS files   | camelCase   | `loginReq.ts`   |
| Components | PascalCase  | `<LoginPage />` |
| Functions  | camelCase   | `login()`       |
| Variables  | camelCase   | `userName`      |
| Constants  | UPPER_SNAKE | `API_BASE_URL`  |
| Interfaces | PascalCase  | `LoginParams`   |
| Stores     | useXxxStore | `useUserStore`  |

### TypeScript

- Use `interface` for object shapes, `type` for unions/aliases
- Export interfaces alongside API functions in the same file
- Never use `any`; use `unknown` when uncertain
- Types auto-include `element-plus/global` (no manual import needed)

### Vue Components

Always use `<script setup lang="ts">`, `<style scoped>`. Order: template → script → style.

```vue
<template>
  <div class="login-page">{{ msg }}</div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
defineEmits<{ submit: [data: FormData] }>()
const msg = ref('Hello') // auto-imported
</script>

<style scoped lang="scss">
.login-page {
  color: #fff;
}
</style>
```

### Routing

Always lazy-load route components:

```typescript
{ path: '/login', component: () => import('@/views/login/LoginPage.vue') }
```

### API Requests

Use `request` from `@/utils/request`. Define interfaces in same file. Use try-catch.

```typescript
export async function login(params: LoginParams): Promise<boolean> {
  const result = await request<LoginResult>({
    url: '/login',
    method: 'post',
    data: params
  })
  if (result.code === 0 && result.data) return true
  throw new Error(result.msg || 'Login failed')
}
```

### Error Handling

Use `ElMessage` for user-facing errors. Catch with `instanceof Error`:

```typescript
try {
  await login(params)
} catch (error) {
  ElMessage.error(error instanceof Error ? error.message : 'Operation failed')
}
```

### Pinia Stores

Use setup store syntax (not options):

```typescript
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})
```

### SCSS

Use `lang="scss"` with scoped styles. Nest pseudo-classes and child selectors:

```scss
.input-group {
  border: 1px solid #5a5c5e;
  &:focus-within {
    border-color: #2979ff;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
```

### Testing

- Environment: `jsdom` (configured in `vitest.config.ts`)
- Tests: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component tests

## Mock Server

`vite-plugin-mock` is enabled in dev. Place mock files in `mock/` directory. Auto-enabled during `npm run dev`.

## Environment Variables

Prefix with `VITE_` to expose to client: `import.meta.env.VITE_API_BASE`
