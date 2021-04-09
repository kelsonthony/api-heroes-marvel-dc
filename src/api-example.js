const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const heroSchema = require('./db/strategies/mongodb/schemas/heroSchemaMongo')
const app = new Hapi.Server({
    port: 4000
})

async function main() {

    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, heroSchema))

    app.route([
        {
            path: '/heroesmarvel',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Server rodando na porta', app.info.port)

}
main()