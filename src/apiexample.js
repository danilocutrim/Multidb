const Hapi = require('hapi')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroiSchema =  require('./db/strategies/mongodb/scheemas/heroischeema')
const Context = require('./db/strategies/base/contextStrategy')
const app = new Hapi.server({
    port:5000
})

async function main(){
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([
        {
            path:'/heroi',
            method:'GET',
            handler:(request,head) =>{
                  return context.read()
            }
        }
    ])
    await app.start()
    console.log('rodando na porta 5000')
}
main()