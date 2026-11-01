describe('������ ����������', () => {
  it('������� ������ ����������', () => {
    cy.visit('/');
    cy.get('h1').should('have.text', '�����������');
    cy.contains('�������� ��������. ���� � ���.').should('be.visible');
  });
});
