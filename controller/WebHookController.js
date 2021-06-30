
const RequestHandler = require('../lib/RequestHandler')
const { updateTeamStats, checkForAchievements } = require('../service/achievementService')
const { deleteWebhookFromTeam } = require('../lib/gitlabApiManager')

class WebHookController {

    static async handleWebHook(req, res) {
        const webHookData = req.body
        try {
            await updateTeamStats({ webHookData })
            await checkForAchievements({ webHookData })
        } catch (error) {
            console.error(error)
        } finally {
            RequestHandler.sendSuccess(res, "Received Hook")
        }
    }

    static deleteWebHook(req, res) {
        const teamId = req.projectId
        deleteWebhookFromTeam(teamId).catch(console.error)
        RequestHandler.sendSuccess(res, `Deleted WebHook for Project ${teamId}`)
    }
}

module.exports = WebHookController