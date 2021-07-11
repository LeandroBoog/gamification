
const first = [
    await import('./nightOwl'),
    await import('./typewriter'),
    ...await import('./passingExercises'),
]

const second = [
    await import('./passedAllExercisesFirstTry'),
    await import('./passedAllExercisesUsingSecondChance')
]

const last = [
    ...await import('./getXAchievements')
]

export {
    first,
    second,
    last
}