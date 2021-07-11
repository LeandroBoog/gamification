
import config from './config'
import express from 'express'
import routes from './routes'
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)

const server = app.listen(config.PORT, () => {
    console.log(`Example app listening at http://tl.ddns.timoschwarzer.com:${config.PORT}`)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Received SIGTERM, Server terminated')
    })
})
