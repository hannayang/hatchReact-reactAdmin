describe('Home', () => {
  it('visits the home page', () => {
    cy.visitHome();
    cy.get('[data-cy=page-home]').should('exist');
  });
});
