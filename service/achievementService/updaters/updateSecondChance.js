
function updateSecondChance({ webHookData, team }) {
    if(team.stat.usedSecondChance) return
    team.stat.usedSecondChance = checkIfSecondChanceHasBeenUse(webHookData)
}

// a bit hacky, we are just checking if we ever get a commit on a branch that has the 'nachkorrektur' ending
function checkIfSecondChanceHasBeenUse(webHookData) {
    return webHookData.ref.includes('nachkorrektur')
}

module.exports = updateSecondChance