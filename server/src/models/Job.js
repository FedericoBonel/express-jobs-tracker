const mongoose = require("mongoose");

const jobStatus = ["interview", "declined", "pending"];

const jobsSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, "Please provide a company"],
            minlength: 2,
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, "Please provide a job position"],
            minlength: 4,
            maxlength: 100,
        },
        status: {
            type: String,
            enum: jobStatus,
            default: "pending",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        },
    },
    { timestamps: true }
);

const jobsModel = mongoose.model("Job", jobsSchema);

module.exports = { jobsModel, jobStatus };
