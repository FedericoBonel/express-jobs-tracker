const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const { ApiError } = require("../errors");
const { ErrorPayload } = require("../payloads");

const errorHandler = async (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json(new ErrorPayload(err.message));
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        new ErrorPayload(err.message || ReasonPhrases.INTERNAL_SERVER_ERROR)
    );
};

module.exports = errorHandler;
