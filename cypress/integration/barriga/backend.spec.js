/// <reference types="cypress" />

describe('Should test at functional level', () => {
    let token
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        cy.getToken('a@a', 'a').then(tkn => {
            token = tkn
        })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')
        

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Should update an account', () =>{
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: {
                Authorization: `JWT ${token}`
            },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0]}`,
                method: 'PUT',
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: 'Conta alterada via rest'
                }
            }).as('response')
        })

        // cy.get('@response').its('status').should('be.equal', 200)
    })

    it.only('Should not create an account with same name', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')


        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            // expect(res.body).to.have.property('id')
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it.only('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentações').then(contaId => {

        })
        cy.request({
            method: 'POST',
            url: '/transacoes',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
               conta_id: "41058",
               data_pagamento: Cypress.moment.add({days: 1}).format('DD/MM/YYYY'),
                data_transacao: Cypress.moment().format('DD/MM/YYYY'),
               descricao: "desc",
               envolvido: "inter",
               status: true,
               tipo: "REC",
               valor: "123"
            }
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it.only('should get balance', () => {
        let saldoConta = null
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') {
                    saldoConta = c.saldo
                }
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            url: '/dashboard',
            method: '/GET',
            qs: { descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            console.log(res.body[0])
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    valor: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

    })

    it('Should remove a transaction', () => {
        cy.request({
            url: '/dashboard',
            method: 'GET',
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                // headers: { Authorization: `JWT ${token}` },
            })
        }).its('status').should('be.equal', 204)
    })

})