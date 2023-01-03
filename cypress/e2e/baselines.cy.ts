describe('Baselines Tests', () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: 'api/baseline',
        method: 'GET',
      },
      {
        fixture: 'get-all-baselines.json',
      }
    ).as('getAllBaselines');

    cy.visit('/');
    cy.wait('@getAllBaselines');
  });

  it('Add baseline', () => {
    cy.getBySelector('actual-part-number').should('be.enabled').type('ABC123');
    cy.getBySelector('target-part-number')
      .should('be.enabled')
      .type('TARGET123');

    cy.getBySelector('save-button')
      .should('be.enabled')
      .should('have.text', ' Save ')
      .click();
  });

  it('Reset baseline form', () => {
    cy.getBySelector('actual-part-number').should('be.enabled').type('ABC123');
    cy.getBySelector('target-part-number')
      .should('be.enabled')
      .type('TARGET123');

    cy.getBySelector('reset-button')
      .should('be.enabled')
      .should('contain.text', 'Reset')
      .click();

    cy.log('Reseted');

    cy.getBySelector('actual-part-number').should('be.empty');
    cy.getBySelector('target-part-number').should('be.empty');
    cy.getBySelector('save-button').should('be.disabled');
  });

  it('Add baseline with mocked request', () => {
    cy.intercept(
      {
        url: 'api/baseline',
        method: 'POST',
      },
      {
        fixture: 'save-baseline.json',
      }
    ).as('saveBaselineRequest');

    cy.getBySelector('actual-part-number').should('be.enabled').type('123');
    cy.getBySelector('target-part-number').should('be.enabled').type('345');

    cy.getBySelector('save-button')
      .should('be.enabled')
      .should('have.text', ' Save ')
      .click();

    cy.wait('@saveBaselineRequest');
    cy.contains('Actual: 123');
  });

  it('Remove baseline', () => {
    cy.intercept(
      {
        url: 'api/baseline/*',
        method: 'DELETE',
      },
      { statusCode: 200 }
    ).as('removeBaseline');

    cy.contains('Actual: mock3')
      .parent()
      .siblings()
      .find('[data-cy="delete-button"]')
      .should('exist')
      .click();

    cy.wait('@removeBaseline');

    cy.contains('Actual: mock3').should('not.exist');
  });
});
