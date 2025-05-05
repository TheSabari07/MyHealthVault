import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/ManagePermissions.css"; // Import the CSS file

function ManagePermissions() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5004/api/permissions/requests");
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const recordIds = ["123456789"]; 
      await axios.post("http://localhost:5004/api/permissions/approve-request", { requestId, recordIds });
      fetchRequests();
    } catch (err) {
      console.error("Error approving request", err);
    }
  };

  const handleRevoke = async (requestId) => {
    try {
      await axios.post("http://localhost:5004/api/permissions/revoke", { requestId });
      fetchRequests();
    } catch (err) {
      console.error("Error revoking permission", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Manage Doctor Access Requests</h1>
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="record-card">
              <h3>{req.recordTitle}</h3>
              <p>Doctor: {req.doctorEmail}</p>
              <button onClick={() => handleApprove(req._id)} className="approve-btn">
                Approve
              </button>
              <button onClick={() => handleRevoke(req._id)} className="revoke-btn">
                Revoke
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManagePermissions;
