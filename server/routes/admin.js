const express = require("express");

const Router = express.Router();

const AdminController = require("../controllers/admin");

const isAuth = require("../middleware/verify");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: API endpoints for Admin
 */

/**
 * @swagger
 * /admin/login:
 *   get:
 *     summary: Get admin login page
 *     tags: [Admins]
 *     responses:
 *       '200':
 *         description: Admin login page retrieved successfully
 *       '500':
 *         description: Internal server error
 */



Router.get("/login", AdminController.getLogin);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admins]
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
 *         description: Admin logged in successfully
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */

Router.post("/login", AdminController.postLogin);

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Admin dashboard retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/dashboard", isAuth, AdminController.getDashboard);

/**
 * @swagger
 * /admin/verifyhospital:
 *   get:
 *     summary: Get hospital verification page
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Hospital verification page retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/verifyhospital", isAuth, AdminController.getVerifyHospital);



/**
 * @swagger
 * /admin/verifyhospital:
 *   post:
 *     summary: Handle hospital verification
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accept, deny]
 *               hospitalId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Hospital verification handled successfully
 *       '500':
 *         description: Internal server error
 */

Router.post("/verifyhospital", isAuth, AdminController.postVerifyHospital);

/**
 * @swagger
 * /admin/verifyhospital/searchhospital:
 *   post:
 *     summary: Search hospitals for verification
 *     tags: [Admins]
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
 *                 description: Registration number of the hospital to search for
 *     responses:
 *       '200':
 *         description: Hospitals found for verification
 *       '500':
 *         description: Internal server error
 */

Router.post(
  "/verifyhospital/searchhospital",
  isAuth,
  AdminController.getVerifySearchHospitals
);

/**
 * @swagger
 * /admin/verifydoctor/searchdoctor:
 *   post:
 *     summary: Search doctors for verification
 *     tags: [Admins]
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
 *                 description: Email of the doctor to search for
 *     responses:
 *       '200':
 *         description: Doctors found for verification
 *       '500':
 *         description: Internal server error
 */

Router.post(
  "/verifydoctor/searchdoctor",
  isAuth,
  AdminController.getVerifySearchDoctors
);

/**
 * @swagger
 * /admin/verifieddoctors:
 *   get:
 *     summary: Get list of verified doctors
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of verified doctors retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/verifieddoctors", isAuth, AdminController.getVerifiedDoctors);

/**
 * @swagger
 * /admin/verifiedhospitals:
 *   get:
 *     summary: Get list of verified hospitals
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of verified hospitals retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/verifiedhospitals", isAuth, AdminController.getVerifiedHospitals);

/**
 * @swagger
 * /admin/verifydoctor:
 *   get:
 *     summary: Get list of doctors pending verification
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of doctors pending verification retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/verifydoctor", isAuth, AdminController.getVerifyDoctor);

/**
 * @swagger
 * /admin/verifydoctor:
 *   post:
 *     summary: Handle doctor verification
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accept, deny]
 *               doctorId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Doctor verification handled successfully
 *       '500':
 *         description: Internal server error
 */

Router.post("/verifydoctor", isAuth, AdminController.postVerifyDoctor);

/**
 * @swagger
 * /admin/chosen:
 *   post:
 *     summary: Choose action for verification
 *     tags: [Admins]
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
 *                 enum: [verifyDoctor, verifyHospital]
 *     responses:
 *       '200':
 *         description: Action chosen successfully
 *       '500':
 *         description: Internal server error
 */

Router.post("/chosen", isAuth, AdminController.postChosen);

/**
 * @swagger
 * /admin/logout:
 *   get:
 *     summary: Log out the admin
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successfully logged out
 *       '500':
 *         description: Internal server error
 */

Router.get("/logout", isAuth, AdminController.Logout);

/**
 * @swagger
 * /admin/patients:
 *   get:
 *     summary: Get list of patients
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of patients retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/patients", isAuth, AdminController.getPatients);

/**
 * @swagger
 * /admin/doctors:
 *   get:
 *     summary: Get list of doctors
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of doctors retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/doctors", isAuth, AdminController.getDoctors);

/**
 * @swagger
 * /admin/hospitals:
 *   get:
 *     summary: Get list of hospitals
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: List of hospitals retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/hospitals", isAuth, AdminController.getHospitals);

/**
 * @swagger
 * /admin/getGraphData:
 *   get:
 *     summary: Get graph data
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Graph data retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get("/getGraphData", isAuth, AdminController.getGraphData);

/**
 * @swagger
 * /admin/checkAppointmentStatus:
 *   get:
 *     summary: Check appointment status
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Appointment status checked successfully
 *       '500':
 *         description: Internal server error
 */

Router.get(
  "/checkAppointmentStatus",
  isAuth,
  AdminController.getAppointmentStatus
);

/**
 * @swagger
 * /admin/patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the patient to delete
 *     responses:
 *       '200':
 *         description: Patient deleted successfully
 *       '404':
 *         description: Patient not found
 *       '500':
 *         description: Internal server error
 */

Router.delete("/patients/:id", isAuth, AdminController.deletePatient);

/**
 * @swagger
 * /admin/hospitals/{id}:
 *   delete:
 *     summary: Delete a hospital by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hospital to delete
 *     responses:
 *       '200':
 *         description: Hospital deleted successfully
 *       '404':
 *         description: Hospital not found
 *       '500':
 *         description: Internal server error
 */

Router.delete("/hospitals/:id", isAuth, AdminController.deleteHospital);

/**
 * @swagger
 * /admin/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the doctor to delete
 *     responses:
 *       '200':
 *         description: Doctor deleted successfully
 *       '404':
 *         description: Doctor not found
 *       '500':
 *         description: Internal server error
 */

Router.delete("/doctors/:id", isAuth, AdminController.deleteDoctor);

/**
 * @swagger
 * /admin/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the patient to get
 *     responses:
 *       '200':
 *         description: Patient details retrieved successfully
 *       '404':
 *         description: Patient not found
 *       '500':
 *         description: Internal server error
 */

Router.get("/patients/:id", isAuth, AdminController.getPatient);

/**
 * @swagger
 * /admin/hospitals/{id}:
 *   get:
 *     summary: Get hospital by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hospital to get
 *     responses:
 *       '200':
 *         description: Hospital details retrieved successfully
 *       '404':
 *         description: Hospital not found
 *       '500':
 *         description: Internal server error
 */

Router.get("/hospitals/:id", isAuth, AdminController.getHospital);

/**
 * @swagger
 * /admin/doctors/{id}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the doctor to get
 *     responses:
 *       '200':
 *         description: Doctor details retrieved successfully
 *       '404':
 *         description: Doctor not found
 *       '500':
 *         description: Internal server error
 */

Router.get("/doctors/:id", AdminController.getDoctor);

/**
 * @swagger
 * /admin/patients/appointments/{id}:
 *   get:
 *     summary: Get appointments of a patient by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the patient to get appointments
 *     responses:
 *       '200':
 *         description: Appointments retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get(
  "/patients/appointments/:id",
  isAuth,
  AdminController.getPatientAppointments
);

/**
 * @swagger
 * /admin/hospitals/appointments/{id}:
 *   get:
 *     summary: Get appointments of a hospital by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the hospital to get appointments
 *     responses:
 *       '200':
 *         description: Appointments retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get(
  "/hospitals/appointments/:id",
  isAuth,
  AdminController.getHospitalAppointments
);

/**
 * @swagger
 * /admin/doctors/appointments/{id}:
 *   get:
 *     summary: Get appointments of a doctor by ID
 *     tags: [Admins]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the doctor to get appointments
 *     responses:
 *       '200':
 *         description: Appointments retrieved successfully
 *       '500':
 *         description: Internal server error
 */

Router.get(
  "/doctors/appointments/:id",
  isAuth,
  AdminController.getDoctorAppointments
);

module.exports = Router;
