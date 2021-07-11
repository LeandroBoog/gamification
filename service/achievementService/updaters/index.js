
// --- first imports ---
import updateCommitCount from "./updateCommitCount";
import updateSecondChance from "./updateSecondChance";

// --- second imports ---
import updateAverageCommitTime from "./updateAverageCommitTime";

// --- last imports ---
import updateAchievementCount from "./updateAchievementCount";


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