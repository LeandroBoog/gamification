
const config = require('../config')
const fs = require('fs')

const db = require('../database')
const { logGreen } = require('../lib/logging')

const { createTeamsFromProjects } = require('./gitlabApiManager')
const { createAchievement } = require('../service/databaseService')

async function init() {

    fs.stat(config.DB_PATH, async (error, stats) => {

        try {
            // means database exists so delete it
            if(!error) fs.unlinkSync(config.DB_PATH)

            logGreen('No Database detected, fetching Teams with GitlabApi and creating Database entries')
            await db.sync({ force: true })

            logGreen('Creating Team entries')
            await createTeamsFromProjects()

            logGreen('Creating Achievement Entries')
            const achievements = require('../service/achievementService/achievements')
            for(const achievement of [...achievements.first, ...achievements.last]) {
                await createAchievement(achievement.name)
            }

            logGreen('Finished creating Entries')

        } catch (err) {
            console.error(err)
            process.kill(process.pid, 'SIGTERM')
        }

    })
}

init()
