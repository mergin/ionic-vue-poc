# Ionic/Vue Full Migration Playbook (Copilot-Enforced)

This document defines a complete migration plan from Ionic/Angular to Ionic/Vue for this PoC, plus a strict rule set that Copilot must follow in all future development.

## 1. Purpose and Non-Negotiables

Migration objective:

- Move the application from Ionic Angular to Ionic Vue while preserving functional behavior, accessibility, internationalization, and developer quality standards.
- Execute migration in a separate repository, preserving this original repository as immutable baseline/reference.

PoC priorities (must all be enforced):

- Best practices in architecture and coding standards.
- High-quality documentation for code and workflows.
- Performance instrumentation and budgets.
- Full testing in 3 parts:
  - Part A: Unit tests.
  - Part B: Render/Component integration tests.
  - Part C: E2E and performance tests.

Definition of Done:

- Functional parity for all tabs/features.
- Accessibility parity (labels, landmarks, keyboard support, live regions).
- i18n parity for English and Spanish.
- Lint and format pass.
- All 3 test parts pass.
- Performance checks pass configured thresholds.

## 2. Target Stack (Ionic Vue)

Use this stack unless explicitly approved otherwise:

- Ionic Vue 8.
- Vue 3 + TypeScript (strict mode).
- Vite build tooling.
- Vue Router.
- Pinia for shared app state only when needed.
- vue-i18n for localization.
- MSW for API mocking in development and tests.
- Vitest + Vue Test Utils + Testing Library Vue.
- Playwright for E2E.
- Lighthouse CI + web-vitals for performance.

## 3. Proposed Repository Layout

Create a dedicated migration repository (recommended name: `ionic-vue-poc`):

```text
ionic-vue-poc/
  src/
    app/
    features/
      social-media/
        components/
        models/
        services/
        composables/
      image-gallery/
        components/
        models/
        services/
        composables/
      weather/
        components/
        models/
        services/
        composables/
    core/
      api/
      error/
      i18n/
      performance/
    router/
    styles/
    assets/i18n/
  tests/
    unit/
    render/
    e2e/
    performance/
  .github/
    copilot-instructions.md
```

Notes:

- Keep original Angular repository untouched during migration.
- Treat original repository as source-of-truth for behavior and parity checks.
- Port one feature at a time in the new repository.

Source sync policy between repositories:

- Allowed from original repo to new Vue repo: API contracts, i18n keys, MSW handlers/contracts, design tokens, test scenarios.
- Not allowed: direct code copy that preserves Angular framework constructs without adaptation.
- Track parity with a migration matrix in the new repo (`docs/parity-matrix.md`).

## 4. Migration Strategy (Phased)

### Phase 0: Baseline and Guardrails

- Freeze current Angular behavior with snapshots of:
  - route list,
  - i18n keys,
  - API contracts,
  - E2E user journeys,
  - Lighthouse baseline reports.
- Create migration tracking checklist per feature.

### Phase 1: Scaffold Ionic Vue App

- Create new repository `ionic-vue-poc` and scaffold Ionic Vue at repository root.
- Configure TypeScript strict mode.
- Add lint/format tooling.
- Add path aliases.
- Add CI scripts for lint, tests, perf.
- Add repository metadata and docs: `README.md`, migration goals, parity matrix, contribution rules.

### Phase 2: Shared Foundations

- Port theme variables and design tokens.
- Port i18n files (`en`, `es`) and initialize vue-i18n.
- Integrate MSW with handlers reused from current mocks.
- Add global error handling and API client module.

### Phase 3: Tabs Shell and Navigation

- Implement app shell, header, and tabs.
- Register all Ionicons used by tab/header controls.
- Preserve semantics and accessible labels.

### Phase 4: Feature-by-Feature Port

- Recommended order:
  1. Weather
  2. Image Gallery
  3. Social Media
- For each feature:
  - port models,
  - port service layer,
  - port UI components,
  - port tests (3 parts),
  - run accessibility validation.

### Phase 5: Performance and Hardening

- Add Lighthouse CI local profile and CI strict profile.
- Add web-vitals collection in production.
- Add Playwright perf smoke tests for key tab flows.
- Tune budgets and remove avoidable regressions.

### Phase 6: Cutover

- Verify parity matrix complete.
- Promote `ionic-vue-poc` as production candidate repository.
- Keep Angular repository available as stable fallback/reference until stabilization window ends.

## 5. Feature Mapping Guide (Angular -> Vue)

Mapping principles:

- Angular services -> typed service modules + composables.
- Signals/rxResource state -> `ref`, `computed`, and composables with explicit loading/error/data states.
- Standalone components -> Vue SFC components.
- Angular routes -> Vue Router route records.
- Translate pipe usage -> `t('key.path')` via vue-i18n.

Mandatory migration invariants:

- No functional changes hidden inside migration PRs.
- No untyped API response usage.
- No skipped accessibility attributes that existed before.

## 6. Testing Model (3 Mandatory Parts)

Part A: Unit Tests

- Framework: Vitest.
- Scope: pure utilities, model transforms, services.
- Pattern: explicit AAA comments:
  - `// ARRANGE`
  - `// ACT`
  - `// ASSERT`
  - `// CLEANUP` when required.

Part B: Render/Component Integration Tests

- Framework: Testing Library Vue + Vue Test Utils.
- Scope:
  - translated labels,
  - loading/error/empty states,
  - accessibility labels and semantic roles,
  - component composition and interactions.

Part C: E2E + Performance

- Framework: Playwright + Lighthouse CI.
- Scope:
  - tab navigation,
  - language switching,
  - weather/gallery/social core journeys,
  - performance smoke budgets.

Minimum required commands:

- `npm run lint`
- `npm run test:unit`
- `npm run test:render`
- `npm run test:e2e`
- `npm run test:perf`

## 7. Performance Rules

Required metrics and budgets (initial target, tune over time):

- LCP <= 2.5s (warn), <= 4.5s (error in CI if justified by app complexity).
- CLS <= 0.1 (error).
- TBT <= 300ms (warn), <= 500ms (error in CI profile).
- INP <= 200ms target for production monitoring.

Required instrumentation:

- `web-vitals` reporting enabled in production.
- Lighthouse local profile for developers.
- Lighthouse strict CI profile for PR gating.
- Playwright performance smoke on critical flows.

## 8. Accessibility Rules

Mandatory:

- All interactive controls must have accessible names.
- Async states must expose live region semantics (`status` or `alert` as appropriate).
- Keyboard interaction must be test-covered for major controls.
- Decorative icons/images must be hidden from assistive tech.
- Semantic structure required (`header`, `main`, lists, buttons, nav landmarks).

## 9. Documentation Rules

Every migration PR must include:

- Scope summary.
- Feature parity notes.
- Link to original-repo baseline behavior being matched.
- Testing evidence for all 3 parts.
- Performance result deltas if relevant.
- Known gaps and follow-up issues.

Code-level docs:

- Public functions/composables/services must include concise JSDoc.
- Every domain interface/type must have a short behavior-oriented comment.

## 10. Copilot Rules for Future Ionic/Vue Development

Copy this block into the new repository instruction file (required path: `.github/copilot-instructions.md`) and keep it versioned.

```md
You are an expert in TypeScript, Vue 3, and Ionic Vue 8.
Write maintainable, accessible, performant code with strict typing.

Project rules:

- Use TypeScript strict mode.
- Migration is in a separate repository; never modify original Angular repository as part of Vue implementation tasks.
- Keep feature code under `src/features/<feature>` with `models`, `services`, `composables`, and `components`.
- Keep services transport-focused and composables UI-state-focused.
- Reuse MSW handlers for all API interactions in dev/tests.
- Use vue-i18n with `en` and `es`; no hardcoded user-facing strings.
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

- All colors must come from CSS custom properties declared in `src/styles/variables.css` (or equivalent theme file).
- No raw hex/rgb/hsl/rgba literals in feature component styles.

Ionicons rule:

- Every icon used in templates must be imported and registered with `addIcons()`.

PR gate rules:

- `lint`, `test:unit`, `test:render`, `test:e2e`, and `test:perf` must pass.
- PR must reference parity target(s) from original repository and update parity matrix status.
- If any requirement is not met, do not mark task complete.
```

## 11. Execution Checklist

Use this checklist for each migrated feature:

- Models/types ported and documented.
- Service API parity validated against contracts.
- Composable state handling includes loading/error/success.
- UI parity and accessibility parity achieved.
- i18n keys available in `en` and `es`.
- Unit tests added/updated.
- Render/component tests added/updated.
- E2E and perf tests added/updated.
- Lint, tests, and perf gates passing.

## 12. Risks and Mitigations

Key risks:

- Behavior drift during framework rewrite.
- i18n key mismatches.
- Accessibility regressions due to template rewrites.
- Performance regressions from bundle and reactive state changes.

Mitigations:

- Feature parity checklist and strict PR template.
- Shared contract tests for API payload mapping.
- Accessibility-focused render/e2e assertions.
- Mandatory perf CI gate and regression tracking.

## 13. Recommended First Migration Sprint

Sprint goal:

- Deliver a complete Vue vertical slice for Weather with all quality gates.

Sprint scope:

- Ionic Vue shell + tab route.
- Weather models/services/composables/components.
- i18n parity (`en`, `es`).
- Tests in 3 parts.
- Performance setup and baseline.

Exit criteria:

- Weather feature in Vue reaches parity and passes lint + all tests + perf checks.
