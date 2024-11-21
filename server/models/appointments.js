const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        hospitalId: { type: mongoose.Types.ObjectId, ref: "Hospitals" },
        doctorId: { type: mongoose.Types.ObjectId, ref: "Doctors" },
        patientId: { type: mongoose.Types.ObjectId, ref: "Patients" },
        appointmentDate: { type: String },
        appointmentTime: { type: String },
        diseaseDescription: { type: String },
        type: { type: String },
    },
    { timestamps: true }
);

const Appointments = mongoose.model("Appointments", appointmentSchema);

module.exports = Appointments;