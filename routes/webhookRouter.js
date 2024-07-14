
import express from "express";
import WebHookController from '../controller/WebHookController.js'
import { verifyToken } from '../lib/auth.js'


const router = express.Router()

router.use(verifyToken)
router.post(`/`, WebHookController.handleWebHook)
router.delete('/:projectId', WebHookController.deleteWebHook)

export default router
