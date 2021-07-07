
const updaters = require('../achievementService/updaters')
const achievements = require('../achievementService/achievements')

const { getTeamById, getAchievementByName } = require('../databaseService')


async function updateTeamStats(teamData, statsToUpdate) {
    for(const updater of statsToUpdate) await updater(teamData)
    return await teamData.team.stat.save() && await teamData.team.save()
}

async function checkAchievements(teamData, achievementsToCheck) {

    const { team } = teamData

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    for (const achievement of achievementsToCheck) {

        //if(completedAchievements.includes(achievement.name)) continue;

        const achievementPassed = await achievement.check(teamData)
        console.log('is passed: ' + achievementPassed)
        if(achievementPassed) {
            const gottenAchievement = await getAchievementByName(achievement.name)
            console.log(gottenAchievement)
            await team.addAchievement(gottenAchievement)
        }
    }

    return await team.getAchievements()
}

async function updateTeamStatsPreAchievementCheck(teamData) {
    const statsToUpdate = [...updaters.first, ...updaters.second]
    return await updateTeamStats(teamData, statsToUpdate)
}

async function checkAchievementsAfterFirstUpdate(teamData) {
    const achievementsToCheck = achievements.first
    return await checkAchievements(teamData, achievementsToCheck)
}

async function updateTeamStatsPostAchievementCheck(teamData) {
    const statsToUpdate = updaters.last
    return await updateTeamStats(teamData, statsToUpdate)
}

async function checkAchievementsPostAllUpdates(teamData) {
    const achievementsToCheck = achievements.last
    return await checkAchievements(teamData, achievementsToCheck)
}

async function updateTeam(webHookData) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId, 'stats')

    const teamData = {
        webHookData,
        team
    }

    //await updateTeamStatsPreAchievementCheck(teamData)
    await checkAchievementsAfterFirstUpdate(teamData)
    //await updateTeamStatsPostAchievementCheck(teamData)
    //await checkAchievementsPostAllUpdates(teamData)
}

module.exports = {
    updateTeam
}
