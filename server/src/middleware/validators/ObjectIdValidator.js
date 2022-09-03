const { Types } = require("mongoose");
const { NotFoundError } = require("../../errors");

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundError(`Entity with id: ${id} not found!`);
    }
    next();
};

module.exports = validateId;
