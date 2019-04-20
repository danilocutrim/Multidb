const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UserSchema = require('./../db/strategies/postgres/scheemas/userSchema')
let app = {}
const USER = {
    username:'xuxadasilva',
    password:'123'
    }
const USER_DB = {
    username:USER.username.toLowerCase(),
    password:'$2b$04$aRYJY1c36d2BY0Ysluuq0.0qrWU8PgHCaFMZfJNSsPWrRYI/ryLTi'
}

describe('auth test suite ', function(){
    this.beforeAll(async() =>{
        app = await api
        const connectionsPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionsPostgres,UserSchema)
        const postgres = new Context(new Postgres(connectionsPostgres, model))
        await postgres.update(null,USER_DB,true)
    })
    it('deve obter um token', async()=>{
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: USER
        })
        console.log('result', result.payload)
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length >10)
    })
    it('deve retornar não autorizado ao tentar um login errado',async()=>{
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username:'danilocutrim',
                password:'123'
            }
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error,'Unauthorized')

    })
})