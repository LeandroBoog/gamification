
function updateSecondChance({ team }) {
    team.stat.usedSecondChance = somehowFindOutIfTheyPassedOrFailed()
    console.log('todo: updateSecondChance')
}

function somehowFindOutIfTheyPassedOrFailed() {
    return false;
}

module.exports = updateSecondChance