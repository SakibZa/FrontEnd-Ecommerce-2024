import React, { useEffect } from "react";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function Spinner({path = "login"}) {
  const navigate = useNavigate();

  const location = useLocation();

  console.log("loction path Name", location.pathname);

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  });
  return (
    <div className="Spinner">
      <div className="spinner-border m-5" role="status">
        <span className="visually-hidden">Loading....</span>
      </div>
      <h1>You are redirecting in {count} Seconds</h1>
    </div>
  );
}
