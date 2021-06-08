const db = require('../db')

class Watchlist {
    static async add({ name, price, market_cap, volume, date, username, currency }) {
        const result = await db.query(
            `INSERT INTO watchlist
             (name,
              price,
              market_cap,
              volume,
              date,
              username, 
              currency)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING name, price, market_cap, volume, date, username, currency`,
            [name, price, market_cap, volume, date, username, currency]
        )

        const cryptocurrency = result.rows[0]

        return cryptocurrency
    }

    static async get(username, sortingQuery) {
        const q1 = `SELECT name, price, market_cap, volume, date, currency
                    FROM watchlist
                    WHERE username='${username}'`
        const q2 = ` ORDER BY ${sortingQuery}`

        const watchlistRes = await db.query(q1 + q2)
        const watchlist = watchlistRes.rows

        return watchlist
    }
}

module.exports = Watchlist