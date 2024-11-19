import styles from "./Admin.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Widget from "../../components/widget/widget";
import Featured from "../../components/featured/featured";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import FetchLoader from "../../components/Loaders/fetchLoader";
import DotLoader from "../../components/Loaders/dotLoader";
const Admin = () => {
    const [appointmentChartData, setAppointmentChartData] = useState([]);
    const [percentageChange, setPercentageChange] = useState(null);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [thisMonth, setThisMonth] = useState(0);
    const [lastMonth, setLastMonth] = useState(0);
    const [loading, setLoading] = useState(false);
    const fetchAppointmentData = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/admin/getGraphData");
            setLoading(false);
            if (response.status === 200) {
                console.log(response.data);
                setAppointmentChartData(response.data?.data);
                setTotalAppointments(response.data?.total);
            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    }
    useEffect(() => {
        fetchAppointmentData();
    }, [])

    useEffect(() => {
        if (appointmentChartData.length > 1) {
            const currentMonthIndex = new Date().getMonth();
            const previousMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

            const currentMonthTotalAppointments = appointmentChartData[currentMonthIndex].totalAppointments;
            const previousMonthTotalAppointments = appointmentChartData[previousMonthIndex].totalAppointments;

            const change = Math.abs(currentMonthTotalAppointments - previousMonthTotalAppointments);
            setThisMonth(currentMonthTotalAppointments);
            setLastMonth(previousMonthTotalAppointments);
            const add = previousMonthTotalAppointments === 0 ? 1 : 0;
            const percentageChange = (change / (previousMonthTotalAppointments + add)) * 100 || 0;
            setPercentageChange(percentageChange);
        }
    }, [appointmentChartData]);

    return (
        <div className={styles["home"]}>
            <Sidebar />
            <div className={styles["homeContainer"]}>
                <Navbar />
                {
                    loading && <div className={styles.loader}>
                        <DotLoader />
                    </div>
                }
                {
                    !loading && <>
                        <div className={styles["widgets"]}>
                            <Widget type="patients" />
                            <Widget type="doctors" />
                            <Widget type="hospitals" />
                        </div>
                        <div className={styles["charts"]}>
                            <Featured percentageChange={percentageChange} totalAppointments={totalAppointments}
                                thisMonth={thisMonth} lastMonth={lastMonth}
                            />
                            <Chart aspect={2 / 1} title="Appointments Per Month" data={appointmentChartData} />
                        </div>
                        {/* <div className={styles["listContainer"]}>
                            <div className={styles["listTitle"]}>
                                Latest Appointments
                            </div>
                            <List />
                        </div> */}
                    </>
                }
            </div>
        </div>
    );
};

export default Admin;