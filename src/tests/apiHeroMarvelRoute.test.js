const assert = require('assert')
const api = require('./../api')

let app = {}

describe.only('API Tests Heroes Marvel', function() {
    this.beforeAll( async() => {
        app = await api
    })

    it('List Heroes from /heroesmarvel', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroesmarvel'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        //console.log('result API List', result)

        assert.deepStrictEqual(statusCode, 200)
        assert.ok(Array.isArray(data))
    })
});