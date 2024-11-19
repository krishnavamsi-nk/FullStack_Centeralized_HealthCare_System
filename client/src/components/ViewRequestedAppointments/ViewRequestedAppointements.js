import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./ViewRequestedAppointments.module.css"
import Spinner from 'react-bootstrap/Spinner';
const ViewRequestedAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const submitConfirmAppointment = async (appointment) => {
        console.log(appointment)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hospitals/acceptappointment`, {
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

    const handleModalShow = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setSelectedAppointment(null);
        setShowModal(false);
    };
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
            handleModalClose();
        }
        catch (error) {
            console.log(error);
            handleModalClose();
        }
    };

    const fetchAppointments = () => {
        setLoading(true)
        const apiUrl = process.env.REACT_APP_API_URL + '/hospitals/requestedappointments'; // Full API URL

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
                    loading && (
                        <div className="d-flex justify-content-center align-items-center" style={{ width: "70%", height: "50vh", margin: "0 auto" }}>
                            <Spinner animation="border" role="status" style={{ borderTopColor: '#49c1a5', borderRightColor: '#00BFFF' }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }
            </div>
            <div className={styles.appointmentmain}>
                {appointments?.map((appointment) => (
                    <div key={appointment._id} className={styles.appointmentCard}>
                        <p>Doctor: {appointment.doctorId.name}</p>
                        <p>Patient: {appointment.patientId.name}</p>
                        <p>Appointment Date: {appointment.appointmentDate}</p>
                        <p>Appointment Time: {appointment.appointmentTime} </p>
                        <div className={styles.buttonDiv}>
                            <button className={styles.btn} onClick={(e) => {
                                e.preventDefault();
                                submitConfirmAppointment(appointment);
                            }}>Confirm appointment</button>
                            <button className={styles.btn} onClick={() => handleModalShow(appointment)}>Reschedule Appointment</button>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reschedule Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitReschedule} className={styles.form}>
                        <Form.Group controlId="formHospitalName">
                            <Form.Label style={{ paddingLeft: '0.5rem' }}>Doctor Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedAppointment?.doctorId.name}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="formHospitalRegNo">
                            <Form.Label style={{ paddingLeft: '0.5rem' }}>Patient Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={selectedAppointment?.patientId.name}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group controlId="formHospitalRegNo">
                            <Form.Label style={{ paddingLeft: '0.5rem' }}>Appointment Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formHospitalRegNo">
                            <Form.Label style={{ paddingLeft: '0.5rem' }}>Appointment Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className={styles.btn}>
                            Reschedule
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </div>
    );
};

export default ViewRequestedAppointments;
