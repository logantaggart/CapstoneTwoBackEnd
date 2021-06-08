const db = require('../db')

const User = require('../models/user')
const Watchlist = require('../models/watchlistCurrency')

const { createToken } = require('../helpers/tokens')

async function commonBeforeAll() {
    await db.query('DELETE FROM users')
    await db.query('DELETE FROM watchlist')

    await User.register({
        username: "u3",
        firstName: "U3F",
        lastName: "U3L",
        email: "user3@user.com",
        password: "password3"
    })
    await User.register({
        username: "u4",
        firstName: "U4F",
        lastName: "U4L",
        email: "user4@user.com",
        password: "password4"
    })
    await Watchlist.add({
        name: 'coin2',
        price: 100,
        market_cap: 1000,
        volume: 500,
        date: '2021-05-30 17:30:00',
        currency: 'USD',
        username: 'u4'
    })
}

async function commonBeforeEach() {
    await db.query("BEGIN")
}

async function commonAfterEach() {
    await db.query("ROLLBACK")
}

async function commonAfterAll() {
    await db.end()
}

const u1Token = createToken({ username: "u1" })
const u2Token = createToken({ username: "u2" })

module.exports = {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach,
    u1Token,
    u2Token
}