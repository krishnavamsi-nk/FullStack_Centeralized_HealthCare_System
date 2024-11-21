const Doctor = require("../models/doctors");
const bcrypt = require("bcrypt");
const Hospital = require("../models/hospitals");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const nodemailer = require("nodemailer");
const MedicalRecords = require("../models/medicalRecords");
const Appointments = require("../models/appointments");
const jwt = require("jsonwebtoken");
const CacheClient = require("../cacheClient/redis-client");
const fs = require("fs");
let config = {
  service: "gmail",
  auth: {
    user: "testingnode061229@gmail.com",
    pass: "xzentliyxvefqpwl",
  },
};
let transporter = nodemailer.createTransport(config);
exports.getLogin = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    path: "/doctors/register",
    path2: "/doctors/login",
    errorMessage: message,
  });
};
exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  Doctor.findOne({ email: email })
    .then((doctor) => {
      console.log(doctor);
      if (!doctor) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password or you are not yet verified.",
        });
      }
      bcrypt
        .compare(password, doctor.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { id: doctor._id, type: "doctors" },
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
            return res.status(200).json({ ...doctor._doc, type: "doctors" });
          }
          return res.status(401).json({
            success: false,
            message: "Invalid email or password.",
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error.",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    });
};

exports.getRegister = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/doctorRegistration", {
    errorMessage: message,
  });
};

exports.postRegister = (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const gender = req.body.gender;
  const liscenceNo = req.body.licenseNo;
  const experience = req.body.experience;
  const speciality = req.body.specialty;
  const state = req.body.state;
  const city = req.body.city;
  const pincode = req.body.pincode;
  const mobileNum = req.body.mobileNum;
  const email = req.body.email;
  const password = req.body.password;
  Doctor.findOne({ email: email }).then((doctor) => {
    if (doctor) {
      return res.status(400).json({
        success: false,
        message: "E-Mail exists already, please pick a different one.",
      });
    }
    Doctor.findOne({ liscenceNo: liscenceNo }).then((doc) => {
      console.log(doc);
      if (doc) {
        return res.status(400).json({
          success: false,
          message: "Doctor already exists with the given License Number.",
        });
      }
      return bcrypt.hash(password, 12).then((hashedPassword) => {
        const newDoc = new Doctor({
          name: name,
          email: email,
          mobileNum: mobileNum,
          liscenceNo: liscenceNo,
          city: city,
          gender: gender,
          state: state,
          pincode: pincode,
          age: age,
          experience: experience,
          Speciality: speciality,
          password: hashedPassword,
          verified: "false",
        });
        return newDoc
          .save()
          .then((result) => {
            return res.status(200).json({
              success: true,
              message: "Doctor registration successful.",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({
              success: false,
              message: "Internal server error.",
            });
          });
      });
    });
  });
};

exports.getDashboard = async (req, res) => {
  console.log(req.doctor);
  const hospitalsWorkingFor = await req.doctor.populate("hospitalsWorkingFor");
  let namesOfHospitals = hospitalsWorkingFor.hospitalsWorkingFor.map(
    (hospitalDetails) => {
      return hospitalDetails.hName;
    }
  );
  namesOfHospitals = namesOfHospitals.filter((hospitalName) => {
    return hospitalName != null;
  });
  const data = {
    name: req.doctor.name,
    age: req.doctor.age,
    city: req.doctor.city,
    state: req.doctor.state,
    pincode: req.doctor.pincode,
    speciality: req.doctor.Speciality,
    hospitalsWorkingFor: namesOfHospitals,
  };
  res.render("dashboard/doctorDashboard", {
    data: data,
  });
};

exports.getBookedAppointments = (req, res) => {
  ConfirmedAppointments.find({ doctorId: req._id })
    .populate("patientId")
    .then((appointments) => {
      console.log(appointments);
      res.status(200).json(appointments);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.addHospital = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/addHospital", {
    errorMessage: message,
  });
};

exports.postAddHospital = (req, res) => {
  const hname = req.body.hospitalName;
  const regNo = req.body.regNo;
  Hospital.findOne({ regNo: regNo })
    .then((hospital) => {
      if (!hospital) {
        return res.status(400).json({
          success: false,
          message: "Cannot find Hospital ",
        });
      }
      Doctor.findById(req._id).then((doctor) => {
        const hospitalsAdded = doctor.hospitalsWorkingFor;
        const isThere = hospitalsAdded.find(
          (id) => id.toString() === hospital._id.toString()
        );
        if (isThere) {
          return res.status(400).json({
            success: false,
            message: "Hospital already exists in your hospitals working list",
          });
        }
        hospital.doctorsWorking.push(req._id);
        hospital.save().then((result) => {
          Doctor.findById(req._id).then((doctor) => {
            doctor.hospitalsWorkingFor.push(hospital._id);
            doctor.save().then((result) => {
              res.status(200).json({
                success: true,
                message: "Hospital added successfully",
              });
            });
          });
        });
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
};

exports.getRemoveHospital = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/removeHospital", {
    errorMessage: message,
  });
};

exports.postRemoveHospital = (req, res) => {
  const regNo = req.body.regNo;
  console.log(req.body.regNo);
  Doctor.findById(req._id)
    .populate("hospitalsWorkingFor")
    .then((result) => {
      console.log(result);
      const match = result.hospitalsWorkingFor.find((hospital) => {
        return hospital.regNo === regNo;
      });
      if (!match) {
        return res.status(400).json({
          error: "Hospital to remove isn't in your working hospital list",
        });
      }
      Doctor.findByIdAndUpdate(
        result._id,
        { $pullAll: { hospitalsWorkingFor: [match._id] } },
        { new: true }
      )
        .then((newDoctor) => {
          Hospital.findOneAndUpdate(
            { regNo: regNo },
            { $pullAll: { doctorsWorking: [req._id] } },
            { new: true }
          ).then((finalObject) => {
            Appointments.deleteMany({
              hospitalId: match._id,
              doctorId: req._id,
            })
              .then((result) => {
                return ConfirmedAppointments.deleteMany({
                  hospitalId: match.id,
                  doctorId: req._id,
                });
              })
              .then((result) => {
                res
                  .status(200)
                  .json({ success: "Hospital removed successfully" });
              });
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    });
};
exports.getPrescribe = (req, res) => {
  console.log(req.params);
  res.render("results/prescription", {
    patientId: req.params.patientId,
    hospitalId: req.params.hospitalId,
    appointmentId: req.params.appointmentId,
  });
};

exports.postPrescribe = (req, res) => {
  console.log(req.body);
  const date = new Date();
  const medicalRecord = new MedicalRecords({
    hospitalId: req.body.hospitalId,
    patientId: req.body.patientId,
    doctorId: req._id,
    bloodPressure: req.body.bloodPressure,
    temperature: req.body.temperature,
    height: req.body.height,
    weight: req.body.weight,
    oxygen: req.body.oxygen,
    surgery: req.body.surgery,
    medicalTests: req.body.medicalTests,
    note: req.body.note,
    medicines: req.body.medicines,
    date: date.toLocaleDateString(),
  });

  medicalRecord
    .save()
    .then((medicalrecord) =>
      ConfirmedAppointments.findById(req.body.appointmentId)
    )
    .then((appointment) => appointment?.deleteOne())
    .then((result) => {
      console.log(result);
      res.json({ success: true, message: "Prescription saved successfully." });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    });
};

exports.getHospitalsWorkingFor = (req, res) => {
  Doctor.findById(req._id)
    .populate("hospitalsWorkingFor")
    .then((result) => {
      const filteredHospitals = result.hospitalsWorkingFor.map((hospital) => ({
        _id: hospital._id,
        name: hospital.name,
        city: hospital.city,
        state: hospital.state,
        pincode: hospital.pincode,
        regNo: hospital.regNo,
      }));

      return res.status(200).json(filteredHospitals);
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
};

exports.getMedicalRecords = (req, res) => {
  console.log(req.params);
  MedicalRecords.find({ patientId: req.params.patientId })
    .populate("hospitalId patientId doctorId")
    .then((medicalRecords) => {
      res.status(200).json(medicalRecords);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postChosen = (req, res) => {
  if (req.body.chosen === "addHospital") {
    return res.redirect("/doctors/addhospital");
  }
  if (req.body.chosen === "removeHospital") {
    return res.redirect("/doctors/removehospital");
  }
  if (req.body.chosen === "hospitalsWorking") {
    return res.redirect("/doctors/gethospitalsworkingfor");
  }
};

exports.removeAppointment = (req, res) => {
  const appointmentId = req.params.appointmentId;
  ConfirmedAppointments.findByIdAndDelete(appointmentId)
    .then((result) => {
      result.populate("doctorId").then((details) => {
        res.render("success/skipAppointment");
        let message = {
          from: "testingnode061229@gmail.com",
          to: "krishnavamsin202@gmail.com", //this email id has to be changed
          subject: "Appointment Confirmed",
          html: `
                    <p>Your Appointment for the doctor ${details.doctorId.name} has been removed by the doctor due to your unavailability at the appointment time</p>
                    <p>You may request another appointment via CHS</p>
                    `,
        };
        transporter.sendMail(message);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getModify = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("results/getModifyDoctor", {
    data: req.doctor,
    errorMessage: message,
  });
};

exports.putModify = async (req, res) => {
  console.log(req.body);
  const doctorId = req.params.id; // Assuming the doctor's ID is passed in the URL
  const body = req.body;
  let user = null;
  try {
    user = await Doctor.findById(doctorId).exec();
  } catch (err) {
    return res.status(500).json({ message: "Internal error occurred!" });
  }
  if (!user) {
    return res.status(404).json({ message: "Doctor not found!" });
  }
  user.name = body.name;
  user.mobileNum = body.mobileNumber;
  user.city = body.city;
  user.pincode = body.pincode;

  const passwordCompare = await bcrypt.compare(
    body.currentPassword,
    user.password
  );
  if (!passwordCompare) {
    return res.status(409).json({
      message: "Wrong password entered : Cannot edit account details!",
    });
  }
  if (body.newPassword && body.newPassword.length > 0) {
    const hashedPassword = bcrypt.hashSync(body.newPassword, 10);
    user.password = hashedPassword;
  }
  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: "Internal error occurred!" });
  }
  const updatedDoc = { ...user._doc, type: "doctors" };
  return res.status(200).json(updatedDoc);
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
   // Normalize the image path (convert backslashes to forward slashes)
   let imagePath = req.file.path.replace(/\\/g, "/"); // Replacing backslashes with forward slashes


   imagePath = `${imagePath}`;  // Make the path a complete URL
    const user = await Doctor.findById(req._id);
    await Doctor.findByIdAndUpdate(req._id, { image: imagePath });
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

    const user = await Doctor.findOne({ email: userEmail });

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

  const user = await Doctor.findOne({ email: email });
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
    text: `To reset your password, click on the following link: ${process.env.apiUrl_Front_End}/reset-password/doctors/${token}`,
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
