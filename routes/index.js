
import config from '../config'
import express from 'express'

import apiRouter from './apiRouter'
import webhookRouter from './webhookRouter'
import frontendRouter from "./frontendRouter";


const router = express.Router()
const webHookPath = config.WEBHOOK_URL.split('/api/')[1]

router.use('/teams', apiRouter)
router.use(`/${webHookPath}`, webhookRouter)
//router.use('', frontendRouter)

export default router