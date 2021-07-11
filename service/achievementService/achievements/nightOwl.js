
function nightOwl({ team }) {
    const teamAverage = team.stat.averageCommitTime
    const hours = parseInt(teamAverage.split(':')[0])

    return hours >= 22
}

export default {
    name: 'Night Owl',
    check: nightOwl
}