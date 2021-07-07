
function updateSecondChance({ webHookData, team }) {
    team.stat.usedSecondChance = checkIfSecondChanceHasBeenUse(webHookData)
}

// a bit hacky, we are just checking if we ever get a commit on a branch that has the 'nachkorrektur' ending
function checkIfSecondChanceHasBeenUse(webHookData) {
    return webHookData.ref.contains('nachkorrektur')
}

module.exports = updateSecondChance