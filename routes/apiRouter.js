
import express from "express";
import TeamController from '../controller/TeamController.js'


const router = express.Router()

router.get('/', TeamController.getAllTeams)
router.get('/:projectId', TeamController.getTeam)
router.get('/:projectId/all', TeamController.getAllTeamInformation)
router.get('/:projectId/achievements', TeamController.getTeamAchievements)
router.get('/:projectId/stats', TeamController.getTeamStats)

export default router