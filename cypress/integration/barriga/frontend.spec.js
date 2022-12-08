/// <reference types="cypress" />

import buildEnv from '../../support/buildEnv'
import '../../support/commandsContas'
import loc from '../../support/locators'

describe('Should test at functional level', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        buildEnv()

        cy.login('a@a', 'senha errada')
    })

    it('Should create an account', () => {
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                },
            ],
        }).as('contasSave')
    })

    it('Should validate data send to create an account', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3,
                nome: 'Conta de teste',
                visivel: true,
                usuario_id: 1
            }.as('saveConta'),
            onRequest: req => {
                expect(req.request.body.nome).to.be.null
                expect(req.request.headers).to.have.property('Authorization')
            }
        })

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                },
            ],
        }).as('contasSave')
    })

    it('Should update an account', () =>{
        // cy.get(':nth-child(7) > :nth-child(2) > .fa-edit')
        // cy.get(loc.MENU.SETTINGS).click()
        // cy.get(loc.MENU.CONTAS).click()
        // cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        // cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        // cy.get(loc.CONTAS.BTN_SALVAR).click()
        // cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                },
            ],
        }).as('contas')

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: [
                {
                    id: 1,
                    nome: 'Conta alterada',
                    visivel: true,
                    usuario_id: 1
                }
            ],
        }).as('contas')
    })

    it('Should not create an account with same name', () => {
        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: 'fixture/movimentacaoSalva'
        })
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
        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 999,
                    conta: "Carteira",
                    saldo: "4034.00"
                },
                {
                    conta_id: 9909,
                    conta: "Banco",
                    saldo: "10000000.00"
                }
            ]
        }).as('contas')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta alterada')).should('contain')
    })

    it('Should remove a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: 204,
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO)
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Conta alterada'))
    })

    it.only('Should test colors', () => {
        cy.get(loc.MENU.EXTRATO).click()

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                },
            ],
        }).as('contas')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPendente')
    })

    it.only('Should test the responsiveness', () => {
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')

        cy.viewport(500, 700)
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')

        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')

        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist').and('not.be.visible')
    })
})