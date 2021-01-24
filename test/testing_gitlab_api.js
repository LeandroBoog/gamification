const config = require('../config')

var https = require('https');
var fs = require('fs');
var url = require('url');
const decompress = require('decompress')
const zlib = require('zlib');


const id = 2523
const format = 'zip'
const request = `/projects/${id}/repository/archive.${format}`

const URL = `https://${config.GITLAB_INSTANCE}/api/v4/${request}?private_token=${config.GITLAB_TOKEN}`
getZip()

function getZip() {
    function writeToFile(response) {
        response.pipe(fs.createWriteStream(`test.${format}`));
    }

    https.get(URL, function(response) {

        writeToFile(response);
    });
}


function a() {
    const fileContents = fs.createReadStream(`./test.${format}`);
    const writeStream = fs.createWriteStream(`./test_unpacked`);
    const unzip = zlib.createGunzip();
    fileContents.pipe(unzip).pipe(writeStream);
}




