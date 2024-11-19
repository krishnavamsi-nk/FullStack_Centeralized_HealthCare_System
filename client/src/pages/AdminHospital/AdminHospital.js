import styles from "./AdminHospital.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Avatar from "./hospital.png";
const AdminHospital = () => {
    const [hospital, setHospital] = useState({});
    const [loading, setLoading] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [numAppointments, setNumAppointments] = useState(0);
    const { hospitalId } = useParams();
    const fetchUser = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`admin/hospitals/${hospitalId}`);
            setLoading(false);
            if (response.status === 200) {
                setHospital(response.data);
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
    console.log(hospitalId);
    return (
        <div className={styles["hostpitals"]}>
            <Sidebar />
            <div className={styles["hostpitalsContainer"]}>
                <Navbar />
                <div className={styles["top"]}>
                    <div className={styles["left"]}>
                        <h1 className={styles["title"]}>Hospitals Information</h1>
                        <div className={styles["item"]}>
                            <img
                                
                                src={`${process.env.REACT_APP_API_URL}/${hospital?.image}`}
                                alt="hospital-icon"
                                className={styles["itemImg"]}
                            />
                            <div className={styles["details"]}>
                                <h1 className={styles["itemTitle"]}>{hospital?.name}</h1>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Email:</span>
                                    <span className={styles["itemValue"]}>{hospital?.email}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Government:</span>
                                    <span className={styles["itemValue"]}>{hospital?.government}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Address:</span>
                                    <span className={styles["itemValue"]}>
                                        {`${hospital?.state} ${hospital?.city} ${hospital?.pincode}`}
                                    </span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Specialization:</span>
                                    <span className={styles["itemValue"]}>
                                        {hospital?.specialityDep}
                                    </span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>Registration Number:</span>
                                    <span className={styles["itemValue"]}>{hospital?.regNo}</span>
                                </div>
                                <div className={styles["detailItem"]}>
                                    <span className={styles["itemKey"]}>No Of Appointments:</span>
                                    <span className={styles["itemValue"]}>{numAppointments}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["right"]}>
                        <Chart aspect={3 / 1} title={`${hospital?.name}'s Confirmed Appointments (Current 1 Year)`} data={graphData} />
                    </div>
                </div>
                <div className={styles["bottom"]}>
                    <h1 className={styles["title"]}>Latest Appointments</h1>
                    <List type={"hospitals"} id={hospitalId} pullData={pullData} />
                </div>
            </div>
        </div>
    );
};

export default AdminHospital;