
function getFiveAchievements({ team }) {
    return team.stat.achievementCount >= 5
}

export default {
    name: 'Get Five Achievements',
    check: getFiveAchievements
}
