import React, { useEffect, useState } from 'react'
import DoctorDashboard from './DoctorDashboard'
import PatientDashboard from './PatientDashboard'
import HospitalDashboard from './HospitalDashboard'
import AdminDashboard from './AdminDashboard'
import { useNavigate } from 'react-router-dom'
const Dashboard = (props) => {
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setUserType(props.type);
        if (props.type === 'admin')
            navigate("/admin/dashboard");
    }, [])
    return (
        <>
            {userType === 'patients' && <PatientDashboard />}
            {userType === 'doctors' && <DoctorDashboard />}
            {userType === 'hospitals' && <HospitalDashboard />}
        </>
    )
}

export default Dashboard