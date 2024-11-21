import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import PageLoader from "./Loaders/PageLoader";

function Protected() {
  const location = useLocation();
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!user.isLoggedIn) {
      // navigate("/auth/patientslogin");
      navigate("/");
    } else {
      setLoading(false);
    }
  }, [user.isLoggedIn, navigate]);

  return loading ? <PageLoader /> : <Outlet />;
}

export default Protected;
