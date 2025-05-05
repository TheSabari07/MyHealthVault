import express from "express";
import Permission from "../models/Permission.js";
import Record from "../models/Record.js";
import AccessRequest from "../models/AccessRequest.js";
import cors from "cors"; // Import CORS

const router = express.Router();

// Temporary mock authentication
const mockAuth = (req, res, next) => {
  req.user = { id: "6635fbbb98ddab4c48d6baff" }; // Mock user ID
  next();
};

// Enable CORS for your React app
router.use(cors());

// Approve a permission request
router.post("/approve-request", async (req, res) => {
  const { requestId, recordIds } = req.body;

  try {
    const request = await AccessRequest.findById(requestId);
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ success: false, message: "Request not found or already handled." });
    }

    request.status = 'approved';
    await request.save();

    const permissions = await Promise.all(
      recordIds.map(recordId =>
        Permission.findOneAndUpdate(
          { recordId, userId: request.doctorId },
          { accessGranted: true, role: 'doctor' },
          { upsert: true, new: true }
        )
      )
    );

    res.json({ success: true, message: "Access granted.", permissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Revoke permission
router.post("/revoke", async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await AccessRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    // Delete the permission related to the record and doctor
    await Permission.findOneAndDelete({ recordId: request.recordId, userId: request.doctorId });

    res.json({ success: true, message: "Access revoked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all requests for the current patient
router.get("/requests", mockAuth, async (req, res) => {
  try {
    const patientId = req.user.id;

    const patientRecords = await Record.find({ owner: patientId });
    const recordIds = patientRecords.map((r) => r._id);

    const requests = await AccessRequest.find({ recordId: { $in: recordIds } })
      .populate("doctorId", "email")
      .populate("recordId", "title");

    const formatted = requests.map((req) => ({
      _id: req._id,
      doctorEmail: req.doctorId.email,
      recordTitle: req.recordId.title,
    }));

    res.json({ requests: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
