const { StatusCodes } = require("http-status-codes");
const { ErrorPayload } = require("../payloads");

const errorHandler = async (err, req, res, next) => {

    const customError = {
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong please try again"
    };

    if (err.code && err.code === 11000) {
        customError.message = `Duplicated value for ${Object.keys(err.keyValue)}, please choose another value`;
    }

    res.status(customError.status).json(new ErrorPayload(customError.message));
};

module.exports = errorHandler;
