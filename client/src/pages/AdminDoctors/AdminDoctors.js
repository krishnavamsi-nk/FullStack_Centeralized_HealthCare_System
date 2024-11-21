import styles from "./AdminDoctors.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import List from "../../components/table/table";
import Chart from "../../components/chart/chart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"
const AdminDoctors = () => {
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [numAppointments, setNumAppointments] = useState(0);
    const { doctorId } = useParams();
    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`admin/doctors/${doctorId}`);
            setLoading(false);
            if (response.status === 200) {
                console.log(response.data);
                setDoctor(response.data);
            }
        } catch (error) {
            setLoading(false)
        }
    }
    const pullData = (data) => {
        let totalAppointments = 0;
        setGraphData(data);
        for (const monthData of data) {
            totalAppointments += monthData.totalAppointments;
        }
        setNumAppointments(totalAppointments);
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div className={styles["doctors"]}>
            <Sidebar />
            <div className={styles["doctorsContainer"]}>
                <Navbar />
                <div className={styles["top"]}>
                    <div className={styles["left"]}>
                        <h1 className={styles["title"]}>Doctors Information</h1>
                        <div className={styles["item"]}>
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${doctor?.image}`}
                                alt=""
                                className={styles["itemImg"]}
                            />
                            <div className={styles["details"]}>
                                <h1 className={styles["itemTitle"]}>{doctor?.name}</h1>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Email:</span>
                                    <span className={styles["itemValue"]}>{doctor?.email}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Phone:</span>
                                    <span className={styles["itemValue"]}>{doctor?.mobileNum}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Specialization:</span>
                                    <span className={styles["itemValue"]}>
                                        {doctor?.Speciality}
                                    </span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>LiscenceNo</span>
                                    <span className={styles["itemValue"]}>{doctor?.liscenceNo}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Experience:</span>
                                    <span className={styles["itemValue"]}>{`${doctor?.experience} years`}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>No Of Appointments:</span>
                                    <span className={styles["itemValue"]}>{numAppointments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["right"]}>
                        <Chart aspect={3 / 1} title={`${doctor?.name}'s ( Last 1 Year) Confirmed Appointments`} data={graphData} />
                    </div>
                </div>
                <div className={styles["bottom"]}>
                    <h1 className={styles["title"]}>Latest Appointments</h1>
                    <List id={doctorId} type={"doctors"} pullData={pullData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDoctors;