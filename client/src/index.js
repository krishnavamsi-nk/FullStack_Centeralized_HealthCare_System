import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.getElementById("root"));


const baseUrl = process.env.REACT_APP_API_URL;
console.log('Base URL:', baseUrl); // Logs the base URL on app startup

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <React.Suspense fallback={<p>Loading...</p>}>
                            <App />
                        </React.Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    </Provider>
);
