
const config = require('../config')
const axios = require('axios')
const parseLinkHeader = require('parse-link-header')

const { createTeam } = require('../service/databaseService')
const GitlabApiException = require('../Exceptions/GitlabApiException')

axios.defaults.baseURL = `https://${config.GITLAB_INSTANCE}/api/v4/`
axios.defaults.params = { 'private_token': config.GITLAB_READ_TOKEN }


async function getAllProjects() {

    const groupID = (await axios({
        method: 'get',
        url: `groups?search=${config.GITLAB_GROUP_NAME}`,
    })).data[0].id

    const projects = (await axios({
        method: 'get',
        url: `groups/${groupID}/projects?simple=true`,
    })).data

    return projects
}

async function getAllProjectsPagination() {

    const groupID = (await axios({
        method: 'get',
        url: `groups?search=${config.GITLAB_GROUP_NAME}`,
    })).data[0].id

    const paginationHeader = (await axios({
        method: 'head',
        url: `groups/${groupID}/projects?simple=true`,
    })).headers

    let parsedHeader = parseLinkHeader(paginationHeader.link)
    let nextPage = parsedHeader.first

    const allProjects = []
    while(nextPage) {

        const nextChunkOfProjects = (await axios({
            method: 'get',
            url: nextPage.url,
        }))

        parsedHeader = parseLinkHeader(nextChunkOfProjects.headers.link)
        nextPage = parsedHeader.next

        allProjects.push(...nextChunkOfProjects.data)
    }
    if(!allProjects) throw new GitlabApiException('No Projects could be found')

    return allProjects
}

/*
  Note: endpoint /members only lists members with source "Direct Member" not any group
        related members like Hiwis+Owner, rank filter added just in case
*/
async function getStudentsFromProject({ id }) {

    const members = (await axios({
        method: 'get',
        url: `projects/${id}/members`,
    })).data

    const studentRank = config.RANKS[config.STUDENT_GITLAB_RANK] || config.RANKS['Developer']

    return members.filter(member => member.access_level === studentRank)
}

/*
    option to use token in webhook for identification
    https://docs.gitlab.com/ee/api/projects.html#add-project-hook
*/
async function addWebhookToTeam({ id }) {
    await axios({
        method: 'post',
        params: { private_token: config.GITLAB_WRITE_TOKEN },
        url: `projects/${id}/hooks?url=${config.WEBHOOK_URL}&token=${config.WEBHOOK_TOKEN}&push_events=true`
    })
}

async function deleteWebhookFromTeam(id) {

    const teamHooks = (await axios({
        method: 'get',
        params: { private_token: config.GITLAB_WRITE_TOKEN },
        url: `/projects/${id}/hooks`
    })).data

    const hookToDelete = (teamHooks.filter(hook => hook.url === config.WEBHOOK_URL))[0]

    await axios({
        method: 'delete',
        params: { private_token: config.GITLAB_WRITE_TOKEN },
        url: `projects/${id}/hooks/${hookToDelete.id}`
    })
}

async function createTeamsFromProjects() {

    const projects = await getAllProjectsPagination()

    for(const project of projects) {

        const students = await getStudentsFromProject(project)
        if(!students) {
            console.error(`No members found for Repo ${project.id}`)
            continue
        }

        const findYear = config.GITLAB_GROUP_NAME.match(/\d\d\d\d/)
        const year = findYear ? findYear[0] : new Date().getFullYear()
        const team = {
            id: project.id,
            name: project.path,
            group: config.GITLAB_GROUP_NAME,
            year: year
        }

        try {
            await createTeam(team, students)
            //await addWebhookToTeam(team)
        } catch (error) {
            console.error(error)
        }
    }
}

async function getFeedbackPdf(projectID, path, branch) {

    try {
        const file = (await axios({
            method: 'get',
            url: `projects/${projectID}/repository/files/${encodeURIComponent(path)}?ref=${branch}`,
        })).data

        return Buffer.alloc(file.content.length, file.content, 'base64')

    } catch (error) {
        throw new GitlabApiException(error)
    }
}

module.exports = { createTeamsFromProjects , getFeedbackPdf, getAllProjects }
