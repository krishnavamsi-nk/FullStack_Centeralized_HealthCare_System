import React, { useEffect, useState } from 'react'
import axiosInstance from "../../api/axiosInstance";
import styles from "./ViewHospitalsWorking.module.css";
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddHospital from '../AddHospital/AddHospital';
import DoctorsDashboardHospitalCard from '../DoctorDashboardHospitalCard/DoctorDashboardHospitalCard';
import FetchLoader from '../Loaders/fetchLoader';
import { toast } from "react-toastify";
const ViewHospitalsWorking = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hospitalsWorkingIn, setHospitalsWorkingIn] = useState([]);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleRemoveHospital = (hospitalId) => {
        setHospitalsWorkingIn((prevHospitals) =>
            prevHospitals.filter((hospital) => hospital._id !== hospitalId)
        );
    };
    const getHospitals = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/doctors/gethospitalsworkingfor");
            console.log(response.data);
            setLoading(false)
            setHospitalsWorkingIn(response.data);
        } catch (error) {
            setLoading(false)
            console.log('Error getting hospitals:', error);
        }
    };

    useEffect(() => {
        getHospitals();
    }, [])
    return (
        <>
            <div>
                {
                    loading && <FetchLoader />
                }
            </div>
            <div className={styles.main}>
                {
                    hospitalsWorkingIn.map((hospital) => (
                        <DoctorsDashboardHospitalCard key={hospital._id}
                            hospital={hospital}
                            onRemove={handleRemoveHospital} />
                    ))
                }
                <Card onClick={handleShowModal} style={{ width: '18rem', cursor: 'pointer', height: '18rem' }}>
                    <Card.Body className={styles.cardBody}>
                        <FontAwesomeIcon icon={faPlus} size="2x" />
                    </Card.Body>
                </Card>
                <AddHospital isOpen={showModal} onClose={handleHideModal} getHospitals={getHospitals} />
            </div>
        </>
    )
}

export default ViewHospitalsWorking