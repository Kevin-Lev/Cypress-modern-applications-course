const buildEnv = () => {
    cy.server()
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'Usuario falso',
            token: 'Uma string muito grande que não deveria ser aceito'
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
            }
        ],
    }).as('contas')
}

export default buildEnv