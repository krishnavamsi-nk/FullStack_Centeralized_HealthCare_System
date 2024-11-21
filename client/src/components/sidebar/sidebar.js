import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { userActions } from "../../features/userSlice";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/admin/logout");
      dispatch(userActions.reset());
      toast.success("Logged out successfully!", {
        position: "top-right",
        toastId: 7,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  };
  return (
    <div className={styles["sidebar"]}>
      <div className={styles["top"]}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className={styles["logo"]}>Admin</span>
        </Link>
      </div>
      <hr />
      <div className={styles["center"]}>
        <ul>
          <li>
            <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
              <div>
                <DashboardIcon className={styles["icon"]} />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/dashboard/patients"
              style={{ textDecoration: "none" }}
            >
              <div>
                <PersonOutlineIcon className={styles["icon"]} />
                <span>Patients</span>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/dashboard/doctors"
              style={{ textDecoration: "none" }}
            >
              <div>
                <AdminPanelSettingsOutlinedIcon className={styles["icon"]} />
                <span>Doctors</span>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/dashboard/hospitals"
              style={{ textDecoration: "none" }}
            >
              <div>
                <MedicalServicesIcon className={styles["icon"]} />
                <span>Hospitals</span>
              </div>
            </Link>
          </li>

          <li>
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <ExitToAppIcon className={styles["icon"]} />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
