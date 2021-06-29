
const config = require('./config')

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'))


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
