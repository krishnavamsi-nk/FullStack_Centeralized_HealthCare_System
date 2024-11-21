const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    hospitalId: { type: mongoose.Types.ObjectId, ref: "Hospitals" },
    patientId: { type: mongoose.Types.ObjectId, ref: "Patients" },
    rating: { type: Number },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
