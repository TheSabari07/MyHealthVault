import React, { useState } from 'react';

function RecordCard({ record, onGrantAccess, onRevokeAccess }) {
  const [showPermissions, setShowPermissions] = useState(false);

  return (
    <div className="record-card">
      <h3>{record.title}</h3>
      <p>{new Date(record.uploadedAt).toLocaleString()}</p>
      <p>{record.description}</p>

      <a href={`http://localhost:5004/${record.filePath}`} target="_blank" rel="noreferrer">
        <button>View Record</button>
      </a>

      <button onClick={() => setShowPermissions(!showPermissions)}>
        {showPermissions ? 'Hide Permissions' : 'Manage Permissions'}
      </button>

      {showPermissions && (
        <div className="permission-buttons">
          <button onClick={() => onGrantAccess(record._id)}>Grant Access</button>
          <button onClick={() => onRevokeAccess(record._id)}>Revoke Access</button>
        </div>
      )}
    </div>
  );
}

export default RecordCard;
