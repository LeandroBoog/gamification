
function typewriter({ team }) {
    return team.stat.numberOfCommits >= 50
}

module.exports = {
    name: 'Typewriter',
    check: typewriter
}