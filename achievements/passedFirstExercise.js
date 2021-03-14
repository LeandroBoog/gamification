
function passedFirstExercise(webHookData, team) {

    const branch = webHookData.ref
    if(branch !== `refs/heads/HierDerRelevanteBranch`) {
        return false
    }

    //Also check if normal branch or Nachholer!

    //Somehow get the feedback pdf here and parse it to read points achieved
    //https://www.npmjs.com/package/pdfreader
    const points_achieved = 10
    const points_needed = 7
    return points_achieved >= points_needed
}

module.exports = { name: 'Passed First Exercise', check: passedFirstExercise }