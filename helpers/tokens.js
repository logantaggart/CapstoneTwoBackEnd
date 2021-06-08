const { SECRET_KEY } = require('../config')
const jwt = require('jsonwebtoken')

function createToken(user) {
    let payload = {
        username: user.username
    }

    return jwt.sign(payload, SECRET_KEY)
}

module.exports = { createToken }