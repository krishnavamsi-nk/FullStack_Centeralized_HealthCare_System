import React, { useEffect, useState } from 'react';
import axiosInstance from "../../api/axiosInstance";
import styles from './Login.module.css';
import Wave from "./wave.png";
import Background from "./bg.svg";
import Avatar from "./avatar.svg";
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from "../../app/hooks";
import { userActions } from "../../features/userSlice";
import Tilt from "react-parallax-tilt";
const Login = () => {
    const params = useParams()
    const [userType, setUserType] = useState('');
    const [route, setRoute] = useState('');
    const [isInvalidEmail, setIsValidEmail] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const checkPasswordValidity = () => {
        const isValid = /^(?=.*[A-Z]).{8,}$/.test(password);
        if (!isValid) {
            setIsPasswordInvalid(true);
        } else {
            setIsPasswordInvalid(false);
        }
    }
    const checkEmailValidity = (e) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValid) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();

        axiosInstance.post(`${userType}/login`, {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data);
                dispatch(userActions.setState({ ...response.data }));
                navigate("/", { replace: true });
                toast.success("Logged in successfully!", {
                    position: "top-right",
                    toastId: 2,
                });
            })
            .catch(error => {
                toast.error(error.response?.data.message, {
                    position: "top-right",
                    toastId: 5,
                });
                console.error('Error submitting form:', error);
            });
    };
    useEffect(() => {
        const isValidType = (type) => ['doctorslogin', 'patientslogin', 'adminlogin', 'hospitalslogin'].includes(type);
        const { type } = params;
        if (!isValidType(type)) {
            navigate("/page-not-found", { replace: true });
        } else {
            const userType = type.replace("login", "");
            setUserType(userType);
            const url = type.replace("login", "register");
            setRoute(url);
        }
    }, [])
    return (
        <>
            <Header />
            <img className={styles.wave} src={Wave} alt="wave" />
            <div className={styles.container}>
                <div className={styles.img}>
                    <Tilt
                        tiltMaxAngleX={20}
                        tiltMaxAngleY={20}
                        glareEnable={true}
                        glareMaxOpacity={0}
                        gyroscope={true}
                        scale={1.02}
                        transitionSpeed={2000}>
                        <img src={Background} alt="background" />
                    </Tilt>
                </div>
                <div className={styles['login-content']}>
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <img src={Avatar} alt="avatar" />
                        <h2 className={styles.title}>Welcome</h2>
                        <div className={`${styles['input-div']} ${styles.one}`}>
                            <div className={styles.i}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={styles.div}>
                                <input type="email" placeholder='Email' className={`${styles.input} ${isInvalidEmail ? styles.invalid : " "} `}
                                    onBlur={checkEmailValidity}
                                    onFocus={() => { setIsValidEmail(false) }}
                                    value={email} onChange={handleEmailChange} required />
                            </div>
                        </div>
                        <div className={`${styles['input-div']} ${styles.pass}`}>
                            <div className={styles.i}>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                            <div className={styles.div}>
                                <input type="password" placeholder="Password"
                                    className={`${styles.input} ${isPasswordInvalid ? styles.invalid : " "} `}
                                    value={password} onChange={handlePasswordChange} onBlur={checkPasswordValidity} onFocus={() => { setIsPasswordInvalid(false) }} />
                            </div>
                        </div>
                        <input type="submit" className={styles.btn} value="Login" />
                        {userType !== 'admin' &&
                            <div className={styles.register}>
                                <p>Don't Have an Account ? </p>
                                <Link to={`/auth/${route}`} style={{ fontSize: "1rem" }} >Register Here</Link>
                                <p>
                                    <Link to={`/forgotPassword/${userType}`}>Forgot Password</Link>
                                </p>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
