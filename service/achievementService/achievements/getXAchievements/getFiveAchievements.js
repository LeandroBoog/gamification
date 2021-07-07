
function getFiveAchievements({ team }) {
    return team.stat.achievementCount >= 5
}

module.exports = {
    name: 'Get Five Achievements',
    check: getFiveAchievements
}
