import express from "express";
import {
  getAllHandbooks,
  getHandbookById,
  getHandbooksByTitle,
  addHandbook,
  updateHandbook,
  deleteHandbook,
} from "../controllers/handbooksController.js";

const router = express.Router();

router.get("/", getAllHandbooks);
router.get("/:id", getHandbookById);
router.get("/title/:title", getHandbooksByTitle);
router.post("/", addHandbook);
router.put("/:id", updateHandbook);
router.delete("/:id", deleteHandbook);

export default router;
