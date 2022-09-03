const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ApiError = require("./ApiError");

class NotFoundError extends ApiError {
    constructor(msg) {
        super(StatusCodes.NOT_FOUND, `${ReasonPhrases.NOT_FOUND}: ${msg}`);
    }
}

module.exports = NotFoundError;
