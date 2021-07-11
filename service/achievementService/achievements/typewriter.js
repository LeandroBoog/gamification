
function typewriter({ team }) {
    return team.stat.numberOfCommits >= 50
}

export default {
    name: 'Typewriter',
    check: typewriter
}