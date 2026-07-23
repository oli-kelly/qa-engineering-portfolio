# Risk-based testing

## Why use risk to shape testing

Time and environments are finite, while possible tests are effectively unlimited. Risk-based testing concentrates effort where a failure is most likely to matter and makes reduced coverage an explicit decision rather than an accident.

Risk is not just severity. A useful model considers:

- **Impact** - harm to users, revenue, safety, compliance, data, reputation or operations.
- **Likelihood** - probability that the failure occurs.
- **Uncertainty** - how little the team knows about the behaviour, technology, dependency or usage.
- **Detectability/recoverability** - whether the failure will be noticed quickly and reversed safely.

A simple likelihood × impact score helps prioritise discussion, but the number is not truth. A low-likelihood catastrophic risk may still require a specific control, and uncertainty can justify exploration even when no known failure is likely.

## Identify risks collaboratively

Ask people with product, development, operations, support, security and testing perspectives:

- How could this change fail?
- Who or what would be harmed?
- Which parts are new, complex, highly connected or historically unstable?
- What assumptions are we making?
- What could happen during retry, concurrency, partial failure or recovery?
- Which failure would be difficult to detect or reverse?
- What have users or production incidents taught us?

Phrase risks as cause/event/consequence where useful:

> Because order creation is not idempotent, a client retry after an unknown outcome may create two orders, causing duplicate fulfilment or charge.

That form points toward prevention, detection and recovery controls.

## Turn risk into coverage

For each material risk, choose controls at appropriate layers:

| Risk | Prevention | Detection before release | Detection/recovery after release |
|---|---|---|---|
| Wrong promotional total | Shared rule and centralised calculation | Unit/API examples, one UI consistency check | Price anomaly metric and audit trail |
| Duplicate order | Idempotency design | Retry/concurrency service tests | Duplicate fingerprint alert and safe reconciliation |
| Keyboard user blocked | Accessible interaction design | Semantic review, keyboard session, automated scan | Accessibility feedback/support route |
| Dependency outage blocks checkout | Timeout/fallback design | Fault-injection and exploratory recovery | Error-rate alert, circuit breaker, disable route |

Testing is one control among design review, static analysis, observability, rollout controls and operational response.

## Depth should follow risk

High-risk behaviour usually receives:

- earlier clarification and technical review;
- more coverage at fast deterministic layers;
- focused end-to-end wiring checks;
- exploratory sessions around uncertainty and interaction;
- production monitoring and rollback/disable planning;
- clearer evidence and release criteria.

Low-risk behaviour may receive a focused review and exploratory spot check without permanent automation. Equal test counts per story are not an indicator of fairness or quality.

## Use test-design techniques deliberately

- **Equivalence partitioning** for groups expected to behave similarly.
- **Boundary-value analysis** where behaviour changes at limits.
- **Decision tables** for interacting rules and conditions.
- **State-transition testing** for lifecycle and invalid transitions.
- **Pairwise/combinatorial testing** for configuration interactions.
- **Error guessing and tours** informed by architecture, incidents and domain experience.
- **Exploratory testing** where learning and adaptation are central.

Choose the technique because it models the risk, not because a template contains it.

## Risk and release decisions

A release assessment should say:

- what changed and what evidence exists;
- which material risks were covered and how;
- open defects and their effect;
- coverage gaps, assumptions and environment differences;
- operational readiness and rollback/disable options;
- a recommendation with conditions, not simply “QA passed”.

Product/engineering owns the release decision. QA improves it by making evidence and residual risk legible.

## Worked example

The [checkout test strategy](../test-strategy.md) scores product risks, connects them to coverage and explicitly calls out the unimplemented idempotency contract as a blocker before real transactions. Its requirement-to-evidence mapping is in the [traceability matrix](../traceability-matrix.md).

## Review checklist

- Are impact, likelihood and uncertainty considered separately?
- Did relevant roles contribute risks and production history?
- Does each important risk have prevention, detection or recovery controls?
- Is coverage at the fastest trustworthy layer?
- Are exploration and human judgement used where expectations are incomplete?
- Are gaps and residual risks visible in the release recommendation?
- Will production signals update the risk model?
