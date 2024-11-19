import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./Table.module.css"
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import DotLoader from "../Loaders/dotLoader";

const List = ({ id, type, pullData }) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/${type}/appointments/${id}`);
            setLoading(false);
            if (response.status === 200) {
                console.log((response.data));
                setRows(response.data);
                const currentYear = new Date().getFullYear();
                const appointmentsCount = {
                    "Jan": 0,
                    "Feb": 0,
                    "Mar": 0,
                    "Apr": 0,
                    "May": 0,
                    "Jun": 0,
                    "Jul": 0,
                    "Aug": 0,
                    "Sep": 0,
                    "Oct": 0,
                    "Nov": 0,
                    "Dec": 0
                };
                response.data.forEach(appointment => {
                    const appointmentDate = new Date(appointment.appointmentDate);
                    if (appointmentDate.getFullYear() === currentYear && appointment.status === "confirmed") {
                        const month = appointmentDate.toLocaleString('default', { month: 'short' });
                        appointmentsCount[month]++;
                    }
                });
                const result = Object.entries(appointmentsCount).map(([month, totalAppointments]) => ({
                    month,
                    totalAppointments
                }));
                pullData(result);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <TableContainer component={Paper} className={styles["table"]}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={styles["tableCell"]}>Appointment ID</TableCell>
                        <TableCell className={styles["tableCell"]}>Patient Name</TableCell>
                        <TableCell className={styles["tableCell"]}>Doctor Name</TableCell>
                        <TableCell className={styles["tableCell"]}>Appointment Date</TableCell>
                        <TableCell className={styles["tableCell"]}>Disease</TableCell>
                        <TableCell className={styles["tableCell"]}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!loading && rows?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className={styles["tableCell"]}>{row.id}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.patientName}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.doctorName}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.appointmentDate}</TableCell>
                            <TableCell className={styles["tableCell"]}>{row.disease}</TableCell>
                            <TableCell className={styles["tableCell"]}>
                                <span className={`${styles.status}  ${styles[row.status]}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                loading && <div className={styles.loader}><DotLoader /></div>
            }
        </TableContainer>
    );
};

export default List;
