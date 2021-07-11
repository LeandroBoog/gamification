
import allExercises from './passingExercises'


async function passedAllExercisesFirstTry({ team }) {
    if(team.stat.usedSecondChance) return false
    const gottenAchievements = (await team.getAchievements()).map(achievement => achievement.name)
    return allExercises.every(achievement => gottenAchievements.includes(achievement.name))
}

export default {
    name: "Respect The Hustle",
    check: passedAllExercisesFirstTry
}