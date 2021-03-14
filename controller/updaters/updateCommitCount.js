
function updateCommitCount(webHookData, team) {
    team.number_of_commits += 1
}

module.exports = updateCommitCount