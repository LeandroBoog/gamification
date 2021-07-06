
const updaters = require('../achievementService/updaters')
const achievements = require('../achievementService/achievements')

const { getTeamById, getAchievementByName } = require('../databaseService')


async function updateTeamStats({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId, 'stats')

    const teamData = {
        webHookData,
        team
    }

    for(const updater of updaters) {
        await updater(teamData)
    }

    return await team.stat.save() && await team.save()
}

async function checkForAchievements({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId, 'stats')

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    const teamData = {
        webHookData,
        team
    }
        
    for (const achievement of achievements) {

        if(completedAchievements.includes(achievement.name)) continue;

        if(await achievement.check(teamData)) {
            const gottenAchievement = await getAchievementByName(achievement.name)
            await team.addAchievement(gottenAchievement)
        }
    }

    return await team.getAchievements()
}

module.exports = {
    updateTeamStats,
    checkForAchievements
}
