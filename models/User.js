import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  bag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bag",
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
