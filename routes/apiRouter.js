
const router = require('express').Router()
const TeamController = require('../controller/TeamController')


router.get('/', TeamController.getAllTeams)
router.get('/:teamId', TeamController.getTeamById)


module.exports = router