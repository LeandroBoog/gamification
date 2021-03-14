
const updaters = require('./updaters')
const achievements = require('../achievements')

const { getTeamById, getStudentById } = require('../service')
const { updateTeamStats, updateStudentStats } = require('../service')


async function updateDatabaseByTeam(webHookData) {

    const teamId = webHookData.project.id
    const team = await getTeamById(teamId)

    for(const updater of updaters) {
        updater(webHookData, team)
    }

    return await team.save()
}

async function checkForAchievements(webHookData) {

    const teamId = webHookData.project.id
    const team = await getTeamById(teamId)

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    for (const achievement of achievements) {

        if(completedAchievements.includes(achievement.name)) continue;

        if(achievement.check(webHookData, team)) {
            const gottenAchievement = await getAchievementByName(achievement.name)
            await team.addAchievement(gottenAchievement)
        }
    }

    return Promise.resolve(completedAchievements)
}

module.exports = checkForAchievements