const { join } = require('path')
const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const heroSchema = require('./db/strategies/mongodb/schemas/heroSchemaMongo')
const HeroRoute = require('./routes/heroRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')
const UtilRoutes = require('./routes/utilRoutes')
const Package = require('./../package.json')

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
    const swaggerOptions = {
        info: {
            title: Package.name,
            version: Package.version
        },
        lang: 'en'
    }

    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])


    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods())
    ])

    await app.start()
    console.log('Server Running on port ', app.info.port)

    return app

}
module.exports = main()