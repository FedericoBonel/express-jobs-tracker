const { ReasonPhrases, StatusCodes } = require("http-status-codes");

// Handles not found routes
const notFound = async (req, res) => res.status(StatusCodes.NOT_FOUND).json();
