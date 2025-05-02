import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

router.post("/register", (req, res) => {
  console.log("Received register request:", req.body);
  res.send("Register route hit");
});

export default router;
