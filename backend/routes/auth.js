import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authorize } from "../middleware/auth.js"; // ✅ middleware to protect routes

const router = express.Router();

// ✅ Public routes
router.post("/register", register);
router.post("/login", login);

// ✅ Protected route - only accessible with a valid JWT
router.get("/me", authorize, getMe);

export default router;
