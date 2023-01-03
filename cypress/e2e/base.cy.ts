describe('Base Tests', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Communication');
  });
});
