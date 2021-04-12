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
                //return this.db.read()
                try {
                    const { skip, limit, name } = request.query
                
                    let query = {}
                    if(name) {
                        query.name = name
                    }

                    if(isNaN(skip))
                        throw Error('The type skip is not valid')
                    if(isNaN(limit))
                        throw Error('The type to limit is not valid')

                    return this.db.read(query, parseInt(skip), parseInt(limit))
                
                } catch (error) {
                    console.log('Error on Route to List', error)
                    return 'Server internal Error :( !'
                }
            }
        }
    }

}