import express from "express";
import multer from "multer";
import path from "path";
import Record from "../models/Record.js";
import Permission from "../models/Permission.js";
import AccessRequest from "../models/AccessRequest.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Temporary mock authentication
const mockAuth = (req, res, next) => {
  req.user = { id: "6635eae898ddab4c48d6baf1" }; // doctor ID for testing
  next();
};

// Upload route
router.post("/upload-multiple", mockAuth, upload.array("files", 10), async (req, res) => {
  try {
    const { title, description } = req.body;
    const patientId = req.user.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const records = await Promise.all(
      req.files.map((file) => {
        const newRecord = new Record({
          patientId,
          title,
          description,
          filePath: `uploads/${file.filename}`,
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

// Patient dashboard: show own records
router.get("/patient", mockAuth, async (req, res) => {
  try {
    const patientId = req.user.id;
    const records = await Record.find({ patientId });
    res.json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/doctor", mockAuth, async (req, res) => {
  try {
    const doctorId = req.user.id;

    const permissions = await Permission.find({ userId: doctorId, accessGranted: true });
    const recordIds = permissions.map((p) => p.recordId);
    const records = await Record.find({ _id: { $in: recordIds } });

    res.json({ success: true, records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/request-access", mockAuth, async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { patientId } = req.body;

    const existing = await AccessRequest.findOne({ doctorId, patientId, status: 'pending' });
    if (existing) {
      return res.status(400).json({ success: false, message: "Request already pending." });
    }

    const request = new AccessRequest({ doctorId, patientId });
    await request.save();

    res.json({ success: true, message: "Request sent successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/requests", mockAuth, async (req, res) => {
  try {
    const patientId = req.user.id;
    const requests = await AccessRequest.find({ patientId, status: 'pending' }).populate('doctorId', 'name email');
    res.json({ success: true, requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
