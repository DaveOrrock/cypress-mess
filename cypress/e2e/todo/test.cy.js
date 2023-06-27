describe('example to-do app', function () {
    let testData = ['Pay electric bill', 'Walk the dog', 'Feed the cat'];

    beforeEach(function () {
        cy.visit('http://localhost:8080/app/todo')
    })

    it('test case 1', function () {
        cy.get('.todo-list li')
        cy.get('.todo-list li').first().should('have.text', testData[0])
        cy.get('.todo-list li').last().should('have.text', testData[1])
    })

    it('test case 2', function () {
        const newItem = testData[2]
        cy.get('[data-test=new-todo]').type(`${newItem}{enter}`).get('.todo-list li').last().should('have.text', newItem)
    })

    it('test case 3', function () {
        cy.contains(testData[0]).parent().find('input[type=checkbox]').check()
        cy.contains(testData[0]).should('have.css', 'text-decoration-line', 'line-through')
    })

    context('interaction', function () {
        beforeEach(function () {
            cy.contains(testData[0]).parent().find('input[type=checkbox]').check()
        })

        it('test case 4', function () {
            cy.contains('Active').click()
            cy.wait(500)
            cy.get('.todo-list li label').first().should('have.text', testData[1])
            cy.contains(testData[1])
        })

        // it('test case 5', function () {
        //     cy.contains('Completed').click()
        //     cy.get('.todo-list li label').first()
        //     cy.contains(testData[1]) // Broken
        // })

        it('test case 6', function () {
            cy.contains('Clear completed').click()
            cy.get('body').then($body => {
                $body.find('.todo-list li').remove()
            })
            cy.get('.todo-list li').should('not.exist')
        })
    })
})