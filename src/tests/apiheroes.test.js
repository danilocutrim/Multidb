const assert = require('assert')
const api = require('../api')
let app = {}

describe('suite de teste da api heroes ', function(){
    this.beforeAll(async()=>{
        app = await api
    })
    it('listar /herois', async () => {
        result = await app.inject({
        method: 'GET',
        url: '/heroi'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode
    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
    })
})