const assert = require('assert')
const MongoDB = require('../db/strategies/mongo')
const Context = require('../db/strategies/base/contextStrategy')

const contextTest = new Context(new MongoDB())

const MOCK_CREATE_HERO = {
    name: 'Captain America',
    power: 'Shield'
}

const MOCK_CREATE_HERO_DEFAULT = {
    name: `Hulk-${Date.now()}`,
    power: 'Super Force'
}

const MOCK_HEROI_UPDATE = {
    name: `Thor-${Date.now()}`,
    power: 'Hammer'
}

let MOCK_HEROI_ID = ''

describe('MongoDB Suíte Marvel', async function () {
    this.beforeAll( async () => {
        await contextTest.connect()
        await contextTest.create(MOCK_CREATE_HERO_DEFAULT)
        const result = await contextTest.create(MOCK_HEROI_UPDATE)
        MOCK_HEROI_ID = result._id
    })

    it('1) Check the Connection to MongoDB', async () => {
        const result = await contextTest.isConnected()
        
        const expected = 'Connected'

        assert.deepStrictEqual(result, expected)
        console.log('result Connection with MongoDB', result)
        console.log('expected  Connection with MongoDB', expected)
    })

    it('2) Create a Hero', async () => {
        
                
        const { name, power} = await contextTest.create(MOCK_CREATE_HERO)

        
        assert.deepStrictEqual({ name, power}, MOCK_CREATE_HERO)
        
        console.log('create result', { name, power})

    });

    it('3) List Heroes from MongoDB', async () => {
        const [{ name, power}] = await contextTest.read({
            name: MOCK_CREATE_HERO_DEFAULT.name,
            power: MOCK_CREATE_HERO_DEFAULT.power
        })

        const result = {name, power}

        assert.deepStrictEqual(result, MOCK_CREATE_HERO_DEFAULT )
        console.log('List Result', result )
    });

    it('Update a Hero', async () => {
        const result = await contextTest.update(MOCK_HEROI_ID, {
            name: 'Odin'
        })

        assert.deepStrictEqual(result.ok, 1)

        console.log('Update Hero from result', result)
        console.log('MOCK_HEROI_UPDATE', MOCK_HEROI_UPDATE)
    });

    it('Delete a Hero from MongoDB', async () => {
        const result = await contextTest.delete(MOCK_HEROI_ID)    
        assert.deepStrictEqual(result.ok, 1)
        console.log('Hero deleted', result)
    });
})