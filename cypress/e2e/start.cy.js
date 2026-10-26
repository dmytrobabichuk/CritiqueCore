describe('Запуск застосунку', () => {
  it('відкриває стартовий екран', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'CritiqueCore');
    cy.contains('Каркас навчального проєкту.').should('be.visible');
  });
});
