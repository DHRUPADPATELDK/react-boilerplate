/// <reference types="Cypress" />

context('ForgotPassword', () => {
  const fillEmail = () => {
    cy.get('input[name="email"]')
      // Delay each keypress by 0.1 sec
      .type('slow.typing@email.com', { delay: Cypress.env('typingDelay') })
      .should('have.value', 'slow.typing@email.com');
  };

  beforeEach(() => {
    cy.visit(Cypress.env('URL'));
    cy.get('#topNavMenu')
      .contains('Login')
      .click();
    cy.get('.btn.btn-link')
      .contains('Forgot your password')
      .click();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Submit blank form', () => {
    cy.get('#forgotPasswordFormSubmitBtn')
      .click({ force: true })
      .should('have.attr', 'disabled')
      .location('pathname')
      .should('not.include', 'login');
  });

  it('Submit form with all fields', () => {
    fillEmail();

    cy.get('#forgotPasswordFormSubmitBtn').should('not.have.attr', 'disabled');

    cy.get('#forgotPasswordFormSubmitBtn')
      .click()
      .location('pathname')
      .should('not.include', 'forgot-password');
  });
});
