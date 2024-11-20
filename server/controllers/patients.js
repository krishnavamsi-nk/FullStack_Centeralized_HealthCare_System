const Hospitals = require("../models/hospitals");
const Patient = require("../models/patients");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
const Rating = require("../models/rating");
const PDFDocument = require("pdfkit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const CacheClient = require("../cacheClient/redis-client");
let config = {
  service: "gmail",
  auth: {
    user: "testingnode061229@gmail.com",
    pass: "xzentliyxvefqpwl",
  },
};
let transporter = nodemailer.createTransport(config);
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  Patient.findOne({ email: email })
    .then((patient) => {
      if (!patient) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
      bcrypt
        .compare(password, patient.password)
        .then((doMatch) => {
          if (doMatch) {
            console.log(doMatch);
            const token = jwt.sign(
              { id: patient._id, type: "patients" },
              String(process.env.SECRET),
              {
                expiresIn: "3h",
              }
            );
            res.cookie("chs", token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
              maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ ...patient._doc, type: "patients" });
          }
          return res
            .status(401)
            .json({ message: "Invalid email or password." });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ message: "Server error." });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: "Server error." });
    });
};

exports.postRegister = (req, res) => {
  const email = req?.body?.email;
  const name = req.body?.name;
  const gender = req.body?.gender;
  const age = req.body?.age;
  const height = req.body?.height;
  const weight = req.body?.weight;
  const allergies = req.body?.allergies;
  const bloodGroup = req.body?.bloodGroup;
  const state = req.body?.state;
  const city = req.body?.city;
  const pincode = req.body?.pincode;
  const mobileNumber = req.body?.mobileNumber;
  const password = req.body?.password;
  const maritalStatus = req.body?.maritalStatus;
  Patient.findOne({ email: email })
    .then((patient) => {
      if (patient) {
        res.status(409).send("user already exists");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newPatient = new Patient({
            name: name,
            email: email,
            password: hashedPassword,
            mobileNum: mobileNumber,
            height: height,
            weight: weight,
            bloodGroup: bloodGroup,
            state: state,
            city: city,
            pincode: pincode,
            age: age,
            gender: gender,
            married: maritalStatus,
            allergies: allergies,
          });
          return newPatient.save();
        })
        .then((result) => {
          res.status(200).send({ message: "success" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getHospitals = async (req, res) => {
  Hospitals.find({}).then((locations) => {
    res.status(200).json(locations);
  });
};

exports.getMedicalRecords = (req, res) => {
  MedicalRecords.find({ patientId: req._id })
    .populate("hospitalId doctorId")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Error retrieving medical records",
      });
    });
};

exports.postFilteredMedicalRecords = (req, res) => {
  if (req.body.doctor === "All" && req.body.hospital === "All") {
    return res.redirect("/patients/medicalrecords");
  } else {
    res.redirect(
      `/patients/medicalrecords/filtered/${req.body.hospital}/${req.body.doctor}`
    );
  }
};

exports.getFilteredMedicalRecords = (req, res) => {
  const doctorId = req.params.doctorId;
  const hospitalId = req.params.hospitalId;
  if (doctorId !== "All" && hospitalId !== "All") {
    MedicalRecords.find({
      patientId: req.patient._id,
      hospitalId: hospitalId,
      doctorId: doctorId,
    })
      .populate("hospitalId doctorId")
      .then((data) => {
        const doctors = data.map((medicalRecord) => {
          console.log(medicalRecord.doctorId);
          return medicalRecord.doctorId;
        });
        const hospitals = data.map((medicalRecord) => {
          return medicalRecord.hospitalId;
        });
        var set1 = new Set(hospitals);
        const finalHospitals = [...set1];
        var set2 = new Set(doctors);
        const finalDoctors = [...set2];
        return res.render("results/filteredMedicalRecords", {
          data: data,
          doctors: finalDoctors,
          hospitals: finalHospitals,
          selectedDoctor: doctorId,
          selectedHospital: hospitalId,
        });
      });
  }
  if (doctorId === "All" && hospitalId !== "All") {
    MedicalRecords.find({
      patientId: req.patient._id,
      hospitalId: hospitalId,
    })
      .populate("hospitalId doctorId")
      .then((data) => {
        const doctors = data.map((medicalRecord) => {
          return medicalRecord.doctorId;
        });
        const hospitals = data.map((medicalRecord) => {
          return medicalRecord.hospitalId;
        });
        var set1 = new Set(hospitals);
        const finalHospitals = [...set1];
        var set2 = new Set(doctors);
        const finalDoctors = [...set2];
        return res.render("results/filteredMedicalRecords", {
          data: data,
          doctors: finalDoctors,
          hospitals: finalHospitals,
          selectedDoctor: "All",
          selectedHospital: hospitalId,
        });
      });
  }
  if (doctorId !== "All" && hospitalId === "All") {
    MedicalRecords.find({
      patientId: req.patient._id,
      doctorId: doctorId,
    })
      .populate("hospitalId doctorId")
      .then((data) => {
        const doctors = data.map((medicalRecord) => {
          return medicalRecord.doctorId;
        });
        const hospitals = data.map((medicalRecord) => {
          return medicalRecord.hospitalId;
        });
        var set1 = new Set(hospitals);
        const finalHospitals = [...set1];
        var set2 = new Set(doctors);
        const finalDoctors = [...set2];
        return res.render("results/filteredMedicalRecords", {
          data: data,
          doctors: finalDoctors,
          hospitals: finalHospitals,
          selectedHospital: "All",
          selectedDoctor: doctorId,
        });
      });
  }
};

exports.getConfirmAppointments = (req, res) => {
  ConfirmedAppointments.find({ patientId: req._id })
    .populate("doctorId hospitalId")
    .then((cdata) => {
      res.status(200).json(cdata);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRequestedAppointments = (req, res) => {
  Appointments.find({ patientId: req._id })
    .populate("doctorId hospitalId")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFiltered = (req, res) => {
  const location = req.params.location;
  const speciality = req.params.speciality;
  let loc = req.params.location.toString().toLowerCase();

  if (location !== "all" && speciality !== "all") {
    Hospitals.find({
      city: loc,
      specialityDep: speciality,
      verified: "true",
    })
      .then((hospitals) => {
        res.json({
          hospitals: hospitals,
          speciality: speciality,
          location: location,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  if (location === "all" && speciality !== "all") {
    Hospitals.find({ specialityDep: speciality, verified: "true" })
      .then((hospitals) => {
        res.json({
          hospitals: hospitals,
          speciality: speciality,
          location: location,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  if (location !== "all" && speciality === "all") {
    Hospitals.find({ city: loc, verified: "true" })
      .then((hospitals) => {
        res.json({
          hospitals: hospitals,
          speciality: speciality,
          location: location,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
};

exports.postFiltered = (req, res) => {
  if (req.body.location === "all" && req.body.speciality === "all") {
    return res.redirect("/patients/hospitals");
  }
  res.redirect(
    `/patients/hospitals/filtered/${req.body.location}/${req.body.speciality}`
  );
};

// exports.getNearByHospitals = async (req, res) => {
//     const { radius, longitude, latitude, speciality } = req.params;
//     console.log(req.params);
//     if (speciality !== 'all') {
//         const hospitals = await Hospitals.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [parseFloat(longitude),
//                         parseFloat(latitude),]
//                     },
//                     $maxDistance: (Number(radius) * 1000),
//                 }
//             },
//             specialityDep: speciality
//         })
//         return res.status(200).json(hospitals);
//     }
//     else {
//         const hospitals = await Hospitals.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: "Point",
//                         coordinates: [parseFloat(longitude),
//                         parseFloat(latitude),]
//                     },
//                     $maxDistance: Number(radius) * 1000,
//                 }
//             },
//         })
//         return res.status(200).json(hospitals);
//     }
// }

exports.getNearByHospitals = async (req, res) => {
  const { radius, longitude, latitude, speciality } = req.params;

  try {
    // Validate inputs
    const parsedRadius = Number(radius) * 1000; // Convert to meters
    const parsedLongitude = parseFloat(longitude);
    const parsedLatitude = parseFloat(latitude);

    if (
      isNaN(parsedRadius) ||
      isNaN(parsedLongitude) ||
      isNaN(parsedLatitude)
    ) {
      return res
        .status(400)
        .json({ error: "Invalid location or radius parameters." });
    }

    // Build the query
    const query = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parsedLongitude, parsedLatitude],
          },
          $maxDistance: parsedRadius,
        },
      },
    };

    if (speciality !== "all") {
      query.specialityDep = speciality;
    }

    // Fetch nearby hospitals
    const hospitals = await Hospitals.find(query);

    if (hospitals.length === 0) {
      return res.status(404).json({
        message: "No hospitals found within the specified radius.",
      });
    }

    // Return the result
    return res.status(200).json(hospitals);
  } catch (err) {
    console.error("Error fetching nearby hospitals:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDoctorsList = (req, res) => {
  const id = req.params.id;
  Hospitals.findById(id)
    .then((hospital) => {
      hospital.populate("doctorsWorking").then((results) => {
        return res.status(200).json(results.doctorsWorking);
      });
    })
    .catch((err) => {
      console.log(err);
      const errorResponse = {
        success: false,
        message: "Internal server error",
      };
      return res.status(500).json(errorResponse);
    });
};

exports.getDoctorsListbyReg = (req, res) => {
  const regNo = req.params.regNo;
  Hospitals.findOne({ regNo: regNo })
    .then((hospital) => {
      hospital.populate("doctorsWorking").then((results) => {
        return res.status(200).json(results.doctorsWorking);
      });
    })
    .catch((err) => {
      console.log(err);
      const errorResponse = {
        success: false,
        message: "Internal server error",
      };
      return res.status(500).json(errorResponse);
    });
};

exports.getBookDoctor = (req, res) => {
  const hospitalId = req.params.hospitalId;
  const doctorId = req.params.doctorId;
  res.render("forms/bookDoctor", {
    doctorId: doctorId,
    hospitalId: hospitalId,
  });
};

exports.postBookDoctor = (req, res) => {
  const hospitalId = req.body.hospitalId;
  const doctorId = req.body.doctorId;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;
  const diseaseDescription = req.body.diseaseDescription;
  const type = req.body.type;
  const patientId = req._id;
  console.log(req.body);
  const appointment = new Appointments({
    patientId: patientId,
    hospitalId: hospitalId,
    doctorId: doctorId,
    type: type,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    diseaseDescription: diseaseDescription,
  });

  appointment
    .save()
    .then((result) => {
      console.log(result);
      res
        .status(200)
        .json({ message: "Appointment booked successfully", result });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          error: "An error occurred while booking the appointment",
          err,
        });
    });
};
exports.cancleRequestedAppointment = (req, res) => {
  console.log(req.body);
  if (req.body.type === "requested") {
    Appointments.deleteOne({ _id: req.body.appointmentId })
      .then(() => {
        res.status(200).json({
          message: "sucessfully cancled appointment",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }
  if (req.body.type === "confirmed") {
    ConfirmedAppointments.deleteOne({ _id: req.body.appointmentId })
      .then(() => {
        res.redirect("/patients/confirmendappointments");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.postChosen = (req, res) => {
  if (req.body.chosen === "reqAppointments") {
    return res.redirect("/patients/requestedappointments");
  }
  if (req.body.chosen === "cnfAppointments") {
    return res.redirect("/patients/confirmendappointments");
  }
  if (req.body.chosen === "rate") {
    return res.redirect("/patients/getratehospital");
  }
  if (req.body.chosen === "medicalrecords") {
    return res.redirect("/patients/medicalrecords");
  }
};
exports.sendPdf = (req, res) => {
  const pdfDoc = new PDFDocument();
  const chunks = [];

  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text("hello", {
    underline: true,
    align: "center",
  });

  pdfDoc.fontSize(26).text("iamUnserWater", {
    underline: true,
    align: "center",
  });

  pdfDoc.end();

  // Event handler for the 'data' event to collect chunks of the PDF
  res.on("data", (chunk) => {
    chunks.push(chunk);
  });

  // Event handler for the 'end' event to send the collected chunks to the frontend
  res.on("end", () => {
    const pdfBuffer = Buffer.concat(chunks);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="' + "testing" + '"'
    );
    res.status(200).send(pdfBuffer);
  });
};
// exports.getMedicalRecord = (req, res) => {
//     const medicalRecordId = req.params.medicalrecordId;
//     MedicalRecords.findById(medicalRecordId)
//         .populate("hospitalId doctorId patientId")
//         .then((record) => {
//             if (!record) {
//                 return res.send("no medical record found");
//             }
//             const RecordName = "MedicalRecord-" + medicalRecordId + ".pdf";
//             const pdfDoc = new PDFDocument();
//             res.setHeader("Content-Type", "application/pdf");
//             res.setHeader(
//                 "Content-Disposition",
//                 'inline; filename="' + RecordName + '"'
//             );
//             pdfDoc.pipe(res);
//             pdfDoc.fontSize(26).text(record.hospitalId.name, {
//
//
//             });
//             pdfDoc.moveDown(1);
//             pdfDoc.fontSize(10).text("DoctorName:" + record.doctorId.name, {
//                 align: "left",
//             });
//             pdfDoc.moveUp(1);
//             pdfDoc.fontSize(10).text("PatientName:" + record.patientId.name, {
//
//             });
//             pdfDoc.moveUp(1);
//             pdfDoc.fontSize(10).text("Date:" + record.date, {
//                 align: "right",
//             });
//             pdfDoc.moveDown(1);
//             pdfDoc.fontSize(10).text("B.P:" + record.bloodPressure, {
//                 align: "left",
//             });
//             pdfDoc.moveUp(1);
//             pdfDoc.fontSize(10).text("Temperature:" + record.temperature, {
//
//             });
//             pdfDoc.moveUp(1);
//             pdfDoc.fontSize(10).text("oxygen:" + record.oxygen, {
//                 align: "right",
//             });
//             pdfDoc.moveDown(1.5);
//             pdfDoc.fontSize(15).text("Medications:", {
//                 align: "left",
//             });
//             let count = 1;
//             const splitMedicines = record.medicines[0].split(",");
//             splitMedicines.forEach((medicine) => {
//                 pdfDoc.moveDown(0.3);
//                 pdfDoc.fontSize(10).text(count + ". " + medicine);
//                 count += 1;
//             });
//             pdfDoc.moveDown(1.5);
//             pdfDoc.fontSize(15).text("Medical Tests:", {
//                 align: "left",
//             });
//             count = 1;
//             const splitTests = record.medicalTests[0].split(",");
//             if (splitTests.length !== 0) {
//                 splitTests.forEach((test) => {
//                     pdfDoc.moveDown(0.3);
//                     pdfDoc.fontSize(10).text(count + ". " + test);
//                     count += 1;
//                 });
//             }
//             if (splitTests.length === 0) {
//                 pdfDoc.moveDown(0.3);
//                 pdfDoc.fontSize(10).text("No Tests Required");
//             }
//             pdfDoc.moveDown(1.5);
//             pdfDoc.fontSize(16).text("Surgery Required : " + record.surgery, {
//                 align: "left",
//             });
//             pdfDoc.moveDown(1.5);
//             pdfDoc.fontSize(15).text("Doctors Note : ", {
//                 align: "left",
//             });
//             pdfDoc.moveDown(1);
//             pdfDoc.fontSize(11).text(record.note, {
//                 align: "left",
//             });
//             pdfDoc.end();
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

exports.getMedicalRecord = (req, res) => {
  const medicalRecordId = req.params.medicalrecordId;
  MedicalRecords.findById(medicalRecordId)
    .populate("hospitalId doctorId patientId")
    .then((record) => {
      if (!record) {
        return res.send("no medical record found");
      }
      const RecordName = "MedicalRecord-" + medicalRecordId + ".pdf";
      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + RecordName + '"'
      );
      pdfDoc.pipe(res);

      // Centralized Healthcare System heading
      pdfDoc.fontSize(28).text("Centralized Healthcare System", {
        bold: true,
        align: "center",
      });

      // Hospital name
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Hospital Name:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.hospitalId.name, {
        bold: true,
      });

      // Doctor name
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Doctor Name:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.doctorId.name, {
        bold: true,
      });

      // Patient name
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Patient Name:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.patientId.name, {
        bold: true,
      });

      // Date
      pdfDoc.moveDown(1);
      pdfDoc.fontSize(18).text("Date:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.date, {
        bold: true,
      });

      // Blood Pressure
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Blood Pressure:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.bloodPressure, {
        bold: true,
      });

      // Temperature
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Temperature:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.temperature, {
        bold: true,
      });

      // Medications
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Medications:", { bold: true, underlined: true });
      record.medicines.forEach((medicine, index) => {
        pdfDoc.fontSize(16).text(`${index + 1}. ${medicine}`);
      });

      // Medical Tests
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Medical Tests:", { bold: true, underlined: true });
      if (record.medicalTests.length > 0) {
        record.medicalTests.forEach((test, index) => {
          pdfDoc.fontSize(16).text(`${index + 1}. ${test}`);
        });
      } else {
        pdfDoc.fontSize(16).text("No medical tests required.");
      }

      // Surgery Requirement
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Surgery Requirement:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.surgery, {
        bold: true,
      });

      // Doctor's Note
      pdfDoc.moveDown(1);
      pdfDoc
        .fontSize(18)
        .text("Doctor's Note:", { bold: true, underlined: true });
      pdfDoc.fontSize(16).text(record.note, {
        bold: true,
      });

      pdfDoc.end();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getConsultedHospitals = (req, res) => {
  MedicalRecords.find({ patientId: req.patient._id })
    .populate("hospitalId")
    .then((data) => {
      const newData = data.map((doc) => {
        return doc.hospitalId;
      });
      var set1 = new Set(newData);
      const finalHospitals = [...set1];
      res.render("results/rateConsultedHospitals", {
        hospitals: finalHospitals,
      });
    });
};

exports.getRating = (req, res) => {
  const hospitalId = req.params.hospitalId;
  Rating.findOne({ hospitalId: hospitalId, patientId: req.patient._id }).then(
    (document) => {
      if (!document) {
        res.render("results/rating", {
          hospitalId: hospitalId,
          previoulyRated: "false",
          rating: 1,
        });
      }
      if (document) {
        console.log(document);
        res.render("results/rating", {
          hospitalId: hospitalId,
          previoulyRated: "true",
          rating: document.rating,
          id: document._id,
        });
      }
    }
  );
};

exports.postRating = (req, res) => {
  if (req.body.type === "add") {
    const rating = new Rating({
      patientId: req.patient._id,
      hospitalId: req.body.hospitalId,
      rating: req.body.rating,
    });
    rating.save().then((result) => {
      res.render("success/sucessRated");
    });
  }
  if (req.body.type === "modify") {
    Rating.findByIdAndUpdate(req.body.id, { rating: req.body.rating }).then(
      (result) => {
        res.render("success/sucessRated");
      }
    );
  }
};

exports.getModify = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("results/getModifyPatient", {
    data: req.patient,
    errorMessage: message,
  });
};

exports.putModify = async (req, res) => {
  try {
    const patientId = req._id;
    const body = req.body;
    console.log(body);
    const patient = await Patient.findById(patientId);
    const hashedPassword = bcrypt.hashSync(body.currentPassword, 12);
    console.log(patient.password, hashedPassword);
    if (patient.password !== hashedPassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    const newPassword = body.newPassword;
    const name = body.name;
    const mobileNum = body.mobileNumber;
    const city = body.city;
    const pincode = body.pincode;
    const gender = body.gender;
    if (!newPassword) {
      patient.name = name;
      patient.mobileNum = mobileNum;
      patient.city = city;
      patient.pincode = pincode;
      patient.gender = gender;
      const newPatient = await patient.save();
      return res.status(200).json(newPatient);
    } else {
      const hashedPassword = bcrypt.hashSync(newPassword, 12);
      patient.name = name;
      patient.mobileNum = mobileNum;
      patient.city = city;
      patient.pincode = pincode;
      patient.gender = gender;
      patient.password = hashedPassword;
      const newPatient = await patient.save();
      return res.status(200).json(newPatient);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
};

exports.Logout = (req, res, next) => {
  res.clearCookie("chs");
  req._id = null;
  return res.status(200).json({ message: "Logged out!!" });
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req._id) {
      return res.status(400).json({ error: "Invalid _id" });
    }

    let imagePath = req.file.path.replace(/\\/g, "/"); // Replacing backslashes with forward slashes


   imagePath = `${imagePath}`;  // Make the path a complete URL

    const user = await Patient.findById(req._id);

    await Patient.findByIdAndUpdate(req._id, { image: imagePath });

    return res.json({ path: req.file.path });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.resetpassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userEmail = decoded.email;

    const user = await Patient.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json("Password reset successfully");
  } catch (error) {
    console.log(error);
    return res.status(401).json("Invalid or expired token");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await Patient.findOne({ email: email });
  if (!user) {
    return res
      .status(401)
      .json({ message: "No user found with the given email" });
  }
  const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "1h",
  });
  const mailOptions = {
    from: "testingnode061229@gmail.com",
    to: "krishnavamsin202@gmail.com",
    subject: "Password Reset Request",   
    text: `To reset your password, click on the following link: ${process.env.apiUrl_Front_End}/reset-password/patients/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};
