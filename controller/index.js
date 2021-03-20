
const { updateTeamStats, checkForAchievements } = require('../service')

async function handleWebHook({ webHookData }) {

    try {
        await updateTeamStats({ webHookData })
        await checkForAchievements({ webHookData})
    } catch (error) {
        console.error(error)
    }

}

module.exports = handleWebHook