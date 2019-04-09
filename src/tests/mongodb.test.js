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
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar herois mongo', async ()=>{
        const [{nome,poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
             nome,poder
         }
        assert.deepEqual(result,MOCK_HEROI_DEFAULT)
    })
})