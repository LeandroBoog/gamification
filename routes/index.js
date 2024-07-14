
import config from '../config.js'
import express from 'express'

import apiRouter from './apiRouter.js'
import webhookRouter from './webhookRouter.js'
import frontendRouter from "./frontendRouter.js";


const router = express.Router()
const webHookPath = config.WEBHOOK_URL.split('/api/')[1]

router.use('/teams', apiRouter)
router.use(`/${webHookPath}`, webhookRouter)
router.use('', frontendRouter)

export default router