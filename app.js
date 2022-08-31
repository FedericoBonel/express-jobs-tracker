require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;
const API_BASE_URL = process.env.API_BASE_URL;

const app = express();

app.use(express.json());

const startServer = async () => {
    try {
        app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
    } catch(error) {
        console.log(`An error happened during server start: ${error}`);
    }
}

startServer();