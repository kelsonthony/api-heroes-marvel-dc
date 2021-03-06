const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const heroSchema = require('../db/strategies/postgres/schemas/heroSchema')
const Context = require('../db/strategies/base/contextStrategy')


const MOCK_UP_HERO_CREATE = { 
    name: 'Aquaman',
    power: 'Water'
}

const MOCK_HERO_UPDATE = { 
    name: 'Batman',
    power: 'Money'
}


let context = {}

describe('Postgres Strategy DC Comics', function() {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, heroSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MOCK_HERO_UPDATE)
        
    })
    it('PostgresSQL Connection',  async function() {
        const result = await context.isConnected()
        console.log('result to connection', result)
        assert.deepStrictEqual(result, true)
        
    })
    it('Create a Hero', async function() {
        const result = await context.create(MOCK_UP_HERO_CREATE)
        console.log('result create Hero', result)
        delete result.id
        assert.deepStrictEqual(result, MOCK_UP_HERO_CREATE)
    })
    it('List Heroes', async () => {
        const [result] = await context.read({name: MOCK_UP_HERO_CREATE.name})
        delete result.id
        assert.deepStrictEqual(result, MOCK_UP_HERO_CREATE)
    });

    it('Update Hero',  async () => {
        const [itemAtualizar] = await context.read({ name: MOCK_HERO_UPDATE.name })
        const novoItem = {
            ...MOCK_HERO_UPDATE,
            name: 'Wonder Woman',
            power: 'Amazon Force'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id})
        assert.deepStrictEqual(result, 1)
        assert.deepStrictEqual(itemAtualizado.name, novoItem.name)
        
    });

    it('Remove a hero by ID', async () => {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepStrictEqual(result, 1)
    });
})