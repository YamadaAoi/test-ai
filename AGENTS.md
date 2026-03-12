# AGENTS.md - Agent Coding Guidelines

## Project Overview

Vue 3 + TypeScript project using Element Plus, Pinia, Vue Router, Vite, and Vitest.
Components are auto-imported via unplugin-vue-components.

## Build / Lint / Test Commands

```bash
# Development
pnpm dev              # Start Vite dev server
pnpm preview         # Preview production build

# Build
pnpm build           # Full build (type-check + build)
pnpm build-only     # Build only (skip type-check)

# Testing
pnpm test:unit                  # Run all unit tests (watch mode)
pnpm test:unit src/__tests__/App.spec.ts   # Run single test file
pnpm test:unit -- --run        # Run tests once (no watch mode)

# Linting & Type Checking
pnpm lint             # ESLint with auto-fix
pnpm type-check       # TypeScript type checking
pnpm format           # Prettier format (src/ only)
```

## Code Style Guidelines

### Formatting (Prettier + EditorConfig)

- **Semicolons**: No
- **Quotes**: Single quotes
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **End of line**: LF
- **Charset**: UTF-8
- **Trim trailing whitespace**: Yes
- **Insert final newline**: Yes

### TypeScript Rules

- Avoid `any` - use proper types
- Prefer `interface` over `type` for object type definitions
- Enable strict null checks
- Use readonly arrays and properties when possible
- Define proper return types for functions
- Use generic types for reusable components

### Vue Rules

- Use `<script setup lang="ts">` syntax
- Prefix props variables with `props.` in template
- Use `function` keyword for setup functions (not arrow functions)
- Break down components into smaller, reusable parts
- Single root element in template

### Element Plus

- Use Element Plus components to avoid reinventing wheels
- Components are auto-imported
- Icons via `@element-plus/icons-vue` (globally registered)
- Docs: `https://cn.element-plus.org/zh-CN/component/${component}`

### Import Conventions

- Use `@/` alias for imports from `src/` directory
- Order: Vue imports → Third-party → Internal modules
- Sort imports alphabetically within each group
- Use absolute imports with `@/` for internal code
- Import types separately: `import type { SomeType } from '...'`

### Naming Conventions

- **Components**: PascalCase (`UserProfile.vue`)
- **Files**: kebab-case (`auth-helper.ts`)
- **Functions**: camelCase (`getAuthToken()`)
- **Classes/Types**: PascalCase (`UserInfo`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Stores**: Prefix with `use` (`useCounterStore`)

## Layout Guidelines

- Design: 1920×1080 pixels
- Basic responsive with flex and percentages
- Avoid absolute positioning when possible
- Don't require 100% design fidelity, but ensure all elements present
- Use Element Plus icons

## Project Structure

```
src/
├── __tests__/          # Unit tests (*.spec.ts)
├── api/               # API request functions
├── router/            # Vue Router config
├── stores/            # Pinia stores (composition API)
├── views/             # Page components
├── utils/             # Utilities (request, auth)
├── App.vue
└── main.ts
```

## State Management (Pinia)

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

## API / HTTP

- Use `src/utils/request.ts` (axios with auth interceptors)
- Define types for request and response parameters
- Handle errors with try/catch, check 401 responses

## Error Handling

- Use proper error types instead of generic `Error`
- Handle async operations with try/catch
- Log errors appropriately for debugging

## Testing

- Framework: Vitest with jsdom environment
- Test files: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component mounting

## Environment Variables

- Use `import.meta.env` for environment variables
- Prefix with `VITE_` for client-side access

## CSS / Styling

- Use `<style scoped>` for component-scoped styles
- SCSS is supported
- Follow BEM-like naming for CSS classes when needed

## OpenCode Configuration

- Instructions from `docs/**/*.md` are used
- Watcher ignores: `node_modules/**`, `dist/**`, `.git/**`

## Git Conventions

- Write clear, concise commit messages
- Use present tense: "add feature" not "added feature"
- Reference issue numbers when applicable
