const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String },

    regNo: { type: String },

    image: { type: String, default: "" },

    city: { type: String },
    state: { type: String },
    pincode: { type: String },

    password: { type: String },
    government: { type: String },

    specialityDep: { type: String },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    email: { type: String },

    doctorsWorking: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Doctors" },
    ],
    verified: { type: String },
  },
  { timestamps: true }
);

const Hospitals = mongoose.model("Hospitals", hospitalSchema);

module.exports = Hospitals;
