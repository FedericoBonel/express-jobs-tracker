const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 4,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 50,
        required: [true, "Please provide a password"],
    },
});

module.exports = mongoose.model("User", userSchema);