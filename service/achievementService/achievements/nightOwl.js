
function nightOwl({ team }) {
    const teamAverage = team.average_commit_time
    const hours = parseInt(teamAverage.split(':')[0])

    return hours >= 22
}

module.exports = { name: 'Night Owl', check: nightOwl }