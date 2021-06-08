const Watchlist = require('./watchlistCurrency')

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterAll,
    commonAfterEach
} = require('./_testCommon')

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe('add to watchlist', () => {
    let newWatchlistAddition = {
        name: 'coin1',
        price: 100,
        market_cap: 1000,
        volume: 500,
        date: '2021-05-30 17:30:00',
        currency: 'USD',
        username: 'u1'
    }

    test('works', async () => {
        let watchlistAdd = await Watchlist.add(newWatchlistAddition)

        expect(watchlistAdd).toEqual({
            ...watchlistAdd,
            name: 'coin1',
            price: 100,
            market_cap: 1000,
            volume: 500,
            currency: 'USD',
            username: 'u1'
        })
    })
})

describe('get watchlist', () => {
    test('works', async () => {
        let username = 'u2'
        let sortingQuery = 'NAME DESC'

        let watchlist = await Watchlist.get(username, sortingQuery)

        expect(watchlist).toEqual([{
            ...watchlist[0],
            name: 'Ethereum', 
            price: 2500, 
            market_cap: 50000000, 
            volume: 5000000
        }])
    })
})