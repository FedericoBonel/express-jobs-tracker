const UserModel = require("../models/User");

const create = async (user) => {
    return await UserModel.create(user);
};

const getBy = async (filters) => {
    return await UserModel.findOne(filters);
};

module.exports = { create, getBy };
