
const checkIfExerciseHasBeenPassed = require('../../../../lib/checkIfExerciseHasBeenPassed')

const EXERCISE = {}
EXERCISE.branch        = 'abgabe_11R_IPC_threads_server'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 24
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedSeventhExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

module.exports = {
    name: 'Passed Exercise: 11R Thread Server-side',
    check: passedSeventhExercise
}