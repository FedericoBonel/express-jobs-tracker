const { body } = require("express-validator");
const validateResults = require("./ValidateResults");
const { jobStatus } = require("../../models/Job");

const validateJobSchema = [
    body("company")
        .isString()
        .withMessage("Please provide a company")
        .isLength({ min: 2, max: 50 })
        .withMessage("Company must have a length of 2 to 50 inclusive"),
    body("position")
        .isString()
        .withMessage("Please provide a job position")
        .isLength({ min: 4, max: 100 })
        .withMessage("Job position must have a length of 4 to 100 inclusive"),
    body("status")
        .isIn(jobStatus)
        .withMessage(`Must be one of the following strings: ${jobStatus}`)
        .optional(),
    validateResults,
];

module.exports = { validateJobSchema };
