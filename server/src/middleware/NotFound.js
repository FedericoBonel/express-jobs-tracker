const { NotFoundError } = require("../errors");

/**
 * Handles not found routes
 **/
const notFound = async (req, res) => {
    throw new NotFoundError(`Path: '${req.path}' not found`);
};

module.exports = notFound;
