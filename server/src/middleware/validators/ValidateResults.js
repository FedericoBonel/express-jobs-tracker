const { validationResult } = require("express-validator");

const { BadRequestError } = require("../../errors");

/**
 * Gets the validation result from previous express-validator middleware
 * and verifies that there are no errors.
 * @throws {BadRequestError} if the validation result contains errors
 */
const validateResults = async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errors = result
            .array()
            .map((err) => err.msg)
            .join(", ");

        throw new BadRequestError(errors);
    }
    next();
};

module.exports = validateResults;
