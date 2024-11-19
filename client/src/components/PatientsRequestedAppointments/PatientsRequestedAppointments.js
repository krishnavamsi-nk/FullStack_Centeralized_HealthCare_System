import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import styles from "./PatientsRequestedAppointments.module.css"
import FetchLoader from '../Loaders/fetchLoader';
import NoData from "../NoData/NoData";
import ChatButton from "../ChatButton/ChatButton";
const PatientsRequestedAppointments = ({ type }) => {
    const [appointmentType, setAppointmentType] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const submitCancleAppointment = async (appointment) => {
        console.log(appointment)
        let dataType = ''
        if (appointmentType === 'requestedappointments') {
            dataType = 'requested';
        }
        if (appointmentType === 'confirmendappointments') {
            dataType = 'confirmed';
        }
        if (dataType === '') { return; }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/patients/cancleRequestedAppointment`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentId: appointment._id,
                    type: dataType
                }),
            })
            if (response.ok) {
                handleCancleAppointment(appointment._id);
            }
        }
        catch (error) {
            console.log(error);
        }

    };
    const handleCancleAppointment = (appointmentId) => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment._id !== appointmentId)
        );
    };

    const fetchAppointments = () => {
        const apiUrl = process.env.REACT_APP_API_URL +`/patients/${appointmentType}`; // Full API URL
        setLoading(true);
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setLoading(false);
                if (data.error) {
                    setError(data.error);
                } else {
                    setAppointments(data);
                }
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error fetching data:', error);
                setError('Error fetching data. Please try again later.');
            });
    }
    useEffect(() => {
        setAppointmentType(type);
        if (appointmentType !== '') { fetchAppointments(); }
    }, [appointmentType]);

    return (
        <div>
            {
                loading && <FetchLoader />
            }
            <div className={styles.appointmentmain}>
                {
                    !loading && appointments.length !== 0 &&
                    appointments.map((appointment) => (
                        <div key={appointment._id} className={styles.appointmentCard}>
                            <p>Doctor: {appointment.doctorId.name}</p>
                            <p>Hospital: {appointment.hospitalId.name}</p>
                            <p>Appointment Date: {appointment.appointmentDate}</p>
                            <p>Appointment Time: {appointment.appointmentTime} </p>
                            <div className={styles.buttonDiv}>
                                <button className={styles.btn} onClick={(e) => {
                                    e.preventDefault();
                                    submitCancleAppointment(appointment);
                                }}>Cancle appointment</button>
                            </div>
                        </div>
                    ))

                }
            </div>
            {
                !loading && appointments.length === 0 &&
                <div className="noData"> <NoData /> </div>
            }
        </div>
    );
};

export default PatientsRequestedAppointments;
