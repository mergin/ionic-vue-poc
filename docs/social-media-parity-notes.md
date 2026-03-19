# Social Media Migration Notes

## Scope

- Migrated Social Media tab vertical slice into feature architecture:
  - models
  - transport service
  - composable UI state
  - feature component

## Parity Targets

- Route parity: /tabs/tab1
- Loading, error, and success states exposed in UI
- i18n labels for en/es
- Live region semantics for async state updates

## Test Evidence

- Unit: social service success and failure with shared MSW handlers
- Render: social feed data, error UI, and Spanish locale rendering
- E2E: tab navigation, post rendering, and language switch flow
- Perf: Playwright smoke plus Lighthouse CI assert profile
