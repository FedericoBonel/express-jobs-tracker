const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BadRequestError, UnauthorizedError } = require("../errors");
const { create, getBy } = require("../repositories/UserRepository");

/**
 * Registers the passed user to the database with an encrypted password
 * @param {{_id:String,
 *         name:String,
 *         password: String,
 *         email:String}} user User that will be stored in database, must follow defined User schema
 * @throws {BadRequestError} If there's a user with that email already registered
 * @returns Public user information
 */
const createUser = async (user) => {
    // Check if user with that email already exists
    const existingUser = await getBy({ email: user.email });
    if (existingUser) {
        throw new BadRequestError("User with that email already exists");
    }

    // Otherwise encrypt the password and save it in database
    user.password = await bcrypt.hash(user.password, 12);
    const savedUser = await create(user);

    // Return public information (without password) to validate registration
    return { _id: savedUser._id, name: savedUser.name, email: savedUser.email };
};

/**
 * Authenticates the user password and email
 * @param {String} email Users email
 * @param {String} password Users password
 * @throws {UnauthorizedError} If email and password are invalid
 * @returns Token and user public information
 */
const authenticateUserDetails = async (email, password) => {
    // Validate the user exists and its decrypted password is valid
    const savedUser = await getBy({ email: email });

    if (!(savedUser && (await bcrypt.compare(password, savedUser.password)))) {
        throw new UnauthorizedError("Wrong email and/or password");
    }

    // Generate a unique token and return it
    return {
        user: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
        },
        token: generateTokenFor(savedUser),
    };
};

/**
 * Util function that grabs user id, name and email and creates a jwt with it
 * @param {{ _id: String, name: String, email: String }} user Authenticated user
 * @returns {String} Token
 */
const generateTokenFor = (user) => {
    return jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

module.exports = { createUser, authenticateUserDetails };
