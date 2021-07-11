
import checkIfExerciseHasBeenPassed from "../../../../lib/checkIfExerciseHasBeenPassed";


const EXERCISE = {}
EXERCISE.branch        = 'abgabe_09R_IPC_threads_client'
EXERCISE.ref           = `refs/heads/${EXERCISE.branch}`
EXERCISE.maxPoints     = 26
EXERCISE.minPoints     = Math.ceil(EXERCISE.maxPoints * 0.5)
EXERCISE.minPointsRedo = Math.ceil(EXERCISE.maxPoints * 0.75)


async function passedSixthExercise({ webHookData }) {
    return await checkIfExerciseHasBeenPassed(webHookData, EXERCISE)
}

export default {
    name: 'Passed Exercise: 09R Threads Client-side',
    check: passedSixthExercise
}