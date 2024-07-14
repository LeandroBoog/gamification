
import config from './config.js'
import express from 'express'
import routes from './routes/index.js'
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)

const server = app.listen(config.PORT, () => {
    console.log(`Example app listening at ${config.DOMAIN}:${config.PORT}/api`)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Received SIGTERM, Server terminated')
    })
})
