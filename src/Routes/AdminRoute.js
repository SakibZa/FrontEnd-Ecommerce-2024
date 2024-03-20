import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    console.log("auth token", auth?.token);

    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await fetch("http://localhost:8000/api/v1/auth/admin-auth", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": auth?.token
                }
            });
            const result = await response.json();
            console.log("result", result);
            if (result.ok) {
                setOk(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            fetchData(); 
        }
    }, [auth?.token]);

    console.log("ok value", typeof(ok))
    return ok ? <Outlet /> : <Spinner path=''/>;
};

export default AdminRoute;
