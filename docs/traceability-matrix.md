# Traceability and coverage matrix

This lightweight matrix keeps requirements, risk controls and executable evidence aligned. It is updated when behaviour changes; it is not a substitute for conversation.

| Requirement/risk | Primary evidence | Secondary evidence | Deliberate manual coverage |
|---|---|---|---|
| AC1 visible price | Playwright checkout test | Cucumber valid-promo scenario | Zoom/readability exploration |
| AC2 15% promotion | API pricing example | Playwright, Cucumber, Cypress, Selenium demonstrations | Product-owner example review |
| AC3 unsupported promo | API 422 contract | Playwright and Cucumber validation scenarios | Message clarity exploration |
| AC4 exactly one order | Valid API/UI creation | Example defect exposes current idempotency gap | Retry/concurrency session; blocker before real transactions |
| AC5 quantity/email boundaries | Parameterised API tests | Browser native/server validation | Paste/unusual input charter |
| AC6 accessible completion | axe WCAG A/AA scan | Semantic Playwright locators | Keyboard, zoom and screen-reader session |
| Service failure recoverability | Cypress controlled 503 | CI failure artefacts | Delay/abort/malformed-response charter |
| API contract quality | OpenAPI document + Spectral | Response assertions | Consumer/provider review |
| Responsive critical path | Playwright mobile project | CSS breakpoint | Real-device spot check based on usage risk |

## Gaps made visible

- Idempotency, persistence, payment and email delivery are absent from the demo and therefore not claimed as covered.
- Automated accessibility checks do not assess the full WCAG standard or user experience.
- The three browser frameworks intentionally overlap to demonstrate skill; this duplication would normally be rationalised.
