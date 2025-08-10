import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!PORT || !MONGO_URI || !FRONTEND_URL) {
  throw new Error("Missing required environment variables.");
}

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(router);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB...");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB...", err);
    process.exit(1);
  }
};

startServer();
