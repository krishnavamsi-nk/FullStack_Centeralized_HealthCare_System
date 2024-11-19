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
import ViewDoctorsWorking from "../ViewDoctorsWorking/ViewDoctorsWorking";
import ViewRequestedAppointements from "../ViewRequestedAppointments/ViewRequestedAppointements";
const HospitalDashboard = () => {
  const [profile, setProfile] = useState(true);
  const [ViewDoctors, setViewDoctors] = useState(false);
  const [appointments, setAppointments] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [editProfileData, setEditProfileData] = useState({
    name: user.name,
    email: user.email,
    city: user.city,
    state: user.state,
    pincode: user.pincode,
    currentPassword: "",
    newPassword: "",
  });
  const resetFormData = () => {
    setEditProfileData({
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      pincode: user.pincode,
      currentPassword: "",
      newPassword: "",
    });
    setEditProfile(false);
  };

  const [editProfile, setEditProfile] = useState(false);
  const editClickHandler = () => {
    setEditProfile(true);
  };


  const saveChangesHandler = async () => {
    if (editProfileData.currentPassword.length === 0) {
      toast.warn("Current Password is mandatory !", {
        position: "top-right",
      });
      resetFormData();
      return;
    }
    const updatedData = {
      name: editProfileData.name,
      city: editProfileData.city,
      state: editProfileData.state,
      pincode: editProfileData.pincode,
      currentPassword: editProfileData.currentPassword,
      newPassword: editProfileData.newPassword,
    };
    // setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/hospitals/modify",
        updatedData
      );
      // setLoading(false);
      setEditProfile(false);
      console.log(response.data);
      dispatch(userActions.setState(response.data));
      toast.success("Profile Updated Successfully!", {
        position: "top-right",
      });
      resetFormData();
    } catch (err) {
      console.log(err);
      resetFormData();
      // setLoading(false);
      setEditProfile(false);
      toast.error(err.response.data.message, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    resetFormData();
  }, []);

  const setProfileHandler = () => {
    setProfile(true);
    setViewDoctors(false);
    setAppointments(false);

  }
  const getViewDoctorsHandler = () => {
    setViewDoctors(true);
    setProfile(false);
    setAppointments(false);
  }

  const viewAppointmentsHandler = () => {
    setAppointments(true);
    setProfile(false);
    setViewDoctors(false)
  }

  let activeProfileStyles = profile ? styles.activeButton : styles.button;
  let activeHospitalStyles = ViewDoctors ? styles.activeButton : styles.button;
  let activeAppointmentStyles = appointments ? styles.activeButton : styles.button;

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.info}>
            <ProfileImageUpdate />
            <h5>{user.name}</h5>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.buttonsDiv}>
            <button className={activeProfileStyles} onClick={setProfileHandler} >Profile</button>
            <button className={activeHospitalStyles} onClick={getViewDoctorsHandler} >ViewDoctors</button>
            <button className={activeAppointmentStyles} onClick={viewAppointmentsHandler} >Appointments</button>
          </div>
        </div>
        {profile && <div className={styles.profile}>
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
          <div className={styles.profileManagement}>
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
                  disabled
                />
              </div>
            </div>
            <div className={styles.InputGroup}>
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
              <div className={styles.InputDiv}>
                <label>State</label>
                <input
                  value={editProfileData.state}
                  disabled={!editProfile}
                  onChange={(e) =>
                    setEditProfileData({
                      ...editProfileData,
                      state: e.target.value,
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
        </div>
        }
        {
          ViewDoctors && <ViewDoctorsWorking />
        }
        {
          appointments && <ViewRequestedAppointements />
        }
      </div>

      <Footer />
    </>
  );
};

export default HospitalDashboard;
