import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";
import heroImage from "./hero.webp";
import { useAppSelector } from "../../app/hooks";
import Tilt from 'react-parallax-tilt';
const Hero = () => {
    const user = useAppSelector((state) => state.user);

    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate("/auth/patientslogin");
    };

    const handleBookAppointment = () => {
        navigate("/hospitals")
    }

    const handleDashboard = () => {
        navigate("/dashboard");
    }

    return (
        <>
            <div className={styles.hero}>
                <div className={styles.hero__right}>
                    <div className={styles.hero__right__title}>
                        <h1>Where Compassion Meets Efficiency.</h1>
                        <p>
                            Experience the Advantages of Centralized Healthcare.
                        </p>
                        <div className={styles.buttonDiv}>
                            {!user.isLoggedIn && <button onClick={handleGetStartedClick}>
                                Get Started
                            </button>}
                            {user.isLoggedIn && user.type === 'patients' && <button onClick={handleBookAppointment}>
                                Book An Appointment
                            </button>}
                            {
                                user.isLoggedIn && user.type !== 'patients' && <button onClick={handleDashboard}>
                                    Go to Dashboard
                                </button>
                            }

                        </div>
                    </div>
                </div>
                <div className={styles.hero__left}>
                    <Tilt
                        tiltMaxAngleX={20}
                        tiltMaxAngleY={20}
                        glareEnable={false}
                        glareMaxOpacity={0}
                        gyroscope={true}
                        scale={1.02}
                        transitionSpeed={2000}
                    >
                        <img alt="_hero_" src={heroImage} />
                    </Tilt>
                </div>
            </div>
        </>
    );
};

export default Hero;
