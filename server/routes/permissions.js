import express from "express";
import Permission from "../models/Permission.js";
import Record from "../models/Record.js";

const router = express.Router();


router.post("/grant-permission", async (req, res) => {
  const { recordId, userId, role } = req.body;

  try {
  
    const record = await Record.findById(recordId);
    if (!record) {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    
    const permission = await Permission.findOneAndUpdate(
      { recordId, userId },
      { accessGranted: true, role },
      { upsert: true, new: true }
    );

    res.json({ success: true, message: "Access granted successfully.", permission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/revoke-permission", async (req, res) => {
  const { recordId, userId } = req.body;

  try {
    
    await Permission.findOneAndDelete({ recordId, userId });
    res.json({ success: true, message: "Access revoked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
