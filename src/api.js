const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema =  require('./db/strategies/mongodb/scheemas/heroischeema')
const Context = require('./db/strategies/base/contextStrategy')
const HeroeRoute = require('./routes/heroeRoutes')
const app = new Hapi.server({
    port:4000
})
function mapRoutes (instance, methods) {
    return methods.map(method => instance[method]())
}

async function main(){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        ...mapRoutes(new HeroeRoute(context), HeroeRoute.methods())
    ])
    await app.start()
    console.log('rodando na porta 5000')
    return app
}
module.exports = main()