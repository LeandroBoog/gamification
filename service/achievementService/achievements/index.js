
const first = [
    require('./nightOwl'),
    require('./typewriter'),
    ...require('./passingExercises')
]

const last = [
    ...require('./getXAchievements')
]

module.exports = {
    first,
    last
}