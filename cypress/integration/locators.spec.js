describe('Work with basic elements', () => {
    // Antes de executar cada bloco it de testes, o visit será executado
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })

//    it('using jquery selector', () => {
//     cy.get(':nth-child(1)' > ':nth-child(3) > [type="button"]' )
//    })

   it('using xpath', () => {
       cy.xpath('//input[contains(@onclick, \'Francisco\')]')
       cy.xpath('//table[@id=\'tabelaUsuarios\']/tbody/tr/td[contains(., \'Francisco\')]/following-sibling::td/input')
   })

})