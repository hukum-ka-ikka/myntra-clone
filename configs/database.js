"use server";

import mongoose from "mongoose";

export const dbConnect = async () => {
  console.log("Checking if already connected to database.....");
  if (mongoose.connection?.readyState >= 1) return;
  console.log("Connecting to database....");

  try {
    await mongoose.connect(process.env.DATABASE_URL);
  } catch (error) {
    console.log(error?.message);
    return;
  }
};
