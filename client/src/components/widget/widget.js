
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link } from "react-router-dom";
import styles from "./Widget.module.css"
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"
import DotLoader from "../Loaders/dotLoader";
const Widget = ({ type }) => {
    let data;
    const [fetchedData, setFetchedData] = useState([]);
    const [thisMonth, setThisMonth] = useState(0);
    const [lastMonth, setLastMonth] = useState(0);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(0);
    const [isPositive, setIsPositive] = useState(false);
    const [difference, setDifference] = useState(null);
    switch (type) {
        case "patients":
            data = {
                title: "PATIENTS",
                link: "See All Patients",
                icon: (
                    <PersonOutlinedIcon
                        className={styles["icon"]}
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;

        case "doctors":
            data = {
                title: "DOCTORS",
                link: "View All Doctors",
                icon: (
                    <AdminPanelSettingsOutlinedIcon
                        className={styles["icon"]}
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;

        case "hospitals":
            data = {
                title: "HOSPITALS",
                link: "View All Hospitals",
                icon: (
                    <MedicalServicesIcon
                        className={styles["icon"]}
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;

        default:
            break;
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/${type}`);
            setLoading(false)
            if (response.status === 200) {
                setFetchedData(response?.data);
            }
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }
    useEffect(() => {
        fetchData();
        console.log(lastMonth, thisMonth, isPositive)
    }, [])
    useEffect(() => {
        const currentDate = new Date();
        const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const lastMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const thisMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const thisMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const lastMonthPatients = fetchedData?.filter(patient => new Date(patient.createdAt) >= lastMonthStart && new Date(patient.createdAt) <= lastMonthEnd);
        const thisMonthPatients = fetchedData?.filter(patient => new Date(patient.createdAt) >= thisMonthStart && new Date(patient.createdAt) <= thisMonthEnd);
        setIsPositive(thisMonthPatients?.length >= lastMonthPatients?.length);
        setAmount(fetchedData?.length);
        setLastMonth(lastMonthPatients?.length);
        setThisMonth(thisMonthPatients?.length);
    }, [fetchedData])
    useEffect(() => {
        const add = lastMonth === 0 ? 1 : lastMonth;
        const percentage = (Math.abs(thisMonth - lastMonth) / (lastMonth + add)) * 100;
        setDifference(percentage);
    }, [thisMonth, lastMonth])

    return (
        <>
            <div className={`${!loading ? styles.widget : ''} ${loading ? styles.loading : ''}`}>
                {
                    loading && <DotLoader />
                }
                {!loading && <>
                    <div className={styles["left"]}>
                        <span className={styles["title"]}>{data.title}</span>
                        <span className={styles["counter"]}>{data.isAppointment && "#"} {amount}</span>
                        <span className={styles["link"]}>
                            <Link to={`/admin/dashboard/${type}`} style={{ textDecoration: "none" }}>
                                {data.link}
                            </Link>
                        </span>
                    </div>
                    <div className={styles["right"]}>
                        <div className={`${styles.percentage} ${isPositive ? styles.positive : styles.negative}`}>
                            {isPositive && <KeyboardArrowUpIcon />}
                            {!isPositive && <KeyboardArrowDownIcon />}
                            +{difference} %
                        </div>
                        {data.icon}
                    </div>
                </>}
            </div>
        </>
    );
};

export default Widget;
