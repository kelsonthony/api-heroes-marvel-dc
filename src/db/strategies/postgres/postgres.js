const Icrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends Icrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema  = schema
        
    }

    async isConnected() {
        try {
            await this._connection.authenticate()
            return true;
        } catch (error) {
            console.log('fail to postgres connect', error)
            return false;
        }
    }

    static async defineModel(connection, schema) {

        const model = connection.define(
            schema.name,
            schema.schema,
            schema.options
        )

        await model.sync()
        return model
    }


    static async connect() {
       const connection = new Sequelize(
            'postgresheroesDCComics',
            'adminpostgres',
            'passwordpostgres',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
   
        return connection
    }

   

    async create(item) {
        //console.log('O item foi salvo em Postgres')
        const {dataValues} = await this._schema.create(item)
        return dataValues
    }

    async read(item = {}) {
        const result = await this._schema.findAll({where: item, raw: true})
        
        return result;
    }
    async update(id, item) {
        console.log('item: ', item)
        const result = await this._schema.update(item, {where: {id : id}})
        console.log('result: ', result)
        return result
    }

    async delete(id) {
        const query = id ? {id: id} : {}
        return this._schema.destroy({where: query})
    }
}

module.exports = Postgres