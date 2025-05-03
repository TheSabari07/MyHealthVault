import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/Login.css'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); // ⬅️ added

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5004/api/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      setMessage("Login successful!");

     
      if (role === "patient") {
        navigate("/dashboard");
      } else if (role === "doctor") {
        navigate("/doctor-dashboard"); 
      }

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Network error or server is not responding.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Login</button>

        {message && (
         <p className={`login-message ${message.includes("successful") ? "success" : "error"}`}>
          {message}
         </p>
        )}
        
      </form>
    </div>
  );
}

export default Login;
