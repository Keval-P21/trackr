/// <reference types="cypress" />

describe('Add Task', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');
  })

  after(() => {
    //Delete test job
    cy.visit('http://localhost:3000/');
    cy.wait(2000);
    cy.get('.card-panel:contains("Test title")').find('button').click();
    cy.get('.btn-confirm').click();

    //Logout
    cy.contains("Logout").click();
    
  })


  it('should delete task from a job', () => {
    //Login and add test job and task
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('#password').type('samiyakazi');
    cy.get('button').contains('Log In').click();

    cy.contains("Dashboard");
    cy.contains("Logout");

    cy.visit('http://localhost:3000/createJob');
    cy.get('#jobTitle').type('Test title');
    cy.get('#company').type('Test company');
    cy.get('#status').select('pending');
    cy.get('button').contains('Add Job').click();

    cy.get('.card-panel:contains("Test title")').find('div').find('a').click();
    cy.get('.form-input-task').type('Test task');
    cy.get('button').contains('+').click();


    //Delete task
    cy.get('.task-cont:contains("Test task")').find('button').click();

    //Check for task
    cy.get('.task-cont:contains("Test task")').should('not.exist');
  })



  // it('should add tasks to Events & Tasks page', () => {
  //   cy.visit('http://localhost:3000/tasks')
  //   cy.get('div:contains("Test title - Test company")').should('contain', 'Test task');
  // })
})