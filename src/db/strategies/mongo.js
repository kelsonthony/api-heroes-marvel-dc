const Icrud = require('./../strategies/interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Unconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Unconnecting' 
}

class MongoDB extends Icrud {
    constructor() {
        super()
        this._heroesMarvel = null
        this._driver = null
    }

    connect() {
        Mongoose.connect('mongodb://herouser:passwordwordheroes@192.168.1.19:27017/heroesdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(error) {
            if(!error) return;
            console.log('Fail to Connection with MongoDB', error)
        })

        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', ()=> console.log('Connected to MongoDB and Running here'))
        this.defineModel()

    }

    defineModel() {
        const heroSchema = new Mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            power: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        this._heroesMarvel = Mongoose.model('heroesmarvel', heroSchema)
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]

        if(state === 'Connected') return state

        if(state !== 'Connecting') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]
    }

    create(item) {
        return this._heroesMarvel.create(item)
    }

    read(item, skip = 0, limit = 10) {
        return this._heroesMarvel.find(item).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._heroesMarvel.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._heroesMarvel.deleteOne({_id: id})
    }

}

module.exports = MongoDB