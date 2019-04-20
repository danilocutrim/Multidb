// sudo npm install vision inert -hapi-swagger
// npm install hapi-auth-jwt2
const { config } = require('dotenv')
const { join } = require('path')
const{ok} = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env ==='prod'|| env==='dev', 'a env é invalida')
const configPath =join(__dirname,'./../config',`.env.${env}`)
config({
    path:configPath
})
const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema =  require('./db/strategies/mongodb/scheemas/heroischeema')
const Context = require('./db/strategies/base/contextStrategy')
const HeroeRoute = require('./routes/heroeRoutes')
const AuthRoutes = require('./routes/authRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const HapiJwt = require('hapi-auth-jwt2')
const Postgres = require('./db/strategies/postgres/postgres')
const UserSchemma = require('./db/strategies/postgres/scheemas/userSchema')
const JWT_SECRET = process.env.JWT_KEY
const app = new Hapi.server({
    port: process.env.PORT
})
function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    const connectionPostgres = await Postgres.connect()
    const userSchema = await Postgres.defineModel(connectionPostgres, UserSchemma)
    const contextPostgres = new Context(new Postgres(connectionPostgres, userSchema))
    const swaggerOptions = {
        info:{
            title:'API herois',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
          plugin: HapiSwagger,
          options:swaggerOptions
        }
    ])
    app.auth.strategy('jwt','jwt',{
        key: JWT_SECRET,
        // options:{
        //     expiresIn:20
        // }
        validate:async (dado, request)=>{
            const result = await contextPostgres.read({
                username: dado.username.toLowerCase(),
                id: dado.id
            })
            if(!result){
                return{
                    isValid:false
                }
            }
            //verifica no banco se user continua ativo
            // verifica no banco se user continua pagando
            return{
                isValid: true
            }
        }
    })
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroeRoute(context), HeroeRoute.methods()),
        ...mapRoutes(new AuthRoutes(JWT_SECRET, contextPostgres),AuthRoutes.methods())
    ])
    await app.start()
    console.log('rodando na porta 5000')
    return app
}
module.exports = main()