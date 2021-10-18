import cy from 'cypress';

describe('Navigation', () => {
  it('Should open a blog post', () => {
    cy.visit('/');
    cy.get('a[*href*="music"]').click()
    cy.url().should('include', '/music')
    cy.get('h1').contains('Music')
  })
})
