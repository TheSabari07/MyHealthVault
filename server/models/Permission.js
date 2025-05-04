import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  recordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Record', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['doctor', 'nurse', 'admin'], required: true },
  accessGranted: { type: Boolean, default: false }
});

export default mongoose.model("Permission", permissionSchema);
