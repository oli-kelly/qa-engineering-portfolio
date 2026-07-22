import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('the guest checkout is open', async function () {
  await this.page.goto('http://127.0.0.1:4173');
  await expect(this.page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
});

Given('I select {int} copy/copies of the {string}', async function (quantity, productName) {
  const product = this.page.getByTestId('product');
  await expect(product).toContainText(productName);
  const optionValue = await product.locator('option').filter({ hasText: productName }).getAttribute('value');
  await product.selectOption(optionValue);
  await this.page.getByTestId('quantity').fill(String(quantity));
});

When('I apply the promotion {string}', async function (promotion) {
  await this.page.getByTestId('promo-code').fill(promotion);
  await this.page.getByTestId('apply-promo').click();
});

Then('a 15% discount should be shown', async function () {
  await expect(this.page.getByRole('status')).toHaveText('15% discount applied.');
  await expect(this.page.locator('#discount')).toHaveText('-£7.50');
});

When('I place the order using {string}', async function (email) {
  await this.page.getByTestId('email').fill(email);
  await this.page.getByTestId('place-order').click();
});

Then('the order should be confirmed at {string}', async function (total) {
  await expect(this.page.getByRole('heading', { name: 'Order confirmed' })).toBeVisible();
  await expect(this.page.getByTestId('confirmation-total')).toHaveText(total);
});

Then('I should see the promotion message {string}', async function (message) {
  await expect(this.page.getByRole('status')).toHaveText(message);
});

Then('no discount should be applied', async function () {
  await expect(this.page.locator('#discount')).toHaveText('-£0.00');
});
