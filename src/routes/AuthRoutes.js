const { Router } = require("express");

const authRoutes = Router();

authRoutes.route("/").get(async (req, res) => res.send("All good"));

module.exports = authRoutes;