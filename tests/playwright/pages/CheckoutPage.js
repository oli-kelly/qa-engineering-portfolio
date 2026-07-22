import { expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.product = page.getByTestId('product');
    this.quantity = page.getByTestId('quantity');
    this.promoCode = page.getByTestId('promo-code');
    this.applyPromoButton = page.getByTestId('apply-promo');
    this.email = page.getByTestId('email');
    this.placeOrderButton = page.getByTestId('place-order');
    this.promoStatus = page.getByRole('status');
    this.error = page.getByRole('alert');
  }

  async open() {
    await this.page.goto('/');
    await expect(this.product).toContainText('BDD Field Guide');
  }

  async configureOrder({ productId = 'course-bdd', quantity = 1, promoCode, email }) {
    await this.product.selectOption(productId);
    await this.quantity.fill(String(quantity));
    if (promoCode !== undefined) {
      await this.promoCode.fill(promoCode);
      await this.applyPromoButton.click();
    }
    await this.email.fill(email);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async expectConfirmation({ email, total }) {
    await expect(this.page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
    await expect(this.page.getByTestId('order-reference')).toHaveText(/^ORD-\d+$/);
    await expect(this.page.getByTestId('confirmation-email')).toHaveText(email);
    await expect(this.page.getByTestId('confirmation-total')).toHaveText(total);
  }
}
