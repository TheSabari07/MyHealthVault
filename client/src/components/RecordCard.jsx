function RecordCard({ record }) {
  return (
    <div className="record-card">
      <h3>{record.title}</h3>
      <p>{new Date(record.uploadedAt).toLocaleString()}</p>
      <p>{record.description}</p>
      <a href={`http://localhost:5004/${record.filePath}`} target="_blank" rel="noreferrer">
        <button>View Record</button>
      </a>
      <button>Manage Permissions</button>
    </div>
  );
}

export default RecordCard;