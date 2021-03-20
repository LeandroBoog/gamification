
const db = require('../database')

const { createTeam, createAchievement, getTeamById } = require('./index')
const example_data = require('./example_data')


function log(t) {
    console.log(JSON.stringify(t, null, 2))
}

async function populateDatabase() {

    // populating Achievements
    let achievements = require('./achievements')
    let achi = []
    for(const achievement of achievements) {
        achi.push(await createAchievement(achievement.name))
    }

    // populating students and teams
    let teams = example_data.teams
    let studs = example_data.students

    let db_teams = []
    for(let i = 0; i < teams.length; i++) {

        let team = await createTeam(teams[i], [studs[i], studs[i+10]])

        let num_of_achi = Math.floor(Math.random() * (achi.length - 1 + 1)) + 1;
        for(let j = 0; j < num_of_achi; j++) {
            await team.addAchievement(achi[j])
        }

        db_teams.push(team)
    }

    return db_teams
}

async function resetDB() {
    await db.sync({ force: true })
    let teams = await populateDatabase()
    console.log(await db.models.team.findAll())
    /*for(let team of teams) {
        log(await team.getAchievements())
    }*/
}

async function runTestOnSampleDataset() {
    await db.sync()

    // --- let the testing begin! ---
    const teams = await db.models.team.findAll()
    teams.forEach(t => console.log(t.project_name))
}


//resetDB().catch(console.error)
runTestOnSampleDataset().catch(console.error)
//db.sync({ force: true }).catch(console.error)
/*

    const { checkForAchievements } = require('../service')
    let webHookData = { project_id: 1000 }
    let t = await getTeamById(webHookData.project_id)
    log(await t.getAchievements())
    log(await checkForAchievements({webHookData}))

const { updateTeamStats } = require('../service')
    let webHookData = {
        project_id: 1000,
        ref: "refs/heads/master",
        commits: [
            { timestamp: "2011-12-12T21:46:31+02:00" }
        ]
    }
    console.log(await updateTeamStats({webHookData}))
 */