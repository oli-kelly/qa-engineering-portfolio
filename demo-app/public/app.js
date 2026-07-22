const form = document.querySelector('#checkout-form');
const productSelect = document.querySelector('#product');
const quantityInput = document.querySelector('#quantity');
const promoInput = document.querySelector('#promo-code');
const promoStatus = document.querySelector('#promo-status');
const error = document.querySelector('#form-error');
const confirmation = document.querySelector('#confirmation');
let products = [];
let promoApplied = false;

const money = (value) => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);

function selectedProduct() {
  return products.find((product) => product.id === productSelect.value);
}

function updateSummary() {
  const product = selectedProduct();
  const quantity = Number(quantityInput.value || 0);
  const subtotal = product ? product.price * quantity : 0;
  const discount = promoApplied ? Math.round(subtotal * 15) / 100 : 0;
  document.querySelector('#subtotal').textContent = money(subtotal);
  document.querySelector('#discount').textContent = `-${money(discount)}`;
  document.querySelector('#total').textContent = money(subtotal - discount);
}

async function loadProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  products = data.products;
  productSelect.innerHTML = '<option value="">Choose a product</option>';
  for (const product of products) {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${money(product.price)}`;
    productSelect.append(option);
  }
  updateSummary();
}

document.querySelector('#apply-promo').addEventListener('click', () => {
  promoApplied = promoInput.value.trim().toUpperCase() === 'SENIORQA';
  promoStatus.textContent = promoApplied ? '15% discount applied.' : 'Promo code is not recognised.';
  promoStatus.classList.toggle('valid', promoApplied);
  promoStatus.classList.toggle('invalid', !promoApplied);
  updateSummary();
});

productSelect.addEventListener('change', updateSummary);
quantityInput.addEventListener('input', updateSummary);
promoInput.addEventListener('input', () => {
  promoApplied = false;
  promoStatus.textContent = '';
  updateSummary();
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  error.textContent = '';
  confirmation.hidden = true;

  const formData = new FormData(form);
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: formData.get('productId'),
      quantity: Number(formData.get('quantity')),
      promoCode: formData.get('promoCode'),
      email: formData.get('email')
    })
  });
  const result = await response.json();

  if (!response.ok) {
    error.textContent = result.message;
    return;
  }

  document.querySelector('[data-testid="order-reference"]').textContent = result.orderId;
  document.querySelector('[data-testid="confirmation-email"]').textContent = result.email;
  document.querySelector('[data-testid="confirmation-total"]').textContent = money(result.pricing.total);
  confirmation.hidden = false;
  confirmation.focus();
});

loadProducts().catch(() => {
  error.textContent = 'Products could not be loaded. Try again.';
});
