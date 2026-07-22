import { test, expect } from '@playwright/test';

test.describe('POST /api/orders', () => {
  test('creates an order with calculated GBP pricing', async ({ request }) => {
    const response = await request.post('/api/orders', {
      data: {
        productId: 'course-api',
        quantity: 2,
        promoCode: 'SENIORQA',
        email: 'api@example.test'
      }
    });

    expect(response.status()).toBe(201);
    expect(response.headers()['content-type']).toContain('application/json');
    const order = await response.json();
    expect(order).toMatchObject({
      email: 'api@example.test',
      product: { id: 'course-api', name: 'Practical API Testing' },
      quantity: 2,
      pricing: { subtotal: 69.98, discount: 10.5, total: 59.48, currency: 'GBP' }
    });
    expect(order.orderId).toMatch(/^ORD-\d+$/);
  });

  const invalidOrders = [
    { name: 'unknown product', patch: { productId: 'missing' }, status: 400, code: 'INVALID_PRODUCT' },
    { name: 'zero quantity', patch: { quantity: 0 }, status: 400, code: 'INVALID_QUANTITY' },
    { name: 'excess quantity', patch: { quantity: 6 }, status: 400, code: 'INVALID_QUANTITY' },
    { name: 'malformed email', patch: { email: 'not-an-email' }, status: 400, code: 'INVALID_EMAIL' },
    { name: 'unknown promo', patch: { promoCode: 'NOPE' }, status: 422, code: 'INVALID_PROMO' }
  ];

  for (const example of invalidOrders) {
    test(`rejects ${example.name} with a stable error contract`, async ({ request }) => {
      const response = await request.post('/api/orders', {
        data: {
          productId: 'course-bdd',
          quantity: 1,
          promoCode: '',
          email: 'api@example.test',
          ...example.patch
        }
      });

      expect(response.status()).toBe(example.status);
      expect(await response.json()).toMatchObject({ code: example.code });
    });
  }
});
