import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Note.css";

const Cheatsheet = () => {
  const [cheatsheets, setCheatsheets] = useState([]);
  const [role, setRole] = useState("student");
  const [newSheet, setNewSheet] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileName: "",
    buttonText: "Download",
  });
  const [editSheet, setEditSheet] = useState(null);

  const fetchCheatsheets = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/cheatsheets");
      setCheatsheets(res.data.Cheatsheets);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Failed to fetch cheatsheets.");
    }
  };

  useEffect(() => {
    fetchCheatsheets();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, description, fileUrl, fileName } = newSheet;
      if (!title || !description || !fileUrl || !fileName) {
        return alert("Please fill all fields!");
      }
      await axios.post("http://localhost:4000/api/cheatsheets", newSheet);
      alert("✅ Cheatsheet added!");
      setNewSheet({ title: "", description: "", fileUrl: "", fileName: "", buttonText: "Download" });
      fetchCheatsheets();
    } catch (err) {
      console.error("❌ Add error:", err);
      alert("Failed to add cheatsheet.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this cheatsheet?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/cheatsheets/${id}`);
      alert("🗑️ Cheatsheet deleted!");
      fetchCheatsheets();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/cheatsheets/${editSheet.id}`, editSheet);
      alert("✅ Updated successfully!");
      setEditSheet(null);
      fetchCheatsheets();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDownload = (sheet) => {
    const link = document.createElement("a");
    link.href = sheet.fileUrl;
    link.download = sheet.fileName;
    link.click();
  };

  return (
    <div className="notes-container">
      <h1 className="notes-title">📑 Cheatsheets</h1>

      <div className="role-switcher">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role === "admin" && !editSheet && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={newSheet.title}
            onChange={(e) => setNewSheet({ ...newSheet, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newSheet.description}
            onChange={(e) => setNewSheet({ ...newSheet, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="File URL"
            value={newSheet.fileUrl}
            onChange={(e) => setNewSheet({ ...newSheet, fileUrl: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="File Name"
            value={newSheet.fileName}
            onChange={(e) => setNewSheet({ ...newSheet, fileName: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">Add Cheatsheet</button>
        </form>
      )}

      {editSheet && role === "admin" && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={editSheet.title}
            onChange={(e) => setEditSheet({ ...editSheet, title: e.target.value })}
            required
          />
          <textarea
            value={editSheet.description}
            onChange={(e) => setEditSheet({ ...editSheet, description: e.target.value })}
            required
          />
          <input
            type="text"
            value={editSheet.fileUrl}
            onChange={(e) => setEditSheet({ ...editSheet, fileUrl: e.target.value })}
            required
          />
          <input
            type="text"
            value={editSheet.fileName}
            onChange={(e) => setEditSheet({ ...editSheet, fileName: e.target.value })}
            required
          />
          <div className="edit-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditSheet(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="notes-grid">
        {cheatsheets.length > 0 ? (
          cheatsheets.map((sheet) => (
            <div key={sheet.id} className="note-card">
              <h2>{sheet.title}</h2>
              <p>{sheet.description}</p>
              <button className="download-btn" onClick={() => handleDownload(sheet)}>
                📥 {sheet.buttonText}
              </button>
              {role === "admin" && (
                <div className="admin-controls">
                  <button onClick={() => setEditSheet(sheet)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(sheet.id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No cheatsheets found.</p>
        )}
      </div>
    </div>
  );
};

export default Cheatsheet;
