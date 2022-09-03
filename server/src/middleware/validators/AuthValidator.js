const { body } = require("express-validator");
const validateResult = require("./ValidateResults");

const validateUserSchema = [
    body("name")
        .isString()
        .withMessage("Please provide a name")
        .isLength({ min: 4, max: 50 })
        .withMessage("Name must be a string with length 4 to 50"),
    body("password").isString().withMessage("Please provide a password"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    validateResult,
];

const validateLoginBody = [
    body("password").isString().withMessage("Please provide a password"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    validateResult,
]

module.exports = { validateUserSchema, validateLoginBody };
