import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/index.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());

// Connect to the database
connectDB();

// Mount Todo routes
app.use("/api/v1/todos", todoRoutes);


// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost: ${process.env.PORT}`);
});
