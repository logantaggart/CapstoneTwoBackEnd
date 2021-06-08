const app = require('../app')
const request = require('supertest')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
} = require('./_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe('POST /add', () => {
    test('works', async () => {
        const resp = await request(app)
            .post('/add')
            .send({
                name: 'coin2',
                price: 100,
                market_cap: 1000,
                volume: 500,
                date: '2021-05-30 17:30:00',
                currency: 'USD',
                username: 'u3'
            })

        expect(resp.statusCode).toEqual(201)
        expect(resp.body).toEqual({
            name: 'coin2',
            price: 100,
            market_cap: 1000,
            volume: 500,
            date: '2021-05-30 17:30:00',
            currency: 'USD',
            username: 'u3'
        })
    })

    test('bad request if missing data', async () => {
        const resp = await request(app)
            .post('/add')
            .send({
                name: 'coin2',
                market_cap: 1000,
                username: 'u3'
            })

        expect(resp.statusCode).toEqual(400)
    })
})

describe('GET /get', () => {
    test('works', async () => {
        const username = 'u4'
        const sortingQuery = 'NAME DESC'
        const resp = await request(app)
            .get('/get')
            .send(username, sortingQuery)

        expect(resp.body).toEqual({
            name: 'coin2',
            price: 100,
            market_cap: 1000,
            volume: 500,
            date: '2021-05-30 17:30:00',
            currency: 'USD',
            username: 'u4'
        })
    })
})