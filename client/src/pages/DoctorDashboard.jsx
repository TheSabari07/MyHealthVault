import { React, useState, useEffect } from "react";
import RecordCard from "../components/RecordCard.jsx";
import RequestAccessForm from "../components/RequestAccessForm.jsx";
import "../style/DoctorDashboard.css";

// for later import { getApprovedRecords } from "../api";

function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  /* useEffect(() => {
    const fetchApprovedRecords = async () => {
      const data = await getApprovedRecords();  
      setRecords(data.records);
    };
    fetchApprovedRecords();
  }, []); */
  // api will be added later

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard">
        <h1>Doctor Dashboard</h1>

        <button onClick={() => setIsRequesting(!isRequesting)}>
          {isRequesting ? "Cancel Request" : "Request Access to Patient Records"}
        </button>

        {isRequesting && <RequestAccessForm />}

        <div className="records">
          <h2>Approved Records</h2>
          {records.length > 0 ? (
            records.map((record) => (
              <RecordCard key={record.id} record={record} />
            ))
          ) : (
            <p>No approved records available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
