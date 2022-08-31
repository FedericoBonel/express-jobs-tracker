require("dotenv").config();
require("express-async-errors");
const express = require("express");

// Routes
const jobsRoutes = require("./src/routes/JobsRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
// Middleware
const logger = require("./src/middleware/Logger")
const notFoundHandler = require("./src/middleware/NotFound");
const errorHandler = require("./src/middleware/ErrorHandler");
// Database
const connectToDB = require("./src/db/Connect");

const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || "/api/v1";

const app = express();

app.use(logger, express.json());


app.use(`${API_BASE_URL}/jobs`, jobsRoutes);
app.use(`${API_BASE_URL}/auth`, authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectToDB(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
    } catch(error) {
        console.log(`An error happened during server start: ${error}`);
    }
}

startServer();