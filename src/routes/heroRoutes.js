const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')


const failAction = (request, headers, erro) => {
    throw erro
}

module.exports = class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/heroesmarvel',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Get result list',
                notes: 'Should return a result list',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        name: Joi.string().min(3).max(100)
                        //name: Joi.string().default(1)
                        
                    }
                }
            },
            handler: (request, headers) => {
                //return this.db.read()
                try {
                    const { skip, 
                            limit, 
                            name
                    } = request.query
                
                    const query = name ? {
                        name: {$regex: `.*${name}*.`}
                    } : {}

                    // const query = {
                    //     name: {$regex: `.*${name || ""}*.`}
                    // }

                    //console.log('my query new', query)

                    return this.db.read(query, skip, limit)
                    
                    // let query = {}
                    // if(name) {
                    //     query.name = name
                    // }

                    // if(isNaN(skip))
                    //     throw Error('The type skip is not valid')
                    // if(isNaN(limit))
                    //     throw Error('The type to limit is not valid')

                    // return this.db.read(query, parseInt(skip), parseInt(limit))
                
                } catch (error) {
                    console.log('Error on Route to List', error)
                    //return 'Server internal Error :( !'
                    return Boom.internal()
                }
            }
        }
    }

    create() {
        return {
            path: '/heroesmarvel',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'POST should create a Hero',
                notes: 'Should create a Hero here',
                validate: {
                    failAction,
                    payload: {
                        name: Joi.string().required().min(3).max(100),
                        power: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { name, power } = request.payload
                    const result = await this.db.create({name, power})

                    console.log('result to create', result)


                    return {
                        message: 'Success, Hero Created',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('Internal Error', error)
                    return Boom.internal()
                }
            }
        }       
    }

    update() {
        return {
            path: '/heroesmarvel/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'PATCH should update a Hero',
                notes: 'Should update a Hero here',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        name: Joi.string().min(3).max(100),
                        power: Joi.string().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params

                    const { payload } = request

                    const dataString = JSON.stringify(payload)

                    const data = JSON.parse(dataString)

                    const result = await this.db.update(id, data)

                    //console.log('result update???', result) //{ n: 1, nModified: 1, ok: 1 }

                    if(result.nModified !== 1) 
                        return Boom.preconditionFailed('Impossible update Hero')
                    

                    return {
                        message: 'Hero Updated'
                    }
                    

                } catch (error) {
                    console.log('Internal error to create', error)
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/heroesmarvel/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'DELETE should delete a Hero',
                notes: 'Should delete a Hero here',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params
                    const result = await this.db.delete(id)

                    console.log('Delete Result: ', result) //{ n: 1, ok: 1, deletedCount: 1 }

                    if(result.n !== 1)
                        return Boom.preconditionFailed('ID Not Found')
                    return {
                        message: 'Hero Deleted'
                    }

                } catch (error) {
                    console.log('Error to Delete method', error)
                    return Boom.internal()
                }
            }
        }
    }

}