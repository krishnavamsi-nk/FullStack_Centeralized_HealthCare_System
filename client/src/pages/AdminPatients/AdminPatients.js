import styles from "./AdminPatients.module.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/chart";
import List from "../../components/table/table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import Avatar from "./user.png";
import DotLoader from "../../components/Loaders/dotLoader";
const AdminPatients = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const { patientId } = useParams();
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`admin/patients/${patientId}`);
      setLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        setPatient(response.data);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const pullData = (data) => {
    setGraphData(data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className={styles["patients"]}>
      <Sidebar />
      <div className={styles["patientsContainer"]}>
        <Navbar />
        <div className={styles["top"]}>
          <div className={`${styles["left"]}`}>
            {loading && (
              <div className={styles.loader}>
                {" "}
                <DotLoader />{" "}
              </div>
            )}
            {!loading && (
              <>
                <h1 className={styles["title"]}>Patients Information</h1>
                <div className={styles["item"]}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${patient?.image}`}
                    alt=""
                    className={styles["itemImg"]}
                  />
                  <div className={styles["details"]}>
                    <h1 className={styles["itemTitle"]}>{patient?.name}</h1>
                    <div className={styles["detailItem"]}>
                      <span className={styles["itemKey"]}>Email:</span>
                      <span className={styles["itemValue"]}>
                        {patient?.email}
                      </span>
                    </div>
                    <div className={styles["detailItem"]}>
                      <span className={styles["itemKey"]}>Phone:</span>
                      <span className={styles["itemValue"]}>
                        {patient?.mobileNum}
                      </span>
                    </div>
                    <div className={styles["detailItem"]}>
                      <span className={styles["itemKey"]}>Address:</span>
                      <span className={styles["itemValue"]}>
                        {`${patient?.city}, ${patient?.state}, ${patient?.pincode}`}
                      </span>
                    </div>
                    <div className={styles["detailItem"]}>
                      <span className={styles["itemKey"]}>Age:</span>
                      <span className={styles["itemValue"]}>
                        {patient?.age}
                      </span>
                    </div>
                    <div className={styles["detailItem"]}>
                      <span className={styles["itemKey"]}>Gender:</span>
                      <span className={styles["itemValue"]}>
                        {patient?.gender}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles["right"]}>
            <Chart
              aspect={3 / 1}
              title={`${patient?.name} Confirmed Appointments ( Current Year)`}
              data={graphData}
            />
          </div>
        </div>
        <div className={styles["bottom"]}>
          <h1 className={styles["title"]}>Latest Appointments</h1>
          <List id={patientId} type={"patients"} pullData={pullData} />
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
