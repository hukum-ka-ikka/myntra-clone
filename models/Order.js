import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
