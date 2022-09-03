const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const ApiError = require("./ApiError");

class ServerError extends ApiError {
    constructor(msg) {
        super(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `${ReasonPhrases.INTERNAL_SERVER_ERROR}: ${msg}`
        );
    }
}

module.exports = ServerError;
