
const config = require('../config')
const fs = require('fs')

const db = require('../database')
const { logGreen } = require('../lib/logging')

const { createTeamsFromProjects } = require('./gitlabApiManager')
const { createAchievement } = require('../service/databaseService')

async function init() {

    fs.stat(config.DB_PATH, async (error, stats) => {

        if(error) {
            // means database doesn't exist yet so create it and populate it!
            try {
                logGreen('No Database detected, fetching Teams with GitlabApi and creating Database entries')
                await db.sync({ force: true })

                logGreen('Creating Team entries')
                await createTeamsFromProjects()

                logGreen('Creating Achievement Entries')
                const achievements = require('../service/achievementService/achievements')
                for(const achievement of achievements) {
                    await createAchievement(achievement.name)
                }

                logGreen('Finished creating Entries')

            } catch (error) {
                console.error(error)
                process.kill(process.pid, 'SIGTERM')
            }
        }
    })
}

module.exports = init