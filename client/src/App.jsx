import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login.jsx";
import Signup from './pages/Signup.jsx'
import PatientDashboard from './pages/Patient.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import ManagePermissions from "./pages/ManagePermissions";

function App() {
     
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Landing />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/dashboard" element={<PatientDashboard />} />
       <Route path ="/doctor-dashboard" element={<DoctorDashboard />} />
       <Route path="/manage-permissions" element={<ManagePermissions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;