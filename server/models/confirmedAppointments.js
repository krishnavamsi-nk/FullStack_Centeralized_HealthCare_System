const mongoose = require("mongoose");

const ConfirmedAppointmentsSchema = new mongoose.Schema(
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

const ConfirmedAppointments = mongoose.model(
    "ConfirmedAppointments",
    ConfirmedAppointmentsSchema
);

module.exports = ConfirmedAppointments;
