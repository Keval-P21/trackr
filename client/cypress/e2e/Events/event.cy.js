describe('Add Events Flow',function (){
    
    it('login',function(){
        cy.visit('http://localhost:3000')
        // cy.get('#email')
        //     .type('noel.alam2323@gmail.com')
        // cy.get('#password')
        //     .type('test123123')
        // cy.get('.btn').click()
    })

    it('checks if details button on the card navigates to the right page',function(){
        
        cy.get('.btn.btn-detail')
            .click();
        cy.url().should('include','/job/')        
    })

    it('empty entry cannot be submitted', function (){
        let count = 0;
        cy.get('.todo-item').then((items)=>{
            count = items.length;
        });
        cy.get('.btn-save').contains('Save').click();
        cy.get('.todo-item').then((items)=>{
            expect(items.length).to.eql(count)    
        });    
    })

    it('All fields can take input', function(){
        cy.get('#name')
            .type('Test Event Name');
        cy.get('input[id=description]')
            .type('Test Description ');
        // cy.get('#location')
        //     .type('Test Location')
        cy.get('#startDateTime')
            .type('2022-08-03T01:04');
        cy.get('#endDateTime')
            .type('2022-08-03T01:04');    
            
    })

    it('Date before today cannot be entered',function(){
        let count = 0;
        cy.get('.todo-item').then((items)=>{
            count = items.length;
        })

        cy.get('#startDateTime')
            .type('2022-08-03T01:04')

        cy.get('.btn-save').contains('Save').click()
        cy.get('.todo-item').then((items)=>{
            expect(items.length).to.eql(count)    
        })   
    })

    it('Date before start date cannot be entered',function(){

        let count = 0;

        cy.get('.todo-item').then((items)=>{
            count = items.length;
        });

        cy.get('#startDateTime')
            .type('2022-08-09T01:04');
        
        cy.get('#endDateTime')
            .type('2022-08-03T01:04');    

        cy.get('.btn-save').contains('Save').click();

        cy.get('.todo-item').then((items)=>{
            expect(items.length).to.eql(count)    
        });  
    })

    it('Check if Submit Works',function(){
        let count = 0;
        cy.get('.todo-item').then((items)=>{
            count = items.length;
        });

        cy.get('#startDateTime')
            .type('2022-08-15T01:04');
        cy.get('#endDateTime')
            .type('2022-08-17T01:04');      

        cy.get('.btn-save').contains('Save').click();
     
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(3000);
       
        cy.get('.todo-item').then((items)=>{
            expect(items.length).to.eql(count+1)    
        });  
    })

    it('Check if Delete Works',function(){
        let count = 0;
        cy.get('.todo-item').then((items)=>{
            count = items.length;
        });

        cy.get('.material-icons').contains('delete').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(3000);
        cy.get('.todo-item').then((items)=>{
            expect(items.length).to.eql(count-1)    
        });  
    })
})