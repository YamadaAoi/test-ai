# AGENTS.md - Agent Coding Guidelines

## Project Overview

Vue 3 + TypeScript project using Element Plus, Pinia, Vue Router, Vite, and Vitest.

## Build / Lint / Test Commands

```bash
pnpm dev              # Start Vite dev server
pnpm preview         # Preview production build
pnpm build           # Full build (type-check + build)
pnpm build-only     # Build only (skip type-check)
pnpm test:unit src/__tests__/App.spec.ts   # Run single test file
pnpm test:unit -- --run        # Run tests once (no watch mode)
pnpm test:unit                  # Run all tests (watch mode)
pnpm lint             # ESLint with auto-fix
pnpm type-check       # TypeScript type checking
pnpm format           # Prettier format (src/ only)
```

## Code Style

### Formatting (Prettier)

- No semicolons, single quotes, 80 char width, 2 spaces, no trailing commas

### TypeScript

- Avoid `any`, prefer `interface` over `type`, strict null checks
- Use readonly arrays/properties, define return types, use generics

### Vue

- Use `<script setup lang="ts">`, prefix props with `props.`
- Use `function` keyword (not arrow functions) in setup
- Single root element in template, break into smaller reusable parts

### Element Plus

- Manual import components for tree-shaking:

```typescript
import { ElButton } from 'element-plus'
```

- Docs: `https://cn.element-plus.org/zh-CN/component/${component}`
- Icons via `@element-plus/icons-vue` (globally registered)

### Imports

- Use `@/` alias for src/ imports
- Order: Vue → Third-party → Internal; sort alphabetically within groups
- Import types separately: `import type { SomeType } from '...'`

### Naming

- Components: PascalCase (`UserProfile.vue`)
- Files: kebab-case (`auth-helper.ts`)
- Functions: camelCase, Classes/Types: PascalCase
- Constants: SCREAMING_SNAKE_CASE, Stores: prefix with `use`

## Layout Guidelines

- Design: 1920×1080, basic responsive with flex and percentages
- Avoid absolute positioning; don't require 100% design fidelity
- Missing background images acceptable; use Element Plus icons

## Project Structure

```
src/
├── __tests__/          # Unit tests (*.spec.ts)
├── router/             # Vue Router config
├── stores/             # Pinia stores (composition API)
├── views/              # Page components
├── utils/              # request, auth utilities
├── App.vue
└── main.ts
```

## State Management (Pinia)

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

## API / HTTP

- Use `src/utils/request.ts` (axios with auth interceptors)
- Define types for request/response params
- Handle errors with try/catch, check 401 responses

## Error Handling

- Use proper error types, handle async with try/catch
- Log errors for debugging, use Promise.reject() in interceptors

## Testing

- Vitest with jsdom, test files: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component mounting

## Environment Variables

- Use `import.meta.env`, prefix with `VITE_` (e.g., `VITE_API_BASE`)

## CSS / Styling

- Use `<style scoped>`, SCSS supported
- Follow BEM-like naming for CSS classes when needed

## VS Code Settings (for reference)

- Format on save enabled, Prettier as default formatter
- File nesting enabled for config files

## ESLint Exclusions

- `**/dist/**`, `**/dist-ssr/**`, `**/coverage/**`

## Git Conventions

- Present tense commits ("add feature" not "added feature")
- Reference issue numbers when applicable
