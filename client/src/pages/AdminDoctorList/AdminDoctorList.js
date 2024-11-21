import styles from "./AdminDoctorList.module.css";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"
import DotLoader from "../../components/Loaders/dotLoader";
const AdminDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/admin/doctors");
            setLoading(false);
            if (response.status === 200) {
                setDoctors(response.data);
            }
            else {
                //toastify error
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    }
    useEffect(() => {
        fetchDoctors();
    }, [])
    return (
        <>
            <div className={styles["doctors-list"]}>
                <Sidebar />
                <div className={styles["DoctorslistContainer"]}>
                    <Navbar />
                    {
                        loading &&
                        <div className={styles.loader}>
                            <DotLoader />
                        </div>
                    }
                    {!loading && <DataTable user="doctors" doctors={doctors} />}
                </div>
            </div>

        </>
    );
};

export default AdminDoctorsList;