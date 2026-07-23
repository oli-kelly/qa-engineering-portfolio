# Writing effective defect reports

## The purpose

A defect report should help the team make two decisions quickly:

1. How much does this matter and what should we do about it?
2. Can someone reproduce, investigate and verify it without rediscovering the context?

The report is evidence for a conversation, not proof that QA has diagnosed the root cause.

## Lead with impact

Describe who is affected, what they cannot do or what incorrect outcome occurs, and the likely business consequence. “Button does nothing” is an observation; “keyboard users cannot submit a completed application, blocking the core journey” supports prioritisation.

Severity and priority are related but different:

- **Severity** describes the impact of the problem.
- **Priority** describes how urgently the organisation chooses to act, considering severity, reach, timing, workaround and strategic context.

A cosmetic error on tomorrow’s national campaign can be high priority. A severe problem in an unreleased, disabled path may be scheduled differently while still retaining its severity.

## A useful defect structure

- Clear outcome-focused title.
- User/business impact and affected population.
- Environment, build/commit and relevant configuration.
- Preconditions and minimal test data.
- Smallest reliable reproduction path.
- Actual result, including important state changes.
- Expected result and its source/oracle.
- Frequency and scope of reproduction.
- Evidence: timestamps, correlation IDs, network/log extracts, screenshot or video.
- Investigation notes, clearly labelled as hypothesis or confirmed fact.
- Workaround/containment and suggested retest risks.

## Actual vs expected

Make the comparison precise:

```text
Actual: The service returns 201 twice and stores order IDs ORD-1042 and ORD-1043
for one purchase intent after a client timeout and retry.

Expected: Retrying the same purchase intent returns the original result or a safe
in-progress state and creates at most one order.
```

Avoid “does not work as expected” and avoid assuming expected behaviour without a source. If the oracle is unclear, report a product question or inconsistency rather than inventing a requirement.

## Reproduction steps

Good steps are minimal but sufficient. Include actions that affect the outcome; move general setup into preconditions. State whether the problem occurs every time, intermittently or only under a condition such as latency, role or locale.

For intermittent problems, capture what changes between pass and fail: timing, request sequence, data, browser process, node, account, feature flag or dependency response.

## Evidence quality

Useful evidence reduces the search space:

- A screenshot shows visible state but rarely timing or causality.
- A short recording shows sequence and timing.
- A HAR/request ID connects the client symptom to services.
- Logs show system events when tied to time, version and correlation.
- A database observation can prove state but should be redacted and access-controlled.

Do not attach a large unlabelled evidence dump. Point to the relevant timestamp or frame and remove secrets or personal data.

## Avoid premature root-cause claims

“The API has no idempotency key” may be a strong hypothesis. It is not automatically the confirmed root cause; gateway retries, transaction boundaries or event consumers may also contribute. Separating observation, inference and confirmed cause protects collaboration and avoids narrowing investigation too early.

## Retest beyond the original steps

A fix changes a system, not just one script. Retest:

- the original reproduction;
- the likely causal boundary;
- adjacent valid behaviour;
- negative and concurrency/retry paths;
- compatibility or accessibility affected by the change;
- observability and cleanup;
- whether the regression control fails on the old behaviour and passes on the fix.

## Worked example

The portfolio’s [duplicate-order defect](../examples/defect-report.md) demonstrates impact, environment, reproducibility, evidence, cautious investigation notes, containment and a broader retest scope.

## Review checklist

- Can someone understand the harm from the title and impact section?
- Is the affected build/environment unambiguous?
- Are the steps minimal and independently repeatable?
- Are actual and expected results specific and supported?
- Is reproducibility quantified?
- Does evidence point to the relevant event and protect sensitive data?
- Are hypotheses labelled rather than presented as fact?
- Does the retest scope consider adjacent risk?
