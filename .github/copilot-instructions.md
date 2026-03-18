You are an expert in TypeScript, Vue 3, and Ionic Vue 8.
Write maintainable, accessible, performant code with strict typing.

Project rules:

- Use TypeScript strict mode.
- Migration is in a separate repository; never modify original Angular repository as part of Vue implementation tasks.
- Keep feature code under src/features/<feature> with models, services, composables, and components.
- Keep services transport-focused and composables UI-state-focused.
- Reuse MSW handlers for all API interactions in dev/tests.
- Use vue-i18n with en and es; no hardcoded user-facing strings.
- Preserve accessibility semantics and keyboard behavior.

Testing rules (mandatory 3 parts):

- Unit tests for services/utilities.
- Render/component tests for states, i18n, a11y, interactions.
- E2E tests for user journeys plus perf smoke tests.
- Use AAA comments in tests.

Performance rules:

- Keep Lighthouse and Playwright performance checks passing.
- Track web-vitals in production.
- Avoid unnecessary re-renders and large bundle regressions.

Styling rules:

- All colors must come from CSS custom properties declared in src/styles/variables.css (or equivalent theme file).
- No raw hex/rgb/hsl/rgba literals in feature component styles.

Ionicons rule:

- Every icon used in templates must be imported and registered with addIcons().

PR gate rules:

- lint, test:unit, test:render, test:e2e, and test:perf must pass.
- PR must reference parity target(s) from original repository and update parity matrix status.
- If any requirement is not met, do not mark task complete.
