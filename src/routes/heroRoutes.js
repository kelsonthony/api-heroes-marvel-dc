const BaseRoute = require('./base/baseRoute')

module.exports = class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroesmarvel',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }

}