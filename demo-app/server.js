import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT ?? 4173);
const directory = path.dirname(fileURLToPath(import.meta.url));

const products = [
  { id: 'course-bdd', name: 'BDD Field Guide', price: 24.99 },
  { id: 'course-api', name: 'Practical API Testing', price: 34.99 }
];

const roundMoney = (value) => Math.round(value * 100) / 100;

app.use(express.json());
app.use(express.static(path.join(directory, 'public')));

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/products', (_request, response) => {
  response.json({ products });
});

app.post('/api/orders', (request, response) => {
  const { productId, quantity, promoCode, email } = request.body ?? {};
  const product = products.find((candidate) => candidate.id === productId);

  if (!product) {
    return response.status(400).json({ code: 'INVALID_PRODUCT', message: 'Select a valid product.' });
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 5) {
    return response.status(400).json({ code: 'INVALID_QUANTITY', message: 'Quantity must be between 1 and 5.' });
  }

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ code: 'INVALID_EMAIL', message: 'Enter a valid email address.' });
  }

  const normalisedPromo = String(promoCode ?? '').trim().toUpperCase();
  if (normalisedPromo && normalisedPromo !== 'SENIORQA') {
    return response.status(422).json({ code: 'INVALID_PROMO', message: 'Promo code is not recognised.' });
  }

  const subtotal = roundMoney(product.price * quantity);
  const discount = normalisedPromo === 'SENIORQA' ? roundMoney(subtotal * 0.15) : 0;
  const total = roundMoney(subtotal - discount);

  return response.status(201).json({
    orderId: `ORD-${Date.now()}`,
    email,
    product: { id: product.id, name: product.name },
    quantity,
    pricing: { subtotal, discount, total, currency: 'GBP' }
  });
});

app.listen(port, '127.0.0.1', () => {
  console.log(`QA portfolio demo app listening on http://127.0.0.1:${port}`);
});
