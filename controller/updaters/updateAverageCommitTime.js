
function updateAverageCommitTime(webHookData, team) {

    const timestampOfCommit = webHookData.commits[0].timestamp

    const newTime = new Date(timestampOfCommit)
    const oldTime = team.average_commit_time.split(':')

    const n = team.number_of_commits
    team.average_commit_time = calcAverageCommitTime(n, newTime, oldTime)
}

function calcAverageCommitTime(n, newTime, oldTime) {

    const newHours = newTime.getHours()
    const newMinutes = newTime.getMinutes()
    const oldHours = parseInt(oldTime[0])
    const oldMinutes = parseInt(oldTime[1])

    const avgMinutes = (oldMinutes + newMinutes) / n
    const avgHours = (oldHours + newHours) / n

    return `${avgHours}:${avgMinutes}`
}

module.exports = updateAverageCommitTime