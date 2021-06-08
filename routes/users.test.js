const app = require('../app')
const request = require('supertest')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
} = require('./_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterAll(commonAfterAll)
afterEach(commonAfterEach)

describe('GET /users/:username', () => {
    test('works', async () => {
        const resp = await request(app)
            .get('/users/u1')

        expect(resp.body).toEqual({
            user: {
                username: "u1",
                firstName: "U1F",
                lastName: "U1L",
                email: "user1@user.com"
            }
        })
    })

    test('not found if user not found', async () => {
        const resp = await request(app)
            .get('/users/dontexist')

        expect(resp.statusCode).toEqual(404)
    })
})