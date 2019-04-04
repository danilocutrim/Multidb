const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies//base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = {
    nome: 'gavião arqueiro',
    poder: 'flexas'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'batman',
    poder: 'flexas'
}

describe('Postgres Strategy', function(){
    this.timeout(Infinity)
    this.beforeAll(async function(){
        await context.connect()

        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSQL connections', async function(){
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it( 'cadastrar ', async ()=>{
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar ', async ()=>{
        const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async ()=>{
        const[itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Mulher maravilha'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        console.log(itemAtualizar)
        assert.deepEqual(result,1)
    })
    // it('remover por id', async ()=>{
    //     const[item] = await context.read({})
    //     const result = await context.delete(item.id)
    //     assert.deepEqual(result,1)
    // })
})