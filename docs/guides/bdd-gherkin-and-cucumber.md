# BDD, Gherkin and Cucumber: a practitioner guide

## The short version

- **BDD** is a collaborative way to discover and agree product behaviour through concrete examples.
- **Gherkin** is a small business-readable language for expressing some of those examples.
- **Cucumber** is one tool that can execute Gherkin scenarios by matching steps to code.

Using `Given`, `When` and `Then` does not by itself mean a team is practising BDD. The valuable part happens before automation: people with product, development and testing perspectives build a shared model, expose assumptions and agree what matters.

## What BDD is trying to solve

Requirements written only as broad prose invite different interpretations. Test cases written after development may reveal those differences too late. BDD moves the conversation earlier and uses examples to make abstract rules concrete.

A useful discovery conversation asks:

- What outcome are we trying to produce?
- Which rule decides the result?
- What is the simplest example of that rule?
- Where is its boundary?
- What happens when the precondition is not true?
- Which assumptions or unanswered questions could change the design?

The goal is shared understanding, not a large `.feature` file.

## Example mapping

I often use example mapping before writing Gherkin:

| Card | Meaning | Checkout example |
|---|---|---|
| Story | Desired outcome | Guest can buy without creating an account |
| Rule | Constraint that governs behaviour | `SENIORQA` applies a 15% discount |
| Example | Concrete case that illustrates a rule | £49.98 subtotal produces £7.50 discount |
| Question | Missing knowledge | Does discount apply before or after tax? |

If the question can materially change implementation, the work is not made ready by hiding it inside a scenario.

## Gherkin structure

### Feature

Names the capability and explains its value. A feature should be understandable without knowing the interface.

```gherkin
Feature: Guest checkout
  So that I can buy a guide without creating an account
  As a guest shopper
  I want to place an order using my email address
```

The role/value template is optional. Clear purpose is not.

### Rule

Groups examples under a business rule. It is valuable when a feature contains several distinct rules.

```gherkin
Rule: Eligible promotion reduces the order total by 15%
```

### Scenario

One concrete example of behaviour. Its name should describe the outcome, not repeat a click sequence.

```gherkin
Scenario: Apply the promotion before placing an order
  Given the guest has selected 2 BDD Field Guides at £24.99 each
  When they apply the promotion "SENIORQA"
  Then the discount should be £7.50
  And the order total should be £42.48
```

### Given, When and Then

- **Given** establishes relevant context, not every database detail.
- **When** describes the behaviour-triggering event. Most scenarios have one main `When`.
- **Then** describes observable outcomes, including important state changes.
- **And/But** improve readability without changing semantics.

The steps should describe behaviour at the domain level. Compare:

```gherkin
# Brittle and tied to the current UI
When I click the input with id "promo-code"
And I type "SENIORQA"
And I click the blue Apply button

# Describes the behaviour that matters
When the guest applies the promotion "SENIORQA"
```

UI mechanics belong in the automation layer. A scenario should normally survive a redesign that preserves behaviour.

### Background

Use `Background` for short context that genuinely applies to every scenario and improves comprehension. Do not use it as an invisible ten-step setup script. If readers must repeatedly scroll up to remember the state, it is doing harm.

### Scenario Outline

Use an outline when several examples express the same rule and only data changes.

```gherkin
Scenario Outline: Reject quantities outside the purchase limit
  Given the guest selected the BDD Field Guide
  When they request a quantity of <quantity>
  Then the order should be rejected with "<message>"

Examples:
  | quantity | message                          |
  | 0        | Quantity must be between 1 and 5 |
  | 6        | Quantity must be between 1 and 5 |
```

Do not turn every permutation into an outline. Large data matrices are usually clearer and faster at unit or API level.

### Data tables and doc strings

Use a data table when a step naturally consumes a small structured object. Use a doc string for a meaningful block such as a request payload. Neither should hide hundreds of test rows in a business-readable feature.

### Tags

Tags are useful for ownership, capability and selective execution, for example `@checkout`, `@smoke` or `@accessibility`. Avoid treating tags as a substitute for a considered test strategy. A scenario tagged `@regression` is not automatically valuable.

## Characteristics of a strong scenario

A strong scenario is:

- traceable to a rule, risk or decision;
- concrete enough that people agree on the result;
- independent of other scenario execution;
- focused on one behaviour or outcome;
- observable through public behaviour rather than internal implementation;
- written in language the delivery team and domain experts actually use;
- small enough that a failure has a useful meaning.

## Step-definition design

Step definitions translate domain language into automation. They should not become a second programming language assembled from generic Lego bricks.

Avoid steps such as:

```gherkin
When I click "<selector>"
Then element "<selector>" contains "<value>"
```

They make feature files verbose UI scripts, allow countless inconsistent phrases and move no complexity out of the scenario.

Prefer a thin domain vocabulary:

```javascript
When('I apply the promotion {string}', async function (promotion) {
  await this.page.getByTestId('promo-code').fill(promotion);
  await this.page.getByTestId('apply-promo').click();
});
```

In a larger suite, the step would call a Page Object or task-level helper so selectors and waiting behaviour are not duplicated. The repository’s executable example is in [checkout.steps.js](../../tests/bdd/steps/checkout.steps.js).

## BDD and the test pyramid

BDD examples are not synonymous with browser tests. A scenario can drive a unit, component, API or UI check. Choose the lowest layer that proves the rule:

- Promotion arithmetic: unit/service examples.
- API status and error schema: API examples.
- One critical guest journey: UI example.
- Subjective clarity and recovery: exploratory testing.

Running every example through a browser produces slow feedback and unclear failures.

## Common failure modes

### Writing scenarios after development

This may create executable documentation, but it loses much of BDD’s discovery value. The examples should influence design before or during implementation.

### Automating every conversation example

Some examples exist to clarify the rule; they do not all provide independent regression value. Consolidate at the appropriate layer.

### Treating Gherkin as a test-case format

Detailed navigation, data setup and expected values for every field create expensive scripts disguised as business language.

### One scenario tests everything

A long end-to-end scenario creates many possible causes for one red result and makes state recovery difficult. Split by meaningful behaviour, not by arbitrary step count.

### Shared steps become ambiguous

Similar regex-heavy steps can match unexpectedly and build an inconsistent vocabulary. Prefer cucumber expressions, clear domain phrases and ownership of the step catalogue.

### Feature files are never read

If product and engineering do not use the scenarios during discovery or review, the maintenance cost may exceed the documentation value. The team should change the practice rather than preserve ceremonial Gherkin.

## When I would not use Gherkin

- The rule is purely technical and clearer as a focused code test.
- The behaviour has a large combinatorial data set.
- The expected result is inherently visual or subjective.
- The team has no audience that benefits from the extra natural-language layer.
- The scenario would simply duplicate an existing contract or unit specification.

BDD conversations can still be useful even when no `.feature` file is created.

## Review checklist

- Does the feature explain an outcome rather than a screen?
- Can every scenario be linked to a rule, example or material risk?
- Is the main action clear and the outcome observable?
- Are business terms consistent across scenarios and step definitions?
- Are UI mechanics and implementation details hidden below the Gherkin?
- Are backgrounds short and outlines genuinely the same behaviour?
- Is each scenario independent and diagnosable?
- Is the execution layer appropriate, or are we using the browser by default?
- Are unanswered questions visible rather than encoded as assumptions?
- Would deleting or consolidating any scenario preserve the same confidence?

## Runnable example

- [Guest checkout feature](../../tests/bdd/features/guest-checkout.feature)
- [Cucumber step definitions](../../tests/bdd/steps/checkout.steps.js)
- [Cucumber hooks and failure evidence](../../tests/bdd/support/hooks.js)
- [Feature ticket that supplies the rules](../examples/feature-ticket.md)
