import React, { useState } from 'react';
import axios from 'axios';
import styles from './HospitalRegistration.module.css';

const HospitalRegistration = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [registrationNo, setRegistrationNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [speciality, setSpeciality] = useState('MultiSpeciality');
    const [otherSpeciality, setOtherSpeciality] = useState('');
    const [government, setGovernment] = useState('Yes');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            hname: hospitalName,
            regNo: registrationNo,
            email,
            password,
            speciality: speciality === 'other' ? otherSpeciality : speciality,
            government,
            state,
            city,
            pincode,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/hospitals/register', data);

            // Handle the response as needed
            console.log('Hospital Registration Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Hospital Registration Error', error);
            setErrorMessage('Registration failed. Please check your information.');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles['image-div']}>
                <h1 className={styles.brand}>CHS</h1>
                <h4 className={styles['tag-line']}>India's First CHR Portal</h4>
            </div>
            <div className={styles['form-div']}>
                <h3>Ready to start Partnership with CHS ?</h3>
                <p>Complete the form below and get started:</p>
                <form
                    action="/api/hospitals/register"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <h5>Hospital Details</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Hospital Name"
                            name="hname"
                            className={styles['full-width']}
                            required
                            value={hospitalName}
                            onChange={(e) => setHospitalName(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Registration No."
                            name="regNo"
                            className={styles['full-width']}
                            required
                            value={registrationNo}
                            onChange={(e) => setRegistrationNo(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Email"
                            name="email"
                            className={styles['full-width']}
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Password"
                            name="password"
                            className={styles['full-width']}
                            required
                            type="password"
                            id="input--password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            className={styles['full-width']}
                            required
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['on-top']}>Speciality</label>
                        <select
                            name="speciality"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            className={styles['full-width']}
                        >
                            <option value="MultiSpeciality">MultiSpeciality</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="GeneralSurgery">GeneralSurgery</option>
                            <option value="Gastroenterology">Gastroenterology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Orthopaedics">Orthopaedics</option>
                            <option value="ENT">ENT</option>
                            <option value="ophthalmology">ophthalmology</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    {speciality === 'other' && (
                        <div className={styles['input-group']}>
                            <input
                                placeholder="Specify Speciality"
                                name="otherSpeciality"
                                className={styles['full-width']}
                                type="text"
                                value={otherSpeciality}
                                onChange={(e) => setOtherSpeciality(e.target.value)}
                            />
                        </div>
                    )}
                    <div className={styles['errorParas']}>
                        <p id="emailErrorPara" className="invalid"></p>
                        <p id="passwordErrorPara" className="invalid"></p>
                        <p id="confirmPassError" className="invalid"></p>
                        {errorMessage && <p className="invalid">{errorMessage}</p>}
                    </div>
                    <div className={styles['input-group']}>
                        <label className={styles['on-top']}>Government</label>
                        <select
                            name="government"
                            value={government}
                            onChange={(e) => setGovernment(e.target.value)}
                            className={styles['full-width']}
                        >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Semi">Semi</option>
                        </select>
                    </div>
                    <h5>Address:</h5>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="State"
                            name="state"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                        <input
                            placeholder="City"
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-group']}>
                        <input
                            placeholder="Pincode"
                            name="pincode"
                            className={styles['full-width']}
                            required
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HospitalRegistration;
