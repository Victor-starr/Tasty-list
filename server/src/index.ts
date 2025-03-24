import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import router from "./routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI || "";
const SESSION_SECRET = process.env.SESSION_SECRET || "mysecret";

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // frontend URL (default Vite port)
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
    },
  })
);
app.use(router);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB...");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB...", err);
  }
};
startServer();
