const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const Postgres = require('./db/strategies/postgres')



const contextPostgres = new ContextStrategy(new Postgres())

contextPostgres.delete(343)
