import axios from "axios";
const instance = axios.create({
    // baseURL: "http://localhost:5050",
    baseURL: `${process.env.REACT_APP_API_URL}`,
    // baseURL:"http://localhost:5050",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
