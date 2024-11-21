import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from "./DoctorListCard.module.css";
import { toast } from 'react-toastify';
import Image from "./doc.png";
const DoctorsListCard = ({ doctor, hospitalId }) => {
    const [modalShow, setModalShow] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [diseaseDescription, setDiseaseDescription] = useState('');
    const [type, setType] = useState('new case');

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
        setAppointmentDate('');
        setAppointmentTime('');
        setDiseaseDescription('');
        setType('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/patients/bookdoctor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    hospitalId: hospitalId,
                    doctorId: doctor._id,
                    appointmentDate: appointmentDate,
                    appointmentTime: appointmentTime,
                    diseaseDescription: diseaseDescription,
                    type: type,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            toast.success("Appointment Request Sucessfull", {
                position: "top-right",
            });
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error while Requesting the appointment')
        }
        closeModal();
    }
    return (
        <div className={styles.main}>
            <img
                src={doctor?.image === "" ? Image : `${process.env.REACT_APP_API_URL}/${doctor.image}`}
                width={"100%"}
                height={300}
                alt={doctor._id}
            />
            <h1>{doctor.name}</h1>
            <p>{doctor.Speciality}</p>
            <button className={styles.btn} onClick={openModal}>
                Book Appointment
            </button>

            <Modal show={modalShow} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Appointment Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={styles.bookdoctor} onSubmit={handleSubmit}>
                        <input type="hidden" value={doctor.hospitalId} name="hospitalId" />
                        <input type="hidden" value={doctor._id} name="doctorId" />
                        <div className={styles['input-group']}>
                            <label>Appointment Date</label>
                            <input
                                name="appointmentDate"
                                type="date"
                                required
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <label>Appointment Time</label>
                            <input
                                name="appointmentTime"
                                type="time"
                                required
                                value={appointmentTime}
                                onChange={(e) => setAppointmentTime(e.target.value)}
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <label>Description of Disease</label>
                            <input
                                type="text"
                                name="diseaseDescription"
                                required
                                value={diseaseDescription}
                                onChange={(e) => setDiseaseDescription(e.target.value)}
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <label>Type</label>
                            <select
                                name="type"
                                required
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="New Case">New Case</option>
                                <option value="Existing Case">Existing Case</option>
                            </select>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <button type="submit" className={styles.button}>Request Appointment</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default DoctorsListCard;
