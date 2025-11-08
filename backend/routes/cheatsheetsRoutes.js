import express from "express";
import {
  getAllCheatsheets,
  getCheatsheetById,
  getCheatsheetsByTitle,
  addCheatsheet,
  updateCheatsheet,
  deleteCheatsheet,
} from "../controllers/cheatsheetsController.js";

const router = express.Router();

router.get("/", getAllCheatsheets);
router.get("/:id", getCheatsheetById);
router.get("/title/:title", getCheatsheetsByTitle);
router.post("/", addCheatsheet);
router.put("/:id", updateCheatsheet);
router.delete("/:id", deleteCheatsheet);

export default router;
