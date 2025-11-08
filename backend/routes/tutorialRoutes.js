import express from "express";
import {
  getAllTutorials,
  getTutorialById,
  getTutorialsByCategory,
  addTutorial,
  updateTutorial,
  deleteTutorial,
} from "../controllers/tutorialController.js";

const router = express.Router();

router.get("/", getAllTutorials);
router.get("/:id", getTutorialById);
router.get("/category/:category", getTutorialsByCategory);
router.post("/", addTutorial);
router.put("/:id", updateTutorial);
router.delete("/:id", deleteTutorial);

export default router;
