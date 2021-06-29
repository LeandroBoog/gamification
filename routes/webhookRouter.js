
const config = require('../config')

const express = require('express')
const router = express.Router()

const { verifyToken } = require('../lib/auth')


router.use(verifyToken)

router.post('/', async (req, res) => {
    const data = req.body
    res.send('Recieved POST')
})

module.exports = router
