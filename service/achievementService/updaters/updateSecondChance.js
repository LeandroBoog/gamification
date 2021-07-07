
function updateSecondChance({ team }) {
    team.stat.usedSecondChance = somehowFindOutIfTheyPassedOrFailed()
    console.log('todo: updateSecondChance')
}

function somehowFindOutIfTheyPassedOrFailed() {
    // check if branch has 'nachkorrektur' -> means they have used their second chance
    return false;
}

module.exports = updateSecondChance