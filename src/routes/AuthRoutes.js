const { Router } = require("express");

const { register, login } = require("../controllers/AuthController");
const {
    validateUserSchema,
    validateLoginBody,
} = require("../middleware/validators/AuthValidator");

const authRoutes = Router();

authRoutes.route("/register").post(validateUserSchema, register);
authRoutes.route("/login").post(validateLoginBody, login);

module.exports = authRoutes;
