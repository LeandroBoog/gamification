
/*
 here order in which the achievements get checked matters since some achievements can depend on others
 example:
    getting the nightOwl Achievement can bring the Achievement count up to 5, which triggers get5Achievements

 Creating a new achievement should be as easy as to just import it here.
 Check out database/models/Stats.model to see which team data is available or create a new updater to handle
 any new data you might need
*/


// --- first imports ---
import nightOwl from "./nightOwl.js";
import typewriter from "./typewriter.js";
import passingExercises from "./passingExercises/index.js"

// --- second imports ---
import passedAllExercisesFirstTry from "./passedAllExercisesFirstTry.js";
import passedAllExercisesUsingSecondChance from "./passedAllExercisesUsingSecondChance.js";

// --- last imports ---
import getXAchievements from "./getXAchievements/index.js"


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