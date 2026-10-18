describe('Запуск застосунку', () => {
  it('відкриває стрічку обговорень', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Обговорення');
    cy.contains('Спочатку контекст. Потім — код.').should('be.visible');
  });
});
