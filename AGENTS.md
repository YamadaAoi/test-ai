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
├── utils/         # Utilities (request, auth, etc.)
├── __tests__/     # Unit tests (*.spec.ts)
├── assets/        # Static assets (images, fonts)
├── App.vue        # Root component
└── main.ts        # Entry point
mock/              # Mock API data (vite-plugin-mock)
```

## Code Style

### Formatting (Prettier)

No semicolons, single quotes, no trailing commas, 2-space indent, 80 char line width.

```typescript
// ✅ Correct
const name = 'test'
import request from '@/utils/request'

// ❌ Wrong
const name = "test";
import request from "@/utils/request",
```

### Imports

Use `@/` alias (maps to `src/`). Order: external → internal.

```typescript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'
```

**Auto-imports**: Vue APIs (`ref`, `computed`), Pinia, and Element Plus components are auto-imported via `unplugin-auto-import`. You can omit these imports in components.

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
- Export interfaces alongside API functions
- Never use `any`; use `unknown` when uncertain
- Types auto-include `element-plus/global`

### Vue Components

Always use `<script setup lang="ts">`:

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
{
  path: '/login',
  component: () => import('@/views/login/LoginPage.vue')
}
```

### API Requests

Use `request` from `@/utils/request`. Define interfaces in same file. Use try-catch.

```typescript
interface LoginParams {
  userName: string
  password: string
}

export async function login(params: LoginParams): Promise<string> {
  const result = await request.post<ApiResponse>('/login', params)
  if (result.code === 0) return result.data.token
  throw new Error(result.msg || 'Login failed')
}
```

### Pinia Stores

Use setup store syntax (not options):

```typescript
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isLoggedIn = computed(() => !!token.value)
  function setToken(t: string) {
    token.value = t
  }
  return { token, isLoggedIn, setToken }
})
```

### Testing

- Environment: `jsdom` (configured in `vitest.config.ts`)
- Tests: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component tests
- Run single test: `npm run test:unit -- --run -t "test name"`

### CSS/SCSS

- Use `<style scoped>` always
- SCSS syntax available (`sass-embedded` installed)
- Element Plus icons: `import { User } from '@element-plus/icons-vue'`

## Mock Server

`vite-plugin-mock` is enabled in dev. Place mock files in `mock/` directory at project root. Auto-enabled during `npm run dev`.

## Environment Variables

Prefix with `VITE_` to expose to client:

```typescript
const base = import.meta.env.VITE_API_BASE
```
