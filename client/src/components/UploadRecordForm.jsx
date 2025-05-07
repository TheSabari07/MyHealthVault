import { useState } from "react";
import axios from "axios";
import "../style/UploadRecordForm.css";

function UploadRecordForm({ onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFiles([...e.target.files]);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await axios.post("http://localhost:5004/api/records/upload-multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        setMessage("Files uploaded successfully.");
        setFiles([]);
        setTitle("");
        setDescription("");
        if (onUploadSuccess) onUploadSuccess(); 
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload error.");
    }
  };

  return (
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
      {message && <p>{message}</p>}
    </form>
  );
}

export default UploadRecordForm;
