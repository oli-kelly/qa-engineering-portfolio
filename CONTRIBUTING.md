# Contributing

Changes should strengthen a clear quality risk or make the evidence easier to understand. Before opening a pull request:

1. Explain the outcome, risk and scope using the pull request template.
2. Prefer the lowest effective test layer and avoid duplicating an assertion without a reason.
3. Use synthetic data and do not commit employer/customer information, credentials or generated failure artefacts.
4. Run `npm test` and `npm run lint:openapi`; run the framework-specific suite if you changed it.
5. Update the traceability matrix and documentation when behaviour or residual risk changes.

Small, diagnosable checks are preferred to broad end-to-end scripts. A bug fix should normally include the most focused regression control that would have detected it.
