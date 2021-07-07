
const checkIfExerciseHasBeenPassed = require('../../../../lib/checkIfExerciseHasBeenPassed')

const EXERCISE = {}
EXERCISE.branch        = 'abgabe_02R_zeiger'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 18
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedSecondExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

module.exports = { name: 'Passed First Exercise', check: passedSecondExercise }