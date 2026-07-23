# Writing feature tickets and acceptance criteria

## What a good ticket is for

A feature ticket is a collaboration anchor: it explains the problem, desired outcome, important constraints and unresolved decisions well enough for the team to continue discovery. It is not a contract thrown from product to engineering, and it should not attempt to predict every implementation detail.

Good tickets reduce three kinds of ambiguity:

1. **Outcome ambiguity** - different ideas of what user or business result matters.
2. **Rule ambiguity** - different interpretations of calculations, boundaries or state transitions.
3. **Delivery ambiguity** - hidden dependencies, operational needs or ownership.

## A practical structure

### Problem and outcome

Explain who is affected, what problem exists and how the change improves it. “Build a promo-code field” is a solution; “eligible guests cannot redeem an agreed offer” is a problem.

### Scope and non-scope

State the smallest valuable slice and meaningful exclusions. Explicit non-scope prevents reasonable but conflicting assumptions.

### Rules and examples

Use concrete examples for calculations, boundaries and state changes. A table often exposes misunderstandings faster than paragraphs.

### Acceptance criteria

Describe conditions that must be true for the outcome to be accepted. They can use Gherkin where examples help, but bullets, tables and diagrams are equally valid.

### Non-functional and operational needs

Consider accessibility, security/privacy, performance, resilience, compatibility, localisation, observability, support and rollback according to risk.

### Questions and assumptions

Keep them visible and give important ones an owner. An assumption silently converted into acceptance criteria still remains an assumption.

## Acceptance criteria are not test cases

Acceptance criteria define the behavioural boundary of the work. Test cases explore and evaluate that boundary using more data, paths and techniques.

| Acceptance criterion | Test-design consequences |
|---|---|
| Quantity must be 1-5 | Boundaries 0, 1, 5, 6; missing, decimal, negative and unusual input paths |
| Invalid promo creates no order | UI feedback, API status/schema, persistence check, retry/state exploration |
| Checkout is keyboard accessible | Focus order, visible focus, operable controls, announcement and recovery |

Copying acceptance criteria directly into tests without analysis misses interactions, failure modes and quality characteristics.

## Acceptance criteria vs Definition of Done

- **Acceptance criteria** are specific to the behaviour or outcome of this item.
- **Definition of Done** is a reusable team-level quality agreement, such as review complete, required checks passing and operational documentation updated.

“Automated tests pass” is usually Definition of Done material. “A 15% discount rounds to £7.50 for a £49.98 subtotal” is feature-specific acceptance behaviour.

## Writing useful Gherkin criteria

Use Gherkin when a concrete example clarifies a rule:

```gherkin
Given the guest's subtotal is £49.98
When they apply "SENIORQA"
Then the discount is £7.50
And the payable total is £42.48
```

Avoid criteria that merely dictate interface interactions:

```gherkin
Given I am on the checkout page
When I click the promo textbox
And click the blue Apply button
Then I see green text
```

The first survives a redesign and defines a price decision. The second over-specifies the current interface while leaving the actual rule vague.

## Quality questions I raise during refinement

- What user or business decision changes if this succeeds?
- Which examples prove we share the same interpretation?
- What are the boundaries, invalid states and permission differences?
- What happens if a dependency is slow, unavailable or returns an unknown result?
- Can the behaviour be observed and controlled at a lower layer?
- What data is sensitive, retained or audited?
- What does accessible completion mean for this interaction?
- How will support identify what happened?
- What signals show success or harm after release?
- Can we disable or roll back safely?

Not every ticket needs answers to every question. The depth should match impact, likelihood, novelty and uncertainty.

## Signs a ticket is not ready

- The requested solution has no stated problem or outcome.
- Examples produce disagreement about the expected result.
- A dependency or owner can still change the core rule.
- Acceptance criteria use words such as “correctly”, “appropriately”, “fast” or “user-friendly” without an agreed oracle.
- Error, permission and data behaviour are material but unspecified.
- The team cannot explain how the result will be observed or released safely.

“Not ready” should trigger collaboration, not a QA rejection queue.

## Worked example and checklist

Review the repository’s [promotional guest checkout ticket](../examples/feature-ticket.md). It includes outcome, scope, rules, examples, acceptance criteria, non-functional needs, open questions and Definition of Done.

Before refinement ends, check:

- Is the outcome clear and solution-independent?
- Are scope and meaningful exclusions explicit?
- Do examples cover the main rule and its boundaries?
- Are acceptance criteria observable and testable?
- Are important quality characteristics included according to risk?
- Are assumptions/questions visible with owners?
- Are dependencies, test data, environment and rollout needs understood?
