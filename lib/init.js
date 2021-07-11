
import config from "../config";
import fs from "fs"

import db from "../database"
import { logGreen } from './logging'

import { createTeamsFromProjects } from "./gitlabApiManager";
import { createAchievement} from "../service/databaseService";
import achievements from "../service/achievementService/achievements"


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
