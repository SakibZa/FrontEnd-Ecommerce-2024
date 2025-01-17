import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

const ProtectedRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    console.log("auth token", auth?.token);

    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await fetch("https://e-commerce-2024-2.onrender.com/api/v1/auth/protected", {
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
    return ok ? <Outlet /> : <Spinner/>;
};

export default ProtectedRoute;
