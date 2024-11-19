
import React, { useEffect, useState } from 'react';
import styles from './HospitalSignup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import Image from "./HospitalRegister2.jpg"
import { toast } from "react-toastify";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { userActions } from '../../features/userSlice';
const HospitalSignup = () => {
    const dispatch = useAppDispatch();
    let user = useAppSelector((state) => state.user);
    const [isInvalidEmail, setIsValidEmail] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        regNo: '',
        email: '',
        password: '',
        speciality: 'MultiSpeciality',
        otherSpeciality: '', // Hidden field
        government: 'Yes', // Default value
        state: '',
        city: '',
        pincode: '',
    });
    // const checkPasswordValidity = () => {
    //     const isValid = /^(?=.*[A-Z]).{8,}$/.test(formData.password);
    //     if (!isValid) {
    //         setIsPasswordInvalid(true);
    //     } else {
    //         setIsPasswordInvalid(false);
    //     }
    // }

    const checkEmailValidity = (e) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        if (!isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false)
        }
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalidEmail) {
            toast.warning("Please Check Validity Of Data Entered!", {
                position: "top-right",
                toastId: 5,
            });
            return;
        }
        try {
            const addedLocation = { ...formData, latitude: user.latitude, longitude: user.longitude };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/hospitals/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(addedLocation),
            });

            if (response.ok) {
                navigate("/auth/hospitalslogin", { replace: true });
                toast.success("Registration Successful", {
                    position: "top-right",
                    toastId: 5,
                });
            } else {
                const errorData = await response.json();
                toast.error(errorData.message, {
                    position: "top-right",
                    toastId: 6,
                });
            }
        } catch (err) {
            toast.error(err.message, {
                position: "top-right",
                toastId: 6,
            });
        }
    }
    useEffect(()=>{
        dispatch(userActions.setLocation());
    },[])

    return (
        <div className={styles.main}>
            <div className={styles.imageDiv}>
                <Link to={"/"} className={styles["brand"]} >CHS</Link>
                <h4 className={styles["tagLine"]}>India's First CHR Portal</h4>
                <Tilt
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                    glareEnable={true}
                    glareMaxOpacity={0.6}
                    scale={1.02}
                    transitionSpeed={2000}
                    className="parallax-tilt"
                >
                    <img alt='register__image' src={Image} />
                </Tilt>
            </div>
            <div className={styles.formDiv}>
                <h3>Ready to start Partnership with CHS ?</h3>
                <p>Complete the form below and get started:</p>

                <form action="/hospitals/register" method="post" onSubmit={handleSubmit}>
                    <h5>Hospital Details</h5>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Hospital Name"
                            name="name"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Registration No."
                            name="regNo"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            id="input--email"
                            className={`${styles.fullWidth} ${isInvalidEmail ? styles.invalid : " "} `}
                            onBlur={checkEmailValidity}
                            onFocus={() => { setIsValidEmail(false) }} value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            className={`${styles.fullWidth} ${isPasswordInvalid ? styles.invalid : " "} `}
                            placeholder="Password"
                            name="password"
                            type="password"
                            id="input--password"
                            value={formData.password}
                            required
                            // onBlur={checkPasswordValidity} onFocus={() => { setIsPasswordInvalid(false) }}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.floatLeft}`}>
                        <label className={styles.onTop}>Speciality</label>
                        <select name="speciality" onChange={handleInputChange}>
                            <option>MultiSpeciality</option>
                            <option>Dermatology</option>
                            <option>GeneralSurgery</option>
                            <option>Gastroenterology</option>
                            <option>Oncology</option>
                            <option>Orthopaedics</option>
                            <option>ENT</option>
                            <option>ophthalmology</option>
                            <option>other</option>
                        </select>
                    </div>
                    <div className={styles.fullWidth}>
                        <input
                            placeholder="Spacify Speciality"
                            name="otherSpeciality"
                            className={styles.fullWidth}
                            type="hidden"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles.inputGroup} ${styles.floatLeft}`}>
                        <label className={styles.onTop}>Government</label>
                        <select name="government" onChange={handleInputChange} className={styles.fullWidth}>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Semi</option>
                        </select>
                    </div>
                    <h5>Address:</h5>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            className={styles.fullWidth}
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button className={styles.btn} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalSignup;
