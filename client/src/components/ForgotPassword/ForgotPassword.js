import styles from "./ForgotPassword.module.css";
import Header from "../Header/Header";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const allowedTypes = ['doctors', 'hospitals', 'patients'];
    const { type } = useParams();
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axiosInstance.post(`/${type}/forgot-password`, { email });
            setLoading(false);
            setEmail('');
            if (response.status === 200) {
                toast.success("please check your email, we have sent a password reset link!", { position: "top-right" })
            }
        }
        catch (error) {
            setLoading(false);
            toast.error(error.response?.data.message, { position: "top-right" })
            console.log(error);
        }
    }
    if (!allowedTypes.includes(type)) {
        return navigate("/page-not-found")
    }
    return (
        <>
            <Header />
            <div className={styles.main}>
                <div className={styles.forgotPasswordCard}>
                    <h1>Forgot Password</h1>
                    <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email Id" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <button type="submit">{loading ? <>Loading...</> : <>Submit</>}</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
