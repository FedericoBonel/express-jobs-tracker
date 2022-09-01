const mongoose = require("mongoose");

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
            enum: ["interview", "declined", "pending"],
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

module.exports = jobsModel;
