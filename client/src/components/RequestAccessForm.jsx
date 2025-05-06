import React, { useState } from "react";
import axios from "axios";
import "../style/RequestAccessForm.css";

function RequestAccessForm() {
  const [patientId, setPatientId] = useState("");
  const [recordId, setRecordId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5004/api/permissions/request-access", {
        patientId,
        recordId,
      });

      if (response.data.success) {
        setMessage("Access request sent successfully!");
      } else {
        setMessage("Failed to send request.");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error sending request. Please try again."
      );
    }
  };

  return (
    <div className="request-access-form">
      <form onSubmit={handleSubmit}>
        <label>
          Patient ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            placeholder="Enter Patient ID"
          />
        </label>
        <label>
          Record ID:
          <input
            type="text"
            value={recordId}
            onChange={(e) => setRecordId(e.target.value)}
            placeholder="Enter Record ID"
          />
        </label>
        <button type="submit">Request Access</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RequestAccessForm;
