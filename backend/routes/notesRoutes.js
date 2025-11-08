import express from "express";
import {
  getAllNotes,
  getNoteById,
  getNotesByCategory,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.get("/category/:category", getNotesByCategory);
router.post("/", addNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
