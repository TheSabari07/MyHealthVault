import { useState } from "react";
import axios from "axios";
import "../style/UploadRecordForm.css";

function UploadRecordForm() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [fileURLs, setFileURLs] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:5004/api/records/upload-multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, 
      });

      console.log('Response:', response.data); // Log response data

      if (response.data.success) {
        setMessage("Files uploaded successfully.");
        setFileURLs(response.data.records.map((rec) => `http://localhost:5004/${rec.filePath}`));
        fetchFiles(); // Re-fetch the records after upload
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error('Error:', error);  // Log error
      setMessage("Upload error.");
    }
  };

  // Fetch files after upload to show them immediately
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5004/api/records/patient");
      setFileURLs(response.data.records.map((rec) => `http://localhost:5004/${rec.filePath}`));
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Upload Files:
          <input type="file" multiple onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>

      {message && <p>{message}</p>}
      {fileURLs.length > 0 && (
        <ul>
          {fileURLs.map((url, index) => (
            <li key={index}>
              <a href={url} target="_blank" rel="noreferrer">
                View File {index + 1}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UploadRecordForm;
