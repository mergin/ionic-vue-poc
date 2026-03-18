# Parity Matrix (Angular Baseline -> Ionic Vue)

## Status Legend

- not-started: Not migrated yet.
- in-progress: Migration work ongoing.
- blocked: Migration blocked by dependency/decision.
- done: Feature migrated and all quality gates pass.

## Baseline References

- Source baseline repo: ionic-poc (Angular/Ionic)
- Baseline commit/tag: pending
- Migration repo: ionic-vue-poc (Vue/Ionic)
- Last parity review date: 2026-03-18

## Feature Parity Matrix

| Feature                  | Baseline Route(s)                | Vue Route(s)                     | Functional Parity | i18n Parity | A11y Parity | Unit Tests  | Render Tests | E2E Tests   | Perf Tests  | Docs Updated | Status      | Notes                                                                                                 |
| ------------------------ | -------------------------------- | -------------------------------- | ----------------- | ----------- | ----------- | ----------- | ------------ | ----------- | ----------- | ------------ | ----------- | ----------------------------------------------------------------------------------------------------- |
| App shell + tabs         | /tabs/tab1 /tabs/tab2 /tabs/tab3 | /tabs/tab1 /tabs/tab2 /tabs/tab3 | in-progress       | in-progress | in-progress | in-progress | in-progress  | in-progress | in-progress | in-progress  | in-progress | Ionic Vue shell scaffolded with i18n and icon registry.                                               |
| Weather                  | /tabs/tab3                       | /tabs/tab3                       | in-progress       | in-progress | in-progress | done        | done         | done        | done        | done         | in-progress | Added detailed weather fields, localized status labels, and MSW-backed unit/render/e2e/perf coverage. |
| Image Gallery            | /tabs/tab2                       | /tabs/tab2                       | in-progress       | in-progress | in-progress | in-progress | in-progress  | in-progress | in-progress | in-progress  | in-progress | Vertical slice scaffolded using models, service, composable, and component.                           |
| Social Media             | /tabs/tab1                       | /tabs/tab1                       | in-progress       | in-progress | in-progress | in-progress | in-progress  | in-progress | in-progress | in-progress  | in-progress | Vertical slice scaffolded using models, service, composable, and component.                           |
| Header + language switch | shared                           | shared                           | in-progress       | in-progress | in-progress | in-progress | in-progress  | in-progress | in-progress | in-progress  | in-progress | Locale switch integrated with Pinia and vue-i18n.                                                     |

## Quality Gate Checklist (Per Feature)

- [ ] Functional behavior matches baseline user flow.
- [ ] i18n keys available for both en and es.
- [ ] Accessibility checks pass (labels, semantics, keyboard, live regions).
- [ ] Unit tests added/updated and passing.
- [ ] Render/component integration tests added/updated and passing.
- [ ] E2E tests added/updated and passing.
- [ ] Performance checks pass (test:e2e:perf and Lighthouse profile).
- [ ] Documentation updated (README + feature notes + migration notes).

## PR Evidence Block

## Parity Evidence

- Baseline feature: Weather
- Baseline reference: pending baseline commit from ionic-poc
- Vue implementation paths: src/features/weather, src/views/Tab3Page.vue, tests/unit/weather-service.spec.ts, tests/render/weather.render.spec.ts, tests/e2e-playwright/perf-smoke.spec.ts

## Test Evidence

- Unit: npm run test:unit -- --run -> 2 files passed, 3 tests passed
- Render: npm run test:render -> 2 files passed, 4 tests passed
- E2E: npm run test:e2e -> 3 tests passed
- Performance: npm run test:perf -> build + lhci collect/assert completed, assertions processed with no failures

## Accessibility Evidence

- Keyboard interaction: Ion tab buttons and language selector are keyboard operable through Ionic controls.
- Semantics/ARIA: Main navigation tab bar has localized aria-label, async weather states use status/alert roles, and decorative icons are aria-hidden.

## Notes

- Known gaps: baseline commit/tag from ionic-poc still needs to be pinned.
- Follow-up issues: optimize vendor-ionic bundle size to reduce build chunk warnings.
