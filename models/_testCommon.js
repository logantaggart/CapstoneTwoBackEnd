const db = require('../db')

const bcrypt = require('bcrypt')
const { BCRYPT_WORK_FACTOR } = require('../config')

async function commonBeforeAll() {
    await db.query('DELETE FROM watchlist')
    await db.query('DELETE FROM users')
    await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
        [
            await bcrypt.hash('password1', BCRYPT_WORK_FACTOR),
            await bcrypt.hash('password2', BCRYPT_WORK_FACTOR)
        ])
    await db.query(`
        INSERT INTO watchlist(username,
                              name,
                              price,
                              market_cap,
                              volume,
                              date,
                              currency)
        VALUES ('u1', 'Bitcoin', 40000, 100000000, 10000000, '2021-05-30 19:30:00', 'USD'),
               ('u2', 'Ethereum', 2500, 50000000, 5000000, '2021-05-27 10:30:00', 'USD')
        RETURNING name`)
}

async function commonBeforeEach() {
    await db.query('BEGIN')
}

async function commonAfterEach() {
    await db.query('ROLLBACK')
}

async function commonAfterAll() {
    await db.end()
}

module.exports = {
    commonAfterAll,
    commonAfterEach,
    commonBeforeAll,
    commonBeforeEach
}