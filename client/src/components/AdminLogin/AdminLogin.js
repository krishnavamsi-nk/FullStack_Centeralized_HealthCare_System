import React, { useState } from 'react';
import axios from 'axios';
import styles from './AdminLogin.module.css';
import { toast } from "react-toastify";
const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        try {
            // Send a POST request to the API endpoint
            const response = await axios.post('/api/admin/login', data);

            // Handle the response as needed
            console.log('Admin Login Successful', response);
            toast.success("Admin Login Successful!", {
                position: "top-right",
            });
        } catch (error) {
            // Handle errors and set the error message
            setErrorMessage('Invalid email or password. Please try again.');
            toast.error("Invalid email or password. Please try again.", {
                position: "top-right",
            });
            console.error('Admin Login Error', error);
        }
    };

    return (
        <div className={styles.main}>
            <div id="bg"></div>
            <div className="card">
                <div className="form-signup">
                    <h1>Admin Login</h1>
                    {errorMessage && <p className={styles.invalid}>{errorMessage}</p>}
                    <form action="<%=path2%>" method="post" onSubmit={handleSubmit}>
                        <p id="emailErrorPara" className={styles.invalid}></p>
                        <p id="passwordErrorPara" className={styles.invalid}></p>
                        <input
                            placeholder="Email"
                            type="email"
                            name="email"
                            className={styles.email}
                            id="input--email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            className={styles.password}
                            id="input--password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button id="login--button" type="submit" className={styles.button}>
                            Login
                        </button>
                    </form>
                </div>
                <div className={styles["image-container"]}>
                    <img src="/images/AdminLogin.svg" />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
