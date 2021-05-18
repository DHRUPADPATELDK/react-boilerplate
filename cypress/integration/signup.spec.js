/// <reference types="Cypress" />

context('Signup', () => {
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

  const fillFirstName = () => {
    cy.get('input[name="firstName"]')
      // Delay each keypress by 0.1 sec
      .type('Mayank', { delay: Cypress.env('typingDelay') })
      .should('have.value', 'Mayank');
  };

  const fillLastName = () => {
    cy.get('input[name="lastName"]')
      // Delay each keypress by 0.1 sec
      .type('Patel', { delay: Cypress.env('typingDelay') })
      .should('have.value', 'Patel');
  };

  beforeEach(() => {
    cy.visit(Cypress.env('URL'));
    cy.get('#topNavMenu')
      .contains('Signup')
      .click();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Submit blank form', () => {
    cy.get('#signupFormSubmitBtn')
      .click({ force: true })
      .should('have.attr', 'disabled')
      .location('pathname')
      .should('not.include', 'login');
  });

  it('Enter First Name & Submit', () => {
    fillFirstName();

    cy.get('#signupFormSubmitBtn')
      .click()
      .location('pathname')
      .should('include', 'signup');
  });

  it('Enter Last Name & Submit', () => {
    fillLastName();

    cy.get('#signupFormSubmitBtn')
      .click()
      .location('pathname')
      .should('include', 'signup');
  });

  it('Enter Email & Submit', () => {
    fillEmail();

    cy.get('#signupFormSubmitBtn')
      .click()
      .location('pathname')
      .should('include', 'signup');
  });

  it('Enter Password & Submit', () => {
    fillPassword();

    cy.get('#signupFormSubmitBtn')
      .click()
      .location('pathname')
      .should('include', 'signup');
  });

  it('Submit form with all fields', () => {
    fillFirstName();

    fillLastName();

    fillEmail();

    fillPassword();

    cy.get('#signupFormSubmitBtn').should('not.have.attr', 'disabled');

    cy.get('#signupFormSubmitBtn')
      .click()
      .location('pathname')
      .should('not.include', 'signup');
  });
});
