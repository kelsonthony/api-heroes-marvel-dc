const assert = require('assert')
const api = require('./../api')

let app = {}

describe.only('API Tests Heroes Marvel', function() {
    this.beforeAll( async() => {
        app = await api
    })

    it('1) List Heroes from /heroesmarvel', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroesmarvel?skip=0&limit=20'
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

        console.log('result.payload', result.payload)

        assert.deepStrictEqual(result.payload, 'Server internal Error :( !')
    });

    it('4) List from Hero Route should be filter only 1 item', async () => {
        const max_size = 1000
        const name = 'Hulk-1617909201400'

        const result = await app.inject({
            method: 'GET',
            url: `/heroesmarvel?skip=0&limit=${max_size}&name=${name}`
        })

        const data = JSON.parse(result.payload)

        const statusCode = result.statusCode

        console.log('my data', data)
        console.log('statusCode', statusCode)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(data[0].name === name)
    });
});