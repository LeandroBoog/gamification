
const config = require('../config')
const execa = require('execa')

async function cloneRepo(team, branch='master') {

    const path = './tmp'

    const baseURL = `https://${config.GITLAB_USERNAME}:${config.GITLAB_TOKEN}@${config.GITLAB_INSTANCE}`
    const repoUrl = `${baseURL}/${config.GITLAB_GROUP_NAME}/${config.TEAM_NAMING_SCHEME}${team}.git`

    await execa('git', ['clone', '--branch', branch, repoUrl, path])
}

cloneRepo('003').catch(console.log)

module.exports = cloneRepo