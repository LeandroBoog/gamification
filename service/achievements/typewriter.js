
function typewriter({ team }) {
    return team.number_of_commits >= 50
}

module.exports = { name: 'Typewriter', check: typewriter }