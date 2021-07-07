
async function updateAverageCommitTime({ webHookData, team }) {

    const firstCommit = webHookData.commits[0]
    if(!firstCommit) return
    const timestampOfCommit = firstCommit.timestamp

    const newTime = new Date(timestampOfCommit)
    const oldTime = team.stat.averageCommitTime.split(':')

    const n = team.stat.numberOfCommits
    team.stat.averageCommitTime = calcAverageCommitTime(n, newTime, oldTime)
}

function calcAverageCommitTime(n, newTime, oldTime) {

    const newHours = newTime.getHours()
    const newMinutes = newTime.getMinutes()
    const oldHours = parseInt(oldTime[0])
    const oldMinutes = parseInt(oldTime[1])

    let avgMinutes = parseInt(((oldMinutes * (n-1)) + newMinutes) / n)
    let avgHours = ((oldHours * (n-1)) + newHours) / n

    const minuteCarryOver = parseInt((avgHours % 1).toFixed(2) * 60)
    avgHours = parseInt(avgHours)

    avgMinutes += minuteCarryOver
    if(avgMinutes >= 60) {
        avgMinutes -= 60
        avgHours += 1
    }
    if(avgMinutes < 10) {
        avgMinutes = `0${avgMinutes}`
    }
    return `${avgHours}:${avgMinutes}`
}

module.exports = updateAverageCommitTime






