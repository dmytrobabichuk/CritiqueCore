import ProjectTitle from '../../src/components/ProjectTitle';

describe('ProjectTitle', () => {
  it('������ ����� ������', () => {
    cy.mount(<ProjectTitle />);
    cy.get('h1').should('have.text', 'CritiqueCore');
  });
});
