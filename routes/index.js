
const router = require('express').Router()


router.use('/teams', require('./apiRouter'))
//router.use('', require('./webhookRouter'))
//router.use('', require('./frontendRouter'))


module.exports = router