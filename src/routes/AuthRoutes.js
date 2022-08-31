const { Router } = require("express");

const { register, login } = require("../controllers/AuthController");

const authRoutes = Router();

authRoutes.route("/register").post(register);
authRoutes.route("/login").post(login);

module.exports = authRoutes;
