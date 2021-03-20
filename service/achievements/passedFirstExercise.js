
const checkIfExerciseHasBeenPassed = require('../../lib/checkIfExerciseHasBeenPassed')

const CONSTANTS = {}
CONSTANTS.branch        = 'abgabe_01R_basics'
CONSTANTS.ref           = `refs/heads/${CONSTANTS.branch}`
CONSTANTS.maxPoints     = 14
CONSTANTS.minPoints     = Math.ceil(CONSTANTS.maxPoints * 0.5)
CONSTANTS.minPointsRedo = Math.ceil(CONSTANTS.maxPoints * 0.75)


function passedFirstExercise({ webHookData }) {
    return checkIfExerciseHasBeenPassed(webHookData, CONSTANTS)
}

module.exports = { name: 'Passed First Exercise', check: passedFirstExercise }