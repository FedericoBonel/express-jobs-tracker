const jwt = require("jsonwebtoken");

const { UnauthorizedError, BadRequestError } = require("../errors");

/**
 * Middleware that validates the 'authorization' header using json web tokens
 */
const authenticateJWT = async (req, res, next) => {
    // Check authorization header
    const token = req.headers.authorization;

    if (!(token && token.startsWith("Bearer "))) {
        throw new BadRequestError("Web Token must be provided in 'authorization: Bearer ' schema");
    }

    // Extract token and verify it going to next middleware if correct
    const hashedToken = token.substring(7);

    try {
        const payload = jwt.verify(hashedToken, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid token");
    }
};

module.exports = authenticateJWT;