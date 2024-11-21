import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./DoctorsBookedAppointments.module.css"
import DownloadPdf from "../DownloadPdf/DownloadPdf";
import FetchLoader from '../Loaders/fetchLoader';
import { toast } from "react-toastify";
const DoctorsBookedAppointments = () => {
    const [loading, setLoading] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState({
        bloodPressure: '',
        temperature: '',
        height: '',
        weight: '',
        oxygen: '',
        medicalTests: '',
        surgery: 'no',
        medicines: '',
        note: '',
    });
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDescriptionModal, setshowDescriptionModal] = useState(false);
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showPreviousMedicalRecordsModal, setShowPreviousMedicalRecordsModal] = useState(false)
    const submitConfirmAppointment = async (appointment) => {
        console.log(appointment)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hospitals/resheduleappointment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentId: appointment._id,
                }),
            })
            if (response.ok) {
                handleConfirmAppointment(appointment._id);
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    const fetchMedicalRecords = async (appointment) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/doctors/medicalrecords/${appointment.patientId._id}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setMedicalRecords(data);
            } else {
                // Handle other status codes if needed
                console.log('Failed to fetch medical records');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleDescriptionModal = (appointment) => {
        setSelectedAppointment(appointment);
        setshowDescriptionModal(true);
    };
    const handleMedicalRecordsModal = (appointment) => {
        setSelectedAppointment(appointment);
        fetchMedicalRecords(appointment)
            .then(() => setShowPreviousMedicalRecordsModal(true))
            .catch((error) => console.log(error));
    };


    const handlePrescriptionModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPrescriptionModal(true);
    }
    const handleClosePrescriptionModal = () => {
        setSelectedAppointment(null);
        setShowPrescriptionModal(false);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPrescriptionData({ ...prescriptionData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(prescriptionData)
        const dataBody = { ...prescriptionData, patientId: selectedAppointment.patientId._id, hospitalId: selectedAppointment.hospitalId, appointmentId: selectedAppointment._id }
        console.log(dataBody);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/doctors/prescribe`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody)
        })
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            fetchAppointments();
            setPrescriptionData({
                bloodPressure: '',
                temperature: '',
                height: '',
                weight: '',
                oxygen: '',
                medicalTests: '',
                surgery: 'no',
                medicines: '',
                note: '',
            });
        }
        handleClosePrescriptionModal();
    };

    const handleCloseDescriptionModal = () => {
        setSelectedAppointment(null);
        setshowDescriptionModal(false);
    };
    const handleCloseMedicalRecordsModal = () => {
        setSelectedAppointment(null);
        setShowPreviousMedicalRecordsModal(false);
    }
    const handleConfirmAppointment = (appointmentId) => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
    };
    const handleSubmitReschedule = async (e) => {
        e.preventDefault();

        const RescheduleData = {
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            appointmentId: selectedAppointment._id,
            doctorName: selectedAppointment.doctorId.name,
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hospitals/resheduleappointment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RescheduleData),
            })
            if (response.ok) {
                handleConfirmAppointment(RescheduleData.appointmentId);
            }
            handleCloseDescriptionModal();
        }
        catch (error) {
            console.log(error);
            handleCloseDescriptionModal();
        }
    };


    const fetchAppointments = () => {

        const apiUrl = process.env.REACT_APP_API_URL+"/doctors/bookedappointments";
        setLoading(true)
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setLoading(false)
                    setError(data.error);
                } else {
                    setLoading(false)
                    setAppointments(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            });
    }
    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div>
            <div>
                {
                    loading && <FetchLoader />
                }
            </div>
            <div className={styles.appointmentmain}>
                {appointments.map((appointment) => (
                    <div key={appointment._id} className={styles.appointmentCard}>
                        <p>Patient: {appointment?.patientId?.name}</p>
                        <p>Appointment Date: {appointment?.appointmentDate}</p>
                        <p>Appointment Time: {appointment?.appointmentTime} </p>
                        <div className={styles.buttonDiv}>
                            <button className={styles.btn} onClick={() => handleDescriptionModal(appointment)}>View Description</button>
                            <button className={styles.btn} onClick={() => handleMedicalRecordsModal(appointment)}>Medical Records</button>
                            <button className={styles.btn} onClick={() => handlePrescriptionModal(appointment)}>Prescribe Medicine</button>
                        </div>
                    </div>
                ))}
            </div>
            {showDescriptionModal && <Modal show={showDescriptionModal} onHide={handleCloseDescriptionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><span>Name:</span><span>{selectedAppointment?.patientId.name}</span></p>
                    <p><span>Description:</span><span>{selectedAppointment?.diseaseDescription}</span></p>
                    <p><span>Age:</span><span>{selectedAppointment?.patientId.age}</span></p>
                    <p><span>sex:</span><span>{selectedAppointment?.patientId.gender}</span></p>
                    <p><span>bloodGroup:</span><span>{selectedAppointment?.patientId.bloodGroup}</span></p>
                    <p><span>height:</span><span>{selectedAppointment?.patientId.height}</span></p>
                    <p><span>weight:</span><span>{selectedAppointment?.patientId.weight}</span></p>
                    <p><span>caseType:</span><span>{selectedAppointment?.type}</span></p>
                </Modal.Body>
            </Modal>}
            {
                showPreviousMedicalRecordsModal && <Modal show={showPreviousMedicalRecordsModal} onHide={handleCloseMedicalRecordsModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Previous Medical Records</Modal.Title>
                    </Modal.Header>
                    {medicalRecords.map((medicalRecord) => (
                        <div key={medicalRecord._id} className={styles.medicalRecordCard}>
                            <p><span>Hospital:</span><span>{medicalRecord.hospitalId.name}</span></p>
                            <p><span>Doctor:</span><span>{medicalRecord?.doctorId.name}</span></p>
                            <p><span>BloodPressure:</span><span>{medicalRecord.bloodPressure}</span></p>
                            <p><span>Temperature:</span><span>{medicalRecord.temperature}</span></p>
                            <p><span>Oxygen:</span><span>{medicalRecord.oxygen}</span></p>
                            <p><span>MedicalTests:</span><span>{medicalRecord.medicalTests}</span></p>
                            <p><span>Surgery:</span><span>{medicalRecord.surgery}</span></p>
                            <p><span>Medicines:</span><span>{medicalRecord.medicines}</span></p>
                            <p><span>Note:</span><span>{medicalRecord.note}</span></p>
                            <p><span>Date:</span><span>{medicalRecord.date}</span></p>
                        </div>
                    ))}
                </Modal>

            }
            {
                showPrescriptionModal && <Modal show={true} onHide={handleClosePrescriptionModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Medical Prescription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Blood Pressure"
                                    name="bloodPressure"
                                    value={prescriptionData.bloodPressure}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Temperature"
                                    name="temperature"
                                    value={prescriptionData.temperature}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Height"
                                    name="height"
                                    value={prescriptionData.height}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Weight"
                                    name="weight"
                                    value={prescriptionData.weight}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Oxygen"
                                    name="oxygen"
                                    value={prescriptionData.oxygen}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Medical Tests"
                                    name="medicalTests"
                                    value={prescriptionData.medicalTests}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Surgery:</Form.Label>
                                <Form.Select
                                    name="surgery"
                                    value={prescriptionData.surgery}
                                    onChange={handleInputChange}
                                >
                                    <option value="no">No</option>
                                    <option value="yes">Yes</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Medicines"
                                    name="medicines"
                                    value={prescriptionData.medicines}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Note"
                                    name="note"
                                    value={prescriptionData.note}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            }
        </div>
    );
};

export default DoctorsBookedAppointments;
