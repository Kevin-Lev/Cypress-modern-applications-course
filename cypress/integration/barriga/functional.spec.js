/// <reference types="cypress" />

import '../../support/commandsContas'
import loc from '../../support/locators'

describe('Should test at functional level', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        cy.login('a@a', 'a')
        cy.resetApp()
    })

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta de teste')
        cy.get(loc).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () =>{
        // cy.get(':nth-child(7) > :nth-child(2) > .fa-edit')
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MENU.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MENU.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MENU.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta alterada')
        cy.get(loc.MENU.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
    })

    it('should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain')
    })

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO)
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Conta alterada'))
    })
})