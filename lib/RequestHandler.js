
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
            message: message || "Successful Query",
            data
        })
    }

    static async handleQuery(query, req, res) {
        try {
            const data = await query()
            RequestHandler.sendSuccess(res, data)
        } catch(error) {
            RequestHandler.sendError(req, res, error)
        }
    }
}

module.exports = RequestHandler