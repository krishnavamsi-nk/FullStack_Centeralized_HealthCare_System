import React, { useState } from 'react';
import axios from 'axios';
import styles from './HospitalLogin.module.css';

const HospitalLogin = () => {
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a data object with the form input values
        const data = {
            regNo,
            password,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/hospitals/login', data);

            // Handle the response as needed
            console.log('Hospital Login Successful', response);
            // You can also redirect or update the UI based on the response
        } catch (error) {
            // Handle errors and set the error message
            console.error('Hospital Login Error', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={styles.main}>
            <div id="bg"></div>
            <div className="card">
                <div className="form-signup">
                    <h1>Welcome Back</h1>
                    {errorMessage && <p className="invalid">{errorMessage}</p>}
                    <form
                        action="/api/hospitals/login"
                        method="post"
                        onSubmit={handleSubmit}
                    >
                        <p id="emailErrorPara" className="invalid"></p>
                        <p id="passwordErrorPara" className="invalid"></p>
                        <input
                            placeholder="Registration Number"
                            name="regNo"
                            className="email"
                            id="input--email"
                            value={regNo}
                            onChange={(e) => setRegNo(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            className="password"
                            id="input--password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button id="login--button" type="submit">
                            Login
                        </button>
                    </form>
                    <p>Don't have an account?</p>
                    <a href="/api/hospitals/register">Register</a>
                </div>
                <div className="image-container">
                    <img src="/images/LoginImage.svg" />
                </div>
            </div>
        </div>
    );
};

export default HospitalLogin;
