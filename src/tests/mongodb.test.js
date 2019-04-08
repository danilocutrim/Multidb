const assert = require('assert')
const Mongodb = require('../db/strategies/mongodb')
const Context = require('../db/strategies//base/contextStrategy')
const MOCK_HEROI_CADASTRAR = {
    nome: 'mulher maravilha',
    poder: 'laço'
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
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
})