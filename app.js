
const config = require('./config')

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const webhookPath = new URL(config.WEBHOOK_URL).pathname
app.post(webhookPath, async (req, res) => {

    res.send('Recieved POST')
    const data = req.body
    console.log(data)
    for(const commit of data.commits) {
        console.log(commit.added)
        console.log(commit.modified)
    }

})

const server = app.listen(config.PORT, () => {
    console.log(`Example app listening at http://tl.ddns.timoschwarzer.com:${config.PORT}`)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Received SIGTERM, Server terminated')
    })
})

// This initializes the database by getting all the projects of the given gitlab group
const init = require('./lib/init')
init()