import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecordCard({ record }) {
  const navigate = useNavigate();

  return (
    <div className="record-card">
      <h3>{record.title}</h3>
      <p>{new Date(record.uploadedAt).toLocaleString()}</p>
      <p>{record.description}</p>

      <a href={`http://localhost:5004/${record.filePath}`} target="_blank" rel="noreferrer">
        <button>View Record</button>
      </a>

      <button onClick={() => navigate("/manage-permissions")}>
        Manage Permissions
      </button>
    </div>
  );
}

export default RecordCard;
