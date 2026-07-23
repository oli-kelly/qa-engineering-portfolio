# Choosing what to automate

## Start with the decision, not the tool

Automation is valuable when it provides repeatable information or control at lower total cost and at the time a decision is made. “Can this be automated?” is rarely the useful question; most deterministic interactions can be. Ask whether it should be automated, at which layer and for how long.

## Evaluate a candidate

Consider:

- **Risk/value** - what harm or decision does this check protect?
- **Frequency** - how often will the information be needed?
- **Determinism** - can state, data, time and dependencies be controlled?
- **Feedback point** - will it answer a question before the change becomes expensive?
- **Reach** - can it cover useful data combinations or boundaries efficiently?
- **Diagnostic quality** - will failure narrow the cause?
- **Build and runtime cost** - harness, data, environment and pipeline time.
- **Maintenance volatility** - how often valid product changes will require updates.
- **Alternative controls** - review, static analysis, contract, monitor or feature flag.

The [automation decision framework](../automation-decision-framework.md) contains a reusable scoring conversation and examples.

## Automate at the lowest effective layer

- Calculation or transformation: unit/property check.
- Service rule, boundary or error schema: component/API check.
- Consumer-provider compatibility: contract check.
- Critical browser wiring: a small UI check.
- Cross-system business journey: a very small end-to-end set where the integration value is real.
- Production-only behaviour: synthetic monitoring or telemetry.

UI checks are valuable, but they are slower, more stateful and harder to diagnose. Using them for every business rule creates delayed feedback and duplicate coverage.

## Strong automation candidates

- Stable, high-risk rules with clear expected results.
- Repeated smoke or regression decisions.
- Data combinations and boundaries expensive to check manually.
- API contracts and compatibility.
- Setup/reconciliation tasks that improve manual or exploratory work.
- Operational checks that must run continuously.

## Weak candidates

- One-off checks with high harness cost.
- Subjective usability, comprehensibility or visual quality.
- Rapidly changing experiments whose expected behaviour is unsettled.
- Scenarios dependent on uncontrolled third parties when a lower-level seam exists.
- Checks that repeat the same assertion across several frameworks without independent risk coverage.

Weak candidates may still warrant tooling: a data generator, log collector or visual comparison can support human testing without pretending to replace it.

## Design for trust

A trustworthy automated check is:

- independent and repeatable;
- explicit about the risk and assertion;
- in control of its data and dependencies where appropriate;
- free from arbitrary sleeps;
- able to retain useful evidence on failure;
- owned and reviewed like production code;
- removed or refactored when its information value declines.

## Flakiness is a quality problem

Retrying can capture traces and distinguish intermittency, but a passing retry does not erase the first failure. Track flaky-failure rate, diagnose the cause and quarantine only with an owner, linked issue, expiry and replacement coverage for critical risk.

Common causes include uncontrolled data, shared state, asynchronous assumptions, unstable selectors, environment capacity and third-party dependency behaviour. “UI tests are flaky” is not an explanation.

## Measure outcomes, not volume

Useful measures include:

- time from change to actionable feedback;
- escaped regression trends by risk area;
- failure diagnostic time;
- flaky-failure rate;
- suite runtime at the decision point;
- maintenance effort and obsolete-check removal.

Test count and pass percentage can rise while confidence gets worse.

## Portfolio example

This repository intentionally implements the same small journey in Playwright, Cypress and Selenium to demonstrate tool knowledge. A production team would normally rationalise that overlap: keep business-rule breadth in API/unit checks, one or two browser journeys in the chosen UI framework, and human exploration for uncertainty.
