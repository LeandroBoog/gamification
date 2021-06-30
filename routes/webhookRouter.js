
const router =  require('express').Router()
const WebHookController = require('../controller/WebHookController')

const { verifyToken } = require('../lib/auth')

router.use(verifyToken)
router.post(`/`, WebHookController.handleWebHook)
router.delete('/:projectId', WebHookController.deleteWebHook)

module.exports = router
