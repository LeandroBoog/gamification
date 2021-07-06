
// first & second contain all updaters pre achievement check
const first = [
    require('./updateCommitCount'),
    require('./updateSecondChance')
]

const second = [
    require('./updateAverageCommitTime'),
]

// last contains all updaters post achievement check
const last = [

]

module.exports = {
    first,
    second,
    last
}