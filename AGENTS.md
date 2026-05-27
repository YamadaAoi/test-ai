# Agent Coding Guidelines

Compact reference for OpenCode agents in this Vue 3 + TypeScript SPA (`vue-3.18.2-demo`).

## Tech Stack

| Package      | Version                 |
| ------------ | ----------------------- |
| Vue          | ^3.5.22                 |
| Pinia        | ^3.0.3                  |
| Element Plus | ^2.13.5                 |
| Vite         | ^7.1.11                 |
| TypeScript   | ~5.9.0                  |
| ECharts      | ^6.0.0                  |
| Vitest       | ^3.2.4                  |
| Node         | ^20.19.0 \|\| >=22.12.0 |

## Commands

```bash
npm run dev          # dev server (--open auto-browser)
npm run build        # type-check + Vite build in parallel (via npm-run-all2)
npm run preview      # preview production build
npm run type-check   # vue-tsc --build
npm run lint         # eslint . --fix --cache
npm run format       # prettier --write src/

npm run test:unit               # vitest watch
npm run test:unit -- --run       # single run
npm run test:unit src/__tests__/Foo.spec.ts
npm run test:unit -- --run -t "test name"
```

**Verification order before finishing:** `npm run lint` then `npm run type-check`.

## Project Structure

```
src/
├── api/{login,device}/  # API functions + types per feature
├── components/           # (empty — add shared components here)
├── views/                # (empty — add lazy-loaded page dirs here)
├── router/
├── stores/               # Pinia (setup syntax)
├── utils/                # request (axios) + auth (localStorage)
├── __tests__/
├── assets/               # Static images, global SCSS
├── App.vue
└── main.ts
mock/                     # vite-plugin-mock (dev only)
```

**Convention** (ref `.claude/rules/instructions.md`): View dirs use kebab-case with `index.vue` entry + `modules/` subfolder. API dirs should separate `types.ts` + `index.ts` (existing code uses single `XxxReq.ts` files).

## Conventions

### Formatting
No semicolons, single quotes, no trailing commas, 2-space indent, 80-char width, omit arrow parens when single param. LF enforced by `.gitattributes`. Prettier + EditorConfig at root.

### Imports
- `@/` alias maps to `src/`. Order: external → internal.
- Element Plus components auto-imported in `.vue` files only (unplugin-auto-import + unplugin-vue-components with `ElementPlusResolver`). Explicit imports required in `.ts`.
- `auto-imports.d.ts` and `components.d.ts` are generated — do not hand-edit.
- Element Plus icons globally registered in `main.ts` — use PascalCase in templates (e.g., `<Edit />`).

### Naming
| Type       | Convention  | Example         |
| ---------- | ----------- | --------------- |
| Vue files  | PascalCase  | `LoginPage.vue` |
| TS files   | camelCase   | `loginReq.ts`   |
| Components | PascalCase  | `<LoginPage />` |
| Stores     | useXxxStore | `useUserStore`  |

### TypeScript
- `interface` for objects, `type` for unions/aliases
- Avoid `any` (note: `src/utils/request.ts` has an eslint-disable for practical reasons)
- `tsconfig.app.json` includes `"types": ["element-plus/global"]` — types auto-available

### Vue Components
`<script setup lang="ts">` + `<style scoped lang="scss">`. Order: script → template → style.

Explicitly import `ref`, `reactive`, etc. Do **not** import `defineProps` / `defineEmits` (compiler macros).

### Lazy-load all routes
```ts
component: () => import('@/views/login/LoginPage.vue')
```

### API & State
- Use `request` from `@/utils/request` (axios). Auto-injects `Authorization: Bearer <token>` header. `baseURL` from `VITE_API_BASE` (`/api`).
- API response shape: `{ code: number, data?: T, msg?: string }`. Check `result.code === 0`.
- Catch with `instanceof Error`, show user-facing errors via `ElMessage.error()`.
- Pinia: setup store syntax (`defineStore('name', () => { ... })`).
- Auth: localStorage via `@/utils/auth` (`saveAuth`, `getAuth`, `removeAuth`).

### Mock Server
vite-plugin-mock enabled in dev. Mock files in `mock/`. Mock `url` must match the full path including the `/api` prefix (e.g., `url: '/api/login'`).

### Testing
Environment: jsdom (vitest.config.ts). Tests: `src/__tests__/*.spec.ts`. Use `@vue/test-utils`.

## Additional Sources
- `.claude/rules/instructions.md` — "Project Constitution" (always loaded, read first)
- `.claude/rules/` — per-subject rules (always loaded by trigger)
- `.claude/skills/` — sketch-init/split/draw, pinia, vue skills
- `opencode.json` — loads `docs/**/*.md` instructions (dir may be empty), webfetch allowed
- `.vscode/extensions.json` — recommends Volar, Vitest Explorer, ESLint, EditorConfig, Prettier

No CI/CD, husky, or pre-commit hooks.
