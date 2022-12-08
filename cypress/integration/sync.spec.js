describe('Esperas...', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })

    it('Deve fazer retries', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist').should('not.exist')
        // cy.get('#novoCampo').type('funciona')
    })

    it('Uso do find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li').find('span').should('contain', 'Item 1')
        // cy.get('#lista li').find('span').should('contain', 'Item 2')
        cy.get('#lista li span').should('contain', 'Item 2')
    })

    it('Uso do Timeout', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000 }).should('exist')
        // cy.get('#buttonListDOM').click()
        // cy.wait(5000)
        // cy.get('#lista li span').should('contain', 'Item 2')
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', { timeout: 30000 }).should('have.length', 2)

    })

    it.only('Click retry', () => {
        cy.get('#buttonCount').click().should('have.value', '11')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li span').should($el => {
            expect($el).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')
    })
})