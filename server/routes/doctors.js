const express = require("express");

const Router = express.Router();

const doctorController = require("../controllers/doctor");

const isAuth = require("../middleware/verify");

const imageController = require("../util/image_upload");

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API endpoints for Doctors
 */

/**
 * @swagger
 * /doctors/login:
 *   get:
 *     summary: Get doctor login page
 *     tags: [Doctors]
 *     responses:
 *       '200':
 *         description: Successfully fetched doctor login page
 *       '404':
 *         description: Page not found
 */

Router.get("/login", doctorController.getLogin);

/**
 * @swagger
 * /doctors/login:
 *   post:
 *     summary: Doctor login
 *     tags: [Doctors]
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
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */

Router.post("/login", doctorController.postLogin);

/**
 * @swagger
 * /doctors/register:
 *   get:
 *     summary: Get doctor registration page
 *     tags: [Doctors]
 *     responses:
 *       '200':
 *         description: Successfully fetched doctor registration page
 *       '404':
 *         description: Page not found
 */

Router.get("/register", doctorController.getRegister);

/**
 * @swagger
 * /doctors/register:
 *   post:
 *     summary: Doctor registration
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               licenseNo:
 *                 type: string
 *               experience:
 *                 type: integer
 *               specialty:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               pincode:
 *                 type: string
 *               mobileNum:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor registration successful
 *       '400':
 *         description: Email or License Number already exists
 *       '500':
 *         description: Internal server error
 */

Router.post("/register", doctorController.postRegister);

/**
 * @swagger
 * /doctors/dashboard:
 *   get:
 *     summary: Get doctor dashboard
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched doctor dashboard
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Dashboard not found
 */

Router.get("/dashboard", isAuth, doctorController.getDashboard);

/**
 * @swagger
 * /doctors/logout:
 *   get:
 *     summary: Log out a doctor
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '401':
 *         description: Unauthorized access
 */

Router.get("/logout", isAuth, doctorController.Logout);

/**
 * @swagger
 * /doctors/addhospital:
 *   get:
 *     summary: Get page to add hospital
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched page to add hospital
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Page not found
 */

Router.get("/addhospital", isAuth, doctorController.addHospital);

/**
 * @swagger
 * /doctors/addhospital:
 *   post:
 *     summary: Add hospital for a doctor
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospitalName:
 *                 type: string
 *               regNo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Hospital added successfully
 *       '400':
 *         description: Hospital or doctor not found
 *       '500':
 *         description: Internal server error
 */

Router.post("/addhospital", isAuth, doctorController.postAddHospital);

/**
 * @swagger
 * /doctors/removehospital:
 *   get:
 *     summary: Get page to remove hospital
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched page to remove hospital
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Page not found
 */

Router.get("/removehospital", isAuth, doctorController.getRemoveHospital);

/**
 * @swagger
 * /doctors/removehospital:
 *   post:
 *     summary: Remove hospital from a doctor's list
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               regNo:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Hospital removed successfully
 *       '400':
 *         description: Hospital not found in the doctor's list
 *       '500':
 *         description: Internal server error
 */

Router.post("/removehospital", isAuth, doctorController.postRemoveHospital);

/**
 * @swagger
 * /doctors/prescribe/{patientId}/{hospitalId}/{appointmentId}:
 *   get:
 *     summary: Get prescription page for a patient appointment
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient
 *       - in: path
 *         name: hospitalId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hospital
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the appointment
 *     responses:
 *       '200':
 *         description: Successfully fetched prescription page
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Prescription page not found
 */

Router.get(
    "/prescribe/:patientId/:hospitalId/:appointmentId",
    isAuth,
    doctorController.getPrescribe
);

/**
 * @swagger
 * /doctors/gethospitalsworkingfor:
 *   get:
 *     summary: Get hospitals working for a doctor
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched hospitals working for a doctor
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/gethospitalsworkingfor",
    isAuth,
    doctorController.getHospitalsWorkingFor
);

/**
 * @swagger
 * /doctors/prescribe:
 *   post:
 *     summary: Prescribe medication and details for a patient
 *     tags: [Doctors]
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
 *               patientId:
 *                 type: string
 *               appointmentId:
 *                 type: string
 *               bloodPressure:
 *                 type: string
 *               temperature:
 *                 type: string
 *               height:
 *                 type: string
 *               weight:
 *                 type: string
 *               oxygen:
 *                 type: string
 *               surgery:
 *                 type: string
 *               medicalTests:
 *                 type: string
 *               note:
 *                 type: string
 *               medicines:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Prescription saved successfully
 *       '500':
 *         description: Internal server error
 */

Router.post("/prescribe", isAuth, doctorController.postPrescribe);

/**
 * @swagger
 * /doctors/bookedappointments:
 *   get:
 *     summary: Get booked appointments for a doctor
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched booked appointments
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/bookedappointments",
    isAuth,
    doctorController.getBookedAppointments
);

/**
 * @swagger
 * /doctors/medicalrecords/{patientId}:
 *   get:
 *     summary: Get medical records for a patient
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the patient
 *     responses:
 *       '200':
 *         description: Successfully fetched medical records
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/medicalrecords/:patientId",
    isAuth,
    doctorController.getMedicalRecords
);

/**
 * @swagger
 * /doctors/skipappointment/{appointmentId}:
 *   get:
 *     summary: Skip an appointment
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the appointment to skip
 *     responses:
 *       '200':
 *         description: Appointment skipped successfully
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/skipappointment/:appointmentId",
    isAuth,
    doctorController.removeAppointment
);

/**
 * @swagger
 * /doctors/chosen:
 *   post:
 *     summary: Redirect based on doctor's choice
 *     tags: [Doctors]
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
 *         description: Redirected successfully
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.post("/chosen", isAuth, doctorController.postChosen);

/**
 * @swagger
 * /doctors/modify:
 *   get:
 *     summary: Get page to modify doctor details
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully fetched page to modify doctor details
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Page not found
 */

Router.get("/modify", isAuth, doctorController.getModify);

/**
 * @swagger
 * /doctors/modify/{id}:
 *   put:
 *     summary: Modify doctor details
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the doctor to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               pincode:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor details modified successfully
 *       '401':
 *         description: Unauthorized access
 *       '409':
 *         description: Wrong password entered
 *       '500':
 *         description: Internal server error
 */


Router.put("/modify/:id", isAuth, doctorController.putModify);

/**
 * @swagger
 * /doctors/upload:
 *   post:
 *     summary: Upload doctor image
 *     tags: [Doctors]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
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
 *         description: Image uploaded successfully
 *       '400':
 *         description: Invalid _id
 *       '500':
 *         description: Internal server error
 */

Router.post("/upload", isAuth, imageController.uploadImage, doctorController.uploadImage)

Router.post("/forgot-password", doctorController.forgotPassword);

Router.post("/reset-password", doctorController.resetpassword)

module.exports = Router;
