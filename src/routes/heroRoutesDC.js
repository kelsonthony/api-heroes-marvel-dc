const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')


const failAction = (request, headers, erro) => {
    throw erro
}

module.exports = class HeroRoutesDC extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroesdc',
            method: 'GET',
            config: {
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request)=> {
                try {
                    const { skip, 
                        limit, 
                        name
                    } = request.query
            
                    const query = name ? {
                        name: {$regex: `.*${name}*.`}
                    } : {}

                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Error on Route to List', error)
                    return Boom.internal()
                }
            }
        }
    }
}