
// --- first imports ---
import nightOwl from "./nightOwl";
import typewriter from "./typewriter";
import passingExercises from "./passingExercises"

// --- second imports ---
import passedAllExercisesFirstTry from "./passedAllExercisesFirstTry";
import passedAllExercisesUsingSecondChance from "./passedAllExercisesUsingSecondChance";

// --- last imports ---
import getXAchievements from "./getXAchievements"


const first = [
    nightOwl,
    typewriter,
    ...passingExercises,
]

const second = [
    passedAllExercisesFirstTry,
    passedAllExercisesUsingSecondChance
]

const last = [
    ...getXAchievements
]

export default {
    first,
    second,
    last
}