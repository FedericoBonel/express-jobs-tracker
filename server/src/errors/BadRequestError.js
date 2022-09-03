const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ApiError = require("./ApiError");

class BadRequestError extends ApiError {
    constructor(msg) {
        super(StatusCodes.BAD_REQUEST, `${ReasonPhrases.BAD_REQUEST}: ${msg}`);
    }
}

module.exports = BadRequestError;
