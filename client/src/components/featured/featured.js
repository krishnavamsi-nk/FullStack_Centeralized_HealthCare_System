
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import styles from "./Featured.module.css"
import { useState } from "react";

const Featured = ({ percentageChange, totalAppointments, lastMonth, thisMonth }) => {
    const [isPositive, setIsPositive] = useState(Number(thisMonth) >= (Number(lastMonth)));
    console.log(isPositive);
    return (
        <div className={styles["featured"]}>
            <div className={styles["top"]}>
                <h1 className={styles["title"]}>
                    Percentage Change In Appointment
                </h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className={styles["bottom"]}>
                <div className={styles["featuredChart"]}>
                    <CircularProgressbar
                        value={percentageChange}
                        text={`${percentageChange}%`}
                        strokeWidth={5}
                        styles={{
                            path: {
                                stroke: '#36ffbc',
                            },
                            text: {
                                fill: '#36ffbc',
                            }
                        }}
                    />
                </div>
                <p className={styles["title"]}>Total Appointment</p>
                <p className={styles["amount"]}>{totalAppointments}</p>
                <p className={styles["desc"]}>
                    Upto Date Appointments
                </p>
                <div className={styles["summary"]}>
                    <div className={styles["item"]}>
                        <div className={styles["itemTitle"]}>This Month</div>
                        <div className={`${styles.itemResult} ${isPositive ? styles.positive : styles.negative}`}>
                            {isPositive && <KeyboardArrowUpOutlinedIcon fontSize="small" />}
                            {!isPositive && <KeyboardArrowDownIcon fontSize="small" />}
                            <div className={styles["resultAmount"]}>{thisMonth}</div>
                        </div>
                    </div>
                    <div className={styles["item"]}>
                        <div className={styles["itemTitle"]}>Last Month</div>
                        <div className={`${styles.itemResult} ${!isPositive ? styles.positive : styles.negative}`} >
                            {!isPositive && <KeyboardArrowUpOutlinedIcon fontSize="small" />}
                            {isPositive && <KeyboardArrowDownIcon fontSize="small" />}
                            <div className={styles["resultAmount"]}>{lastMonth}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;