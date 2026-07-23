# Shift-left, CI/CD and shift-right quality

## Quality is a delivery-system property

Quality is not created by a test phase. It emerges from decisions about the problem, design, code, data, environments, deployment, observability and response to failure. QA contributes specialist testing and risk thinking while helping the whole team improve those decisions.

## Shift-left

Shift-left means moving useful learning and risk control earlier, not moving a test team earlier into an unchanged process.

Examples:

- Challenge outcome, rules and examples during discovery.
- Review API contracts and testability before implementation.
- Design controllable data, clocks, dependencies and observability.
- Pair on unit/component checks and acceptance examples.
- Run fast static, contract and service feedback on each change.

The [shift-left review checklist](../shift-left-review-checklist.md) covers outcome, testability, quality characteristics and delivery readiness.

## CI feedback layers

A healthy pipeline orders checks by speed, relevance and cost:

1. Formatting, static analysis, secret/dependency and contract checks.
2. Unit/component/service checks.
3. Focused browser and accessibility checks.
4. Broader integration, compatibility or performance work according to change risk.
5. Deployment verification and production signals.

Not every check must run at every point. A pull request needs fast actionable feedback; scheduled or pre-release workflows can hold broader expensive coverage. The risk of delayed feedback must be explicit.

## Quality gates

A gate should protect a decision, have an owner and explain failure. Examples:

- OpenAPI contract must be valid before merge.
- Critical pricing examples and smoke journey must pass.
- No unresolved critical/high defect without an explicit accountable exception.
- Required accessibility/exploratory evidence complete for the change risk.
- Monitoring and rollback/disable route ready before release.

Coverage percentages or raw test counts are weak gates when disconnected from risk.

## Failure and quarantine policy

- A deterministic product failure blocks its protected decision.
- An environmental failure still has an owner because unreliable feedback is a delivery problem.
- A passing retry does not erase an intermittent first failure.
- Quarantine needs a linked issue, owner, expiry and replacement for critical coverage.
- Logs and artefacts must protect secrets and personal data.

The portfolio’s [CI/CD quality-gate guide](../ci-cd-quality-gates.md) includes a pipeline model and release recommendation template.

## Release readiness

Release readiness is broader than test execution. Assess:

- evidence against material risks;
- open defects and accepted residual risk;
- environment/configuration differences;
- data migration and backward compatibility;
- support/runbook readiness;
- monitoring, alert thresholds and ownership;
- deployment, feature flag, rollback or disable route.

QA recommends based on evidence; the accountable product/engineering owner decides.

## Shift-right

Shift-right uses production to learn safely about behaviour that pre-release environments cannot fully represent:

- technical signals: error rate, latency, saturation and client exceptions;
- business signals: completion, rejection and abandonment;
- quality signals: duplicate fingerprints, accessibility feedback and support themes;
- controlled verification: health checks, synthetics, canaries and feature flags.

Signals need baselines, segmentation and an action. An alert with no owner or response is noise.

## Close the loop

Production findings should update discovery and coverage:

1. Investigate signal and customer impact.
2. Correct/contain the immediate issue.
3. Identify the missing assumption, control or observability.
4. Add the lowest-value-cost regression control where useful.
5. Update examples, risks, runbook and monitoring.

Do not automatically turn every incident into another end-to-end UI test. The root gap may be design, a service rule, contract, rollout control or alert.

## Portfolio evidence

The repository workflow runs four independent jobs for contract/Playwright, Cucumber, Cypress and Selenium. It retains diagnostic reports and uses the self-contained application to avoid third-party instability. The [test strategy](../test-strategy.md) also defines entry/exit criteria and production signals for the checkout example.
