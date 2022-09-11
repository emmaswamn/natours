const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.keyValue.name;

    const message = `Duplicate field value: ${value}. Please use another value`;

    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const message = `Please correct the following errors: ${err.message}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
    // console.log(req.originalUrl);
    // API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // Rendered webside
    console.log('Unknow error', err);
    // console.log(err.message);
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    });
};

const sendErrorProd = (err, req, res) => {
    // API
    if (req.originalUrl.startsWith('/api')) {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        // Programming or other unknown error: don't leak error details
        console.log('Unknow error', err);
        return res.status(err.statusCode).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }

    // Rendered webside
    if (err.isOperational) {
        console.log('Unknow error', err);
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: 'Please try again later.'
        });
    }

    // Programming or other unknown error: don't leak error details
    console.log('Unknow error', err);
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.'
    });
};

module.exports = (err, req, res, next) => {
    // console.log(err.stack);

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.name = err.name;
        error.message = err.message;

        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, req, res);
    }
};
