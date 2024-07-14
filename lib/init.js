
import config from "../config.js"
import fs from "fs"

import db from "../database/index.js"
import { logGreen } from './logging.js'

import { createTeamsFromProjects } from "./gitlabApiManager.js";
import { createAchievement} from "../service/databaseService/index.js";
import achievements from "../service/achievementService/achievements/index.js"


async function init() {

    fs.stat(config.DB_PATH, async (error, stats) => {

        try {
            // means database exists so delete it
            if(!error) fs.unlinkSync(config.DB_PATH)

            logGreen('Creating new Database, fetching Teams with GitlabApi and creating Database entries')
            await db.sync({ force: true })

            logGreen('Creating Team entries')
            await createTeamsFromProjects()

            logGreen('Creating Achievement Entries')
            for(const achievement of [...achievements.first, ...achievements.second, ...achievements.last]) {
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
