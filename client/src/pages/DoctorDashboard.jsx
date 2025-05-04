import React, { useState, useEffect } from "react";
import axios from "axios";
import RecordCard from "../components/RecordCard.jsx";
import RequestAccessForm from "../components/RequestAccessForm.jsx"; // Import the form
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

  const handleGrantAccess = async (recordId) => {
    try {
      const userId = "6635eae898ddab4c48d6baf1"; // replace with real userId
      await axios.post("http://localhost:5004/api/permissions/grant-permission", {
        recordId,
        userId,
        role: "doctor",
      });
      fetchRecords();
    } catch (error) {
      console.error("Error granting access:", error);
    }
  };

  const handleRevokeAccess = async (recordId) => {
    try {
      const userId = "6635eae898ddab4c48d6baf1"; // replace with real userId
      await axios.post("http://localhost:5004/api/permissions/revoke-permission", {
        recordId,
        userId,
      });
      fetchRecords();
    } catch (error) {
      console.error("Error revoking access:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Doctor Dashboard</h1>

        <button onClick={() => setIsRequesting(!isRequesting)}>
          {isRequesting ? "Cancel Request" : "Request Access to Patient Records"}
        </button>

        {isRequesting && <RequestAccessForm />}

        <div className="records">
          <h2>Records</h2>
          {records.length > 0 ? (
            records.map((record) => (
              <RecordCard
                key={record._id}
                record={record}
                onGrantAccess={handleGrantAccess}
                onRevokeAccess={handleRevokeAccess}
              />
            ))
          ) : (
            <p>No records available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
