import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
})

Cypress.Commands.add('inserirConta', () => {
    cy.get(loc.CONTAS.NOME).type('Conta de t3st3')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})
