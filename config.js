require('dotenv').config()
require('colors')

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev"
const COIN_MARK_CAP_APIKEY = process.env.APIKEY
const PORT = +process.env.PORT || 3001
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test") ? "crypto_test_db" :
        process.env.DATABASE_URL || "crypto_db"
}

console.log('Crypto App Config:'.green)
console.log('SECRET_KEY:'.yellow, SECRET_KEY)
console.log('PORT:'.yellow, PORT.toString())
console.log('Database:'.yellow, getDatabaseUri())
console.log('BCRYPT_WORK_FACTOR:'.yellow, BCRYPT_WORK_FACTOR.toString())
console.log('-----')

module.exports = {
    SECRET_KEY,
    PORT,
    COIN_MARK_CAP_APIKEY,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
}