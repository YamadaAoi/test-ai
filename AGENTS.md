# AGENTS.md - Agent Coding Guidelines

## Project Overview

This is a Vue 3 + TypeScript project using Element Plus, Pinia, and Vue Router.

## Build / Lint / Test Commands

```bash
# Development
pnpm dev              # Start Vite dev server
pnpm preview         # Preview production build

# Build
pnpm build           # Full build (type-check + build)
pnpm build-only      # Build only (skip type-check)

# Testing
pnpm test:unit                  # Run all unit tests
pnpm test:unit -- src/__tests__/App.spec.ts   # Run single test file
pnpm test:unit -- --run        # Run tests once (no watch mode)

# Linting & Type Checking
pnpm lint             # ESLint with auto-fix
pnpm type-check       # TypeScript type checking
pnpm format           # Prettier format (src/ only)
```

## Code Style Guidelines

### Formatting (Prettier)

- **Semicolons**: No
- **Quotes**: Single quotes
- **Print width**: 100 characters
- **Trailing commas**: Enabled

### Editor Config

- **Indentation**: 2 spaces
- **Line endings**: LF
- **Charset**: UTF-8
- **Trim trailing whitespace**: Yes
- **Insert final newline**: Yes

### TypeScript Rules

- Avoid `any` - use proper types
- Prefer `interface` over `type` for type definitions
- Enable strict null checks
- Use readonly arrays and properties when possible

### Vue Rules

- Use `<script setup lang="ts">` syntax
- Prefix props variables with `props.` in template
- Use `function` keyword for setup functions
- Break down components into smaller, reusable parts
- Manual import Element Plus components (not auto-import)

### Element Plus

- Use Element Plus components to avoid reinventing wheels
- Manually import components for tree-shaking:

```typescript
import { ElButton, ElInput } from 'element-plus'
```

- Component docs: `https://cn.element-plus.org/zh-CN/component/${component}`

### Import Conventions

- Use `@/` alias for imports from `src/` directory
- Order: Vue imports → Third-party → Internal modules

### Error Handling

- Use proper error types instead of generic `Error`
- Handle async operations with try/catch
- Log errors appropriately for debugging

## Project Structure

```
src/
├── __tests__/          # Unit tests (*.spec.ts)
├── router/             # Vue Router config
├── stores/             # Pinia stores
├── App.vue             # Root component
└── main.ts             # Entry point
```

## Testing

- Framework: Vitest with jsdom environment
- Test files: `src/__tests__/*.spec.ts`
- Use `@vue/test-utils` for component mounting

## Configuration Files

- `vite.config.ts` - Vite configuration
- `vitest.config.ts` - Vitest configuration
- `tsconfig.app.json` - TypeScript config
- `eslint.config.ts` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
