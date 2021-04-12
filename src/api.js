const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroSchema = require('./db/strategies/mongodb/schemas/heroSchemaMongo')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 4000
}) 

function mapRoutes(instance, methods) {
    
    return methods.map(method => instance[method]())
}

async function main() {

    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, heroSchema))

    //console.log('MapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))


    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Server Running on port ', app.info.port)

    return app

}
module.exports = main()