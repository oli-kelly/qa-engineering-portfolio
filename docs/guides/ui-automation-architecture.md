# UI automation architecture: Page Objects, Page Factory and maintainability

## The goal of an abstraction

UI automation should make test intent readable while containing browser mechanics that change together. An abstraction is useful when it reduces duplication, gives changes one home and improves diagnosis. More classes do not automatically mean better architecture.

## Page Object Model

A Page Object represents a meaningful page, component or user-facing capability. It usually owns locators and interaction behaviour, while the test owns the scenario and business assertion.

```javascript
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.promoCode = page.getByTestId('promo-code');
    this.applyPromo = page.getByTestId('apply-promo');
  }

  async applyPromotion(code) {
    await this.promoCode.fill(code);
    await this.applyPromo.click();
  }
}
```

The [Playwright CheckoutPage](../../tests/playwright/pages/CheckoutPage.js) is a working example.

### What belongs in a Page Object

- Stable semantic locators.
- Actions and state queries meaningful to the page/component.
- Waiting that is inherent to completing the action.
- Reusable assertions only when they express an invariant of that object.

### What often does not belong

- Entire multi-page business journeys.
- Test data generation unrelated to the interface.
- Assertions specific to one scenario hidden inside every action.
- A getter and setter for every DOM element.
- Knowledge of other unrelated pages.

For large applications, component objects and task/workflow objects can be more useful than one enormous class per URL.

## Page Factory

Page Factory is a Selenium support mechanism that initialises elements declared with annotations such as `@FindBy`. It is not a separate replacement for the Page Object Model; it is one way to implement element wiring inside a Page Object.

```java
@FindBy(css = "[data-testid='promo-code']")
private WebElement promoCode;

public CheckoutPage(WebDriver driver) {
    PageFactory.initElements(driver, this);
}
```

The repository’s [Java CheckoutPage](../../tests/selenium-java/src/test/java/uk/co/olikelly/qa/pages/CheckoutPage.java) uses Page Factory with explicit waits.

I would not introduce Page Factory solely because it is familiar. Plain `By` locators can be more explicit, and modern framework locators such as Playwright’s are lazy and auto-waiting. The choice should improve the current codebase’s clarity and behaviour.

## Locator strategy

Prefer locators that reflect user-visible semantics or an intentional test contract:

1. Accessible role and name when the semantics are stable.
2. Label, placeholder or meaningful text where appropriate.
3. Dedicated `data-testid` for dynamic/ambiguous controls.
4. CSS tied to structure only as a last resort.

Avoid XPath/CSS chains based on layout, generated class names and positional selectors. A locator that survives the wrong UI is also dangerous, so assert the meaningful state after navigation or action.

## Waiting and synchronisation

Never use fixed sleeps to guess when the product is ready. Wait for an observable condition related to the action:

- response or event completed;
- control becomes enabled/visible;
- specific state or content appears;
- navigation reaches the expected destination.

Playwright auto-waits for actionability, but it cannot infer every business-level readiness condition. Selenium normally needs explicit waits. Implicit waits can make timing and failure behaviour harder to reason about when mixed with explicit waits.

## Assertions and diagnosis

Keep business-specific assertions near the test so the expected outcome is visible. Page Objects can expose readable state or invariant checks. A method named `placeOrderAndVerifyEverything()` hides which expectation failed and encourages unrelated assertions.

On failure, retain the minimum useful evidence: step name, expected vs actual, screenshot, trace/network data and environment/build identity. Avoid capturing sensitive data by default.

## Test data and state

- Create data through APIs/builders rather than long UI setup when the setup is not under test.
- Give each test isolated, identifiable data.
- Control time/randomness when they affect expected results.
- Clean up safely or use disposable environments.
- Do not make test order part of the fixture.

## Common architecture smells

- One base page with dozens of unrelated helpers.
- Tests calling raw locators and Page Objects interchangeably.
- Assertions hidden inside every action.
- Generic `clickElement(string)` wrappers that add no domain meaning.
- Static shared drivers/pages causing parallel interference.
- Catching exceptions or retrying whole actions until a failure disappears.
- Page Objects mirroring implementation rather than user capabilities.

## Review checklist

- Does the test read as intent rather than DOM manipulation?
- Is each locator owned in one appropriate place?
- Are waits tied to observable readiness rather than time?
- Are assertions visible and diagnostically useful?
- Can tests run independently and in parallel?
- Is setup performed below the UI where it is not the subject?
- Does the abstraction reduce maintenance, or merely move code?
