it('Equality', () => {
    const a = 1

    expect(a).equal(1)
    expect(a, 'Deveria ser igual a 1').equal(1)
    // expect(a, 'Deveria ser igual a 1').equal(2)
    expect(a).to.be.equal(1)
    expect(a, 'Deve ser diferente de 3').not.to.be.equal(3)
})

it('Truthy', () => {
    const a = true
    const b = null
    let c

    expect(true).to.be.true
    expect(true).not.to.be.false
    expect(b).to.be.null
    expect(a).not.to.be.null
    expect(c).to.be.undefined
})

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    // diferentes formas para a mesma função
    expect(obj).equal(obj)
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.eq(obj)
    // expect(obj).to.be.eq({a: 1, b: 2}) // vai dar erro
    expect(obj).to.be.deep.eq({ a: 1, b: 2 }) // vai checar as props do objeto e comparar
    expect(obj).eql({ a: 1, b: 2 }) // mesma coisa de cima, mas sintaxe diferente
    // expect(obj).include({ c: 2 }) //erro
    expect(obj).include({ a: 1 })
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2) // b deve ter o valor 2
    expect(obj).to.not.be.empty
})

it('Arrays', () => {
    const arr = [1,2,3]

    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3])
    expect(arr).to.not.be.empty
    expect([]).to.be.empty
})

it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number')
    expect(str).to.be.a('String')
    expect({}).to.be.an('Object') //pode ser .a() ou .an()
})

it('String', () => {
    const str = 'String de teste'

    expect(str).to.be.equal('String de teste')
    expect(str).to.have.length(15)
    expect(str).to.contains('de')
    expect(str).to.match(/de/)
    expect(str).to.match(/^String/) // Deve iniciar com 'String'
    expect(str).to.match(/teste$/) // Deve finalizar com 'teste'
    expect(str).to.match(/.{15}/) // '.' aceita qualquer caracter e o 15 entre chaves é qual deve ser o tamanho de str
    expect(str).to.match(/\w+/) // existem apenas letras e palavras em str
    expect(str).to.match(/\D+/) // Não devem existir números em str
})

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(7)
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1) // Espera valor próximo de 5.2 com precisão de 1 ponto (0.1), já que dependendo do tamanho ponto flutuante a precisão não será exata
})