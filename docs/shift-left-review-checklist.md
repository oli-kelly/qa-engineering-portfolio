# Shift-left work item review

Use this during discovery/refinement, scaled to risk. It is a prompt for collaboration, not a hand-off gate owned only by QA.

## Outcome and scope

- Is the user/business problem and measurable outcome clear?
- Are in-scope, out-of-scope and smallest useful slice explicit?
- Do examples include important negative and boundary cases?
- Are assumptions separated from confirmed rules and assigned owners?

## Testability and design

- Can important states be created and observed without private database surgery?
- Are business rules centralised and testable below the UI?
- Are stable identifiers, clock/randomness controls and dependency seams available?
- Does the API contract define status, schema, errors, compatibility and idempotency?

## Quality characteristics

- Accessibility: keyboard, names/roles, focus, errors, zoom and assistive technology.
- Security/privacy: abuse cases, authorisation, validation, secrets, data minimisation and retention.
- Performance/resilience: load shape, timeout, retry, concurrency, graceful degradation and recovery.
- Compatibility/localisation: supported clients, language, timezone, calendar, currency and text expansion.
- Operability: structured events, correlation, dashboards, alerts, runbook and safe disable/rollback.

## Delivery readiness

- Dependencies, environments, test data and access are known.
- Coverage is allocated to the lowest useful layer.
- Manual/exploratory charters address uncertainty that examples cannot.
- Release and rollback criteria identify an accountable decision owner.

A work item is not “QA ready” because it contains three Given/When/Then sentences. It is ready when the team shares a testable model of the outcome and the material risks have owners.
