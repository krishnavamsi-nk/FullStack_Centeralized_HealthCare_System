import styles from "./Features.module.css";
import React from "react";
const Features = () => {
    const bolt = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
        >
            <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
        </svg>
    );
    const secure = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
        >
            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" />
        </svg>
    );
    const dataSecure = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
        >
            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v47l-92.8 37.1c-21.3 8.5-35.2 29.1-35.2 52c0 56.6 18.9 148 94.2 208.3c-9 4.8-19.3 7.6-30.2 7.6H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm39.1 97.7c5.7-2.3 12.1-2.3 17.8 0l120 48C570 277.4 576 286.2 576 296c0 63.3-25.9 168.8-134.8 214.2c-5.9 2.5-12.6 2.5-18.5 0C313.9 464.8 288 359.3 288 296c0-9.8 6-18.6 15.1-22.3l120-48zM527.4 312L432 273.8V461.7c68.2-33 91.5-99 95.4-149.7z" />
        </svg>
    );
    return (
        <>
            <div className={styles.main} id="features">
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <h1>Our Features</h1>
                        <p>
                            Access Your medical Records from anywhere, anytime
                        </p>
                    </div>
                    <div className={styles.features}>
                        <div className={styles.card}>
                            <h1>{bolt} Clinically Proven to help people</h1>
                            <p>
                                Our Data shows that clients see results in less
                                than 6 sessions - that's less than 2 months
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h1>{secure} Secure and anonymous</h1>
                            <p>
                                we comply with all laws related to medical
                                secrecy.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <h1>{dataSecure} Secure Data </h1>
                            <p>
                                We share data only with your appointed doctor
                                and no one else
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Features;
