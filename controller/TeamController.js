
import RequestHandler from "../lib/RequestHandler.js";
import databaseService from "../service/databaseService/index.js"


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
        const query = () => databaseService.getTeamById(teamId,'achievement', 'stats')
        RequestHandler.handleQuery(query, req, res)
    }

    static getTeamAchievements(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId, 'achievement')
        RequestHandler.handleQuery(query, req, res)
    }

    static getTeamStats(req, res) {
        const teamId = req.params.projectId
        const query = () => databaseService.getTeamById(teamId, 'stats')
        RequestHandler.handleQuery(query, req, res)
    }

}

export default TeamController