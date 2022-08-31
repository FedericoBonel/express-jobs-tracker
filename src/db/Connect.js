const mongoose = require("mongoose");

const ConnectToDB = async (URI) => {
    return mongoose.connect(URI)
}

module.exports = ConnectToDB;