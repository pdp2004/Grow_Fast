import express from "express";
import {
  getAllCourses,
  getCourseById,
  getCoursesByCategory,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/category/:category", getCoursesByCategory);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
