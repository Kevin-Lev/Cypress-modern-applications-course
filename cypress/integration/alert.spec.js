describe('Work with alerts', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    it('Alert', () => {
        // cy.get('#alert').click()
        // cy.on('window:alert', msg => {
        //     console.log(msg)
        //     expect(msg).to.be.equal('Alert Simples')
        // })
        cy.clickAlert('#alert', 'Alert simples com comando')
    })

    it.only('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it.only('Confirm', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })

        cy.get('#confirm').click()
    })

    it.only('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
            return false
        })

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it.only('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
        cy.get('#formNome').type('Wagner')

        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
        cy.get('[data-cy=dataSobrenome').type('Aquino')

        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })

})