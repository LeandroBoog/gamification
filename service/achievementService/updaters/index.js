
// first & second contain all updaters pre achievement check
const first = [
    await import('./updateCommitCount'),
    await import('./updateSecondChance')
]

const second = [
    await import('./updateAverageCommitTime'),
]

// last contains all updaters post achievement check
const last = [
    await import('./updateAchievementCount')
]

export default {
    first,
    second,
    last
}