/// <reference types="Cypress" />

context('Login', () => {
  const fillEmail = () => {
    cy.get('input[name="email"]')
      // Delay each keypress by 0.1 sec
      .type('slow.typing@email.com', { delay: Cypress.env('typingDelay') })
      .should('have.value', 'slow.typing@email.com');
  };

  const fillPassword = () => {
    cy.get('input[name="password"]')
      // Delay each keypress by 0.1 sec
      .type('admin@123', { delay: Cypress.env('typingDelay') })
      .should('have.value', 'admin@123');
  };

  beforeEach(() => {
    cy.visit(Cypress.env('URL'));
    cy.get('#topNavMenu')
      .contains('Login')
      .click();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Submit blank form', () => {
    cy.get('#loginFormSubmitBtn')
      .click({ force: true })
      .should('have.attr', 'disabled')
      .location('pathname')
      .should('not.include', 'dashboard');
  });

  it('Enter Email & Submit', () => {
    fillEmail();

    cy.get('#loginFormSubmitBtn')
      .click()
      .location('pathname')
      .should('not.include', 'dashboard');
  });

  it('Enter Password & Submit', () => {
    fillPassword();

    cy.get('#loginFormSubmitBtn')
      .click()
      .location('pathname')
      .should('not.include', 'dashboard');
  });

  it('Enter correct credentials', () => {
    fillEmail();

    fillPassword();

    cy.get('#loginFormSubmitBtn').should('not.have.attr', 'disabled');

    cy.get('#loginFormSubmitBtn')
      .click()
      .location('pathname')
      .should('include', 'dashboard');

    cy.get('#topNavMenu').should('contain', 'Dashboard');
  });
});
