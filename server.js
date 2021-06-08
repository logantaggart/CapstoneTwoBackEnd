const app = require('./app')
const { PORT } = require('./config')

app.listen(PORT, () => {
    console.log(`Node server started on http://localhost:${PORT}`)
})
