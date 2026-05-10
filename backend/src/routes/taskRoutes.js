import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";


import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/")
  .post(protect, adminOnly, createTask)
  .get(protect, getTasks);

router.route("/:id")
  .put(protect, updateTask)
  .delete(protect, adminOnly, deleteTask);

export default router; 