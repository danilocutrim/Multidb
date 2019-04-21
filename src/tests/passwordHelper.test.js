const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')
const Hash = '$2a$10$Wm4lS6dfIm8.LNl/JZ2ZheaGijPM7xHumpQER2KCbA3Oxk6vpeuFq'
const SENHA = 'danilocutrim@123'
// const Context = require('./../db/strategies/base/contextStrategy')
// const Postgres = require('./../db/strategies/postgres/postgres')

describe('userhelper test suite', function(){
    it('deve gerar um hash a partir de uma senha',async()=>{
        const result = await PasswordHelper.hashPassword(SENHA)
        console.log(result)
        assert.ok(result.length > 10)
    })
    it('deve validar a senha e seu hash',async()=>{
        const result = await PasswordHelper.comparePassword(SENHA,Hash)
        assert.ok(result)
    })
})