
const db = require('../../database')

const Student = db.models.student
const Achievement = db.models.achievement
const Team = db.models.team
const TeamStats = db.models.teamstats

const NotInDatabaseException = require('../../Exceptions/NotInDatabaseException')
const DatabaseEntryCreationException = require('../../Exceptions/DatabaseEntryCreationException')


async function getStudentById(studentId) {
    const student = await Student.findOne({
        where: { user_id: studentId }
    })
    if(!student) throw new NotInDatabaseException(`Student of ID ${studentId} not found in Database`)

    return student
}

async function getTeamById(projectId, ...includes) {
    const team = await Team.findOne({
        where: { project_id: projectId },
        include: getIncludedModels(includes)
    })
    if(!team) throw new NotInDatabaseException(`Team of ID ${teamId} not found in Database`)

    return team
}

async function getAllTeams() {
    const teams = await Team.findAll()
    if(!teams) throw new NotInDatabaseException(`The Team Database appears to be empty!`)

    return teams
}

async function getAchievementByName(achievementName) {
    const achievement = await Achievement.findOne({
        where: { name: achievementName }
    })
    if(!achievement) throw new NotInDatabaseException(`Achievement of Name ${achievementName} not found in Database`)

    return achievement
}

async function createStudent({ id, name, username }, t) {
    return await Student.create({
        user_id: id,
        name,
        username
    }, { transaction: t })
}

async function createTeam({ id, name, group, year }, students) {

    //https://sequelize.org/master/manual/transactions.html
    const t = await db.transaction();

    try {

        const team = await Team.create({
            project_id: id,
            project_name: name,
            gitlab_group: group,
            year: year
        }, { transaction: t })

        const stats = await TeamStats.create({}, { transaction: t })
        team.setTeamstat(stats)

        for(const studentObj of students) {
            const student = await createStudent(studentObj, t)
            team.addStudent(student)
        }

        await t.commit()

        return team

    } catch (error) {
        await t.rollback()
        //console.error(error)
        throw new DatabaseEntryCreationException(`Failed to create Team of ID ${id}`)
    }
}

async function createAchievement(name) {
    return await Achievement.create({ name })
}

function getIncludedModels(includes) {
    return includes.map(include => db.models[include.toLowerCase()])
}

module.exports = {
    getStudentById,
    getTeamById,
    getAllTeams,
    getAchievementByName,
    createTeam,
    createAchievement,
}
