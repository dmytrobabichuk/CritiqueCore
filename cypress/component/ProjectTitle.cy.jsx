import ProjectTitle from '../../src/components/ProjectTitle';

describe('ProjectTitle', () => {
  it('показує назву проєкту', () => {
    cy.mount(<ProjectTitle />);
    cy.get('h1').should('have.text', 'CritiqueCore');
  });
});
