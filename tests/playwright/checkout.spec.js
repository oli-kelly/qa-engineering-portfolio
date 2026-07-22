import { test, expect } from '@playwright/test';
import { CheckoutPage } from './pages/CheckoutPage.js';

test.describe('guest checkout @smoke', () => {
  test('applies a valid promotion and confirms the order', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await test.step('Given a guest has selected the BDD guide', async () => {
      await checkout.open();
      await checkout.configureOrder({
        productId: 'course-bdd',
        quantity: 2,
        promoCode: 'seniorqa',
        email: 'oliver@example.test'
      });
    });

    await test.step('Then the discount is visible before purchase', async () => {
      await expect(checkout.promoStatus).toHaveText('15% discount applied.');
      await expect(page.locator('#discount')).toHaveText('-£7.50');
      await expect(page.locator('#total')).toHaveText('£42.48');
    });

    await test.step('When the guest places the order, a traceable confirmation is shown', async () => {
      await checkout.placeOrder();
      await checkout.expectConfirmation({ email: 'oliver@example.test', total: '£42.48' });
    });
  });

  test('explains why an unknown promotion cannot be used', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.open();
    await checkout.configureOrder({ promoCode: 'EXPIRED', email: 'oliver@example.test' });

    await expect(checkout.promoStatus).toHaveText('Promo code is not recognised.');
    await checkout.placeOrder();
    await expect(checkout.error).toHaveText('Promo code is not recognised.');
    await expect(page.getByRole('heading', { name: 'Order confirmed' })).toBeHidden();
  });
});
