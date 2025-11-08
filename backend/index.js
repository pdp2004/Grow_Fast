import dotenv from "dotenv";
dotenv.config(); // ✅ Load environment variables first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courseRoutes.js"
import tutorialRoutes from "./routes/tutorialRoutes.js";
import progressRoutes from "./routes/progress.js";
import commentRoutes from "./routes/comments.js";
import notesRoutes from "./routes/notesRoutes.js";
import handbooksRoutes from "./routes/handbooksRoutes.js";
import cheatsheetsRoutes from "./routes/cheatsheetsRoutes.js";
// import seedData from "./seedData.js"; // ✅ Ensure default export

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// === Database Connection ===
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/growfast";

mongoose
.connect(mongoURI, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  
  // === Routes ===
  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/tutorials", tutorialRoutes);
  app.use("/api/progress", progressRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/notes", notesRoutes);
  app.use("/api/handbooks", handbooksRoutes);
  app.use("/api/cheatsheets", cheatsheetsRoutes);

// === Optional: Seed Route ===
// app.get("/api/seed", async (req, res) => {
//   try {
//     await seedData();
//     res.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     console.error("Seed Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// === Start Server ===
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
