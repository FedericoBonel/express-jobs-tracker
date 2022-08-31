const { StatusCodes } = require("http-status-codes");

const { ServerError } = require("../errors");
const { SuccessPayload } = require("../payloads");
const {
    createUser,
    authenticateUserDetails,
} = require("../services/UserService");

const register = async (req, res) => {
    const newUser = req.body;

    const savedUser = await createUser(newUser);

    if (!savedUser) {
        throw new ServerError("Something went wrong!");
    }

    res.status(StatusCodes.CREATED).json(new SuccessPayload(savedUser));
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const verified = await authenticateUserDetails(email, password);

    if (!verified) {
        throw new ServerError("Something went wrong!");
    }

    res.status(StatusCodes.OK).json(new SuccessPayload(verified));
};

module.exports = { register, login };
