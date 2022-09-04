const { StatusCodes } = require("http-status-codes");
const { ErrorPayload } = require("../payloads");
const { ApiError } = require("../errors");

/**
 * Middleware that handles all errors that may happen during execution
 */
const errorHandler = async (err, req, res, next) => {
    const customError = new ApiError(
        err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        err.message || "Something went wrong please try again"
    );

    if (err.code && err.code === 11000) {
        customError.message = `Duplicated value for ${Object.keys(
            err.keyValue
        )}, please choose another value`;
        customError.status = StatusCodes.BAD_REQUEST;
    }

    res.status(customError.status).json(new ErrorPayload(customError.message));
};

module.exports = errorHandler;
