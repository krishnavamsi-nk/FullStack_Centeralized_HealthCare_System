import styles from "./AdminHospitalList.module.css"
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import DataTable from "../../components/datatable/datatable";
import axiosInstance from "../../api/axiosInstance"
import { useEffect, useState } from "react";
import DotLoader from "../../components/Loaders/dotLoader";
const AdminHospitalList = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchHospitals = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/admin/hospitals");
            setLoading(false);
            if (response.status === 200) {
                setHospitals(response.data);
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
        fetchHospitals();
    }, [])
    return (
        <>
            <div className={styles["hospital-list"]}>
                <Sidebar />
                <div className={styles["HospitalslistContainer"]}>
                    <Navbar />
                    {
                        loading &&
                        <div className={styles.loader}>
                            <DotLoader />
                        </div>
                    }
                    {!loading && <DataTable user="hospitals" hospitals={hospitals} />}
                </div>
            </div>

        </>
    );
};

export default AdminHospitalList;