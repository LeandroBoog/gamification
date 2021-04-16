
const express = require('express')
const router = express.Router()

const { getTeamAchievements } = require('../service/databaseService')


router.get('/', async (req, res) => {

    const id = req.query.team
    if(!id) return res.status(400).send('Team Id required as URL Parameter "team"!')

    try{
        const teamData = await getTeamAchievements(id)
        res.send(teamData)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }

})

module.exports = router

