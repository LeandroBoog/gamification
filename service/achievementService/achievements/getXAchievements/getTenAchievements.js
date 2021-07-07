
function getFiveAchievements({ team }) {
    return team.stat.achievementCount >= 10
}

module.exports = {
    name: 'Get Ten Achievements',
    check: getFiveAchievements
}
