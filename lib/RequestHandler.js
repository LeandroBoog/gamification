
class RequestHandler {

    static sendError(req, res, error) {
        return res.status(error.status || 500).json({
            type: 'error',
            message: error.message || 'Unhandled Error',
            error
        });
    }

    static sendSuccess(res, message, data) {
        return res.status(200).json({
            type: 'success',
            message: message || "Success result",
            data
        })
    }

}

module.exports = RequestHandler