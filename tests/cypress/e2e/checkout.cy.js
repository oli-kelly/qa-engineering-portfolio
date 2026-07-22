describe('guest checkout', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/products').as('products');
    cy.visit('/');
    cy.wait('@products').its('response.statusCode').should('be.oneOf', [200, 304]);
  });

  it('places a discounted order and verifies the network contract', () => {
    cy.intercept('POST', '/api/orders').as('createOrder');
    cy.get('[data-testid="product"]').select('course-bdd');
    cy.get('[data-testid="quantity"]').clear().type('2');
    cy.get('[data-testid="promo-code"]').type('seniorqa');
    cy.get('[data-testid="apply-promo"]').click();
    cy.get('[data-testid="email"]').type('cypress@example.test');
    cy.get('[data-testid="place-order"]').click();

    cy.wait('@createOrder').then(({ request, response }) => {
      expect(request.body).to.deep.include({ quantity: 2, promoCode: 'seniorqa' });
      expect(response.statusCode).to.eq(201);
      expect(response.body.pricing.total).to.eq(42.48);
    });
    cy.contains('h2', 'Order confirmed').should('be.visible');
    cy.get('[data-testid="confirmation-total"]').should('have.text', '£42.48');
  });

  it('keeps a failed API response visible to the user', () => {
    cy.intercept('POST', '/api/orders', {
      statusCode: 503,
      body: { code: 'SERVICE_UNAVAILABLE', message: 'Checkout is temporarily unavailable.' }
    });
    cy.get('[data-testid="product"]').select('course-bdd');
    cy.get('[data-testid="email"]').type('cypress@example.test');
    cy.get('[data-testid="place-order"]').click();
    cy.get('[role="alert"]').should('have.text', 'Checkout is temporarily unavailable.');
  });
});
