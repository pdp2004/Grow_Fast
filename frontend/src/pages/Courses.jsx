import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Mock role (change to "student" or "admin")
  const [role, setRole] = useState("student"); // default student

  // ✅ Form states
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [editCourse, setEditCourse] = useState(null); // currently editing course

  // ✅ Fetch all courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ✅ Add new course (Admin only)
  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!newCourse.title || !newCourse.description || !newCourse.category) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/courses", newCourse);
      alert(res.data.message);
      setNewCourse({ title: "", description: "", category: "" });
      fetchCourses();
    } catch (err) {
      console.error("Add course error:", err);
      alert("Failed to add course.");
    }
  };

  // ✅ Delete course (Admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await axios.delete(`http://localhost:4000/api/courses/${id}`);
      alert(res.data.message);
      fetchCourses();
    } catch (err) {
      console.error("Delete course error:", err);
      alert("Failed to delete course.");
    }
  };

  // ✅ Enable edit mode
  const handleEdit = (course) => {
    setEditCourse(course);
  };

  // ✅ Update course (Admin only)
  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    if (!editCourse.title || !editCourse.description || !editCourse.category) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4000/api/courses/${editCourse.id}`,
        editCourse
      );
      alert(res.data.message);
      setEditCourse(null);
      fetchCourses();
    } catch (err) {
      console.error("Update course error:", err);
      alert("Failed to update course.");
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="courses-container">
      <h1 className="page-title">Premium Courses</h1>

      {/* ✅ Role Selector for Demo (can be replaced by login role) */}
      <div className="role-switcher">
        <label>Current Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* ✅ Admin Only: Add Course Form */}
      {role === "admin" && (
        <div className="add-course-form">
          <h2>Add New Course</h2>
          <form onSubmit={handleAddCourse}>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            />
            <textarea
              placeholder="Course Description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              placeholder="Course Category"
              value={newCourse.category}
              onChange={(e) =>
                setNewCourse({ ...newCourse, category: e.target.value })
              }
            />
            <button type="submit" className="add-btn">
              ➕ Add Course
            </button>
          </form>
        </div>
      )}

      {/* ✅ Admin Only: Edit Course */}
      {role === "admin" && editCourse && (
        <div className="edit-course-form">
          <h2>Edit Course</h2>
          <form onSubmit={handleUpdateCourse}>
            <input
              type="text"
              value={editCourse.title}
              onChange={(e) =>
                setEditCourse({ ...editCourse, title: e.target.value })
              }
            />
            <textarea
              value={editCourse.description}
              onChange={(e) =>
                setEditCourse({ ...editCourse, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              value={editCourse.category}
              onChange={(e) =>
                setEditCourse({ ...editCourse, category: e.target.value })
              }
            />
            <div className="edit-buttons">
              <button type="submit" className="update-btn">
                ✅ Update
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditCourse(null)}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ✅ Display All Courses */}
      {courses.length === 0 ? (
        <p className="no-courses">No courses available.</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <img
                  src={course.image || "/default-course.jpg"}
                  alt={course.title}
                  className="course-img"
                />
              </div>

              <div className="course-body">
                <h3>{course.title.substring(0, 35)}</h3>
                <p>{course.description.substring(0, 70)}</p>

                {/* ✅ Role-based Actions */}
                {role === "admin" ? (
                  <div className="course-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(course)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(course.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ) : (
                  <button className="view-btn">View Course</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
