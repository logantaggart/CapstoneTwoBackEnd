const express = require('express')
const rp = require('request-promise')

const { COIN_MARK_CAP_APIKEY } = require('../config')

const router = new express.Router()

router.post('/information', async (req, res, next) => {
    const cryptoname = req.body.cryptoname
    const convertname = req.body.convertname
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            'slug': cryptoname,
            'convert': convertname
        },
        headers: {
            'X-CMC_PRO_API_KEY': COIN_MARK_CAP_APIKEY
        },
        json: true,
        gzip: true
    }

    let coin = await rp(requestOptions)
    res.send(coin)
})

module.exports = router