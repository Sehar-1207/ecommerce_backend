import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, default: "Shipping Address" },
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Address || mongoose.model("Address", addressSchema);