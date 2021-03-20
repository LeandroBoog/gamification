
module.exports = class GitlabApiException extends Error {

    constructor(error) {
        super(error.message);
        this.name = "GitlabApiException"
        this.error = error
    }

    toString() {

        const errorObj = { name: this.name }
        if (this.error.response) {

            errorObj['data'] = this.error.response.data
            //errorObj['headers'] = this.error.response.headers
        } else if (this.error.request) {

            errorObj['request'] = this.error.request
        } else {

            errorObj['message'] = `Error: ${this.error.message}`
        }

        errorObj['config'] = this.error.config
        return errorObj
    }
}