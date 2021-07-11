
function getFiveAchievements({ team }) {
    return team.stat.achievementCount >= 10
}

export default {
    name: 'Get Ten Achievements',
    check: getFiveAchievements
}
