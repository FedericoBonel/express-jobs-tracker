const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ApiError = require("./ApiError");

class UnauthorizedError extends ApiError {
    constructor(msg) {
        super(
            StatusCodes.UNAUTHORIZED,
            `${ReasonPhrases.UNAUTHORIZED}: ${msg}`
        );
    }
}

module.exports = UnauthorizedError;
