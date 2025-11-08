import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Note.css";

const Handbook = () => {
  const [handbooks, setHandbooks] = useState([]);
  const [role, setRole] = useState("student");
  const [newHandbook, setNewHandbook] = useState({
    title: "",
    description: "",
    fileUrl: "",
    fileName: "",
    buttonText: "Download",
  });
  const [editHandbook, setEditHandbook] = useState(null);

  // ✅ Fetch all handbooks
  const fetchHandbooks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/handbooks");
      // const data = Array.isArray(res.data) ? res.data : res.data.handbooks || [];
      setHandbooks(res.data.Handbooks);
    } catch (err) {
      console.error("❌ Fetch handbooks error:", err);
      alert("Failed to fetch handbooks. Please check the backend server.");
    }
  };

  useEffect(() => {
    fetchHandbooks();
  }, []);

  // ✅ Add handbook
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, description, fileUrl, fileName } = newHandbook;
      if (!title || !description || !fileUrl || !fileName) {
        return alert("Please fill all fields!");
      }

      await axios.post("http://localhost:4000/api/handbooks", newHandbook);
      alert("✅ Handbook added successfully!");
      setNewHandbook({
        title: "",
        description: "",
        fileUrl: "",
        fileName: "",
        buttonText: "Download",
      });
      fetchHandbooks();
    } catch (err) {
      console.error("❌ Error adding handbook:", err);
      alert("Failed to add handbook.");
    }
  };

  // ✅ Delete handbook
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this handbook?")) return;

    try {
      const res = await axios.delete(`http://localhost:4000/api/handbooks/${id}`);
      alert(res.data.message || "🗑️ Handbook deleted successfully!");
      fetchHandbooks();
    } catch (err) {
      console.error("Delete handbook error:", err);
      alert("Failed to delete handbook.");
    }
  };

  // ✅ Update handbook
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/api/handbooks/${editHandbook.id}`, editHandbook);
      alert("✅ Handbook updated successfully!");
      setEditHandbook(null);
      fetchHandbooks();
    } catch (err) {
      console.error("❌ Error updating handbook:", err);
      alert("Failed to update handbook.");
    }
  };

  // ✅ Download handbook
  const handleDownload = (book) => {
    const link = document.createElement("a");
    link.href = book.fileUrl;
    link.download = book.fileName;
    link.click();
  };

  return (
    <div className="notes-container">
      <h1 className="notes-title">📚 Handbooks</h1>

      <div className="role-switcher">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {role === "admin" && !editHandbook && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={newHandbook.title}
            onChange={(e) => setNewHandbook({ ...newHandbook, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={newHandbook.description}
            onChange={(e) => setNewHandbook({ ...newHandbook, description: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="File URL"
            value={newHandbook.fileUrl}
            onChange={(e) => setNewHandbook({ ...newHandbook, fileUrl: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="File Name"
            value={newHandbook.fileName}
            onChange={(e) => setNewHandbook({ ...newHandbook, fileName: e.target.value })}
            required
          />
          <button type="submit" className="submit-btn">Add Handbook</button>
        </form>
      )}

      {editHandbook && role === "admin" && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={editHandbook.title}
            onChange={(e) => setEditHandbook({ ...editHandbook, title: e.target.value })}
            required
          />
          <textarea
            value={editHandbook.description}
            onChange={(e) => setEditHandbook({ ...editHandbook, description: e.target.value })}
            required
          />
          <input
            type="text"
            value={editHandbook.fileUrl}
            onChange={(e) => setEditHandbook({ ...editHandbook, fileUrl: e.target.value })}
            required
          />
          <input
            type="text"
            value={editHandbook.fileName}
            onChange={(e) => setEditHandbook({ ...editHandbook, fileName: e.target.value })}
            required
          />
          <div className="edit-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditHandbook(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="notes-grid">
        {handbooks.length > 0 ? (
          handbooks.map((book) => (
            <div key={book.id} className="note-card">
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <button className="download-btn" onClick={() => handleDownload(book)}>
                📥 {book.buttonText}
              </button>

              {role === "admin" && (
                <div className="admin-controls">
                  <button onClick={() => setEditHandbook(book)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(book.id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No handbooks found.</p>
        )}
      </div>
    </div>
  );
};

export default Handbook;
