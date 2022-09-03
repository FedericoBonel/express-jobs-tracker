const { validationResult } = require("express-validator");

const { BadRequestError } = require("../../errors");

const validateResults = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result.array().map((err) => `{${err.param} : ${err.msg}}`);

        throw new BadRequestError(
            `The following fields are incorrect: ${errors.join(", ")}`
        );
    }
    next();
};

module.exports = validateResults;
