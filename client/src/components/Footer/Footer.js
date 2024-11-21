import React from "react";
import styles from "./Footer.module.css";
const Footer = () => {
    return (
        <div>
            <div className={styles.background}>
                <div
                    className="container custom-footer"
                    style={{
                        borderTopLeftRadius: "25px",
                        borderTopRightRadius: "25px",
                        paddingTop:"2.5rem"
                    }}
                >
                    <footer className="py-3">
                        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                            <li className="nav-item">
                                <a
                                    href="#home"
                                    className="nav-link px-2 text-muted"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="#fea"
                                    className="nav-link px-2 text-muted"
                                >
                                    Features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="/faqs"
                                    className="nav-link px-2 text-muted"
                                >
                                    FAQs
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    href="/about"
                                    className="nav-link px-2 text-muted"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                        <p className="text-center text-muted">
                            © 2022 CHS, Inc
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Footer;
