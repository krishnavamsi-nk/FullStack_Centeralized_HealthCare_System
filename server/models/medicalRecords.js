const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema(
    {
        appointmentId: { type: mongoose.Types.ObjectId, ref: "ConfirmedAppointments" },
        hospitalId: { type: mongoose.Types.ObjectId, ref: "Hospitals" },
        doctorId: { type: mongoose.Types.ObjectId, ref: "Doctors" },
        patientId: { type: mongoose.Types.ObjectId, ref: "Patients" },
        bloodPressure: { type: String },
        temperature: { type: String },
        height: { type: String },
        weight: { type: String },
        oxygen: { type: String },
        medicalTests: { type: [String] },
        surgery: { type: String },
        medicines: { type: [String] },
        note: { type: String },
        date: { type: String },
    },
    { timestamps: true }
);
const MedicalRecord = mongoose.model("MedicalRecord", MedicalRecordSchema);

module.exports = MedicalRecord;
