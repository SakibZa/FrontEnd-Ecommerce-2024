import React from "react";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="footer" >
      <h4 className="text-center"> All Right Reserved &copy; 2024</h4>
      <p className="text-center mt-3">
        <Link style={{borderRight : "1px solid white"}} to="/about">About</Link>
        <Link style={{borderRight : "1px solid white"}} to="/contact">Contact</Link>
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
}
