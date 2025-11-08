import courses from "../data/courses.js";

// ✅ Get all courses
export const getAllCourses = (req, res) => {
  res.json(courses);
};

// ✅ Get course by ID
export const getCourseById = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

// ✅ Get courses by category
export const getCoursesByCategory = (req, res) => {
  const categoryCourses = courses.filter(
    (c) => c.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(categoryCourses);
};

// ✅ Add a new course (POST)
export const addCourse = (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCourse = {
    id: courses.length ? courses[courses.length - 1].id + 1 : 1,
    title,
    description,
    category,
  };

  courses.push(newCourse);
  res.status(201).json({
    message: "Course added successfully",
    course: newCourse,
  });
};

// ✅ Update an existing course (PUT)
export const updateCourse = (req, res) => {
  const courseId = parseInt(req.params.id);
  const { title, description, category } = req.body;

  const courseIndex = courses.findIndex((c) => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  const updatedCourse = {
    ...courses[courseIndex],
    title: title || courses[courseIndex].title,
    description: description || courses[courseIndex].description,
    category: category || courses[courseIndex].category,
  };

  courses[courseIndex] = updatedCourse;

  res.json({
    message: "Course updated successfully",
    course: updatedCourse,
  });
};

// ✅ Delete a course (DELETE)
export const deleteCourse = (req, res) => {
  const courseId = parseInt(req.params.id);
  const index = courses.findIndex((c) => c.id === courseId);

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  const deletedCourse = courses.splice(index, 1);

  res.json({
    message: "Course deleted successfully",
    course: deletedCourse[0],
  });
};
