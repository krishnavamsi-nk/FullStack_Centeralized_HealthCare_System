import React, { useEffect, useState } from 'react'
import axiosInstance from "../../api/axiosInstance";
import styles from "./ViewDoctorsWorking.module.css";
import Image from "./NoDoc.svg";
import Spinner from 'react-bootstrap/Spinner';
import HospitalDashboardDoctorCard from '../HospitalDashboardDoctorCard/HospitalDashboardDoctorCard';
const ViewDoctorsWorking
    = () => {
        const [loading, setLoading] = useState(true);
        const [DoctorsWorking, setDoctorsWorking] = useState([]);

        const handleRemoveDoctor = (doctorId) => {
            setDoctorsWorking((prevDoctors) =>
                prevDoctors.filter((doctor) => doctor._id !== doctorId)
            );
        };
        const getDoctors = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/hospitals/doctors");
                console.log(response.data);
                setDoctorsWorking(response.data.doctorsWorking);
                setLoading(false);
            } catch (error) {
                console.log('Error getting hospitals:', error);
                setLoading(false);
            }
        };
        useEffect(() => {
            getDoctors();
        }, [])
        return (
            <>
                {
                    DoctorsWorking.length !== 0 && !loading &&
                    < div className={styles.main}>
                        {
                            DoctorsWorking.map((doctor) => (
                                <HospitalDashboardDoctorCard key={doctor._id}
                                    doctor={doctor}
                                    onRemove={handleRemoveDoctor} />
                            ))
                        }
                    </div >}
                {
                    DoctorsWorking.length === 0 && !loading &&
                    <div className={styles.imageDiv}>
                        <img src={Image} alt='no doctors' />
                    </div>
                }
                {
                    loading && (
                        <div className="d-flex justify-content-center align-items-center" style={{ width: "70%", height: "50vh", margin: "0 auto" }}>
                            <Spinner animation="border" role="status" style={{ borderTopColor: '#49c1a5', borderRightColor: '#00BFFF' }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )
                }
            </>

        )
    }

export default ViewDoctorsWorking
