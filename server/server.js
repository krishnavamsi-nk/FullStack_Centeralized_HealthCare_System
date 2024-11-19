require("dotenv").config();
const express = require("express");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const verify = require('./middleware/verify');
// const homeRoutes = require("./routes/index");
const patientRoutes = require("./routes/patients");
const hospitalRoutes = require("./routes/hospitals");
const doctorRoutes = require("./routes/doctors");
const adminRoutes = require("./routes/admin");
const Patients = require("./models/patients");
const Hospitals = require("./models/hospitals");
const Doctors = require("./models/doctors");
const Admin = require("./models/admin");
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path')
const app = express();
const bcrypt = require('bcrypt');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CHS (Centralized Healthcare System)',
            version: '1.0.0',
            description: 'One Single Place for Doctors, Patients and Hospitals',
        },
    },
    apis: ['./routes/patients.js', './routes/doctors.js', './routes/hospitals.js', './routes/admin.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// const cache = require('./middleware/node-cache');
// const cacheClient = require("./cacheClient/node-cache-client")
const cache = require('./middleware/cache');
// const cacheClient = require('./cacheClient/redis-client');
const cacheClient = require('./cacheClient/redis-client');

const Appointments = require("./models/appointments");
app.use(express.static("public"));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static('uploads'));
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://centralisedhealthcare.vercel.app",
            "http://127.0.0.1:5500",
            "*",
        ],
        methods: ["POST", "GET", "HEAD", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

var accessLogStream = rfs.createStream("CHS", { interval: '2h', path: path.join(__dirname, 'log') })

app.use(morgan('combined', { stream: accessLogStream }))

app.get("/check", verify, cache, async (req, res) => {
    if (req._type === "patients") {
        let patients = null;
        try {
            patients = await Patients.findOne({ _id: req._id });
            if (!patients) {
                return res.status(404).json({
                    message: "User Not Found",
                });
            }
            patients.type = "patients";
            var modified_patients = { ...patients._doc, type: "patients" };
            // cacheClient.set(req._id, JSON.stringify(modified_patients), 1800)
            await cacheClient.set(req._id, JSON.stringify(modified_patients));
            await cacheClient.expire(req._id, 30);
            const value = await cacheClient.get(req._id);
            console.log("value in cache", value);
            return res.status(200).json(modified_patients);
        }
        catch (err) {
            console.log(err);
            return res.status(400).send('error finding patients!');
        }
    }
    if (req._type === "doctors") {
        let user = null;
        try {
            user = await Doctors.findById(req._id).exec();
            if (!user) {
                return res.status(404).json({
                    message: "User Not Found",
                });
            }
            var modified_user = { ...user._doc, type: "doctors" };
            // cacheClient.set(req._id, JSON.stringify(modified_user), 1800)
            await cacheClient.set(req._id, JSON.stringify(modified_patients));
            await cacheClient.expire(req._id, 30);
            const value = await cacheClient.get(req._id);
            console.log("value in redis", value);
            return res.status(200).json(modified_user);
        } catch {
            return res.status(400).send('error finding user!')
        }
    }
    if (req._type === "hospitals") {
        let hospital = null;
        try {
            hospital = await Hospitals.findById(req._id).exec();
            if (!hospital) {
                return res.status(404).json({
                    message: "hospital Not Found",
                });
            }
            var modified_hospital = { ...hospital._doc, type: "hospitals" };
            // cacheClient.set(req._id, JSON.stringify(modified_hospital), 1800)
            await cacheClient.set(req._id, JSON.stringify(modified_patients));
            await cacheClient.expire(req._id, 30);
            const value = await cacheClient.get(req._id);
            console.log("value in redis", value);
            return res.status(200).json(modified_hospital);
        } catch {
            return res.status(400).send('error finding hospital!')
        }
    }
    if (req._type === "admin") {
        let admin = null;
        try {
            admin = await Admin.findById(req._id).exec();
            if (!admin) {
                return res.status(404).json({
                    message: "admin Not Found",
                });
            }
            var modified_admin = { ...admin._doc, type: "admin" };
            // cacheClient.set(req._id, JSON.stringify(modified_admin), 1800)
            await cacheClient.set(req._id, JSON.stringify(modified_patients));
            await cacheClient.expire(req._id, 30);
            const value = await cacheClient.get(req._id);
            console.log("value in redis", value);
            return res.status(200).json(modified_admin);
        } catch {
            return res.status(400).send('error finding hospital!')
        }
    }
});
app.use("/patients", patientRoutes);
app.use("/hospitals", hospitalRoutes);
app.use("/doctors", doctorRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get("/", (req, res) => {
    res.status(200).send("api is live")
})

app.get("/getpatients", async (req, res) => {
    try {
        const patients = await Patients.find({});
        return res.status(200).json(patients);
    }
    catch (err) {
        return res.status(500).json("internal server error")
    }
})

app.get("/getappointments", async (req, res) => {
    try {
        const appointments = await Appointments.find({});
        return res.status(200).json(appointments)
    }
    catch (err) {
        return res.status(500).json("internal server error")
    }
})

app.post('/addpatient', async (req, res) => {
    try {
        const { name, email } = req.body;
        const patient = new Patients({ name, email });
        await patient.save();
        return res.status(200).send(patient)
    }
    catch (err) {
        res.status(500).sendFile("internal server error")
        console.log(err)
    }
})

app.post('/addhospital', async (req, res) => {
    try {
        const { name, email } = req.body;
        const hospital = new Hospitals({ name, email });
        await hospital.save();
        return res.status(200).send(hospital)
    } catch (err) {
        res.status(500).sendFile("internal server error")
        console.log(err)
    }
})

app.post("/addDoctor", async (req, res) => {
    try {
        const { name, email } = req.body;
        const doctor = new Doctors({ name, email });
        await doctor.save();
        return res.status(200).send(doctor);
    }
    catch (err) {
        res.status(500).sendFile("internal server error")
        console.log(err);
    }
})

app.get("/gethospitals", async (req, res) => {
    try {
        const hospitals = await Hospitals.find({});
        return res.status(200).json(hospitals);
    }
    catch (err) {
        res.status(500).sendFile("internal server error")
        console.log(err);
    }
})

app.get("/getdoctors", async (req, res) => {
    try {
        const doctors = await Doctors.find({});
        return res.status(200).json(doctors);
    } catch (err) {
        res.status(500).sendFile("internal server error")
        console.log(err);
    }
})



// Route to create a new admin
app.post('/create-admin', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    try {
        // Hash the password with 12 salt rounds before saving
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new admin document
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new admin document to the database
        await newAdmin.save();

        // Return success response
        res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

mongoose
    // .connect("mongodb://localhost:27017")
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });
module.exports = { app };