
const achievements = require('../achievements')
const { createAchievement } = require('../service')

async function initAchievements() {
    for(const achievement of achievements) {
        await createAchievement(achievement.name)
    }
}

module.exports = initAchievements