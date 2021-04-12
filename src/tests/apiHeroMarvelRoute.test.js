const assert = require('assert')
const api = require('./../api')

let app = {}

const MOCK_HERO_CREATE = {
    name: 'Black Arrow',
    power: 'Arrow'
}

describe('API Tests Heroes Marvel', function() {
    this.beforeAll( async() => {
        app = await api
    })

    it('1) List Heroes from /heroesmarvel', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroesmarvel?skip=0&limit=10'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        console.log('result API List statusCode', result.statusCode)
        console.log('result API List payload', result.payload)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })

    it('2) List only 4 Heroes from /heroesmarvel Route', async () => {
        const MAX_LIMIT = 4
        const result = await app.inject({
            method: 'GET',
            url: `/heroesmarvel?skip=0&limit=${MAX_LIMIT}`
        })

        const data = JSON.parse(result.payload)

        console.log('Data results 4???', data.length)

        const statusCode = result.statusCode

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(data.length === 4)

    });

    it('3) List Heroes Route should return a wrong limit', async () => {
        const MAX_LIMIT = 'what?'
        const result = await app.inject({
            method: 'GET',
            url: `/heroesmarvel?skip=0&limit=${MAX_LIMIT}`
        })

        const resultError = {"statusCode":400,"error":"Bad Request","message":"child \"limit\" fails because [\"limit\" must be a number]","validation":{"source":"query","keys":["limit"]}}

        console.log('result.statusCode', result.statusCode)
        console.log('result.payload', result.payload)     

        assert.deepStrictEqual(result.statusCode, 400)
        assert.deepStrictEqual(result.payload, JSON.stringify(resultError))
        //assert.deepStrictEqual(result.payload, 'Server internal Error :( !')
    });

    it('4) List from Hero Route should be filter only 1 item', async () => {
        const MAX_LIMIT = 10
        const NAME = 'Hulk-1618249028298'

        const result = await app.inject({
            method: 'GET',
            url: `/heroesmarvel?skip=0&limit=${MAX_LIMIT}&name=${NAME}`
        })

        const data = JSON.parse(result.payload)
        //const data = result.payload
        console.log('my data results', data[0].name)

        const statusCode = result.statusCode

        console.log('statusCode', statusCode)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(data[0].name === NAME)
    });

    it('Create POST - /heroesmarvel', async () => {
        
        const result = await app.inject({
            method: 'POST',
            url: '/heroesmarvel',
            payload: JSON.stringify(MOCK_HERO_CREATE)
        })

        const statusCode = result.statusCode

        console.log('result statusCode', statusCode)
        console.log('result payload', result.payload)

        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.deepEqual(message, 'Success, Hero Created')

    });
});