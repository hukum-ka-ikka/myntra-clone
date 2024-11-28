import mongoose from "mongoose";
import { User } from "./User";

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
