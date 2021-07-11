
import db from '../../database'

import NotInDatabaseException from "../../Exceptions/NotInDatabaseException";
import DatabaseEntryCreationException from "../../Exceptions/DatabaseEntryCreationException";


const Student = db.models.student
const Achievement = db.models.achievement
const Team = db.models.team
const Stats = db.models.stats

export async function getStudentById(studentId) {
    const student = await Student.findOne({
        where: { userId: studentId }
    })
    if(!student) throw new NotInDatabaseException(`Student of ID ${studentId} not found in Database`)

    return student
}

export async function getTeamById(projectId, ...includes) {
    const team = await Team.findOne({
        where: { projectId: projectId },
        include: getIncludedModels(includes)
    })
    if(!team) throw new NotInDatabaseException(`Team of ID ${teamId} not found in Database`)

    return team
}

export async function getAllTeams() {
    const teams = await Team.findAll()
    if(!teams) throw new NotInDatabaseException(`The Team Database appears to be empty!`)

    return teams
}

export async function getAchievementByName(achievementName) {
    const achievement = await Achievement.findOne({
        where: { name: achievementName }
    })
    if(!achievement) throw new NotInDatabaseException(`Achievement of Name ${achievementName} not found in Database`)

    return achievement
}

export async function createStudent({ id, name, username }, t) {
    return await Student.create({
        userId: id,
        name,
        username
    }, { transaction: t })
}

export async function createTeam({ id, name, group, year }, students) {

    //https://sequelize.org/master/manual/transactions.html
    const t = await db.transaction();

    try {

        const team = await Team.create({
            projectId: id,
            projectName: name,
            gitlabGroup: group,
            year: year
        }, { transaction: t })

        const stats = await Stats.create({}, { transaction: t })
        team.setStat(stats)

        for(const studentObj of students) {
            const student = await createStudent(studentObj, t)
            team.addStudent(student)
        }

        await t.commit()

        return team

    } catch (error) {
        await t.rollback()
        console.error(error)
        throw new DatabaseEntryCreationException(`Failed to create Team of ID ${id}`)
    }
}

export async function createAchievement(name) {
    return await Achievement.create({ name })
}

function getIncludedModels(includes) {
    return includes.map(model => db.models[model.toLowerCase()])
}


export default {
    getStudentById,
    getTeamById,
    getAllTeams,
    getAchievementByName,
    createTeam,
    createAchievement,
}
