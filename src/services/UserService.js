const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { BadRequestError, UnauthorizedError } = require("../errors");
const { create, getUserBy } = require("../repositories/UserRepository");

const createUser = async (user) => {
    // Check if user with pass already exists
    const existingUser = await getUserBy({ email: user.email });

    if (existingUser) {
        throw new BadRequestError("User with that email already exists");
    }

    // Encrypt the password and save it in database
    user.password = await bcrypt.hash(user.password, 12);
    const savedUser = await create(user);

    // Return public information to validate registration
    return { name: savedUser.name, email: savedUser.email };
};

const authenticateUser = async (email, password) => {
    // Validate the user exists and it's decrypted password is valid
    const existingUser = await getUserBy({ email: email });

    if (
        !(
            existingUser &&
            (await bcrypt.compare(password, existingUser.password))
        )
    ) {
        throw new UnauthorizedError("Wrong email and/or password");
    }

    // Generate a unique token
    return token = generateToken(existingUser);
};

const generateToken = (user) => {
    return jwt.sign(
        { name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

module.exports = { createUser, authenticateUser };
