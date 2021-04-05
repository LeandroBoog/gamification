
const db = require('../database')

const Student = db.models.student
const Achievement = db.models.achievement
const Team = db.models.team

const updaters = require('./updaters')
const achievements = require('./achievements')

const NotInDatabaseException = require('../Exceptions/NotInDatabaseException')
const DatabaseEntryCreationException = require('../Exceptions/DatabaseEntryCreationException')


async function getStudentById(studentId) {
    const student = await Student.findOne({
        where: { user_id: studentId }
    })
    if(!student) throw new NotInDatabaseException(`Student of ID ${studentId} not found in Database`)

    return student
}

async function getTeamById(teamId) {
    const team = await Team.findOne({
        where: { project_id: teamId }
    })
    if(!team) throw new NotInDatabaseException(`Team of ID ${teamId} not found in Database`)

    return team
}

async function getAchievementByName(achievementName) {
    const achievement = await Achievement.findOne({
        where: { name: achievementName }
    })
    if(!achievement) throw new NotInDatabaseException(`Achievement of Name ${achievementName} not found in Database`)

    return achievement
}

async function createStudent({ id, name, username }) {
    return await Student.create({
        id,
        name,
        username
    })
}

async function createStudentAsTransaction({ id, name, username }, t) {
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

        for(const studentObj of students) {
            const student = await createStudentAsTransaction(studentObj, t)
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

async function updateTeamStats({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId)

    const teamData = {
        webHookData,
        team
    }

    for(const updater of updaters) {
        updater(teamData)
    }

    return await team.save()
}

async function checkForAchievements({ webHookData }) {

    const teamId = webHookData.project_id
    const team = await getTeamById(teamId)

    const completedAchievements = (await team.getAchievements()).map(achievement => {
        return achievement.name
    })

    const teamData = {
        webHookData,
        team
    }
            
    for (const achievement of achievements) {

        if(completedAchievements.includes(achievement.name)) continue;

        if(achievement.check(teamData)) {
            const gottenAchievement = await getAchievementByName(achievement.name)
            await team.addAchievement(gottenAchievement)
        }
    }

    return await team.getAchievements()
}

module.exports = {
    getStudentById,
    getTeamById,
    getAchievementByName,
    createStudent,
    createTeam,
    createAchievement,
    updateTeamStats,
    checkForAchievements
}
