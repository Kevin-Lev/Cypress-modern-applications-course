describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        
        // cy.pause()

        // const title = cy.title() //pega o título
        // console.log(title) // dá erro pois retorna um chainer, já que tudo no cypress é assincrono praticamente

        // assertivas são o que garantem que certas ações vão ter o comportamento esperado

        // cy.title().should('to.be.equal') // não fica muito legível, remover o to
        // cy.title().should('be.equal', 'asdsad') // o should permite fazer assertivas
        // cy.title().debug().should('be.equal', 'Campo de Treinamento').should('contain', 'Campo')
        // cy.title().should('be.equal', 'Campo de Treinamento').and('contain', 'Campo') // mesma coisa que de cima, trocando should por and

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)
        })

        let syncTitle

        cy.title().should(title => {
            console.log(title)
        })

        cy.get('[data-cy=dataSobrenome').then($el => {
            $el.val()
        })
    })

    it('Should find and interact with an element', () => {
        // cy.get('nao existe')
        cy.get('#buttonSimple').click().should('have.value', 'Obrigado!')
    })
})