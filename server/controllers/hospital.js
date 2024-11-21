const Hospital = require("../models/hospitals");
const Appointments = require("../models/appointments");
const ConfirmedAppointments = require("../models/confirmedAppointments");
const MedicalRecords = require("../models/medicalRecords");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Doctors = require("../models/doctors");
const Hospitals = require("../models/hospitals");
const CacheClient = require("../cacheClient/redis-client");
const jwt = require("jsonwebtoken");
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
  res.render("auth/hospitalLogin", {
    path: "/hospitals/register",
    path2: "/hospitals/login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Hospital.findOne({ email: email })
    .then((hospital) => {
      if (!hospital) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid Registration Number or password or you are not yet verified",
        });
      }

      bcrypt
        .compare(password, hospital.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { id: hospital._id, type: "hospitals" },
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
            return res
              .status(200)
              .json({ ...hospital._doc, type: "hospitals" });
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
            message: "Internal server error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
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
  res.render("auth/hospitalRegistration", {
    errorMessage: message,
  });
};

exports.postRegister = (req, res) => {
  const name = req.body.name;
  const regNo = req.body.regNo;
  const speciality = req.body.speciality;
  const isGovernment = req.body.government;
  const password = req.body.password;
  const state = req.body.state;
  const city = req.body.city.toString().toLowerCase();
  const pincode = req.body.pincode;
  const email = req.body.email;

  Hospital.findOne({ regNo: regNo })
    .then((hospital) => {
      if (hospital) {
        return res.status(400).json({
          message:
            "Hospital with this registration number already exists! Try login instead!",
        });
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newHospital = new Hospital({
            name: name,
            regNo: regNo,
            city: city,
            state: state,
            pincode: pincode,
            password: hashedPassword,
            government: isGovernment,
            specialityDep: speciality,
            verified: "false",
            email: email,
            location: {
              type: "Point",
              coordinates: [
                parseFloat(req.body.longitude),
                parseFloat(req.body.latitude),
              ],
            },
          });
          return newHospital.save();
        })
        .then((result) => {
          res.status(201).json({
            message: "Hospital registration successful!",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Internal Server Error",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    });
};

exports.getDashboard = (req, res) => {
  let count;
  if (!req.hospital.doctorsWorking) {
    count = 0;
  } else {
    count = req.hospital.doctorsWorking.length;
  }
  MedicalRecords.countDocuments({ hospitalId: req.hospital._id }).then(
    (patientTreatedCount) => {
      ConfirmedAppointments.countDocuments({
        hospitalId: req.hospital._id,
      }).then((bookedAppointmentsCount) => {
        res.render("dashboard/hospitalDashboard", {
          patientTreatedCount: patientTreatedCount,
          bookedAppointmentsCount: bookedAppointmentsCount,
          doctorsCount: count,
        });
      });
    }
  );
};

exports.getTreated = (req, res) => {
  MedicalRecords.find({ hospitalId: req.hospital._id })
    .populate("doctorId patientId hospitalId")
    .then((result) => {
      res.render("results/getHospitalTreatedPatients", { data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSearchPatientTreated = (req, res) => {
  MedicalRecords.find({ hospitalId: req.hospital._id })
    .populate("doctorId patientId")
    .then((result) => {
      const filteredList = result.filter((document) => {
        return document.patientId.email === req.body.email;
      });
      res.render("results/getHospitalTreatedPatients", {
        data: filteredList,
      });
    });
};

exports.getBookedAppointments = (req, res) => {
  ConfirmedAppointments.find({ hospitalId: req.hospital._id })
    .populate("doctorId patientId")
    .then((data) => {
      res.status(200).json({
        bookedAppointments: data.map((appointment) => ({
          _id: appointment._id,
          // Include all fields from the populated doctor and patient objects
          doctor: appointment.doctorId,
          patient: appointment.patientId,
          // Add other fields from the appointment object as needed
        })),
      });
    })
    .catch((error) => {
      console.error(error);

      // Handle different types of errors and send appropriate responses
      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid hospital ID" });
      }

      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getRequestedAppointments = (req, res) => {
  Appointments.find({ hospitalId: req._id })
    .populate("doctorId patientId")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);

      if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid hospital ID" });
      }

      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getResheduleAppointment = (req, res) => {
  const id = req.params.appointmentId;
  Appointments.findById(id).then((data) => {
    res.render("forms/rescheduleAppointment", {
      date: data.appointmentDate,
      time: data.appointmentTime,
      data: data,
    });
  });
};

exports.postAcceptAppointment = (req, res) => {
  Appointments.findById(req.body.appointmentId)
    .then((newAppointment) => {
      const confirmAppointment = new ConfirmedAppointments({
        hospitalId: newAppointment.hospitalId,
        doctorId: newAppointment.doctorId,
        patientId: newAppointment.patientId,
        appointmentDate: newAppointment.appointmentDate,
        appointmentTime: newAppointment.appointmentTime,
        diseaseDescription: newAppointment.diseaseDescription,
        type: newAppointment.type,
      });
      confirmAppointment.save().then((result) => {
        result.populate("doctorId patientId hospitalId").then((Confirmed) => {
          let jsonResponse = {
            success: true,
            message: "Appointment confirmed successfully",
            confirmedAppointment: {
              doctorName: Confirmed.doctorId.name,
              hospitalName: Confirmed.hospitalId.name,
              appointmentDate: Confirmed.appointmentDate,
              appointmentTime: Confirmed.appointmentTime,
            },
          };
          res.json(jsonResponse);

          let message = {
            from: "testingnode061229@gmail.com",
            to: "krishnavamsin202@gmail.com",
            subject: "Appointment Confirmed",
            html: `
                            <p>Your appointment for the doctor ${Confirmed.doctorId.name} has been confirmed by hospital ${Confirmed.hospitalId.name}</p>
                            <p>Appointment Date: ${Confirmed.appointmentDate}</p>
                            <p>Appointment Time: ${Confirmed.appointmentTime} </p>
                        `,
          };
          transporter.sendMail(message);
          return newAppointment.deleteOne();
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

exports.postRescheduleAppointment = (req, res) => {
  console.log(req.body);
  Appointments.findById(req.body.appointmentId)
    .then((result) => {
      result.appointmentDate = req.body.appointmentDate;
      result.appointmentTime = req.body.appointmentTime;
      console.log(result);
      return result.save();
    })
    .then((newAppointment) => {
      const confirmAppointment = new ConfirmedAppointments({
        hospitalId: newAppointment.hospitalId,
        doctorId: newAppointment.doctorId,
        patientId: newAppointment.patientId,
        appointmentDate: newAppointment.appointmentDate,
        appointmentTime: newAppointment.appointmentTime,
        diseaseDescription: newAppointment.diseaseDescription,
        type: newAppointment.type,
      });
      confirmAppointment.save().then((result) => {
        result.populate("doctorId patientId hospitalId").then((confirmed) => {
          res.status(200).json({
            message: "Appointment Rescheduled and Confirmed",
            data: {
              doctorName: confirmed.doctorId.name,
              hospitalName: confirmed.hospitalId.name,
              appointmentDate: confirmed.appointmentDate,
              appointmentTime: confirmed.appointmentTime,
            },
          });

          let message = {
            from: "testingnode061229@gmail.com",
            to: "krishnavamsin202@gmail.com", //need to change
            subject: "Appointment Confirmed",
            html: `
                <p>Your Appointment for the doctor ${confirmed.doctorId.name} has been Rescheduled by hospital ${confirmed.hospitalId.name}</p>
                <p>Rescheduled Appointment Date : ${confirmed.appointmentDate}</p>
                <p>Rescheduled Appointment Time : ${confirmed.appointmentTime} </p>
              `,
          };
          transporter.sendMail(message);

          newAppointment.deleteOne();
        });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    });
};

exports.postSearchPatientRequestedAppointment = (req, res) => {
  Appointments.find({ hospitalId: req.hospital._id })
    .populate("doctorId patientId")
    .then((data) => {
      const filteredData = data.filter((record) => {
        return record.patientId.email === req.body.email;
      });
      res.render("results/filteredRequestedAppointments", {
        data: filteredData,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postSearchPatientBookedAppointment = (req, res) => {
  ConfirmedAppointments.find({ hospitalId: req.hospital._id })
    .populate("doctorId patientId")
    .then((data) => {
      const filteredData = data.filter((record) => {
        return record.patientId.email === req.body.email;
      });
      res.render("results/bookedAppointments", { data: filteredData });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postChosen = (req, res) => {
  if (req.body.chosen === "patientsTreated") {
    return res.redirect("/hospitals/patientstreated");
  }
  if (req.body.chosen === "requestedAppointments") {
    return res.redirect("/hospitals/requestedappointments");
  }
  if (req.body.chosen === "bookedAppointments") {
    return res.redirect("/hospitals/bookedappointments");
  }
};

exports.getDoctors = (req, res) => {
  Hospital.findById(req._id)
    .populate("doctorsWorking")
    .then((hospitalData) => {
      if (!hospitalData) {
        return res.status(404).json({ error: "Hospital not found" });
      }
      res.status(200).json({
        doctorsWorking: hospitalData.doctorsWorking,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid hospital ID" });
      }

      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.removeDoctor = (req, res) => {
  const id = req.params.doctorId;
  let hospitalResult;
  console.log(id);
  Hospital.findByIdAndUpdate(
    req._id,
    { $pullAll: { doctorsWorking: [id] } },
    { new: true }
  )
    .then((result) => {
      hospitalResult = result;
      return Doctors.findByIdAndUpdate(
        id,
        { $pullAll: { hospitalsWorkingFor: [result._id] } },
        { new: true }
      );
    })
    .then((finalResult) => {
      return Appointments.deleteMany({
        hospitalId: req._id,
        doctorId: id,
      });
    })
    .then((deletedAppointments) => {
      return ConfirmedAppointments.deleteMany({
        hospitalId: req._id,
        doctorId: id,
      });
    })
    .then((deletedConfirmedAppointments) => {
      res.json({
        success: true,
        message: "Doctor removed successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error removing doctor",
        error: err.message,
      });
    });
};

exports.getmodify = (req, res) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("results/getModifyHospital", {
    data: req.hospital,
    errorMessage: message,
  });
};

exports.putModify = async (req, res) => {
  const hospitalId = req.params.id; // Assuming the hospital's ID is passed in the URL
  const body = req.body;
  let user = null;
  try {
    user = await Hospital.findById(hospitalId).exec();
  } catch (err) {
    return res.status(500).json({ message: "Internal error occurred!" });
  }
  if (!user) {
    return res.status(404).json({ message: "Hospital not found!" });
  }
  user.name = body.name;
  user.mobileNum = body.mobileNumber;
  user.email = body.email;
  user.city = body.city;
  user.petParent = body.petParent;

  const passwordCompare = await bcrypt.compare(
    body.currentPassword,
    user.password
  );
  if (!passwordCompare) {
    return res.status(409).json({
      message: "Wrong password entered: Cannot edit account details!",
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
  const updatedDoc = { ...user._doc, type: "hospitals" };
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

    

    let imagePath = req.file.path.replace(/\\/g, "/"); // Replacing backslashes with forward slashes


   imagePath = `${imagePath}`;  // Make the path a complete URL

    const user = await Hospital.findById(req._id);

    await Hospital.findByIdAndUpdate(req._id, { image: imagePath });
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

    const user = await Hospital.findOne({ email: userEmail });

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

  const user = await Hospital.findOne({ email: email });
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
    text: `To reset your password, click on the following link: ${process.env.apiUrl_Front_End}/reset-password/hospitals/${token}`,
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
