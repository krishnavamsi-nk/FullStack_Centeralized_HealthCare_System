import React from 'react'
import { CircularProgress } from '@mui/material';
const FetchLoader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress color="primary" />
        </div>
    )
}

export default FetchLoader