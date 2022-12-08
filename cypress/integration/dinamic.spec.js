/// <reference types="cypress" />

describe('Dinamic tests', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    food.forEach(food => {
        it('Cadastro com comida variada', () => {
            cy.get('#formNome').type('Usuario')
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get(`#formEscolaridade`).select('Doutorado')
            cy.get(`#formEsportes`).select('Corrida')
        })
    })

    it.only('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Usuario')
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=F]`).click()
        cy.get(`[name=formComidaFavorita]`).each($el => {
            if($el.val() !== 'vegetariano') {
                cy.wrap($el).click()
            }
        })
        cy.get(`#formEscolaridade`).select('Doutorado')
        cy.get(`#formEsportes`).select('Corrida')

        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})