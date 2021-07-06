
const updaters = require('../achievementService/updaters')
const achievements = require('../achievementService/achievements')

const { getTeamById, getAchievementByName } = require('../databaseService')


async function updateTeamStats(teamData, statsToUpdate) {
    for(const updater of statsToUpdate) await updater(teamData)
}

async function updateTeamStatsPreAchievementCheck(teamData) {

    const statsToUpdate = [...updaters.first, ...updaters.second]
    await updateTeamStats(teamData, statsToUpdate)

    return await teamData.team.stat.save() && await teamData.team.save()
}

async function checkForAchievements(teamData) {

    const { team } = teamData

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    for (const achievement of achievements) {

        if(completedAchievements.includes(achievement.name)) continue;

        if(achievement.check(teamData)) {
            const gottenAchievement = await getAchievementByName(achievement.name)
            await team.addAchievement(gottenAchievement)
        }
    }

    return await team.getAchievements()
}

async function updateTeamStatsPostAchievementCheck(teamData) {
    const statsToUpdate = updaters.last
    await updateTeamStats(teamData, statsToUpdate)

    return await teamData.team.stat.save() && await teamData.team.save()
}

async function updateTeam(webHookData) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId, 'stats')

    const teamData = {
        webHookData,
        team
    }

    await updateTeamStatsPreAchievementCheck(teamData)
    await checkForAchievements(teamData)
    await updateTeamStatsPostAchievementCheck(teamData)
}

module.exports = {
    updateTeam
}
