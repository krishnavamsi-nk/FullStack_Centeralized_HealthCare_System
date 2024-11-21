import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axiosInstance from '../../api/axiosInstance';
import styles from "./DoctorDashboardHospitalCard.module.css";
import { toast } from "react-toastify";
const DoctorsDashboardHospitalCard = ({ hospital, onRemove }) => {
    const handleRemoveHospital = async () => {
        try {
            const response = await axiosInstance.post('/doctors/removehospital', {
                hospitalName: hospital.name,
                hospitalId: hospital._id,
                regNo: hospital.regNo,
            });

            if (response.status === 200) {
                onRemove(hospital._id);
                toast.success("Hospital Removed Sucessfully !", {
                    position: "top-right",
                });
            } else {
                toast.error("Error removing hospital", {
                    position: "top-right",
                });
                console.error('Error removing hospital:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing hospital:', error);
            toast.error(error.response?.data.message, {
                position: "top-right",
            });
        }
    };

    return (
        <Card key={hospital._id} className={styles.hospitalDetailsCard}>
            <h1>{hospital.name}</h1>
            <p className={styles.address}>
                <span>{hospital.city}</span>
                <span>,</span>
                <span>{hospital.state}</span>
                <span>,</span>
                <span>{hospital.pincode}</span>
            </p>
            <Button onClick={handleRemoveHospital} className={styles.btn}>
                Remove Hospital
            </Button>
        </Card>
    );
};

export default DoctorsDashboardHospitalCard;
