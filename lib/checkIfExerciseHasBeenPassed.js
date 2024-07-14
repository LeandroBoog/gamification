
import getTeamPointsFromFeedbackPdf from './getTeamPointsFromFeedbackPdf.js'


async function checkIfExerciseHasBeenPassed(webHookData, EXERCISE) {

    const branch = webHookData.ref

    if(branch !== EXERCISE.ref && branch !== `${EXERCISE.ref}_nachkorrektur`) {
        return false
    }

    const commits = webHookData.commits

    let pathToFeedback = ''
    for(const commit of commits) {
        const mergedCommits = commit.added.concat(commit.modified)
        pathToFeedback = findFeedback(mergedCommits)
        if(pathToFeedback) break
    }

    if(!pathToFeedback) return false

    const isRedo = branch.includes('nachkorrektur')
    const pointsNeeded = (!isRedo ? EXERCISE.minPoints : EXERCISE.minPointsRedo)

    const points = await getTeamPointsFromFeedbackPdf(webHookData, pathToFeedback, branch)
    return points.achievedPoints >= pointsNeeded
}

function findFeedback(array) {
    for(const element of array) {
        if(element.match(/feedback\.pdf/)) return element
    }
}

export default checkIfExerciseHasBeenPassed