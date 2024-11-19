const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    name: { type: String},

    email: { type: String},

    message: { type: String},

    resolved: { type: String, enum: {
        values: ['true', 'false', ],
        message: '{VALUE} is not supported'}},

},{timestamps:true})

const Contacts =  mongoose.model("Contacts", contactSchema);

module.exports = Contacts;