import React, { useState, useEffect } from "react";
import axios from "axios";
import RecordDoc from "../components/RecordDoc.jsx";
import RequestAccessForm from "../components/RequestAccessForm.jsx";
import "../style/DoctorDashboard.css";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5004/api/records/doctor");
      setRecords(response.data.records); 
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Doctor Dashboard</h1>

        <button onClick={() => setIsRequesting(!isRequesting)}>
          {isRequesting ? "Cancel Request" : "Request Access to Patient Records"}
        </button>

        {isRequesting && (
          <RequestAccessForm
            onRequestSuccess={() => {
              setIsRequesting(false);
              alert("Access request sent to patient.");
            }}
          />
        )}

        <div className="records">
          <h2>Accessible Records</h2>
          {records.length > 0 ? (
            records.map((record) => (
              <RecordDoc key={record._id} record={record} />
            ))
          ) : (
            <p>No accessible records yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
