
const RequestHandler = require('../lib/RequestHandler')
const databaseService = require('../service/databaseService')

class TeamController {

    static getAllTeams(req, res) {
        const query = () => databaseService.getAllTeams()
        RequestHandler.handleQuery(query, req, res)
    }

    static getTeam(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId)
        RequestHandler.handleQuery(query, req, res)
    }

    static getAllTeamInformation(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId,'achievement', 'teamstats')
        RequestHandler.handleQuery(query, req, res)
    }

    static getTeamAchievements(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId, 'achievement')
        RequestHandler.handleQuery(query, req, res)
    }

    static getTeamStats(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId, 'teamstats')
        RequestHandler.handleQuery(query, req, res)
    }

}



module.exports = TeamController