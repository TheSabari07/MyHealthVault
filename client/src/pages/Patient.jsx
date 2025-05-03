import { React, useState, useEffect } from "react";
import axios from "axios";
import RecordCard from "../components/RecordCard";
import UploadRecordForm from "../components/UploadRecordForm";
import '../style/Patient.css';  


function PatientDashboard() {
  const [records, setRecords] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // will be replaced with original api
        const response = await axios.get("http://localhost:5004/api/records/patient");
        setRecords(response.data.records);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Patient Dashboard</h1>
        <button onClick={() => setIsUploading(!isUploading)}>
          {isUploading ? "Cancel Upload" : "Upload Medical Record"}
        </button>
        {isUploading && <UploadRecordForm />}
        <div className="records">
          <h2>Your Medical Records</h2>
          {records.length > 0 ? (
            records.map((record) => (
              <RecordCard key={record._id} record={record} />
            ))
          ) : (
            <p>No records available.</p>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default PatientDashboard;