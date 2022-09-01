const { body, param } = require("express-validator");
const { Types } = require("mongoose");

const validateResult = require("./ValidateResults");
const { NotFoundError } = require("../../errors");

const validateId = (req, res, next) => {
    const { id } = req.params;
    console.log(req.params);
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundError(`Entity with id: ${id} not found!`);
    }
    next();
};

module.exports = validateId;
