const assert = require('assert')
const apiDC = require('./../api')

let appDC = {}

describe('API Test Hero DC Comics', function() {
    this.beforeAll( async () => {
        appDC = await apiDC
    })

    it('1) Should list Heroes DC /heroesdc', async () => {
        const result = await appDC.inject({
            method: 'GET',
            url: '/heroesdc?skip=0&limit=10'
        })

        const data = JSON.parse(result.payload)
        const statusCode = result.statusCode

        console.log('data dc', data)
        console.log('statusCode DC', statusCode)

        

    });
});