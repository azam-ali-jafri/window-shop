// const Errorhandler = require('../utils/errorHandler')

const errorMiddleware = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    if (err.name === 'CastError') {
        err.message = `resource not found, invalid ${err.path}`
    }

    if (err.code === 11000) {
        err.message = 'Email already exist'
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

module.exports = errorMiddleware