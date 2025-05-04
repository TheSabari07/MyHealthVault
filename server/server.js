import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recordRoutes from "./routes/records.js"; 
import permissionRoutes from "./routes/permissions.js"; 
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3005",
  credentials: true
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/permissions", permissionRoutes); 

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
