
const router = require('express').Router()
const config = require('../config')

const webHookPath = config.WEBHOOK_URL.split('/api/')[1]

router.use('/teams', require('./apiRouter'))
//router.use(`/${webHookPath}`, require('./webhookRouter'))
//router.use('', require('./frontendRouter'))


module.exports = router