
const config = require('../config')
const axios = require('axios')

axios.defaults.baseURL = `https://${config.GITLAB_INSTANCE}/api/v4/`

const RANKS = {
    'No access': 0,
    'Minimal access': 5,
    'Guest': 10,
    'Reporter': 20,
    'Developer': 30,
    'Maintainer': 40,
    'Owner': 50
}

async function getStudentInfo(teamId) {

    const response = await axios({
        method: 'get',
        url: `projects/${teamId}/members`,
        params: { 'private_token': config.GITLAB_TOKEN }
    })

    const members = response.data
    const studentRank = RANKS[config.STUDENT_GITLAB_RANK] || RANKS['Developer']

    return members.filter(member => member.access_level === studentRank)
}

// getStudentInfo(3844).then(console.log).catch(console.error)

modules.exports = getStudentInfo