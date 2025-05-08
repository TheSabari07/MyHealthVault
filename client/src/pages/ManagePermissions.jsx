import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/ManagePermissions.css";

function ManagePermissions() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5004/api/permissions/requests", {
        headers: { "x-user-id": "6635eae898ddab4c48d6baf1" }, // Replace with actual user ID
      });
      setRequests(res.data.requests);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Error fetching requests. Please try again later.");
    }
  };

  const handleApprove = async (requestId) => {
    try {
      const response = await axios.post(
        "http://localhost:5004/api/permissions/approve-request",
        { requestId }
      );
      if (response.data.success) {
        // Update the approved request's status in state
        setRequests(prev =>
          prev.map(req =>
            req._id === requestId ? { ...req, status: "approved" } : req
          )
        );
      } else {
        setError("Failed to approve request.");
      }
    } catch (err) {
      console.error("Error approving request", err);
      setError("Error approving request. Please try again later.");
    }
  };

  const handleRevoke = async (requestId) => {
    try {
      const response = await axios.post(
        "http://localhost:5004/api/permissions/revoke",
        { requestId }
      );
      if (response.data.success) {
        // Remove the revoked request from state
        setRequests(prev => prev.filter(req => req._id !== requestId));
      } else {
        setError("Failed to revoke permission.");
      }
    } catch (err) {
      console.error("Error revoking permission", err);
      setError("Error revoking permission. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Manage Doctor Access Requests</h1>
        {error && <p className="error-message">{error}</p>}
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="record-card">
              <h3>{req.recordTitle}</h3>
              <p>Doctor: {req.doctorEmail}</p>
              <p>Status: {req.status}</p>
              {req.status === "pending" ? (
                <button onClick={() => handleApprove(req._id)} className="approve-btn">
                  Approve
                </button>
              ) : (
                <button onClick={() => handleRevoke(req._id)} className="revoke-btn">
                  Revoke
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManagePermissions;
