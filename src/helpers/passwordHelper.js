const Bcrypt = require('bcrypt-nodejs')

const {
    promisify
} = require('util')
const gensync = promisify(Bcrypt.genSalt)
const hashasync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
const SALT =parseInt(process.env.SALT_PWD)
var salt = Bcrypt.genSaltSync(parseInt(process.env.SALT_PWD));

class PasswordHelper {
    static hashPassword(pass){
        return Bcrypt.hashSync(pass, salt);
    }
    static comparePassword(pass,hash){
        return Bcrypt.compareSync(pass, hash)
    }
}


module.exports = PasswordHelper