# Risk-based test strategy: promotional guest checkout

## Purpose

This strategy explains how quality will be assessed for guest checkout with promotional pricing. It is intentionally proportional: a small product still receives structured risk analysis, but the process does not imitate heavyweight governance.

## Quality objectives

1. A guest can understand the offer, submit a valid order and retain a usable confirmation reference.
2. Pricing is arithmetically correct and consistent between UI and API.
3. Invalid input fails safely, clearly and without creating an order.
4. The core journey works with keyboard and assistive-technology semantics.
5. Failures are observable enough for support and engineering to investigate.

## Context and assumptions

- The demo has one stateless service and synthetic products.
- `SENIORQA` grants 15% off and comparisons are case-insensitive.
- Quantity is an integer from 1 to 5 inclusive.
- Monetary calculations round to two decimal places at each defined output.
- No payment is taken; order creation represents the irreversible business action.
- Browser support for the exercise is current Chromium desktop and mobile viewports.

In a live product I would confirm the promotion owner, stacking rules, tax order, currency/locale rules, cancellation behaviour, data-retention requirements, browser matrix and service-level objectives before treating this strategy as approved.

## Product risk assessment

Likelihood and impact use a 1-5 scale. Score = likelihood x impact.

| Risk | L | I | Score | Primary controls |
|---|---:|---:|---:|---|
| Customer is charged or shown the wrong total | 3 | 5 | 15 | API examples, boundary analysis, UI/API consistency check, production metric |
| Duplicate order created after retry | 3 | 5 | 15 | Idempotency design review and API concurrency tests before real payment goes live |
| Valid guest cannot complete checkout | 3 | 4 | 12 | Smoke journey, error-path exploration, mobile coverage |
| Invalid promo produces misleading feedback | 3 | 3 | 9 | BDD examples and service-error contract tests |
| Keyboard or screen-reader user is blocked | 2 | 4 | 8 | Semantic review, keyboard session, axe scan, screen-reader spot check |
| Browser/network failure loses diagnosable evidence | 2 | 4 | 8 | Correlation ID and structured logging review; retained CI trace |
| Cosmetic inconsistency | 3 | 1 | 3 | Exploratory visual pass; fix according to user impact |

The duplicate-order risk is deliberately not hidden by passing tests: the demo service has no idempotency contract. That is a known release blocker before adding real payment or persistence.

## Coverage approach

### Static and component feedback

- Review acceptance criteria, examples, data rules and API response shapes before implementation.
- Unit-test money and promotion functions in a production codebase; the demo keeps them small and exercises them through the API.
- Run dependency, secret and code-quality scanning in a production pipeline.

### Service/API coverage

- Valid order with and without promotion.
- Quantity boundaries: 0, 1, 5, 6, non-integer and missing.
- Product and email validation.
- Promotion normalisation and stable error codes.
- Price precision and currency.
- Idempotency, retry and concurrency once an order store exists.

### UI coverage

- One high-value happy path at desktop and mobile viewport.
- Inline promotion feedback and server-rejected promotion.
- Service-unavailable behaviour using a controlled network response.
- Keyboard order and focus movement through manual exploration.
- Responsive layout and readable totals at zoom.

### Exploratory coverage

Use the [checkout exploratory charter](examples/exploratory-charter.md) to investigate state transitions, unusual input, interruptions and comprehensibility. Automation confirms known expectations; exploration looks for risks the model missed.

### Accessibility coverage

Automated axe results are a fast gate, not an accessibility certification. Manual checks include keyboard-only completion, focus visibility/order, error announcement, 200% zoom, label clarity, colour independence and a screen-reader spot check.

## Environments and data

Pull requests run against an ephemeral local service with synthetic `.test` email addresses. A real delivery path would add a production-like integration environment for database, payment sandbox, email queue and observability validation. Tests create isolated data and must not depend on execution order.

## Entry and exit criteria

Entry for feature testing:

- Acceptance criteria and promotion examples agreed.
- API contract available and deployable environment healthy.
- Test data and dependencies identified.
- No unresolved design question can change price calculation.

Exit for release recommendation:

- All critical and high-risk planned checks have passed.
- No open severity 1/2 defect; lower-severity defects have an owner and accepted impact.
- Required exploratory and accessibility sessions are complete.
- CI evidence is retained and traceable to the change.
- Rollback/disable route, monitoring and support notes are ready.
- Residual duplicate-order risk is resolved before any real irreversible transaction is introduced.

## Release decision

The QA recommendation states evidence, residual risk and assumptions. “All tests passed” alone is not a release assessment. Product/engineering owns the release decision; QA makes risk legible and challenges unsupported acceptance.

## Shift-right learning

For a live release, monitor checkout completion rate, order-create error rate, promotion rejection rate, latency, duplicate-order signals and client-side errors. Segment by browser/device and promotion. Alert thresholds require a baseline; a meaningful change creates an investigation, a new example or revised coverage rather than an automatic permanent UI test.
