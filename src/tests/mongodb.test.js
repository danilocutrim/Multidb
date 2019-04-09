const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb')
const Context = require('../db/strategies//base/contextStrategy')
const MOCK_HEROI_CADASTRAR = {
    nome: 'mulher maravilha',
    poder: 'laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `homem aranha-${Date.now()}`,
    poder: 'teia'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `patolino-${Date.now()}`,
    poder: 'velocidade'
}
let MOCK_HEROI_ID = ''

const context = new Context(new Mongodb())
describe('Mongodb Suite de testes mongo', function (){
    this.beforeAll(async ()=> {
        await context.connect()
        })
    it('verificar conexão mongo', async ()=>{
        const result = await context.isConnected()
        const expected = 'conectado'

        assert.deepEqual(result,expected)
    })
    it('cadastrar mongo ', async () =>{
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar herois mongo', async ()=>{
        const [{nome,poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
             nome,poder
         }
        assert.deepEqual(result,MOCK_HEROI_DEFAULT)
    })
    it('atualizar mongo', async ()=>{
        const result = await context.update(MOCK_HEROI_ID,{
            nome:'danilo'
        })
        assert.deepEqual(result.nModified,1)
    })
    it('remover mongo', async()=>{
        const result = await context.delete(MOCK_HEROI_ID)
        console.log(result.n)
        assert.deepEqual(result.n, 1)
        console.log()
    } )
})