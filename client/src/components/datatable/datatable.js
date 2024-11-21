import { DataGrid } from "@mui/x-data-grid";
import {
    userColumnsPatients,
    userColumnsDoctors,
    userColumnsHospitals,
} from "../../datatablesource";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DataTable.module.css";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
const DataTable = (props) => {
    const [loading, setLoading] = useState(false);
    let userRow, userColumns;
    if (props?.user === 'patients') {
        userRow = props?.patients;
        userColumns = userColumnsPatients;
    }
    else if (props?.user === 'doctors') {
        userRow = props?.doctors;
        userColumns = userColumnsDoctors;
    }
    else if (props?.user === 'hospitals') {
        userRow = props?.hospitals;
        userColumns = userColumnsHospitals;
    }

    const [data, setData] = useState(userRow);

    const deleteUser = async (id) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(`/admin/${props?.user}/${id}`);
            setLoading(false);
            if (response.status === 200) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    const handleDelete = async (id) => {
        const deletionResult = await deleteUser(id);
        console.log(deletionResult);

        if (deletionResult === true) {
            setData(data?.filter((item) => item?._id !== id));
            toast.success("deleted successfully!", {
                position: "top-right",
                toastId: 3,
            });
        } else {
            toast.error("Error While Deleting!", {
                position: "top-right",
                toastId: 4,
            });
        }
    };


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className={styles["cellAction"]}>
                        <Link to={`/admin/dashboard/${props?.user}/${params?.row._id}`} style={{ textDecoration: "none" }}>
                            <div className={styles["viewButton"]}>View</div>
                        </Link>
                        <div
                            className={styles["deleteButton"]}
                            onClick={() => handleDelete(params?.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className={styles["datatable"]}>
            <DataGrid
                className={styles["datagrid"]}
                rows={data}
                columns={userColumns?.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    );
};

export default DataTable;