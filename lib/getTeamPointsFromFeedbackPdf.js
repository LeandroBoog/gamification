
import execa from "execa";
import { getFeedbackPdf } from "./gitlabApiManager";


async function getTeamPointsFromFeedbackPdf({ project_id }, path, branch) {

    try {
        const feedbackPdf = await getFeedbackPdf(project_id, path, branch)

        const process = execa('pdftotext', ['-', '-'])
        process.stdin.write(feedbackPdf)
        process.stdin.end()

        const { stdout } = await process
        return findScores(stdout)

    } catch (error) {
        console.error(error.toString())
    }
}

function findScores(pdfAsText) {

    const scores = []
    let keywordFound = false

    for (const line of pdfAsText.split('\n')) {

        if (!line.trim()) continue
        if (line.match(/^\d+$/)) {
            scores.push(line)
        } else if (line.trim() === 'Gesamtpunktzahl') {
            keywordFound = true
        } else if (keywordFound) {
            break
        }
    }

    return {
        maxPointsAchievable: scores[scores.length - 2],
        achievedPoints: scores[scores.length - 1]
    }
}

export default getTeamPointsFromFeedbackPdf