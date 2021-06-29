
const router = require('express').Router()
const TeamController = require('../controller/TeamController')


router.get('/', TeamController.getAllTeams)
router.get('/:projectId', TeamController.getTeam)
router.get('/:projectId/stats', TeamController.getTeamStats)

module.exports = router