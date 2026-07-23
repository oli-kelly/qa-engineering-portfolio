# Playwright, Cypress, Selenium and Cucumber

## Choose from context

Tool selection should follow product architecture, team skills, browser/device needs, existing investment, feedback goals and operational constraints. A comparison table starts a conversation; a proof of concept against the hardest real risks finishes it.

| Tool | Strong fit | Considerations |
|---|---|---|
| Playwright | Modern cross-browser UI/API checks, parallel execution, rich traces, multi-page/context scenarios | Node/.NET/Java/Python options differ; still requires good state and test design |
| Cypress | Front-end-heavy teams, strong interactive runner, convenient network interception and component/E2E workflows | Its execution model and cross-origin/multi-tab constraints should be tested against the product’s real journeys |
| Selenium WebDriver | Broad ecosystem/language support, mature grid/cloud options, existing enterprise suites | More synchronisation and framework architecture are usually the team’s responsibility |
| Cucumber | Executable examples where shared domain language has an active non-developer audience | Extra natural-language and step-definition layer has a real maintenance cost |

None of these tools supplies a test strategy. They execute checks designed by the team.

## Questions for a tool proof of concept

- Can it automate the most difficult critical journey, not just login?
- Does it support required browsers, devices, authentication and origins?
- Can data and dependencies be controlled without slow UI setup?
- How does it handle parallel isolation and CI resources?
- What evidence exists when a check fails remotely?
- Can the team debug it locally and maintain it in its preferred language?
- Does it integrate with reporting, secrets, test management and environments?
- How will migration or dual-running affect delivery?

Use representative product risks and measure implementation effort, runtime, diagnosis and reliability. Avoid selecting from a demo that exercises only happy-path clicks.

## How the portfolio uses them

### Playwright

- Page Object UI journeys at desktop and mobile viewports.
- Direct API checks for pricing and stable error contracts.
- axe integration for fast accessibility feedback.
- HTML evidence and traces/screenshots/video on failure or retry.

See [Playwright tests](../../tests/playwright/).

### Cypress

- Browser journey plus request/response assertions.
- Controlled `503` response to verify user-visible recovery information.
- JUnit evidence for CI.

See [Cypress checkout tests](../../tests/cypress/e2e/checkout.cy.js).

### Selenium Java

- Page Object with Page Factory annotations.
- Explicit waits and headless Chrome execution.
- JUnit/Surefire evidence in CI.

See [Selenium Page Factory example](../../tests/selenium-java/).

### Cucumber

- Business-readable promotion and validation examples.
- Playwright-backed steps with screenshots attached on failure.
- HTML report retained by CI.

See [Cucumber feature](../../tests/bdd/features/guest-checkout.feature).

## A realistic team decision

I would not normally keep Playwright, Cypress and Selenium for the same new product. This repository uses overlap to demonstrate capability. In production I would normally choose one primary UI stack, keep broad deterministic coverage at unit/API/contract layers, and retain another framework only where it protects a distinct product/platform need or during a time-boxed migration.
