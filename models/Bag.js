import mongoose, { mongo } from "mongoose";

const bagSchema = new mongoose.Schema({
  products: [
    {
      type: Number,
      required: true,
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Bag = mongoose.models.Bag || mongoose.model("Bag", bagSchema);
