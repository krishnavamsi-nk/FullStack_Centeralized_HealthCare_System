import styles from "./PatientsDashboard.module.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import { userActions } from "../../features/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import ProfileImageUpdate from "./UpdateImage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import PatientsRequestedAppointments from "../PatientsRequestedAppointments/PatientsRequestedAppointments";
import PatientMedicalRecords from "../PatientsMedicalRecords/PatientsMedicalRecords";
import DotLoader from "../Loaders/dotLoader";
const PatientDashboard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState(true);
  const [appointments, setAppointments] = useState(false);
  const [confirmAppointments, setConfirmAppointments] = useState(false);
  const [medicalRecords, setMedicalRecords] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [editProfileData, setEditProfileData] = useState({
    name: user.name,
    mobileNumber: user.mobileNumber,
    email: user.email,
    city: user.city,
    pincode: user.pincode,
    gender: user.gender,
    currentPassword: "",
    newPassword: "",
  });
  const resetFormData = () => {
    setEditProfileData({
      name: user.name,
      mobileNumber: user.mobileNumber,
      email: user.email,
      city: user.city,
      gender: user.gender,
      pincode: user.pincode,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setEditProfile(false);
  };

  const [editProfile, setEditProfile] = useState(false);
  const editClickHandler = () => {
    setEditProfile(true);
  };
  const setProfileHandler = () => {
    setProfile(true);
    setAppointments(false);
    setConfirmAppointments(false);
    setMedicalRecords(false);

  }
  const setAppointmentHandler = () => {
    setAppointments(true);
    setProfile(false);
    setConfirmAppointments(false);
    setMedicalRecords(false);
  }
  const setConfirmAppointmentHandler = () => {
    setConfirmAppointments(true);
    setAppointments(false);
    setProfile(false);
    setMedicalRecords(false);
  }

  const setMedicalRecordsHandler = () => {
    setConfirmAppointments(false);
    setAppointments(false);
    setProfile(false);
    setMedicalRecords(true);
  }
  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
  };
  const saveChangesHandler = async () => {
    if (editProfileData?.currentPassword.length === 0) {
      toast.warn("Current Password is mandatory !", {
        position: "top-right",
      });
      resetFormData();
      return;
    }
    if (!validatePhoneNumber(editProfileData?.mobileNumber)) {
      console.log("phoneNumber is invalid please try again !");
      toast.error("Please enter a valid phone number.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      resetFormData();
      return;
    }
    if (editProfileData?.email !== user.email) {
      console.log("email cannot be changed !");
      toast.error("Email cannot be changed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
    const updatedData = {
      name: editProfileData.name,
      mobileNumber: editProfileData.mobileNumber,
      email: editProfileData.email,
      city: editProfileData.city,
      pincode: editProfileData.pincode,
      currentPassword: editProfileData.currentPassword,
      newPassword: editProfileData.newPassword,
      gender: editProfileData.gender,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        "/patients/modify",
        updatedData
      );
      setLoading(false);
      setEditProfile(false);
      console.log(response.data);
      dispatch(userActions.setState(response.data));
      toast.success("Profile Updated Successfully!", {
        position: "top-right",
      });
    } catch (err) {
      console.log(err);
      resetFormData();
      setLoading(false);
      setEditProfile(false);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    resetFormData();
  }, []);

  let activeProfileStyles = profile ? styles.activeButton : styles.button;
  let activeAppointmentStyles = appointments ? styles.activeButton : styles.button;
  let activeConfirmAppointmentStyles = confirmAppointments ? styles.activeButton : styles.button;
  let activeMedicalRecords = medicalRecords ? styles.activeButton : styles.button;
  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.info}>
            <ProfileImageUpdate />
            <h5>{user.name}</h5>
            <p></p>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.buttonsDiv}>
            <button className={activeProfileStyles} onClick={setProfileHandler} >Profile</button>
            <button className={activeAppointmentStyles} onClick={setAppointmentHandler} >Requested Appointments</button>
            <button className={activeConfirmAppointmentStyles} onClick={setConfirmAppointmentHandler} >Confirmed Appointments</button>
            <button className={activeMedicalRecords} onClick={setMedicalRecordsHandler} >Medical Records</button>
          </div>
        </div>
        {profile &&
          <div className={styles.profile}>
            <div className={styles.upperHeading}>
              <h1>Profile</h1>
              {!editProfile && (
                <button onClick={editClickHandler}>
                  <FontAwesomeIcon icon={faPen} style={{ color: '#49c1a5' }} size={"lg"} /> Edit Profile
                </button>
              )}
              {editProfile && (
                <div className={styles.buttonsDiv}>
                  <button onClick={resetFormData}>Discard</button>
                  <button onClick={saveChangesHandler}>
                    Update Info
                  </button>
                </div>
              )}
            </div>
            {
              loading && <div><DotLoader /></div>
            }
            {!loading && <div className={styles.profileManagement}>
              <div className={styles.InputGroup}>
                <div className={styles.InputDiv}>
                  <label>Name</label>
                  <input
                    value={editProfileData.name}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        name: e.target.value,
                      })
                    }
                    disabled={!editProfile}
                  />
                </div>
                <div className={styles.InputDiv}>
                  <label>Email</label>
                  <input
                    type="email"
                    value={editProfileData.email}
                    disabled={true}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputDiv}>
                  <label>MobileNumber</label>
                  <input
                    value={editProfileData.mobileNumber}
                    disabled={!editProfile}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.InputDiv}>
                  <label>City</label>
                  <input
                    value={editProfileData.city}
                    disabled={!editProfile}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputDiv}>
                  <label>Pincode</label>
                  <input
                    type="text"
                    value={editProfileData.pincode}
                    disabled={!editProfile}
                    required
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        pincode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.InputDiv}>
                  <label>Gender</label>
                  <input type="text"
                    value={editProfileData.gender}
                    disabled={!editProfile}
                    required
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        gender: e.target.value,
                      })
                    } />
                </div>
              </div>
              <div className={styles.InputGroup}>
                <div className={styles.InputDiv}>
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={editProfileData.currentPassword}
                    disabled={!editProfile}
                    required
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.InputDiv}>
                  <label>New Password</label>
                  <input
                    type="password"
                    disabled={!editProfile}
                    value={editProfileData.newPassword}
                    onChange={(e) =>
                      setEditProfileData({
                        ...editProfileData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {editProfile && (
                <div className={styles.bottomButtonsDiv}>
                  {editProfile && (
                    <div className={styles.buttonsDiv}>
                      <button onClick={resetFormData}>
                        Discard
                      </button>
                      <button onClick={saveChangesHandler}>
                        Update Info
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            }
          </div>
        }
        {
          appointments && <PatientsRequestedAppointments type={"requestedappointments"} />
        }
        {
          confirmAppointments && <PatientsRequestedAppointments type={"confirmendappointments"} />
        }
        {
          medicalRecords && <PatientMedicalRecords />
        }
      </div>
      <Footer />
    </>
  );
};

export default PatientDashboard;
