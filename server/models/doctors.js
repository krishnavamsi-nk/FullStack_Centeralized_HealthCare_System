const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String },

        email: { type: String },

        mobileNum: { type: String },

        image: { type: String, default: "" },

        liscenceNo: { type: String },

        city: { type: String },
        state: { type: String },
        pincode: { type: String },

        age: { type: Number },

        experience: { type: Number },

        gender: {
            type: String,
            enum: {
                values: ["male", "female", "other"],
                message: "{VALUE} is not supported",
            },
        },

        treatment: {
            type: String,
            enum: {
                values: ["therapy", "surgery", "medication"],
                message: "{VALUE} is not supported",
            },
        },

        Speciality: { type: String },

        password: { type: String },

        hospitalsWorkingFor: [
            { type: mongoose.Types.ObjectId, ref: "Hospitals" },
        ],
        verified: { type: String },
    },
    { timestamps: true }
);

const Doctors = mongoose.model("Doctors", doctorSchema);

module.exports = Doctors;
