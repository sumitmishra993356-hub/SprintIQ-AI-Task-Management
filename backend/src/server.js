import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import protect from "./middleware/authMiddleware.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { notFound, errorHandler,} from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";

dotenv.config();

// connectDB();
connectDB().catch(err => {
  console.error("DB Connection Failed:", err);
});

const app = express();

// app.use(cors());
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("API Running");
});
app.get("/api/test", protect, (req, res) => {
  res.json(req.user);
});

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Server running on port ${PORT}`);
});