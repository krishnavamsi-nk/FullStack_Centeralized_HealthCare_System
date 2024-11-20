const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
    {
        name: { type: String },

        email: { type: String },

        password: { type: String },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
