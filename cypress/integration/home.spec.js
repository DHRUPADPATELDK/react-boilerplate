/// <reference types="Cypress" />

context('Home', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('URL'));
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Change Language', () => {
    cy.location('pathname')
      .get('#changeLanguage')
      .invoke('val', 'nl')
      .trigger('change')
      .getCookies()
      .should(cookies => {
        const filterCookie = cookies.filter(c => c.name === 'language');
        expect(filterCookie[0]).to.have.property('name', 'language');
        expect(filterCookie[0]).to.have.property('value', 'nl');
        expect(filterCookie[0]).to.have.property('httpOnly', false);
        expect(filterCookie[0]).to.have.property('secure', false);
        expect(filterCookie[0]).to.have.property('domain');
        expect(filterCookie[0]).to.have.property('path');
      })
      .get('#changeLanguageLabel')
      .should('have.html', 'Selecteer taal')
      .get('#changeLanguage')
      .invoke('val', 'en')
      .trigger('change')
      .getCookies()
      .should(cookies => {
        const filterCookie = cookies.filter(c => c.name === 'language');
        expect(filterCookie[0]).to.have.property('name', 'language');
        expect(filterCookie[0]).to.have.property('value', 'en');
        expect(filterCookie[0]).to.have.property('httpOnly', false);
        expect(filterCookie[0]).to.have.property('secure', false);
        expect(filterCookie[0]).to.have.property('domain');
        expect(filterCookie[0]).to.have.property('path');
      })
      .get('#changeLanguageLabel')
      .should('have.html', 'Select Language');
  });
});
