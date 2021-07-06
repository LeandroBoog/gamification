
function updateCommitCount({ team }) {
    team.stat.numberOfCommits += 1
}

module.exports = updateCommitCount