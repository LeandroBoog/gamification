
const RequestHandler = require('../lib/RequestHandler')
const databaseService = require('../service/databaseService')

class TeamController {

    static async getAllTeams(req, res) {
        try {
            const teams = await databaseService.getAllTeams()
            RequestHandler.sendSuccess(res, `Returning all Teams`, teams)
        } catch(error) {
            console.error(error)
            RequestHandler.sendError(req, res, error)
        }
    }

    static async getTeamById(req, res) {

        const teamId = req.params.teamId

        try {
            const team = await databaseService.getTeamById(teamId)
            RequestHandler.sendSuccess(res, `Data for ${team.project_name}`, team)
        } catch(error) {
            RequestHandler.sendError(req, res, error)
        }
    }

}



module.exports = TeamController