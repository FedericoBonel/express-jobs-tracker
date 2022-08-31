const { StatusCodes } = require("http-status-codes");

const { BadRequestError, UnauthorizedError } = require("../errors");
const { SuccessPayload } = require("../payloads");

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        throw new BadRequestError(
            `Expected username and password in request body`
        );
    }

    // Register the user in db
    const newUser = {};

    res.status(StatusCodes.OK).json(new SuccessPayload(newUser));
};

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        throw new BadRequestError(
            `Expected username and password in request body`
        );
    }

    // call to loginService(username, password) checks if username exists and password match
    // if so, returns a new token, otherwhise returns an undefined value
    const verified = { token: "asdasdsa sample only" };

    if (!verified) {
        throw new UnauthorizedError();
    }

    res.status(StatusCodes.OK).json(new SuccessPayload(verified));
};

module.exports = { register, login };
