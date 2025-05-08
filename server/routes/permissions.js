import express from "express";
import Permission from "../models/Permission.js";
import Record from "../models/Record.js";
import AccessRequest from "../models/AccessRequest.js";
import cors from "cors";

const router = express.Router();


const mockAuth = (req, res, next) => {
  req.user = { id: req.headers['x-user-id'] || "6635eae898ddab4c48d6baf1" };
  next();
};

router.use(cors()); 


router.post("/approve-request", async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await AccessRequest.findById(requestId);
    if (!request || request.status !== 'pending') {
      return res.status(404).json({ success: false, message: "Request not found or already handled." });
    }

 
    request.status = 'approved';
    await request.save();

   
    const permission = await Permission.findOneAndUpdate(
      { recordId: request.recordId, userId: request.doctorId },
      { accessGranted: true, role: 'doctor' },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Access granted.", permission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/revoke", async (req, res) => {
  const { requestId } = req.body;

  try {
    const request = await AccessRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    
    await Permission.findOneAndDelete({ recordId: request.recordId, userId: request.doctorId });

    
    await AccessRequest.findByIdAndDelete(requestId);

    res.json({ success: true, message: "Access revoked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.get("/requests", mockAuth, async (req, res) => {
  try {
    const patientId = req.user.id;

    if (!patientId) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    
    const patientRecords = await Record.find({ patientId });

    if (!patientRecords.length) {
      return res.status(404).json({ message: "No records found for this patient" });
    }

    const recordIds = patientRecords.map((r) => r._id);

    const requests = await AccessRequest.find({ recordId: { $in: recordIds } })
      .populate("doctorId", "email")
      .populate("recordId", "title");

    if (!requests.length) {
      return res.status(404).json({ message: "No access requests found" });
    }

    const formatted = requests.map((req) => ({
      _id: req._id,
      doctorEmail: req.doctorId ? req.doctorId.email : "N/A",
      recordTitle: req.recordId ? req.recordId.title : "N/A",
      status: req.status
    }));

    res.json({ requests: formatted });
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/request-access", mockAuth, async (req, res) => {
  const { patientId, recordId } = req.body;

  try {
    const doctorId = req.user.id;

    const existing = await AccessRequest.findOne({
      doctorId,
      patientId,
      recordId,
      status: 'pending'
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "Request already pending" });
    }

    const newRequest = await AccessRequest.create({
      doctorId,
      patientId,
      recordId
    });

    res.status(201).json({ success: true, message: "Access request sent", request: newRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
