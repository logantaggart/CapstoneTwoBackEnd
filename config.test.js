describe('config works from setup in env', () => {
    test('works', () => {
        process.env.SECRET_KEY = 'testkey'
        process.env.PORT = '1000'
        process.env.DATABASE_URL = 'testurl'
        process.env.NODE_ENV = 'other'

        const config = require('./config')

        expect(config.SECRET_KEY).toEqual('testkey')
        expect(config.PORT).toEqual(1000)
        expect(config.getDatabaseUri()).toEqual('testurl')
        expect(config.BCRYPT_WORK_FACTOR).toEqual(13)

        delete process.env.SECRET_KEY
        delete process.env.PORT
        delete process.env.BCRYPT_WORK_FACTOR
        delete process.env.DATABASE_URL

        expect(config.getDatabaseUri()).toEqual('crypto_db')

        process.env.NODE_ENV = 'test'

        expect(config.getDatabaseUri()).toEqual('crypto_test_db')
    })
})