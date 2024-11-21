import React from "react";
import styles from "./Process.module.css";
import Tilt from 'react-parallax-tilt';
function Process() {
    const bellIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 448 512"
            fill="white"
        >
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
        </svg>
    );
    const fileIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 384 512"
            fill="white"
        >
            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
        </svg>
    );
    const searchIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 512 512"
            fill="white"
        >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>

    );
    return (
        <>
            <div className={styles.background} id="steps">
                <div className={styles.content}>
                    <h1>How it Works</h1>

                    <div className={styles.cards}>
                        <Tilt
                            tiltMaxAngleX={20}
                            tiltMaxAngleY={20}
                            glareEnable={true}
                            glareMaxOpacity={0}
                            gyroscope={true}
                            scale={1.02}
                            transitionSpeed={2000}
                        >
                            <div className={styles.card}>
                                <div>{searchIcon}</div>
                                <h1>Search Doctors</h1>
                                <p>Search For Specialists Doctors Near You</p>
                            </div>
                        </Tilt>
                        <Tilt
                            tiltMaxAngleX={20}
                            tiltMaxAngleY={20}
                            glareEnable={true}
                            glareMaxOpacity={0}
                            gyroscope={true}
                            scale={1.02}
                            transitionSpeed={2000}>
                            <div className={styles.card}>
                                <div>{bellIcon}</div>
                                <h1>Receive Your Matches</h1>
                                <p>
                                    We Will Match You with the specialist You need
                                </p>
                            </div>
                        </Tilt>
                        <Tilt
                            tiltMaxAngleX={20}
                            tiltMaxAngleY={20}
                            glareEnable={true}
                            glareMaxOpacity={0}
                            gyroscope={true}
                            scale={1.02}
                            transitionSpeed={2000}
                        >
                            <div className={styles.card}>
                                <div>{fileIcon}</div>
                                <h1>Make An Appointment</h1>
                                <p>
                                    Schedule your Appointment with the best doctors
                                </p>
                            </div>
                        </Tilt>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Process;
