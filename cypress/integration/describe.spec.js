//vs-code reconhece os comandos do cypress
/// <reference types="cypress" /> 

// it() dá o escopo de um teste

it('A external test...', () => {

})

// it.only('A external test...', () => {

// })

// describe() é usado para agrupar os testes

describe('Should group testes...', () => {
    it('A internal test...', () => {

    })

    describe('Should group more specific tests...', () => {
        it('a specific test...', () => {

        })
    })

    describe('Should group more specific tests 2...', () => {
        it('a specific test... 2', () => {

        })
    })

})