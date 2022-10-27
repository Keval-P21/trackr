describe('login test', ()=>{
  
  it("should login", ()=>{
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type("shariar.akash@gmail.com")
    cy.get("#password").type("123456")
    cy.get("button").contains("Log In").click()
    cy.contains("Dashboard")
  })
  it("should load dashboard",()=>{
    cy.contains("Dashboard").click()
    cy.contains("Pending");
  })
  //JOB STARTS
  it("should load job details page", ()=>{
    cy.contains("Details").click();
    cy.contains("Job Details");
  })
  it("should edit job details", ()=>{
    cy.get("button").contains("Edit").click();
    cy.contains("Cancel");
    cy.contains("Save");
    cy.get("#title").clear().type("software engineer")
    cy.get("button").contains("Save").click()
  })
  it("should add job",()=>{
    cy.get(".nav-item").contains("Add Job").click()
    cy.get("#jobTitle").type("A test job12")
    cy.get("#company").type("Codeworks1");
    cy.get("select").select("Pending");
    cy.get(".btn-save").click();
  })
  it("should delete job",()=>{
    cy.visit('http://localhost:3000')
    cy.get('.card-panel:contains("A test job12")').find("button").click();
    cy.get("button.btn-confirm").click()
    
  })
  //JOB ENDS 

  // it("should add task", ()=>{
  //     cy.get("[class='form-input-task']").type("New Task")
  //     cy.get("button.btn-add[type='submit']").click()
  //     cy.contains("New Task")
  // })
  it("should log out", ()=>{
    cy.get(".btn-logout").click()
    cy.contains("Login");
  })
})