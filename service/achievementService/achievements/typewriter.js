
function typewriter({ team }) {
    return team.stat.numberOfCommits >= 20
}

module.exports = {
    name: 'Typewriter',
    check: typewriter
}