
const updaters = require('../achievementService/updaters')
const achievements = require('../achievementService/achievements')

const { getTeamById } = require('../databaseService')


async function updateTeamStats({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId)

    const teamData = {
        webHookData,
        team
    }

    for(const updater of updaters) {
        updater(teamData)
    }

    return await team.save()
}

async function checkForAchievements({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId)

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    const teamData = {
        webHookData,
        team
    }
        
    for (const achievement of achievements) {

        if(completedAchievements.includes(achievement.name)) continue;


        if(achievement.check(teamData)) {
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
