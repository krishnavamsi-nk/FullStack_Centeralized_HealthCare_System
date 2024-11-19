import React, { useState } from 'react';
import axios from 'axios';
import styles from './RescheduleAppointment.module.css';

const RescheduleAppointment = ({ data, date, time }) => {
    const [appointmentDate, setAppointmentDate] = useState(date);
    const [appointmentTime, setAppointmentTime] = useState(time);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            patientId: data.patientId,
            doctorId: data.doctorId,
            appointmentId: data._id,
            appointmentDate,
            appointmentTime,
        };

        try {
            const response = await axios.post('/api/hospitals/rescheduleappointment', requestData);
            // Handle the response as needed
            console.log('Re-Schedule Request Successful', response);
        } catch (error) {
            // Handle errors
            console.error('Error sending re-schedule request', error);
        }
    };

    return (
        <div className={styles.formDiv}>
            <h2 className={styles.title}>Re-Schedule Appointment Request</h2>
            <form className={styles.bookdoctor} onSubmit={handleSubmit}>
                <input type="hidden" value={data.patientId} name="patientId" />
                <input type="hidden" value={data.doctorId} name="doctorId" />
                <input type="hidden" value={data._id} name="appointmentId" />
                <div className={styles['input-group']}>
                    <label>Appointment Date</label>
                    <input
                        name="appointmentDate"
                        type="date"
                        required
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className={styles.input}
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
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Re-Schedule Appointment</button>
            </form>
        </div>
    );
};

export default RescheduleAppointment;
