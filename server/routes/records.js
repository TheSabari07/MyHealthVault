import express from "express";
import multer from "multer";
import path from "path";
import Record from "../models/Record.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

//  (replace with real auth)
const mockAuth = (req, res, next) => {
  // Extract and verify JWT, then set req.user
};


router.post("/upload-multiple",  upload.array("files", 10), async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files;
    const patientId = req.user.id;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const records = await Promise.all(
      files.map((file) => {
        const newRecord = new Record({
          patientId,
          title,
          description,
          filePath: file.path,
        });
        return newRecord.save();
      })
    );

    res.json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/patient",  async (req, res) => {
  try {
    const patientId = req.user.id;
    const records = await Record.find({ patientId });
    res.json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default  router;