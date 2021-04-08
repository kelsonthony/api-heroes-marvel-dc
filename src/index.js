const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongo/mongo')
const Postgres = require('./db/strategies/postgres/postgres')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgress = new ContextStrategy(new Postgres())
contextPostgress.create()