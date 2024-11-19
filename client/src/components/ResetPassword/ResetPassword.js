import React, { useState } from 'react';
import axiosInstance from "../../api/axiosInstance"
import { toast } from "react-toastify";
import styles from "./ResetPassword.module.css";
import { useNavigate, useParams } from "react-router-dom"
import Header from '../Header/Header';
function ResetPassword() {
    const allowedTypes = ['patients', 'doctors', 'hospitals'];
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();
    const { type, token } = useParams();
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axiosInstance.post(`/${type}/reset-password`, { token, newPassword });
            setLoading(false)
            setNewPassword('');
            if (response.status === 200) {
                toast.success("password reset sucessfull!", {
                    position: "top-right"
                });
                navigate("/");
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message, { position: "top-right" });
            navigate("/")
        }
    };
    if (!allowedTypes.includes(type)) {
        return navigate("/")
    }
    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.resetPasswordCard}>
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmitResetPassword} className={styles.resetPasswordForm}>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New Password' />
                        <button type="submit">{loading ? <>Loading...</> : <>Reset Password</>}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;
