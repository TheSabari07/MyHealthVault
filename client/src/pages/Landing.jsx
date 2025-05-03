import React from 'react';
import { Link } from "react-router-dom";
import "../style/Landing.css";


function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Decentralized Healthcare Records</h1>
        <p className="landing-description">
          Own, manage, and control your health data securely and easily.
        </p>
        <div className="landing-buttons">
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-outline">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
