
/*
 These functions are used to update the gathered team data
 They are triggered on every github commit, through the web hook
 For more info see: controller/WebHookController

 If you choose to add a new updater then don't forget to update the Stat Model in database/models/Stats.model.js
*/


// --- first imports ---
import updateCommitCount from "./updateCommitCount.js";
import updateSecondChance from "./updateSecondChance.js";

// --- second imports ---
import updateAverageCommitTime from "./updateAverageCommitTime.js";

// --- last imports ---
import updateAchievementCount from "./updateAchievementCount.js";


const first = [
    updateCommitCount,
    updateSecondChance
]

const second = [
    updateAverageCommitTime
]

const last = [
    updateAchievementCount
]

export default {
    first,
    second,
    last
}