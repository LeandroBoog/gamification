
async function updateAchievementCount({ team }) {
    team.stat.achievementCount = await getAchievementCount(team)
}

async function getAchievementCount(team) {
    const gottenAchievements = await team.getAchievements()
    return gottenAchievements.length
}

module.exports = updateAchievementCount