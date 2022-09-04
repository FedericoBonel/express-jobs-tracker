const { Types } = require("mongoose");
const { NotFoundError } = require("../../errors");

/**
 * Validates ids path parameters so that they are valid in mongodb
 * @throws {NotFoundError} if id is not valid
 */
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundError(`Entity with id: ${id} not found!`);
    }
    next();
};

module.exports = validateId;
