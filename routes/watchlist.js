const express = require('express')

const Watchlist = require('../models/watchlistCurrency')

const router = express.Router()

router.post("/add", async function (req, res, next) {
    const watchlistAddition = await Watchlist.add({ ...req.body })

    return res.json(watchlistAddition)
})

router.get("/get", async function (req, res, next) {
    const username = req.query['username']

    const sortBy = req.query['sortBy']
    const orderBy = req.query['orderBy']

    const sortingQuery = sortBy + " " + orderBy

    const watchlist = await Watchlist.get(username, sortingQuery)

    return res.json({ watchlist })
})

module.exports = router