const app = require('../app')
const request = require('supertest')

describe('POST /currency/information', () => {
    test('works', async () => {
        const resp = await request(app)
            .post('/currency/information')
            .send({ "cryptoname": "bitcoin" })

        expect(resp.statusCode).toEqual(200)
    })
})

