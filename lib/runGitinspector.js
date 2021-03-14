
const config = require('../config')
const execa = require('execa')

const sanitize = require('./sanitizeStatObject')

async function runGitinspector(students, pathToRepo='/home/leandro/Desktop/temp', ) {

    const gitInspectorExecutable = config.GITINSPECTOR_PATH || '/home/leandro/Desktop/temp/gitinspector/gitinspector.py'

    const {stdout} = await execa(
        gitInspectorExecutable,
        ['--format=json'],
        { cwd: pathToRepo }
    );

    const stats = JSON.parse(stdout).gitinspector
    return sanitize(stats, students)
}

async function test() {
    runGitinspector(['y0097635@iz04.ibr.cs.tu-bs.de', 'martin.krause@tu-bs.de'])
        .then(res => {
            console.log(res.changes.authors)
            console.log(res.blame.authors)
        })
        .catch(console.error)
}

test()

module.exports = runGitinspector