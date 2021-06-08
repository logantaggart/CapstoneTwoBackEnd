const express = require('express')
const cors = require('cors')

const app = express()

const authRoutes = require('./routes/auth')
const currencyRoutes = require('./routes/currency')
const usersRoutes = require('./routes/users')
const watchlistRoutes = require('./routes/watchlist')

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/currency', currencyRoutes)
app.use('/users', usersRoutes)
app.use('/watchlist', watchlistRoutes)

module.exports = app