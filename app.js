
const config = require('./config')

const express = require('express')
const app = express()

const cors = require('cors')

const webhookRouter = require('./routes/webhookRouter')
const frontendRouter = require('./routes/frontendRouter')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const webhookPath = new URL(config.WEBHOOK_URL).pathname
app.use(webhookPath, webhookRouter)
app.use('/', frontendRouter)


const server = app.listen(config.PORT, () => {
    console.log(`Example app listening at http://tl.ddns.timoschwarzer.com:${config.PORT}`)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Received SIGTERM, Server terminated')
    })
})

// This initializes the database by getting all the projects of the given gitlab group
require('./lib/init')()
