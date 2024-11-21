import React from 'react'
import Image from "./hospitalImage.jpg";
import styles from "./HospitalCard.module.css";
import { useNavigate } from 'react-router-dom';
const HospitalCard = (props) => {
    const navigate = useNavigate();
    const viewDoctorsClickHandler = () => {
        navigate(`/hospitals/${props.hospital._id}`);
    }
    return (
        <div className={styles.cardMain}>
            <div className={styles.imageDiv}>
                <img src={props.hospital?.image === "" ? Image : `${process.env.REACT_APP_API_URL}/${props.hospital.image}`} alt='testImage' />
            </div>
            <div className={styles.details}>
                <h1>{props.hospital.name}</h1>
                <p className={styles.paras}><span>{props.hospital.city}</span><span> ,</span><span>{props.hospital.state}</span><span> ,</span><span>{props.hospital.pincode}</span></p>
                <p className={styles.paras} ><span>{props.hospital.specialityDep}</span></p>
                <button className={styles.btn} onClick={viewDoctorsClickHandler}>View Doctors</button>
            </div>
        </div>
    )
}

export default HospitalCard