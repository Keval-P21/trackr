/// <reference types="cypress" />

describe('Tracker Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })


  it('should not log in with wrong credentials', () => {
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('#password').type('pass');
    cy.get('button').contains('Log In').click();

    cy.get('p').should('contain', 'Log in failed');
  })


  it('should not log in with missing fields', () => {
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('button').contains('Log In').click();

    cy.should('not.contain', "Dashboard");
    cy.should('not.contain', "Logout");
  })


  it('should login to dashboard', () => {
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('#password').type('samiyakazi');
    cy.get('button').contains('Log In').click();

    cy.contains("Dashboard");
    cy.contains("Logout");

    cy.contains("Logout").click();
  })
})