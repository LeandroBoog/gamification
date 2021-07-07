
const first = [
    require('./nightOwl'),
    require('./typewriter'),
    ...require('./passingExercises'),
]

const second = [
    require('./passedAllExercisesFirstTry'),
    require('./passedAllExercisesUsingSecondChance')
]

const last = [
    ...require('./getXAchievements')
]

module.exports = {
    first,
    second,
    last
}