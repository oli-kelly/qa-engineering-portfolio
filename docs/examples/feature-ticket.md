# Feature ticket example: promotional guest checkout

- **Type:** User story
- **Outcome owner:** Growth Product Manager
- **Risk:** High - changes customer-visible price and order creation
- **Dependencies:** Product catalogue API, order API, promotion rules, analytics/monitoring

## Problem and outcome

Prospective customers abandon when they must create an account before buying a digital guide. Allow a guest to select a guide, optionally apply the `SENIORQA` promotion and place an order using an email address.

Success means an eligible guest can understand the final price and receive a traceable confirmation without account creation. It does not mean maximising clicks on the order button.

## Scope

In scope:

- One product per order, quantity 1-5.
- Optional, case-insensitive `SENIORQA` code for 15% off.
- GBP pricing and an on-screen confirmation reference.
- Clear validation/error feedback and accessible keyboard operation.

Out of scope:

- Payment capture, account creation, stacking promotions, cancellation and email delivery.
- Persisting orders beyond the demonstration process.

## Rules and examples

| Product price | Qty | Code | Subtotal | Discount | Total | Expected result |
|---:|---:|---|---:|---:|---:|---|
| £24.99 | 1 | blank | £24.99 | £0.00 | £24.99 | Order accepted |
| £24.99 | 2 | `SENIORQA` | £49.98 | £7.50 | £42.48 | Order accepted |
| £34.99 | 2 | `seniorqa` | £69.98 | £10.50 | £59.48 | Order accepted |
| £24.99 | 0 | blank | - | - | - | Reject quantity |
| £24.99 | 6 | blank | - | - | - | Reject quantity |
| £24.99 | 1 | `EXPIRED` | - | - | - | Reject promo; do not create order |

Rounding rule: calculate subtotal to two decimal places, calculate 15% discount and round half away from zero to two decimal places, then subtract. Product/pricing owns this rule and must confirm it before development.

## Acceptance criteria

### AC1 - Display price before commitment

Given a guest has selected a valid product and quantity<br>
When the selection changes<br>
Then subtotal, discount and total are displayed in GBP before the order can be placed.

### AC2 - Apply the eligible promotion

Given the subtotal is £49.98<br>
When the guest applies `SENIORQA` in any letter case<br>
Then the UI explains that 15% was applied<br>
And shows a £7.50 discount and £42.48 total.

### AC3 - Reject an unsupported promotion safely

Given the guest entered a code that is not active<br>
When they apply or submit it<br>
Then the page states that the code is not recognised<br>
And no discount is shown<br>
And no order is created.

### AC4 - Create a valid guest order

Given the product, quantity, optional promotion and email are valid<br>
When the guest places the order<br>
Then exactly one order is created<br>
And the confirmation shows an order reference, email and final total matching the accepted API response.

### AC5 - Validate boundaries

Given quantity is not an integer from 1 to 5 inclusive or email is malformed<br>
When the guest places the order<br>
Then no order is created<br>
And the field/problem is explained without losing valid input.

### AC6 - Accessible completion

Given a guest uses only a keyboard and a supported screen reader<br>
When they configure and place an order or encounter a validation error<br>
Then controls have programmatic names, focus is visible and logical, status/error changes are announced, and colour is not the only indicator.

## Non-functional and operational requirements

- API returns stable machine-readable error codes as well as user-safe messages.
- Order create needs an idempotency design before persistence or payment is enabled.
- Do not log the full email address at normal log level.
- Define p95 latency and availability objectives from the wider checkout SLO.
- Emit outcome events for accepted order and categorised rejection, with correlation IDs.
- Feature can be disabled without redeploying if error or duplicate rate breaches the agreed threshold.

## Shift-left questions raised

1. Is the promotion single-use, date-bound, customer-bound or globally available?
2. Can promotions stack, and does discount occur before tax?
3. Who owns the rounding rule across UI, API and finance reporting?
4. What makes an order “created” if confirmation delivery fails?
5. How is a retry distinguished from a second intentional purchase?
6. Which email formats do we accept, and do we verify ownership?
7. What audit evidence is required for price changes?
8. Which production signals trigger disablement or rollback?

The ticket is ready for implementation only when questions 1-5 have explicit owners and answers. Coding against guesses here would create avoidable rework and financial risk.

## Definition of done

- Rules, API contract and analytics/observability changes reviewed.
- Unit/service/UI coverage added according to the traceability matrix.
- Keyboard, zoom and screen-reader spot check complete.
- No unresolved high-severity defect; accepted residual risks recorded.
- Runbook, monitoring and disable/rollback route reviewed.
- Evidence attached to the change and understandable by someone outside the delivery pair.
