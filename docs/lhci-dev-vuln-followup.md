# LHCI CLI Dev Vulnerabilities: Follow-up Issue

## Context

- As of 2026-03-18, all production dependencies are secure (0 vulnerabilities).
- 4 low-severity vulnerabilities remain in dev dependencies, all in the @lhci/cli chain (see README Security section).
- All quality gates (lint, unit, render, E2E, perf, build) are green.

## Options

1. **Keep current state (recommended):**
   - Secure production deps, all tests pass, only 4 low dev-tool vulnerabilities remain.
2. **Eliminate all dev vulnerabilities:**
   - Replace LHCI CLI with direct Lighthouse runner and custom assertion scripts.
   - Requires custom scripting and may reduce maintainability.
3. **Track upstream fix:**
   - Monitor @lhci/cli for a non-breaking release that resolves the vulnerabilities.
   - Update dependency and re-audit when available.

## Action Items

- [ ] Monitor @lhci/cli releases for a fix.
- [ ] Update dependency and re-run audit when a fixed version is available.
- [ ] If zero dev vulnerabilities are required, consider option 2 and document tradeoffs.

## References

- See README Security and Dependency Audit section for current status and rationale.
- [@lhci/cli npm advisory](https://www.npmjs.com/package/@lhci/cli)
- [Lighthouse CI GitHub](https://github.com/GoogleChrome/lighthouse-ci)
