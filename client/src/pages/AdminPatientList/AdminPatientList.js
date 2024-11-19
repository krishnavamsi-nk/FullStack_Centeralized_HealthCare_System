import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";
import styles from "./AdminPatientList.module.css"
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import DotLoader from "../../components/Loaders/dotLoader";
const AdminPatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/admin/checkAppointmentStatus");
            setLoading(false);
            if (response.status === 200) {
                console.log(response.data);
                setPatients(response.data);
            }
            console.log(patients);
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPatients();
    }, [])
    return (
        <>
            <div className={styles["patient-list"]}>
                <Sidebar />
                <div className={styles["PatientlistContainer"]}>
                    <Navbar />
                    {
                        loading &&
                        <div className={styles.loader}>
                            <DotLoader />
                        </div>
                    }
                    {!loading && <DataTable user="patients" patients={patients} />}
                </div>
            </div>
        </>
    );
};

export default AdminPatientList;