import styles from "./components/datatable/DataTable.module.css"
export const userColumnsPatients = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "patientName",
        headerName: "Patient Name",
        width: 230,
        renderCell: (params) => {
            return (
                <div className={styles["cellWithImg"]}>
                    {params.row.patientName}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "age",
        headerName: "Age",
        width: 100,
    },
    {
        field: "status",
        headerName: "Appointment Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`${styles.cellWithStatus} ${styles[params.row.status]}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

//temporary data
export const userRowsPatients = [
    {
        id: 1,
        patientName: "Snow",
        status: "Medicated",
        email: "1snow@gmail.com",
        age: 35,
    },
    {
        id: 2,
        patientName: "Jamie Lannister",
        email: "2snow@gmail.com",
        status: "On-CheckUp",
        age: 42,
    },
    {
        id: 3,
        patientName: "Lannister",
        email: "3snow@gmail.com",
        status: "Not-Medicated",
        age: 45,
    },
    {
        id: 4,
        patientName: "Stark",
        email: "4snow@gmail.com",
        status: "Medicated",
        age: 16,
    },
    {
        id: 5,
        patientName: "Targaryen",
        email: "5snow@gmail.com",
        status: "On-CheckUp",
        age: 22,
    },
    {
        id: 6,
        patientName: "Melisandre",
        email: "6snow@gmail.com",
        status: "Medicated",
        age: 15,
    },
    {
        id: 7,
        patientName: "Clifford",
        email: "7snow@gmail.com",
        status: "On-CheckUp",
        age: 44,
    },
    {
        id: 8,
        patientName: "Frances",
        email: "8snow@gmail.com",
        status: "Medicated",
        age: 36,
    },
    {
        id: 9,
        patientName: "Roxie",
        email: "snow@gmail.com",
        status: "Not-Medicated",
        age: 65,
    },
    {
        id: 10,
        patientName: "Roxie",
        email: "snow@gmail.com",
        status: "Medicated",
        age: 65,
    },
];


export const userColumnsDoctors = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "doctorsName",
        headerName: "Doctors Name",
        width: 230,
        renderCell: (params) => {
            return (
                <div className={styles["cellWithImg"]}>
                    {params.row.doctorsName}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },

    {
        field: "associatedHospital",
        headerName: "Associated Hospital",
        width: 200,
    },
    {
        field: "status",
        headerName: "Specialization Status",
        width: 180,
        renderCell: (params) => {
            return (
                <div className={`${styles.cellWithStatus} ${styles[params.row.status]}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

//temporary data
export const userRowsDoctors = [
    {
        id: 1,
        doctorsName: "Snow",
        status: "specialized",
        email: "1snow@gmail.com",
        associatedHospital: "ABC",
    },
    {
        id: 2,
        doctorsName: "Jamie Lannister",
        email: "2snow@gmail.com",
        status: "not-specialized",
        associatedHospital: "ABC",
    },
    {
        id: 3,
        doctorsName: "Lannister",
        email: "3snow@gmail.com",
        status: "specialized",
        associatedHospital: "ABC",
    },
    {
        id: 4,
        doctorsName: "Stark",
        email: "4snow@gmail.com",
        status: "not-specialized",
        associatedHospital: "ABC",
    },
    {
        id: 5,
        doctorsName: "Targaryen",
        email: "5snow@gmail.com",
        status: "specialized",
        associatedHospital: "JKL",
    },
    {
        id: 6,
        doctorsName: "Melisandre",
        email: "6snow@gmail.com",
        status: "specialized",
        associatedHospital: "JKL",
    },
    {
        id: 7,
        doctorsName: "Clifford",
        email: "7snow@gmail.com",
        status: "not-specialized",
        associatedHospital: "XYZ",
    },
    {
        id: 8,
        doctorsName: "Frances",
        email: "8snow@gmail.com",
        status: "specialized",
        associatedHospital: "XYZ",
    },
    {
        id: 9,
        doctorsName: "Roxie",
        email: "snow@gmail.com",
        status: "specialized",
        associatedHospital: "XYZ"
    },
    {
        id: 10,
        doctorsName: "Roxie",
        email: "snow@gmail.com",
        status: "specialized",
        associatedHospital: "XYZ",
    },
];



export const userColumnsHospitals = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "hospitalName",
        headerName: "Hospital Name",
        width: 150,
        renderCell: (params) => {
            return (
                <div className={styles["cellWithImg"]}>
                    {params.row.hospitalName}
                </div>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        width: 230,
    },
    {
        field: "registrationNumber",
        headerName: "Registration Number",
        width: 170,
    },
    {
        field: "address",
        headerName: "Address",
        width: 190,
    },
    {
        field: "status",
        headerName: "Specialization Status",
        width: 180,
        renderCell: (params) => {
            return (
                <div className={`${styles.cellWithStatus} ${styles[params.row.status]}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

export const userRowsHospitals = [
    {
        id: 1,
        hospitalName: "ABC",
        status: "specialized",
        email: "1snow@gmail.com",
        contact: "+91 6518948617",
        address: "Jharkhand"
    },

    {
        id: 2,
        hospitalName: "XYZ",
        email: "5snow@gmail.com",
        status: "not-specialized",
        contact: "+91 7519998617",
        address: "Bihar"
    },

    {
        id: 3,
        hospitalName: "JKL",
        email: "snow@gmail.com",
        status: "specialized",
        contact: "+91 9518757617",
        address: "Madhya Pradesh"
    },
];