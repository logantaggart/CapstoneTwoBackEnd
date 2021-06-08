const jwt = require('jsonwebtoken')
const { createToken } = require('./tokens')
const { SECRET_KEY } = require('../config')

describe('createToken', () => {
    test('works', () => {
        const token = createToken({ username: 'test' })
        const payload = jwt.verify(token, SECRET_KEY)

        expect(payload).toEqual({
            iat: expect.any(Number),
            username: 'test'
        })
    })
})