const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const Hash = '$2b$04$N3FaiIACJcw07OAl0mJ3wOgfkQCK24OPtHPrVhOESmvTv15Ptp2jy'
const SENHA = 'danilocutrim@123'
// const Context = require('./../db/strategies/base/contextStrategy')
// const Postgres = require('./../db/strategies/postgres/postgres')

describe('userhelper test suite', function(){
    it('deve gerar um hash a partir de uma senha',async()=>{
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })
    it('deve validar a senha e seu hash',async()=>{
        const result = await PasswordHelper.comparePassword(SENHA,Hash)
        assert.ok(result)
    })
})