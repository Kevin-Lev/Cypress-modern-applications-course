/// <reference types="cypress" />

describe('Work with basic elements', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        // cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('body').should('contain.text', 'Cuidado')
        // cy.get('body').should('have.text', 'Cuidado')
        cy.get('span').should('contain.text', 'Cuidado')
        cy.get('.facilAchar').should('contain.text', 'Cuidado')
    })
    
    it('Link', () => {
        // cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()
        cy.get('#resultado').should('not.have.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('TextFields', () => {
        cy.get('#formNome').type('Cypress Teste')
        cy.get('#formNome').should('have.value', 'Cypress Teste')
        cy.get('#elementosForm\\:sugestoes').type('textArea').should('have.value', 'textArea')

        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem').click().should('be.checked')

        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name='formSexo").should('have.length', 2)
    })

    it('CheckBox', () => {
        cy.get('#formComidaCarne').click().should('be.checked')
        
        cy.get('[name=formComidaFavorita]').click({multiple: true})
        cy.get('#formComidaCarne').should('not.be.checked')
        cy.get('#formComidaPizza').should('be.checked')
    })

    it.only('Combo', () => {
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp')
            .should('have.value', '1graucomp')

        cy.get('[data-test="dataEscolaridade"] option')
            .should('have.length', '8')
            .should('have.value', '1grauincomp')

        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })
    })


    it('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida', 'nada'])
        cy.get('[data-testid=dataEsportes').then($el => {
            expect($el.val()).to.have.length(3)
        })

        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'])
        
    })

})

// describe('Work with basic elements', () => {
//     before(() => {
//         cy.visit('https://wcaquino.me/cypress/componentes.html')
//     })
//     it('externo', ()=> {

//     })
// })
