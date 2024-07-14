
import express from "express";
import { getTeamById } from '../service/databaseService/index.js'


const router = express.Router()

router.get('/', async (req, res) => {

    const id = req.query.team
    if(!id) return res.status(400).send('Team Id required as URL Parameter "team"!')

    try{
        const team = await getTeamById(id)
        const teamAchievements = await team.getAchievements()
        res.send(teamAchievements)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }

})

export default router

