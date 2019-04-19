// sudo npm install vision inert -hapi-swagger
const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema =  require('./db/strategies/mongodb/scheemas/heroischeema')
const Context = require('./db/strategies/base/contextStrategy')
const HeroeRoute = require('./routes/heroeRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const app = new Hapi.server({
    port:5000
})
function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    const swaggerOptions = {
        info:{
            title:'API herois',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        Vision,
        Inert,
        {
          plugin: HapiSwagger,
          options:swaggerOptions
        }
    ])
    app.route(
        mapRoutes(new HeroeRoute(context), HeroeRoute.methods())
    )
    await app.start()
    console.log('rodando na porta 5000')
    return app
}
module.exports = main()