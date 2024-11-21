const hospitalController = require("../controllers/hospital");

const express = require("express");

const isAuth = require("../middleware/verify");

const imageController = require("../util/image_upload");

const Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hospitals
 *   description: API endpoints for Hospitals
 */

/**
 * @swagger
 * /hospitals/login:
 *   get:
 *     summary: Get hospital login page
 *     tags: [Hospitals]
 *     responses:
 *       '200':
 *         description: Hospital login page rendered
 *       '500':
 *         description: Internal server error
 */

Router.get("/login", hospitalController.getLogin);

/**
 * @swagger
 * /hospitals/login:
 *   post:
 *     summary: Hospital login
 *     tags: [Hospitals]
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
 *         description: Hospital logged in successfully
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */


Router.post("/login", hospitalController.postLogin);

/**
 * @swagger
 * /hospitals/register:
 *   get:
 *     summary: Get hospital registration page
 *     tags: [Hospitals]
 *     responses:
 *       '200':
 *         description: Hospital registration page rendered
 *       '500':
 *         description: Internal server error
 */

Router.get("/register", hospitalController.getRegister);

/**
 * @swagger
 * /hospitals/register:
 *   post:
 *     summary: Hospital registration
 *     tags: [Hospitals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               regNo:
 *                 type: string
 *               speciality:
 *                 type: string
 *               government:
 *                 type: boolean
 *               password:
 *                 type: string
 *               state:
 *                 type: string
 *               city:
 *                 type: string
 *               pincode:
 *                 type: string
 *               email:
 *                 type: string
 *               longitude:
 *                 type: number
 *               latitude:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Hospital registered successfully
 *       '400':
 *         description: Hospital with this registration number already exists
 *       '500':
 *         description: Internal server error
 */

Router.post("/register", hospitalController.postRegister);

/**
 * @swagger
 * /hospitals/dashboard:
 *   get:
 *     summary: Get hospital dashboard
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Hospital dashboard rendered
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Hospital not found
 *       '500':
 *         description: Internal server error
 */

Router.get("/dashboard", isAuth, hospitalController.getDashboard);

/**
 * @swagger
 * /hospitals/logout:
 *   get:
 *     summary: Hospital logout
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Logged out successfully
 *       '401':
 *         description: Unauthorized access
 */

Router.get("/logout", isAuth, hospitalController.Logout);

/**
 * @swagger
 * /hospitals/patientstreated:
 *   get:
 *     summary: Get patients treated by the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of patients treated by the hospital
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get("/patientstreated", isAuth, hospitalController.getTreated);

/**
 * @swagger
 * /hospitals/bookedappointments:
 *   get:
 *     summary: Get booked appointments by the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of booked appointments by the hospital
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/bookedappointments",
    isAuth,
    hospitalController.getBookedAppointments
);

/**
 * @swagger
 * /hospitals/acceptappointment:
 *   post:
 *     summary: Accept appointment by the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Appointment confirmed successfully
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.post(
    "/acceptappointment",
    isAuth,
    hospitalController.postAcceptAppointment
);

/**
 * @swagger
 * /hospitals/requestedappointments:
 *   get:
 *     summary: Get requested appointments by the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of requested appointments by the hospital
 *       '401':
 *         description: Unauthorized access
 *       '500':
 *         description: Internal server error
 */

Router.get(
    "/requestedappointments",
    isAuth,
    hospitalController.getRequestedAppointments
);

/**
 * @swagger
 * /hospitals/resheduleappointment:
 *   post:
 *     summary: Reschedule an appointment
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: The ID of the appointment to reschedule
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 description: The new date for the appointment
 *               appointmentTime:
 *                 type: string
 *                 format: time
 *                 description: The new time for the appointment
 *     responses:
 *       '200':
 *         description: Appointment rescheduled and confirmed
 *       '500':
 *         description: Internal server error
 */


Router.post(
    "/resheduleappointment",
    isAuth,
    hospitalController.postRescheduleAppointment
);

/**
 * @swagger
 * /hospitals/resheduleappointment/{appointmentId}:
 *   get:
 *     summary: Get appointment details for rescheduling
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the appointment to retrieve
 *     responses:
 *       '200':
 *         description: Appointment details retrieved successfully
 *       '500':
 *         description: Internal server error
 */


Router.get(
    "/resheduleappointment/:appointmentId",
    isAuth,
    hospitalController.getResheduleAppointment
);

/**
 * @swagger
 * /hospitals/requestedappointments/searchpatient:
 *   post:
 *     summary: Search requested appointments by patient email
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the patient to search for
 *     responses:
 *       '200':
 *         description: Requested appointments found
 *       '500':
 *         description: Internal server error
 */


Router.post(
    "/requestedappointments/searchpatient",
    isAuth,
    hospitalController.postSearchPatientRequestedAppointment
);

/**
 * @swagger
 * /hospitals/bookedappointments/searchpatient:
 *   post:
 *     summary: Search booked appointments by patient email
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the patient to search for
 *     responses:
 *       '200':
 *         description: Booked appointments found
 *       '500':
 *         description: Internal server error
 */


Router.post(
    "/bookedappointments/searchpatient",
    isAuth,
    hospitalController.postSearchPatientBookedAppointment
);

/**
 * @swagger
 * /hospitals/chosen:
 *   post:
 *     summary: Handle chosen action
 *     tags: [Hospitals]
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
 *                 description: The chosen action
 *     responses:
 *       '200':
 *         description: Action handled successfully
 *       '500':
 *         description: Internal server error
 */


Router.post("/chosen", isAuth, hospitalController.postChosen);

/**
 * @swagger
 * /hospitals/doctors:
 *   get:
 *     summary: Get doctors working for the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of doctors working for the hospital
 *       '500':
 *         description: Internal server error
 */


Router.get("/doctors", isAuth, hospitalController.getDoctors);

/**
 * @swagger
 * /hospitals/patientstreated/searchpatient:
 *   post:
 *     summary: Search patients treated by the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the patient to search for
 *     responses:
 *       '200':
 *         description: Patients treated found
 *       '500':
 *         description: Internal server error
 */


Router.post(
    "/patientstreated/searchpatient",
    isAuth,
    hospitalController.getSearchPatientTreated
);

/**
 * @swagger
 * /hospitals/removedoctor/{doctorId}:
 *   get:
 *     summary: Remove a doctor from working for the hospital
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the doctor to remove
 *     responses:
 *       '200':
 *         description: Doctor removed successfully
 *       '500':
 *         description: Internal server error
 */


Router.get("/removedoctor/:doctorId", isAuth, hospitalController.removeDoctor);

/**
 * @swagger
 * /hospitals/modify:
 *   get:
 *     summary: Get hospital modification page
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Hospital modification page retrieved successfully
 *       '500':
 *         description: Internal server error
 */


Router.get("/modify", isAuth, hospitalController.getmodify);

/**
 * @swagger
 * /hospitals/modify/{id}:
 *   put:
 *     summary: Modify hospital account details
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hospital to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the hospital
 *               mobileNumber:
 *                 type: string
 *                 description: The mobile number of the hospital
 *               email:
 *                 type: string
 *                 description: The email of the hospital
 *               city:
 *                 type: string
 *                 description: The city of the hospital
 *               petParent:
 *                 type: string
 *                 description: The pet parent of the hospital
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the hospital
 *               newPassword:
 *                 type: string
 *                 description: The new password of the hospital
 *     responses:
 *       '200':
 *         description: Hospital account details modified successfully
 *       '401':
 *         description: Unauthorized access
 *       '404':
 *         description: Hospital not found
 *       '409':
 *         description: Wrong password entered
 *       '500':
 *         description: Internal server error
 */



Router.post("/modify/:id", isAuth, hospitalController.putModify);

/**
 * @swagger
 * /hospitals/upload:
 *   post:
 *     summary: Upload hospital image
 *     tags: [Hospitals]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Hospital image uploaded successfully
 *       '500':
 *         description: Internal server error
 */


Router.post("/upload", isAuth, imageController.uploadImage, hospitalController.uploadImage)

Router.post("/forgot-password", hospitalController.forgotPassword);

Router.post("/reset-password", hospitalController.resetpassword)

module.exports = Router;
