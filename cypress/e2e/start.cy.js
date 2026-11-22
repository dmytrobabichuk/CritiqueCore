describe('Запуск застосунку', () => {
  it('відкриває стрічку обговорень', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', 'Обговорення');
    cy.contains('a', 'Створити тему').should('be.visible');
  });
});
