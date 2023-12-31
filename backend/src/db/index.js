import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Define a function to establish a connection to the MongoDB database
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("MongoDB connected successfully");
  } catch {
    console.log("MongoDB connection error");
  }
};
