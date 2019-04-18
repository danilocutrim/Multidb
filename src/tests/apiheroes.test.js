const assert = require('assert')
const api = require('../api')
let app = {}
const MOCK_HEROI_CADASTRAR = {
    nome:'chapolin colorado',
    poder:'marreta bionica'
}

describe('suite de teste da api heroes ', function(){
    this.beforeAll(async()=>{
        app = await api
    })
    it('listar /herois', async () => {
        result = await app.inject({
        method: 'GET',
        url: '/heroi?skip=0&limit=10'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
    })
    it('listar /heroi deve filtrar um item ' ,async ()=>{
        const TAMANHO_LIMITE = 1000
        const NAME = 'homem aranha-1554987542949'
        const result = await app.inject({
            method:'GET',
            url:`/heroi?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        assert.deepEqual(statusCode,200)
        assert.deepEqual(dados[0].nome, NAME)
        })
    it('listar /deve retornar  registros ' ,async ()=>{
        const TAMANHO_LIMITE = 3
        const NAME = 'homem aranha-1554987542949'
        const result = await app.inject({
            method:'GET',
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
            url:`/heroi?skip=0&limit=${TAMANHO_LIMITE}`
        })
        const errorResult = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}}
        assert.deepEqual(result.statusCode,400)
        assert.deepEqual(result.payload, JSON.stringify(errorResult))

    })
    it('deve cadastrar POST um heroi', async()=>{
        const result = await app.inject({
            method:'POST',
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
})