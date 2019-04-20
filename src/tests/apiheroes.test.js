const assert = require('assert')
const api = require('../api')
let app = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU1NTc2OTAxOX0.MUhZkM5xPR3gFWtV9K-NJ_XUONQsfem0_aXzsnMXXgo'
const headers = {
    authorization: TOKEN
}
const MOCK_HEROI_CADASTRAR = {
    nome:'chapolin colorado',
    poder:'marreta bionica'
}
const MOCK_HEROI_INICIAL = {
    nome: 'gavião negro',
    poder: 'flechas'
}
let MOCK_ID = ''
describe('suite de teste da api heroes ', function(){
    this.beforeAll(async()=>{
        app = await api
        const result = await app.inject({
            method: 'POST',
            url:'/heroi',
            headers,
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })
    it('listar /herois', async () => {
        result = await app.inject({
        method: 'GET',
        headers,
        url: '/heroi?skip=0&limit=10'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
    })
    it('listar /heroi deve filtrar um item ' ,async ()=>{
        const TAMANHO_LIMITE = 1000
        const NAME = 'gavião negro'
        const result = await app.inject({
            method:'GET',
            headers,
            url:`/heroi?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
        assert.deepEqual(dados[0].nome, NAME)
        })
    it('listar /deve retornar  registros ' ,async ()=>{
        const TAMANHO_LIMITE = 3
        const result = await app.inject({
            method:'GET',
            headers,
            url:`/heroi?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
        assert.ok(dados.length== TAMANHO_LIMITE)
        })
    it('listar erro', async()=>{
        const TAMANHO_LIMITE = 'AEEE'
        const result = await app.inject({
            method:'GET',
            headers,
            url:`/heroi?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}}
        assert.deepEqual(result.statusCode,400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))

    })
    it('deve cadastrar POST um heroi', async()=>{
        const result = await app.inject({
            method:'POST',
            headers,
            url:'/heroi',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })
        const statusCode = result.statusCode
        const {message,
               _id      }= JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message,"heroi cadastrado com sucesso")
    })
    it('atualiza heroi/:_id ', async()=>{
        const _id = MOCK_ID

        const result = await app.inject({
            method: 'PATCH',
            headers,
            url:`/heroi/${_id}`,
            payload: JSON.stringify({
            poder: 'coloca ovos'
        })
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "heroi atualizado com sucesso")
    })
        it('não deve atualizar com id incorreto/:_id ', async()=>{
        const _id = '5caf42a90716001f6567e4e6'
        const expected = { statusCode: 428,
          error: 'Precondition Required',
          message: 'Não encontrado no banco'}
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url:`/heroi/${_id}`,
            payload: JSON.stringify({
            poder: 'coloca ovos'
        })
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode === 428)
        assert.deepEqual(dados, expected)
    })
    it('remover Delete - heroi/id',async ()=>{
    const _id = MOCK_ID
    const result = await app.inject({
        method: 'DELETE',
        headers,
        url:`/heroi/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(dados.message, 'heroi removido com sucesso')
    })
    it('não deve remover Delete - heroi/id',async ()=>{
    const _id = '5caf42a90716001f6567e4e6'
    const result = await app.inject({
        method: 'DELETE',
        headers,
        url:`/heroi/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    assert.ok(statusCode === 412)
    assert.deepEqual(dados, { statusCode: 412,
      error: 'Precondition Failed',
      message: 'não foi possivel' })
    })
        it('não deve remover Delete - heroi/id',async ()=>{
    const _id = 'algum_id'
    const result = await app.inject({
        method: 'DELETE',
        headers,
        url:`/heroi/${_id}`
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)
    assert.ok(statusCode === 500)
    assert.deepEqual(dados, { statusCode: 500,
  error: 'Internal Server Error',
  message: 'An internal server error occurred' })
    })
})
