# CI/CD quality gates and release evidence

## Principles

- Put the quickest, most change-relevant feedback nearest the commit.
- Separate a genuine product signal from environmental noise.
- Retain evidence that helps diagnose a failure.
- Treat a bypass as a visible, owned risk decision with an expiry.
- Continue learning after deployment; pre-release testing is not the finish line.

## Pipeline shape

| Stage | Trigger | Evidence | Gate |
|---|---|---|---|
| Contract/static | Pull request | OpenAPI lint and dependency install | Must pass |
| Service + focused UI | Pull request | Playwright API, Chromium smoke, accessibility result | Must pass; retry does not hide first failure |
| Executable behaviour | Pull request | Cucumber scenarios and HTML report | Must pass for affected behaviour |
| Alternative framework examples | Main/manual in a real portfolio | Cypress and Selenium reports | Demonstration jobs; production ownership should avoid redundant suites |
| Broader browser/exploration | Pre-release, risk-triggered | Browser matrix, charter notes, accessibility evidence | Required according to risk/change |
| Deployment verification | After deploy | Health/smoke, version and configuration evidence | Auto rollback/disable where safe |
| Shift-right | Continuous | SLOs, error/latency and business outcome signals | Alert and investigation thresholds |

## Failure policy

1. A deterministic failure blocks the merge until fixed or the expected behaviour is intentionally changed.
2. A suspected flaky failure is investigated and recorded; rerun history is evidence, not a substitute for diagnosis.
3. Quarantining a check requires an owner, linked issue, protected risk and expiry. Critical coverage must be replaced before quarantine.
4. Environmental failure is separated from product failure in reporting and still receives an owner if it harms feedback reliability.
5. Secrets, personal data and unrestricted network payloads must not appear in reports or logs.

## Evidence retained

- Commit, workflow and environment identity.
- Machine-readable test result plus readable report.
- Playwright trace/screenshot/video only on failure or retry.
- Cucumber HTML showing scenario-to-step outcomes.
- Cypress/Selenium screenshots or XML where applicable.
- Open defects, accepted exceptions and release recommendation.

Retention should match diagnosis/audit need rather than be indefinite by default.

## Release recommendation template

- **Change assessed:** build/commit and intended scope
- **Evidence:** passed checks, exploratory sessions, environment and known limitations
- **Open defects:** severity, impact and workaround
- **Residual risks/assumptions:** untested or weakly represented areas
- **Operational readiness:** monitoring, support, rollback/disable route
- **Recommendation:** release / release with explicit conditions / do not release
- **Decision owner and time:** named accountable role and record

## Shift-right triggers

For checkout, watch completion rate, API error classes, p95/p99 latency, promo rejection, duplicate-order fingerprints and front-end errors. Compare to a baseline and segment by version/device. A signal should lead to investigation and potentially a new requirement, test, alert or design change; blindly converting every incident into an end-to-end test creates a slow, brittle suite.
