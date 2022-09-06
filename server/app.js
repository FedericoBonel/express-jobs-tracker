require("dotenv").config();
require("express-async-errors");
const express = require("express");

// Security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

// Routes
const jobsRoutes = require("./src/routes/JobsRoutes");
const authRoutes = require("./src/routes/AuthRoutes");
// Middleware
const logger = require("./src/middleware/Logger");
const notFoundHandler = require("./src/middleware/NotFound");
const errorHandler = require("./src/middleware/ErrorHandler");
// Database
const connectToDB = require("./src/db/Connect");

const PORT = process.env.PORT || 5000;
const API_BASE_URL = process.env.API_BASE_URL || "/api/v1";

const app = express();

// Request limiter
// Trust only 1 layer of reverse proxies (i.e. the load balancer), that way we don't block the load balancer
app.set("trust proxy", 1) 
app.use(
    rateLimit({
        windowMs: 15 * 1000 * 60, // 15 minutes
        max: 700, // max number of requests per windowMs (15min)
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.use(logger, express.json());

// Security middleware
app.use(helmet());
app.use(xss());
app.use(cors());

// Routes
app.use(`${API_BASE_URL}/jobs`, jobsRoutes);
app.use(`${API_BASE_URL}/auth`, authRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectToDB(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
    } catch (error) {
        console.log(`An error happened during server start: ${error}`);
    }
};

startServer();
