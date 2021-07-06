
const checkIfExerciseHasBeenPassed = require('../../../lib/checkIfExerciseHasBeenPassed')

const EXERCISE = {}
EXERCISE.branch        = 'abgabe_01R_basics'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 14
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedFirstExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

module.exports = { name: 'Passed First Exercise', check: passedFirstExercise }