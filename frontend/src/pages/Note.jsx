import React, { useEffect, useState } from "react";
import axios from "axios";
import Handbook from './Handbook';
import Cheatsheet from './Cheatsheet';
import "./Note.css";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [role, setRole] = useState("student"); // "student" | "admin"
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "",
    color: "#2ecc71",
  });
  const [editNote, setEditNote] = useState(null);

  // ✅ Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/notes");
      // const data = Array.isArray(res.data) ? res.data : res.data.notes || [];
      setNotes(res.data.Notes);
    } catch (err) {
      console.error("❌ Fetch notes error:", err);
      alert("Failed to fetch notes. Please check the backend server.");
    }
  };

  // console.log(notes);
  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Add note
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, content, category } = newNote;
      if (!title || !content || !category) {
        return alert("Please fill all fields!");
      }

      await axios.post("http://localhost:4000/api/notes", newNote);
      alert("✅ Note added successfully!");
      setNewNote({
        title: "",
        content: "",
        category: "",
        color: "#2ecc71",
      });
      fetchNotes();
    } catch (err) {
      console.error("❌ Error adding note:", err);
      alert("Failed to add note.");
    }
  };

  // ✅ Delete note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await axios.delete(`http://localhost:4000/api/notes/${id}`);
      alert(res.data.message || "🗑️ Note deleted successfully!");
      fetchNotes();
    } catch (err) {
      console.error("Delete note error:", err);
      alert("Failed to delete note.");
    }
  };

  // ✅ Update note
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/api/notes/${editNote.id}`,
        editNote
      );
      alert("✅ Note updated successfully!");
      setEditNote(null);
      fetchNotes();
    } catch (err) {
      console.error("❌ Error updating note:", err);
      alert("Failed to update note.");
    }
  };

  // ✅ Download note as text file
  const handleDownload = (note) => {
    const content = `📘 ${note.title}\n\nCategory: ${note.category}\n\n${note.content}`;
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${note.title.replace(/\s+/g, "_")}.txt`;
    link.click();
  };

  if(!notes) return;
  return (
    <div className="notes-container">
      <h1 className="notes-title">Study Notes</h1>

      {/* 🔘 Role Switcher */}
      <div className="role-switcher">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* 🧑‍💼 Add Note (Admin Only) */}
      {role === "admin" && !editNote && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) =>
              setNewNote({ ...newNote, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newNote.category}
            onChange={(e) =>
              setNewNote({ ...newNote, category: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Content"
            value={newNote.content}
            onChange={(e) =>
              setNewNote({ ...newNote, content: e.target.value })
            }
            required
          />
          <input
            type="color"
            value={newNote.color}
            onChange={(e) =>
              setNewNote({ ...newNote, color: e.target.value })
            }
          />
          <button type="submit" className="submit-btn">
            Add Note
          </button>
        </form>
      )}

      {/* ✏️ Edit Note Form */}
      {editNote && role === "admin" && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={editNote.title}
            onChange={(e) =>
              setEditNote({ ...editNote, title: e.target.value })
            }
            required
          />
          <textarea
            value={editNote.content}
            onChange={(e) =>
              setEditNote({ ...editNote, content: e.target.value })
            }
            required
          />
          <input
            type="color"
            value={editNote.color}
            onChange={(e) =>
              setEditNote({ ...editNote, color: e.target.value })
            }
          />
          <div className="edit-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditNote(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 📚 Notes Grid */}
      <div className="notes-grid">
        {/* {console.log(notes)} */}
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              style={{ borderTop: `5px solid ${note.color || "#ccc"}` }}
            >
              <div className="note-header">
                <h2 className="note-card-title">{note.title}</h2>
                <p className="note-category">{note.category}</p>
              </div>
              <p className="note-content">{note.content}</p>

              {/* 📥 Download button */}
              <button
                className="download-btn"
                onClick={() => handleDownload(note)}
              >
                📥 Download
              </button>

              {role === "admin" && (
                <div className="admin-controls">
                  <button onClick={() => setEditNote(note)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(note.id)}>🗑 Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-notes">No notes found.</p>
        )}
      </div>
      <Handbook/>
      <Cheatsheet/>
    </div>
  );
};

export default Note;
