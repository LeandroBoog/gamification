
const db = require('../database')

const { Student, Achievement, Team } = db.models


async function createStudent(student) {

    await Student.create(student)
}

async function updateStudent(student) {

    await Student.update(student, {
        where: { email: student.email }
    })
}


async function createTeam(teamInfo, students) {

    const team = await Team.create(teamInfo)

    for(const student of students) {

        const queriedStudent = await Student.findOrCreate({
            where: { email: student.email },
            defaults: {
                name: student.name,
                email: student.email
            }
        });

        team.addStudent(queriedStudent)
    }

    return team
}

async function createAchievement(achievement) {

    await Achievement.create(achievement)
}

async function addAchievementToTeam(team, achievementName) {

    const achievement = Achievement.findOne({ where: { name: achievementName }})
    if (!achievement) {
        return Promise.reject()
    }

    await team.addAchievement(achievement)
    const unlockedAchievements = team.toJSON().achievements.length
    await team.update({
        number_of_unlocked_achievements: unlockedAchievements
    })
}
