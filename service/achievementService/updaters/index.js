
const first = [
    require('./updateCommitCount'),
    require('./updateSecondChance')
]

const last = [
    require('./updateAverageCommitTime'),
]

module.exports = [
    ...first,
    ...last
]