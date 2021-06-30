
const config = require('../config')


function getAuthTokenFromHeader(req) {
    return req.header('X-Gitlab-Token') || null
}

function verifyToken(req, res, next) {

    const token = getAuthTokenFromHeader(req)
    if(token !== config.WEBHOOK_TOKEN) return res.status(401).json({
        type: 'Unauthorized',
        message: 'Not Authorized to access this resource due to mismatching Gitlab Token!'
    })

    next()
}


module.exports = { verifyToken }
