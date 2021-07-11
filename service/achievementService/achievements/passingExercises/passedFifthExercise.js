
import checkIfExerciseHasBeenPassed from "../../../../lib/checkIfExerciseHasBeenPassed";


const EXERCISE = {}
EXERCISE.branch        = 'abgabe_07R_User_Scheduling'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 35
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedFifthExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

export default {
    name: 'Passed Exercise: 07R User Scheduling',
    check: passedFifthExercise
}