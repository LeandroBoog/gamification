
function updateSecondChance({ webHookData, team }) {
    team.stat.usedSecondChance = checkIfSecondChanceIsInUse(webHookData)
}

// a bit hacky, we are just checking if we ever get a commit on a branch that has the 'nachkorrektur' ending
function checkIfSecondChanceIsInUse(webHookData) {
    return webHookData.ref.contains('nachkorrektur')
}

module.exports = updateSecondChance