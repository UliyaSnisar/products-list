const rateLimit = require('express-rate-limit')
const {HttpCode} = require('../config/constants')

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    handler: (req, res, next) => {
        return res.status(HttpCode.TOO_MANY_REQUESTS)
        .json({ 
            status: 'error', 
            code: HttpCode.TOO_MANY_REQUESTS, 
            message: 'Too many requests'
        })
    }
})

module.exports = limiter