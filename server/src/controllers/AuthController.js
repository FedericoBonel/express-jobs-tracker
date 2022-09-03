const { StatusCodes } = require("http-status-codes");

const { SuccessPayload } = require("../payloads");
const {
    createUser,
    authenticateUserDetails,
} = require("../services/UserService");

/**
 * Controller for registering users
 * @Note payload validation is derived to previous middleware
 */
const register = async (req, res) => {
    const newUser = req.body;

    const savedUser = await createUser(newUser);

    res.status(StatusCodes.CREATED).json(new SuccessPayload(savedUser));
};

/**
 * Controller for authenticating users
 * @Note payload validation is derived to previous middleware
 */
const login = async (req, res) => {
    const { email, password } = req.body;

    const verified = await authenticateUserDetails(email, password);

    res.status(StatusCodes.OK).json(new SuccessPayload(verified));
};

module.exports = { register, login };
