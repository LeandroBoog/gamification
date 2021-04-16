
const config = require('../config')

const express = require('express')
const router = express.Router()

router.use((req, res, next) => {

    const token = req.header('X-Gitlab-Token')
    if(token !== config.WEBHOOK_TOKEN) return res.status(401).send('Invalid Token')

    next()
})

router.post('/', async (req, res) => {
    const data = req.body
    res.send('Recieved POST')
})

module.exports = router
