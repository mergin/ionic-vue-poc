You are an expert in TypeScript, Vue 3, and Ionic Vue 8 application development.
Write functional, maintainable, performant, and accessible code aligned with this workspace’s conventions.

## Project Context

- Stack: Ionic Vue 8 + Vue 3 + TypeScript (strict) + Vite + Pinia + vue-i18n.
- App structure lives under `src/`.
- Keep domain interfaces/types in each feature’s local `models/` folder (`src/features/<feature>/models`).
- Unit tests run with Vitest.
- Linting uses ESLint + Prettier (`npm run lint`).
- Use absolute imports with aliases only:
  - `@/` for `src/`
- This project uses MSW for API mocking in development and tests.
- Mock API handlers live in `src/mocks/handlers` and should model real API contracts.
- Social media domain code lives in `src/features/social-media` with:
  - `models/` for interfaces/types
  - `services/` for API services
  - `composables/` for UI state
  - `components/` for UI
  - Barrel exports optional

## Internationalization (vue-i18n)

- Use `vue-i18n` for all localization.
- Keep i18n provider wiring in `src/core/i18n/index.ts` and app entry.
- Default and fallback language is English (`en`) unless explicitly requested otherwise.
- Translation files must live in `src/assets/i18n/`.
- Maintain at least these locales:
  - `src/assets/i18n/en.json`
  - `src/assets/i18n/es.json`
- Any new user-facing literal added to templates/components must be translated and added to both locale files.
- Prefer `t('key.path')` in templates over hardcoded strings.
- Use stable, domain-based key names (e.g., `social.loading`, `tabs.tab1`, `common.language`).
- In tests for components that use i18n, provide the i18n plugin.

## Deprecated Code and API Usage

- Do not use deprecated APIs, functions, classes, or patterns. Always prefer the latest recommended Vue, Ionic, and TypeScript APIs.
- Do not use any code, import, or pattern marked with `@deprecated` in JSDoc or official documentation.
- When updating or refactoring, always replace deprecated usage with the current recommended alternative.

## TypeScript Best Practices

- Use strict typing and prefer explicit domain types.
- Prefer type inference when obvious, but avoid ambiguous inferred types.
- Avoid `any`; use `unknown` when the type is uncertain.
- Prefer functional transformations (`map`, `filter`, `reduce`, `flatMap`) over explicit `for`/`while` loops.
- Keep functions small and pure when possible.
- Require explicit return types on all methods/functions except Vue lifecycle hooks.

## Vue 3 + Ionic 8 Best Practices

- Use the Composition API and `<script setup>`.
- Use Pinia for shared state only when needed.
- Use composables for UI state and logic.
- Keep component logic reactive-first: use `ref`, `computed`, and composables for state.
- For component HTTP data fetching, use composables that expose loading/error/data states.

## Template Guidelines

- Use correct semantic HTML structure (`header`, `main`, `section`, `nav`, `ul/li`, `button`) and only add ARIA when native semantics are insufficient.
- Keep template expressions simple; move non-trivial logic to TypeScript.
- Use `:class` and `:style` bindings.
- Use `<img :src=... alt=...>` for images; mark decorative images as `aria-hidden="true"`.
- Avoid arrow functions and complex inline transformations in templates.

## Accessibility (Ionic + Mobile Web)

- Treat accessibility as a default requirement for all UI changes.
- Never disable zoom in viewport settings.
- Every interactive control (buttons, links, toggles, icon-only actions) must have an accessible name (`aria-label` or visible text).
- Use `aria-live` regions for async loading/error states that need to be announced by screen readers.
- Use semantic structure and landmarks where practical; avoid using non-interactive elements as interactive controls.
- Keep visible focus indicators; do not remove outlines unless a clear accessible replacement is provided.
- Ensure non-decorative images have meaningful `alt` text; mark decorative visuals as `aria-hidden="true"`.
- For links opening new tabs/windows, provide accessible context.
- Prefer Ionic components and theme tokens in ways that preserve contrast and touch-target usability.

## Services

- Keep services single-responsibility and transport-focused.
- Prefer Promise-returning APIs for async data.
- Keep transport mapping and error handling inside services, not components.
- Keep API base URLs in a config file; do not hardcode API URLs in services.
- Add concise JSDoc for public service methods.
- Every service must live in its own file under the domain `services/` directory.

## MSW Mocking

- Keep the browser worker setup in `src/mocks/browser.ts` and initialize it from app/test bootstrap.
- Keep endpoint handlers grouped by domain in `src/mocks/handlers` and export them through `src/mocks/handlers/index.ts`.
- Ensure mocked endpoints cover all service methods for each domain API.

## Code Style — Prettier

- Follow `.prettierrc` strictly (2 spaces, single quotes, semicolons, trailing commas).
- Run `npm run format` for code under `src/**/*.{ts,vue,scss}`.

## Code Style — ESLint

- All generated code must pass `npm run lint`.
- Remove unused imports/variables immediately.
- For templates, follow ESLint rules and Vue best practices.
- Do not add formatting rules that conflict with Prettier.

## Styling — CSS/SCSS

- Prefer existing Ionic/theming tokens from `src/styles/variables.css`.
- Put cross-app styles in `src/styles/variables.css`; keep feature styles scoped to each component.
- Reuse Ionic utility classes and CSS variables before creating new custom rules.
- All colors must come from CSS custom properties declared in `src/styles/variables.css` (no raw hex/rgb/hsl/rgba literals in component styles).

## Unit Testing (AAA Required)

- Use Vitest for unit tests.
- Place specs next to implementation files (`*.spec.ts`).
- Every test must be structured with explicit comments:
  - `// ARRANGE`
  - `// ACT`
  - `// ASSERT`
  - `// CLEANUP` if needed
- Keep one behavioral assertion goal per test when practical.

## Render Testing

- Use Testing Library Vue + Vue Test Utils for render-focused tests under `tests/render/`.
- Render tests should validate real template output with lightweight setup.
- Focus on:
  - translated labels/keys,
  - component composition,
  - loading/error/empty states,
  - accessibility labels and visible content.
- Provide the i18n plugin in render tests.
- Keep AAA comments mandatory.

## E2E Testing (Playwright)

- E2E tests live in `tests/e2e-playwright/`, grouped by behavior/flow, not by component.
- Use Playwright for full-browser assertions that are hard to guarantee in render tests:
  - routing transitions,
  - overlays/popovers,
  - persisted UI preferences,
  - multi-component integration behavior.
- Keep E2E specs deterministic and concise, with one primary journey per test.
- Use resilient selectors (accessible names, stable attributes, semantic locators) over fragile CSS chains.

## Documentation

- Every method/function (public, protected, and private) must include JSDoc.
- Every interface and type alias declaration must include concise JSDoc.
- Every method/function JSDoc must include:
  - `@param` for each parameter.
  - `@returns` when the method/function returns a value.
- For component props and emits, include a brief comment describing purpose/behavior.
- Keep documentation concise and behavior-oriented.

## Ionicons Registration

- Every icon used in a template must be:
  1.  Imported from `ionicons/icons` in the component TypeScript file
  2.  Registered via `addIcons()` in the app or component setup
  3.  Referenced by name in templates, e.g. `<ion-icon :icon="chatbubbles" />`
- If an icon is used in a template but not registered, it will fail to render even if imported.
