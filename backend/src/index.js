import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/index.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:3000", "https://mern-todo-app-rouge.vercel.app", "https://mern-full-stack-todo.vercel.app"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Mount Todo routes
app.use("/api/v1/todos", todoRoutes);


// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost: ${process.env.PORT}`);
});
