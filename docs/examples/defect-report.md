# Defect example

## Checkout creates two orders when a timed-out request is retried

- **Severity:** 1 - potential duplicate charge/order
- **Priority recommendation:** Immediate investigation; block release to real transactions
- **Status:** New
- **Found in:** Checkout integration environment, build `2026.07.22.3`
- **Related requirement:** AC4 - exactly one order is created

## Customer and business impact

A guest who sees a timeout can retry the same purchase and create two orders. With payment enabled this could double-charge the customer, create support/refund cost and undermine trust. The UI does not make it clear that the first request may have succeeded.

## Preconditions

- A valid product is available at £24.99.
- The order service accepts create requests but the gateway response can be delayed.
- Browser cache is not relevant; reproduced in a clean session.

## Steps to reproduce

1. Open guest checkout.
2. Select `BDD Field Guide`, quantity 1, and enter `duplicate@example.test`.
3. In the network proxy, delay the first `POST /api/orders` response for 35 seconds while allowing the request to reach the order service.
4. Select **Place order**.
5. After the UI timeout appears, restore normal network conditions.
6. Select **Place order** again.
7. Query orders for the correlation window/email.

## Actual result

Two orders are stored with different order IDs and the same customer, product, quantity and amount. Both create requests lack an idempotency key. The UI eventually shows only the second reference.

## Expected result

A retry of the same purchase intent creates at most one order. The customer receives the original result or a safe “still processing” state. A second intentional purchase remains possible through a new purchase intent.

## Reproducibility

3/3 with a 35-second gateway delay. Not reproduced with a 2-second delay. Reproduced on Chromium 128 / Windows 11 and Chromium 128 / Ubuntu CI image.

## Evidence

- Screen recording: `CHK-142-timeout-retry.webm` (00:18 first submit; 00:57 retry).
- HAR: two `POST /api/orders` calls, correlation IDs `c-71a` and `c-93b`.
- Redacted service query: two rows 39 seconds apart with matching order intent fields.
- Logs: first request committed before gateway timeout; no idempotency lookup on second request.

Evidence names are illustrative; a real ticket would attach the restricted artefacts and state any redaction/access needs.

## Investigation notes, not assumed root cause

The API contract has no idempotency key and the UI re-enables submission after its timeout. This combination is a strong causal hypothesis, not yet a confirmed root cause. Engineering should also check gateway retry behaviour and database transaction boundaries.

## Suggested containment and verification

- Keep payment/production rollout disabled.
- Define purchase-intent idempotency semantics at the API boundary.
- While a request outcome is unknown, show a recoverable pending state rather than inviting a blind retry.
- Add service-level retry/concurrency tests and an end-to-end timeout scenario.
- Monitor duplicate fingerprints and confirm legitimate repeated purchases are not suppressed.

## Retest scope

Original delayed-response path; rapid double-click; browser refresh/back; client retry; gateway retry; concurrent identical requests; expired idempotency key; changed quantity with reused key; service restart; and normal second purchase with a new intent.
