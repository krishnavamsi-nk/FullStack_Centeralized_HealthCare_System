const express = require("express");

const Router = express.Router();

const isAuth = require("../middleware/verify");

const PatientController = require("../controllers/patients");

const imageController = require("../util/image_upload");
/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API endpoints for Patients
 */

/**
 * @swagger
 * /patients/login:
 *   post:
 *     summary: Log in a patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Invalid credentials
 */

Router.post("/login", PatientController.postLogin);

/**
 * @swagger
 * /patients/register:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully registered
 *       '400':
 *         description: Registration failed
 */

Router.post("/register", PatientController.postRegister);

/**
 * @swagger
 * /patients/logout:
 *   get:
 *     summary: Log out a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '401':
 *         description: Unauthorized access
 */

Router.get("/logout", isAuth, PatientController.Logout);

/**
 * @swagger
 * /patients/hospitals:
 *   post:
 *     summary: Get hospitals for a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched hospitals
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No hospitals found
 */


Router.post("/hospitals", isAuth, PatientController.getHospitals);

/**
 * @swagger
 * /patients/medicalrecords:
 *   get:
 *     summary: Get medical records for a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched medical records
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No medical records found
 */

Router.get("/medicalrecords", isAuth, PatientController.getMedicalRecords);

/**
 * @swagger
 * /patients/medicalrecords/filtered:
 *   post:
 *     summary: Get filtered medical records for a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospital:
 *                 type: string
 *               doctor:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched filtered medical records
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No filtered medical records found
 */

Router.post(
    "/medicalrecords/filtered",
    isAuth,
    PatientController.postFilteredMedicalRecords
);

/**
 * @swagger
 * /patients/medicalrecords/filtered/{hospitalId}/{doctorId}:
 *   get:
 *     summary: Get filtered medical records for a patient by hospital and doctor
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched filtered medical records
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No filtered medical records found
 */

Router.get(
    "/medicalrecords/filtered/:hospitalId/:doctorId",
    isAuth,
    PatientController.getFilteredMedicalRecords
);

/**
 * @swagger
 * /patients/hospitals/filtered/{location}/{speciality}:
 *   get:
 *     summary: Get filtered hospitals for a patient by location and speciality
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: speciality
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched filtered hospitals
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No filtered hospitals found
 */

Router.get(
    "/hospitals/filtered/:location/:speciality",
    isAuth,
    PatientController.getFiltered
);

/**
 * @swagger
 * /patients/hospitals/filtered:
 *   post:
 *     summary: Get filtered hospitals for a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               speciality:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched filtered hospitals
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No filtered hospitals found
 */

Router.post("/hospitals/filtered", isAuth, PatientController.postFiltered);

/**
 * @swagger
 * /patients/hospitals/{radius}/{longitude}/{latitude}/{speciality}:
 *   get:
 *     summary: Get nearby hospitals for a patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: radius
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: path
 *         name: speciality
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched nearby hospitals
 *       '400':
 *         description: Invalid input parameters
 */

Router.get("/hospitals/:radius/:longitude/:latitude/:speciality", PatientController.getNearByHospitals);

/**
 * @swagger
 * /patients/doctorlist/{id}:
 *   get:
 *     summary: Get list of doctors for a patient
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched doctors list
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No doctors found
 */

Router.get("/doctorlist/:id", PatientController.getDoctorsList);

/**
 * @swagger
 * /patients/doctorlist/open/{regNo}:
 *   get:
 *     summary: Get list of doctors for a patient by Hospital Reg No
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: regNo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched doctors list
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No doctors found
 */

Router.get("/doctorlist/open/:regNo", PatientController.getDoctorsListbyReg);


/**
 * @swagger
 * /patients/bookdoctor/{hospitalId}/{doctorId}:
 *   get:
 *     summary: Book a doctor appointment
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully booked appointment
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Doctor or hospital not found
 */

Router.get(
    "/bookdoctor/:hospitalId/:doctorId",
    isAuth,
    PatientController.getBookDoctor
);

/**
 * @swagger
 * /patients/bookdoctor:
 *   post:
 *     summary: Book a doctor appointment
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalId:
 *                 type: string
 *               doctorId:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *               appointmentTime:
 *                 type: string
 *               diseaseDescription:
 *                 type: string
 *               type:
 *                 type: string
 *               patientId:
 *                 type: string
 *  
 *     responses:
 *       '200':
 *         description: Successfully booked appointment
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Doctor or hospital not found
 */


Router.post("/bookdoctor", isAuth, PatientController.postBookDoctor);

/**
 * @swagger
 * /patients/cancelRequestedAppointment:
 *   post:
 *     summary: Cancel a requested appointment
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *      
 *     responses:
 *       '200':
 *         description: Successfully canceled appointment
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Appointment not found
 */


Router.post(
    "/cancleRequestedAppointment",
    isAuth,
    PatientController.cancleRequestedAppointment
);

/**
 * @swagger
 * /patients/medicalrecord/{medicalrecordId}:
 *   get:
 *     summary: Get medical record by ID
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: medicalrecordId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched medical record
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Medical record not found
 */

Router.get(
    "/medicalrecord/:medicalrecordId",
    isAuth,
    PatientController.getMedicalRecord
);

/**
 * @swagger
 * /patients/getratehospital:
 *   get:
 *     summary: Get consulted hospitals
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched consulted hospitals
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No consulted hospitals found
 */

Router.get("/getratehospital", isAuth, PatientController.getConsultedHospitals);

/**
 * @swagger
 * /patients/rate/{hospitalId}:
 *   get:
 *     summary: Get rating for a hospital
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: hospitalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully fetched hospital rating
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Hospital not found
 */


Router.get("/rate/:hospitalId", isAuth, PatientController.getRating);

/**
 * @swagger
 * /patients/rate/hospital:
 *   post:
 *     summary: Rate a hospital
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully rated hospital
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Hospital not found
 */

Router.post("/rate/hospital", isAuth, PatientController.postRating);

/**
 * @swagger
 * /patients/requestedappointments:
 *   get:
 *     summary: Get requested appointments
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched requested appointments
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No requested appointments found
 */

Router.get(
    "/requestedappointments",
    isAuth,
    PatientController.getRequestedAppointments
);

/**
 * @swagger
 * /patients/confirmendappointments:
 *   get:
 *     summary: Get confirmed appointments
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched confirmed appointments
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: No confirmed appointments found
 */


Router.get(
    "/confirmendappointments",
    isAuth,
    PatientController.getConfirmAppointments
);

/**
 * @swagger
 * /patients/chosen:
 *   post:
 *     summary: Choose an option
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chosen:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully chosen option
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Option not found
 */

Router.post("/chosen", isAuth, PatientController.postChosen);

/**
 * @swagger
 * /patients/modify/{id}:
 *   put:
 *     summary: Modify patient data
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               name:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               pincode:
 *                 type: string
 *               gender:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully modified patient data
 *       '400':
 *         description: Incorrect Password
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server Error
 *       '404':
 *         description: Patient not found
 */


Router.post("/modify", isAuth, PatientController.putModify)

/**
 * @swagger
 * /patients/upload:
 *   post:
 *     summary: Upload an image
 *     tags: [Patients]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successfully uploaded image
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Image upload failed
 */

Router.post("/upload", isAuth, imageController.uploadImage, PatientController.uploadImage)

Router.post("/forgot-password", PatientController.forgotPassword);

Router.post("/reset-password", PatientController.resetpassword)

module.exports = Router;
