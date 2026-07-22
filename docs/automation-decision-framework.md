# Automation decision framework

Automation is an investment in feedback, not a reward for a completed manual test. I automate when repeated information value is likely to exceed build, execution, diagnosis and maintenance cost.

## Decision prompts

Score each 1 (low) to 5 (high):

| Factor | Question |
|---|---|
| Risk/value | Would a regression materially harm users, revenue, safety, compliance or team throughput? |
| Frequency | How often will the behaviour/change need checking? |
| Determinism | Can inputs, dependencies and expected outcomes be controlled reliably? |
| Feedback timing | Will automation provide an answer earlier or more consistently than another control? |
| Reach | Can one check cover valuable data combinations, platforms or integration boundaries? |
| Diagnostic value | Will failure point clearly to a useful cause? |
| Build cost | How difficult is the harness, data setup and environment? (reverse score) |
| Maintenance volatility | How often will valid product changes break the check? (reverse score) |

This is a conversation aid, not a numerical approval gate. A high score can still lose to a better design control, unit check, monitor or one-off exploratory session.

## Choose the lowest effective layer

- Pure rule or transformation: unit/property test.
- Service behaviour and error contract: API/component test.
- Provider/consumer compatibility: contract test.
- Critical user wiring: a small number of UI journeys.
- Visual, usability and emergent risk: exploration, review or focused visual comparison.
- Production-only behaviour: synthetic check, telemetry or controlled experiment.

## Portfolio examples

| Candidate | Decision | Why |
|---|---|---|
| Promotion arithmetic and quantity boundaries | Automate below UI | High financial value, deterministic, many examples, fast diagnosis |
| One guest order happy path | Automate in UI | Validates critical browser-to-service wiring; keep the count small |
| Every promotion example in three browser frameworks | Do not duplicate | Adds runtime and maintenance without independent confidence |
| Keyboard order and screen-reader comprehension | Mainly manual, with semantic automation | Human judgement is essential; axe catches only a subset |
| New layout’s subjective clarity | Exploratory/usability review | Expected outcome is not sufficiently mechanical |
| Checkout error-rate regression in production | Monitor | Real traffic/dependency behaviour cannot be fully reproduced pre-release |
| One-off data migration | Script reconciliation, sample manually | Repeatability may be low, but completeness evidence can be automated |

Playwright, Cypress and Selenium coexist here to demonstrate approaches. A real team would normally standardise on the smallest toolset that fits its product, skills and pipeline.

## Stop or refactor when

- The check fails more from timing/data/environment than product defects.
- No one can explain what risk it protects.
- Assertions merely repeat implementation details.
- A lower-level check can provide the same confidence faster.
- Runtime delays developer feedback beyond its decision point.
- Maintenance consumes more effort than the failures it prevents justify.

Track useful outcomes: escaped regressions, time to feedback, flaky-failure rate, diagnosis time and maintenance effort. Test count and nominal pass rate are not quality KPIs on their own.
