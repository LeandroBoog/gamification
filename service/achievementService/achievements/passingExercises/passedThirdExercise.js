
import checkIfExerciseHasBeenPassed from "../../../../lib/checkIfExerciseHasBeenPassed";


const EXERCISE = {}
EXERCISE.branch        = 'abgabe_03R_prozesse'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 23
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedThirdExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

export default {
    name: 'Passed Exercise: 03R Processes',
    check: passedThirdExercise
}