it('sem testes, ainda...', () => {

})

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('respondendo agora...')
            resolve(13);
        }, 1000)
    })
};

//Com async await
const system = async () => {
    console.log('init')
    const something = await getSomething();
    console.log(`Something is ${something}`)
    console.log('end')
}

//Apenas com promise
// const system = () => { 
//     console.log('init')
//     const promise = getSomething();
//     promise.then(some => {
//         console.log(`Something is ${something}`)
//         console.log('end')
//     })
// }

system();