import React from 'react'
import Image from "./404.svg";
import styles from "./PageNotFound.css";
function PageNotFound() {
    return (
        <div className={styles.main}>
            <img src={Image} alt='404' style={{ height: "100vh", width: "100vw" }} />
        </div>
    )
}
export default PageNotFound