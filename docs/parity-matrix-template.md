# Parity Matrix Template (Angular Baseline -> Ionic Vue)

Use this file in the new repository (`ionic-vue-poc/docs/parity-matrix.md`) to track migration parity against the original Angular baseline.

## Status Legend

- `not-started`: Not migrated yet.
- `in-progress`: Migration work ongoing.
- `blocked`: Migration blocked by dependency/decision.
- `done`: Feature migrated and all quality gates pass.

## Baseline References

- Source baseline repo: `ionic-poc` (Angular/Ionic)
- Baseline commit/tag: `<fill-me>`
- Migration repo: `ionic-vue-poc` (Vue/Ionic)
- Last parity review date: `<yyyy-mm-dd>`

## Feature Parity Matrix

| Feature                  | Baseline Route(s)                      | Vue Route(s) | Functional Parity | i18n Parity (en/es) | A11y Parity   | Unit Tests    | Render Tests  | E2E Tests     | Perf Tests    | Docs Updated  | Status        | Notes |
| ------------------------ | -------------------------------------- | ------------ | ----------------- | ------------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ----- |
| App shell + tabs         | `/tabs/tab1` `/tabs/tab2` `/tabs/tab3` | `<fill-me>`  | `not-started`     | `not-started`       | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` |       |
| Weather                  | `/tabs/tab3`                           | `<fill-me>`  | `not-started`     | `not-started`       | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` |       |
| Image Gallery            | `/tabs/tab2`                           | `<fill-me>`  | `not-started`     | `not-started`       | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` |       |
| Social Media             | `/tabs/tab1`                           | `<fill-me>`  | `not-started`     | `not-started`       | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` |       |
| Header + language switch | shared                                 | `<fill-me>`  | `not-started`     | `not-started`       | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` | `not-started` |       |

## Quality Gate Checklist (Per Feature)

Mark each item before changing status to `done`.

- [ ] Functional behavior matches baseline user flow.
- [ ] i18n keys available for both `en` and `es`.
- [ ] Accessibility checks pass (labels, semantics, keyboard, live regions).
- [ ] Unit tests added/updated and passing.
- [ ] Render/component integration tests added/updated and passing.
- [ ] E2E tests added/updated and passing.
- [ ] Performance checks pass (`test:e2e:perf` and Lighthouse profile).
- [ ] Documentation updated (README + feature notes + migration notes).

## PR Evidence Block (Copy into PR description)

```md
## Parity Evidence

- Baseline feature: <name>
- Baseline reference: <repo/path/commit>
- Vue implementation paths: <paths>

## Test Evidence

- Unit: <command + result>
- Render: <command + result>
- E2E: <command + result>
- Performance: <command + result>

## Accessibility Evidence

- Keyboard interaction: <summary>
- Semantics/ARIA: <summary>

## Notes

- Known gaps:
- Follow-up issues:
```
