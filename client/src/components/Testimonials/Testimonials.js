import React from "react";
import styles from "./Testimonials.module.css";
const Testimonials = () => {
    return (
        <div className={styles.background}>
            <div className={styles.testimonials}>
                <div className={styles["testimonials-title"]}>
                    <h1>What Our Happy</h1>
                    <h1>Clients Say</h1>
                </div>
                <div className={styles["testimonials-review"]}>
                    <div className={styles["testimonials-review-1"]}>
                        <div className={styles["testimonials-reviewcard"]}>
                            <div className={styles["testimonials-div"]}>
                                <img
                                    alt="dog1"
                                    src="https://c4.wallpaperflare.com/wallpaper/71/196/981/digital-art-minimalism-nature-hills-wallpaper-preview.jpg"
                                    className={styles["testimonials-div-img"]}
                                />
                            </div>
                            <div>
                                <p>
                                    "Unparalleled adventures, memories etched in
                                    my heart forever."
                                </p>
                            </div>
                            <p><b>Praneet, Canada</b></p>
                        </div>
                    </div>
                    <div className={styles["testimonials-review-2"]}>
                        <div className={styles["testimonials-reviewcard"]}>
                            <div className={styles["testimonials-div"]}>
                                <img
                                    alt="dog2"
                                    src="https://c4.wallpaperflare.com/wallpaper/203/697/217/fkyhdino-landscape-artwork-mountains-wallpaper-preview.jpg"
                                    className={styles["testimonials-div-img"]}
                                />
                            </div>
                            <div>
                                <p>
                                    "Incredible guides, I discovered the world
                                    like never before."
                                </p>
                            </div>
                            <p><b>Yashwanth Babu, USA</b></p>
                        </div>
                    </div>
                    <div className={styles["testimonials-review-3"]}>
                        <div className={styles["testimonials-reviewcard"]}>
                            <div className={styles["testimonials-div"]}>
                                <img
                                    alt="dog3"
                                    src="https://c4.wallpaperflare.com/wallpaper/664/373/122/forest-mikael-gustafsson-landscape-horizon-wallpaper-preview.jpg"
                                    className={styles["testimonials-div-img"]}
                                />
                            </div>
                            <div>
                                <p>
                                    "Heartfelt thanks, this trip enriched my
                                    soul beyond words."
                                </p>
                            </div>
                            <p><b>Siva Nithin, Chennai</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
