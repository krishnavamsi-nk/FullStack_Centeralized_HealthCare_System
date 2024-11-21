import React, { useState } from 'react';
import styles from './DoctorSignup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Image from "./DoctorRegister.svg";
import Tilt from 'react-parallax-tilt';
import { toast } from "react-toastify";
import { Router } from 'react-router-dom';
const DoctorSignup = () => {
    const [isInvalidEmail, setIsValidEmail] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isNumberInvalid, setIsNumberInvalid] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        licenseNo: '',
        experience: '',
        specialty: 'Dermatologist',
        state: '',
        city: '',
        pincode: '',
        mobileNum: '',
        email: '',
        password: '',
    });
    const checkEmailValidity = (e) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
        if (!isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false)
        }
    }

    const checkMobileNumberValidity = () => {
        const isValid = /^[6-9]\d{9}$/.test(formData.mobileNum);
        if (!isValid) {
            setIsNumberInvalid(true);
        } else {
            setIsNumberInvalid(false);
        }
    }

    const checkPasswordValidity = () => {
        const isValid = /^(?=.*[A-Z]).{8,}$/.test(formData.password);
        if (!isValid) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isInvalidEmail || isNumberInvalid || isPasswordInvalid) {
            toast.warning("Please Check Validity Of Data Entered!", {
                position: "top-right",
                toastId: 5,
            });
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/doctors/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json(); // This line gets the JSON data from the response
                navigate("/auth/doctorslogin", { replace: true });
                toast.success("Registration Successful", {
                    position: "top-right",
                    toastId: 5,
                });
            } else {
                const errorData = await response.json(); // This line gets the JSON data from the error response
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className={styles.main}>
            <div className={styles["image-div"]}>
                <Link to={"/"} className={styles["brand"]} >CHS</Link>
                <h4 className={styles["tag-line"]}>India's First CHR Portal</h4>
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
            <div className={styles["form-div"]}>
                <h3>Ready to get started with CHS ?</h3>
                <p>Join us by filling the following form</p>
                <form onSubmit={handleSubmit}>
                    <h5>Personal Details</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="Name"
                            name="name"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Age"
                            name="age"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles["input-group"]} ${styles["float-left"]}`}>
                        <label className="on-top">
                            Gender:
                            <select
                                name="gender"
                                onChange={handleInputChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </label>
                    </div>

                    <h5>Practice Details:</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="License No"
                            name="licenseNo"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Experience"
                            name="experience"
                            type="number"
                            min="0"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={`${styles["input-group"]} ${styles["float-left"]}`}>
                        <label className={styles["on-top"]} htmlFor="doctor-speciality" >Specialty</label>
                        <select name="specialty" id='doctor-speciality' onChange={handleInputChange} data-testid='doctor_speciality'>
                            <option>Dermatologist</option>
                            <option>Gastroenterologist</option>
                            <option>Oncologist</option>
                            <option>Orthopedic</option> 
                            <option>ENT</option>
                            <option>Ophthalmologist</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <h5>Practice Address:</h5>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles["input-group"]}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            required
                            title="please enter a 6 digit valid pincode"
                            onChange={handleInputChange}
                        />
                    </div>

                    <h5>Contact Details:</h5>
                    <div className={styles["last-details"]}>
                        <input
                            placeholder="Mobile Number"
                            name="mobileNum"
                            className={`${isNumberInvalid ? styles.invalid : ""} `}
                            onBlur={checkMobileNumberValidity}
                            onFocus={() => { setIsNumberInvalid(false) }}
                            value={formData.mobileNum}
                            title="mobile number must be of 10 digits"
                            required
                            onChange={handleInputChange}
                        />
                        <input
                            placeholder="Email"
                            name="email"
                            type="email"
                            required
                            id="input--email"
                            className={`${styles.input} ${isInvalidEmail ? styles.invalid : " "} `}
                            onBlur={checkEmailValidity}
                            onFocus={() => { setIsValidEmail(false) }} value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            className={`${styles.input} ${isPasswordInvalid ? styles.invalid : " "} `}
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
                    <div>
                        <button type="submit" className={styles["btn"]}  >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DoctorSignup;
