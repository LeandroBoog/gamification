
const db = require('../database')

const Student = db.models.student
const Achievement = db.models.achievement
const Team = db.models.team


async function getStudentById(studentId) {
    return await Student.findOne({
        where: { user_id: studentId }
    })
}

async function getTeamById(teamId) {
    return await Team.findOne({
        where: { project_id: teamId }
    })
}

async function getAchievementByName(achievementName) {
    return await Achievement.findOne({
        where: { name: achievementName }
    })
}

async function createStudent({ user_id, user_name, user_email, user_username }) {
    return await Student.create({
        user_id,
        user_name,
        user_email,
        user_username
    })
}

async function createTeam({ id, name, group, year }, students) {

    const team = await Team.create({
        project_id: id,
        project_name: name,
        gitlab_group: group,
        year: year
    })

    for(const studentObj of students) {
        const student = await createStudent(studentObj)
        team.addStudent(student)
    }

    return team
}

async function createAchievement(name) {
    return await Achievement.create({ name })
}

async function updateTeamStats(teamId, stats) {

    const team = await getTeamById(teamId)

    const allowedProperties = [
        "number_of_unlocked_achievements",
        "number_of_commits",
        "average_commit_time",
        "used_second_chance"
    ]

    for(const stat in stats) {

        //skips properties not in the allowedProperties Array
        if(!allowedProperties.includes(stat)) continue

        team[stat] = stats[stat]
    }

    return await team.save()
}

async function updateStudentStats(studentId, stats) {

    const student = await getStudentById(studentId)

    const allowedProperties = [
        "number_of_commits"
    ]

    for(const stat in stats) {

        //filters out properties not in the allowedProperties Array
        if(!allowedProperties.includes(stat)) continue

        student[stat] = stats[stat]
    }

    return await student.save()
}

async function setAchievementForTeam(teamId, achievementId) {

    const team = await getTeamById(teamId)
    const achievement = await getAchievementById(achievementId)

    return await team.addAchievement(achievement)
}


// -------- TESTS ----------
async function createAchi() {
    await Achievement.create({
        name: "typewriter"
    })
    await Achievement.create({
        name: "wewo"
    })
    return Promise.resolve()
}

db.sync({ force: true })
    .then(b => createAchi())
    .then(a => {
        return createTeam(
            {
                id: 1000,
                name: "smthbra",
                group: "memo",
                year: "2020-2021"
            },
            [
                { user_id: 1234, user_name: "Jane", user_email: 'asd.a@gmx.de', user_username: "JanoYo" },
                { user_id: 1235, user_name: "Tom", user_email: 'tom.a@gmx.de', user_username: "TomAhawK" }
            ])
    })
    .then(team => {
        log(team)
        return team.getAchievements()
    })
    .then(log)
    .then(a => {
        return createTeam(
            {
                id: 1012,
                name: "smthbra",
                group: "memo",
                year: "2020-2021"
            },
            [
                { user_id: 12124, user_name: "Ja2ne", user_email: 'asd.a@gmx.de', user_username: "23" },
                { user_id: 12335, user_name: "T32", user_email: 'tom.a@gmx.de', user_username: "efefe" }
            ])
    })
    .then(team => {
        log(team)
        return team.getAchievements()
    })
    .then(log)
    .then(d => {
        return require('../controller')({project: {id: 1000}})
    })
    .then(console.log)
    .catch(console.error)


function log(t) {
    console.log(JSON.stringify(t, null, 2))
}

module.exports = {
    getStudentById,
    getTeamById,
    getAchievementByName,
    createStudent,
    createTeam,
    createAchievement,
    updateTeamStats,
    updateStudentStats,
    setAchievementForTeam
}
