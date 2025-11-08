import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import "./Tutorial.css";

const Tutorial = () => {
  const [tutorials, setTutorials] = useState([]);
  const [role, setRole] = useState("student"); // "student" | "admin"
  const [newTutorial, setNewTutorial] = useState({
    title: "",
    description: "",
    category: "",
    color: "#3498db",
  });
  const [editTutorial, setEditTutorial] = useState(null);

  // ✅ Fetch all tutorials
  const fetchTutorials = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/tutorials");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.tutorials || [];
      setTutorials(data);
    } catch (err) {
      console.error("❌ Fetch tutorials error:", err);
      alert("Failed to fetch tutorials. Please check the backend server.");
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  // ✅ Add tutorial
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const { title, description, category } = newTutorial;
      if (!title || !description || !category) {
        return alert("Please fill all fields!");
      }

      await axios.post("http://localhost:4000/api/tutorials", newTutorial);
      alert("✅ Tutorial added successfully!");
      setNewTutorial({
        title: "",
        description: "",
        category: "",
        color: "#3498db",
      });
      fetchTutorials();
    } catch (err) {
      console.error("❌ Error adding tutorial:", err);
      alert("Failed to add tutorial.");
    }
  };

  // ✅ Delete tutorial
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tutorial?")) return;
  
    try {
      const res = await axios.delete(`http://localhost:4000/api/tutorials/${id}`);
      alert(res.data.message || "🗑️ Tutorial deleted successfully!");
      fetchTutorials(); // ✅ Refresh the tutorials list after deletion
    } catch (err) {
      console.error("Delete tutorial error:", err);
      alert("Failed to delete tutorial.");
    }
  };
  

  // ✅ Update tutorial
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/api/tutorials/${editTutorial._id}`,
        editTutorial
      );
      alert("✅ Tutorial updated successfully!");
      setEditTutorial(null);
      fetchTutorials();
    } catch (err) {
      console.error("❌ Error updating tutorial:", err);
      alert("Failed to update tutorial.");
    }
  };

  return (
    <div className="tutorials-container">
      <h1 className="tutorials-title">Programming Tutorials</h1>

      {/* 🔘 Role Switcher */}
      <div className="role-switcher">
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* 🧑‍💼 Add Tutorial (Admin Only) */}
      {role === "admin" && !editTutorial && (
        <form className="add-form" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={newTutorial.title}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newTutorial.category}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, category: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Description"
            value={newTutorial.description}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, description: e.target.value })
            }
            required
          />
          <input
            type="color"
            value={newTutorial.color}
            onChange={(e) =>
              setNewTutorial({ ...newTutorial, color: e.target.value })
            }
          />
          <button type="submit" className="submit-btn">
            Add Tutorial
          </button>
        </form>
      )}

      {/* ✏️ Edit Tutorial Form */}
      {editTutorial && role === "admin" && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={editTutorial.title}
            onChange={(e) =>
              setEditTutorial({ ...editTutorial, title: e.target.value })
            }
            required
          />
          <textarea
            value={editTutorial.description}
            onChange={(e) =>
              setEditTutorial({
                ...editTutorial,
                description: e.target.value,
              })
            }
            required
          />
          <input
            type="color"
            value={editTutorial.color}
            onChange={(e) =>
              setEditTutorial({ ...editTutorial, color: e.target.value })
            }
          />
          <div className="edit-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditTutorial(null)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* 📚 Tutorials Grid */}
      <div className="tutorials-grid">
        {tutorials.length > 0 ? (
          tutorials.map((tutorial) => (
            <div
              key={tutorial._id}
              className="tutorial-card"
              style={{
                borderTop: `5px solid ${tutorial.color || "#ccc"}`,
              }}
            >
              <div className="tutorial-header">
                <h2 className="tutorial-card-title">{tutorial.title}</h2>
              </div>
              <p className="tutorial-description">{tutorial.description}</p>

              <button className="start-learning-btn">
                <FaPlay className="btn-icon" /> Start Learning!
              </button>

              {role === "admin" && (
                <div className="admin-controls">
                  <button onClick={() => setEditTutorial(tutorial)}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => handleDelete(tutorial._id)}>
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-tutorials">No tutorials found.</p>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
