const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BadRequestError, UnauthorizedError } = require("../errors");
const { create, getBy } = require("../repositories/UserRepository");

const createUser = async (user) => {
    // Check if user with pass already exists
    const existingUser = await getBy({ email: user.email });

    if (existingUser) {
        throw new BadRequestError("User with that email already exists");
    }

    // Encrypt the password and save it in database
    user.password = await bcrypt.hash(user.password, 12);
    const savedUser = await create(user);

    // Return public information to validate registration
    return { _id: user._id, name: savedUser.name, email: savedUser.email };
};

const authenticateUserDetails = async (email, password) => {
    // Validate the user exists and its decrypted password is valid
    const savedUser = await getBy({ email: email });

    if (!(savedUser && (await bcrypt.compare(password, savedUser.password)))) {
        throw new UnauthorizedError("Wrong email and/or password");
    }

    // Generate a unique token and return it
    return {
        user: { name: savedUser.name, email: savedUser.email },
        token: generateToken(savedUser),
    };
};

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

module.exports = { createUser, authenticateUserDetails };
