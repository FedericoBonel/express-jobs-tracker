const jwt = require("jsonwebtoken");

const { UnauthorizedError, BadRequestError } = require("../errors");

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!(token && token.startsWith("Bearer "))) {
        throw new BadRequestError("Token must be provided in 'authorization: Bearer ' schema");
    }

    const hashedToken = token.substring(7);

    try {
        const payload = jwt.verify(hashedToken, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid token");
    }
};

module.exports = validateToken;