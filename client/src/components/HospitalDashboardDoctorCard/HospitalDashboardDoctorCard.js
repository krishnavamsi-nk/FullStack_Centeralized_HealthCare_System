import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import styles from "./HospitalDashboardDoctorCard.module.css";
import { toast } from "react-toastify";
const HospitalDashboardDoctorCard = ({ doctor, onRemove }) => {
    const handleRemoveDoctor = async () => {
        try {
            const response = await axiosInstance.get(`/hospitals/removedoctor/${doctor._id}`);
            if (response.status === 200) {
                onRemove(doctor._id);
                toast.success("Doctor Removed Sucessfully !", {
                    position: "top-right",
                });
            } else {
                toast.error("Error removing Doctor", {
                    position: "top-right",
                });
                console.error('Error removing Doctor:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing Doctor:', error);
            toast.error(error.response?.data.message, {
                position: "top-right",
            });
        }
    };

    return (
        <Card key={doctor._id} className={styles.DoctorDetailsCard}>
            <h1>{doctor.name}</h1>
            <p className={styles.paras}><span>{doctor.Speciality}</span></p>
            <p className={styles.paras}>
                <span>{doctor.city}</span>
                <span>,</span>
                <span>{doctor.state}</span>
                <span>,</span>
                <span>{doctor.pincode}</span>
            </p>
            <Button onClick={handleRemoveDoctor} className={styles.btn}>
                Remove Doctor
            </Button>
        </Card>
    );
};

export default HospitalDashboardDoctorCard;
