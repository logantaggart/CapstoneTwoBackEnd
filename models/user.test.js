const User = require('./user')
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require('../expressError')

const db = require('../db')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
} = require('./_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterAll(commonAfterAll)
afterEach(commonAfterEach)

describe('authenticate', () => {
    test('works', async () => {
        const user = await User.authenticate('u1', 'password1')

        expect(user).toEqual({
            username: 'u1',
            firstName: 'U1F',
            lastname: 'U1L',
            email: 'u1@email.com'
        })
    })

    test('unauth if no such user', async () => {
        try {
            await User.authenticate('nope', 'password')
            fail()
        }
        catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }
    })

    test('unauth if wrong password', async () => {
        try {
            await User.authenticate('u1', 'wrong')
            fail()
        }
        catch (err) {
            expect(err instanceof UnauthorizedError).toBeTruthy()
        }
    })
})

describe('register', () => {
    const newUser = {
        username: 'new',
        firstName: 'Test',
        lastName: 'Tester',
        email: 'test@test.com'
    }

    test('works', async () => {
        let user = await User.register({ ...newUser, password: 'password' })

        expect(user).toEqual(newUser)

        const found = await db.query("SELECT * FROM users WHERE username = 'new'")

        expect(found.rows.length).toEqual(1)
        expect(found.rows[0].password.startsWith('$2b$')).toEqual(true)
    })

    test('bad request with duplicate username', async () => {
        try {
            await User.register({
                ...newUser,
                password: "password"
            })
            await User.register({
                ...newUser,
                password: "password"
            })
            fail()
        }
        catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
})

describe('get', () => {
    test('works', async () => {
        let user = await User.get("u1")

        expect(user).toEqual({
            username: 'u1',
            firstName: 'U1F',
            lastName: 'U1L',
            email: 'u1@email.com'
        })
    })

    test('not found if no such user', async () => {
        try {
            await User.get('nope')
            fail()
        }
        catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy()
        }
    })
})