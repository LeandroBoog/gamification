const config = require('../config')
const axios = require('axios').default
const unzipper = require('unzipper')


axios.defaults.baseURL = `https://${config.GITLAB_INSTANCE}/api/v4/`


async function downloadRepo(repoId) {

    //change this to /tmp/repo
    const folderPath = 'tmp/repo'

    try {
        const response = await axios({
            method: 'get',
            url: `projects/${repoId}/repository/archive.zip`,
            params: { 'private_token': config.GITLAB_TOKEN },
            responseType: 'stream'
        })

        //if (response.status !== 200) return new FetchError('Error getting Repo')

        const stream = response.data
        unzip(stream, folderPath)
            .on('close', () => {
                console.log('Completed Download of Repo')
            })

    } catch (error) {
        return new Error('Error in downloadRepo')
    }

}

function unzip(stream, path) {
    stream.pipe(unzipper.Extract({ path: path }))
    return stream
}

function test() {
    downloadRepo(2523).then(console.log).catch(console.error)
}

module.exports = downloadRepo