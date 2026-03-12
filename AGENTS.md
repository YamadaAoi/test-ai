# AGENTS.md - Agent Coding Guidelines

## Project Overview

Vue 3 + TypeScript project using Element Plus, Pinia, Vue Router, Vite, and Vitest.
This is a frontend application with auto-import support for Element Plus components.

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
- **Print width**: 100 characters (max_line_length)
- **Tab width**: 2 spaces
- **Use tabs**: No (spaces)
- **End of line**: LF
- **Charset**: UTF-8
- **Trim trailing whitespace**: Yes
- **Insert final newline**: Yes

### Editor Config (.editorconfig)

- Indentation: 2 spaces
- Line endings: LF
- Charset: UTF-8
- Trim trailing whitespace: Yes
- Insert final newline: Yes
- Max line length: 100

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
- Vue files should have single root element in template

### Element Plus

- Use Element Plus components to avoid reinventing wheels
- Components are auto-imported via unplugin-vue-components
- Icons are available via `@element-plus/icons-vue`
- Component docs: `https://cn.element-plus.org/zh-CN/component/${component}`
- Component overview: `https://cn.element-plus.org/zh-CN/component/overview`

### Import Conventions

- Use `@/` alias for imports from `src/` directory
- Order: Vue imports → Third-party → Internal modules
- Sort imports alphabetically within each group
- Use absolute imports with `@/` for internal code
- Import types separately: `import type { SomeType } from '...'`

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.vue`)
- **Files**: kebab-case (e.g., `auth-helper.ts`)
- **Functions**: camelCase (e.g., `getAuthToken()`)
- **Classes/Types**: PascalCase (e.g., `UserInfo`)
- **Constants**: SCREAMING_SNAKE_CASE for config constants
- **Stores**: Prefix with `use` (e.g., `useCounterStore`)

## Layout Guidelines

- Design: 1920×1080 pixels
- Basic responsive capability using flex and percentages
- Avoid absolute positioning when possible
- Don't require 100% design fidelity, but ensure all elements are present
- Missing background images are acceptable
- Use Element Plus icons for small icons

## Project Structure

```
src/
├── __tests__/          # Unit tests (*.spec.ts)
├── router/             # Vue Router config
├── stores/             # Pinia stores (composition API style)
├── views/              # Page components
├── utils/              # Utility functions (request, auth, etc.)
├── App.vue             # Root component
└── main.ts             # Entry point
```

## State Management (Pinia)

Use composition API style stores:

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

## API / HTTP Conventions

- Use the centralized `request` utility in `src/utils/request.ts`
- It wraps axios with interceptors for auth tokens
- Define types for request and response parameters
- Handle errors with try/catch in async functions
- Check response status and handle 401 (unauthorized) appropriately

```typescript
try {
  const result = await request({ url: '/api/endpoint', method: 'get' })
} catch (error) {
  console.error('API Error:', error)
}
```

## Error Handling

- Use proper error types instead of generic `Error`
- Handle async operations with try/catch
- Log errors appropriately for debugging
- Use Promise.reject() for error propagation in interceptors

## Testing

- Framework: Vitest with jsdom environment
- Test files: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component mounting

```typescript
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('You did it!')
  })
})
```

## Environment Variables

- Use `import.meta.env` for environment variables
- Prefix variables with `VITE_` for client-side access
- Examples: `import.meta.env.VITE_API_BASE`

## Configuration Files

- `vite.config.ts` - Vite configuration
- `vitest.config.ts` - Vitest configuration
- `tsconfig.app.json` - TypeScript config for app
- `tsconfig.vitest.json` - TypeScript config for tests
- `eslint.config.ts` - ESLint configuration
- `.prettierrc.cjs` - Prettier configuration

## VS Code Settings (for reference)

- Format on save enabled
- Prettier as default formatter
- File nesting enabled for config files

## ESLint Exclusions

The following directories are ignored by ESLint:

- `**/dist/**`
- `**/dist-ssr/**`
- `**/coverage/**`

## CSS / Styling

- Use `<style scoped>` for component-scoped styles
- SCSS is supported
- Follow BEM-like naming for CSS classes when needed

## Git Conventions

- Write clear, concise commit messages
- Use present tense: "add feature" not "added feature"
- Reference issue numbers in commit messages when applicable

## OpenCode Configuration

- Instructions from `docs/**/*.md` are used
- Watcher ignores: `node_modules/**`, `dist/**`, `.git/**`
- Webfetch is allowed
