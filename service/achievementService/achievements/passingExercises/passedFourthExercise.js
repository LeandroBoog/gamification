
import checkIfExerciseHasBeenPassed from "../../../../lib/checkIfExerciseHasBeenPassed.js";


const EXERCISE = {}
EXERCISE.branch        = 'abgabe_05R_Speicherverwaltung'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 32
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedFourthExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

export default {
    name: 'Passed Exercise: 05R Memory Management',
    check: passedFourthExercise
}