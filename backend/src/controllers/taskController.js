import Task from "../models/Task.js";
import logActivity from "../utils/logActivity.js";


// CREATE TASK
export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      projectId,
    } = req.body;

    if (!projectId) {
      res.status(400);
      throw new Error("Project ID required");
    }

    const task = await Task.create({
      title,
      description,
      priority,
      status,
      dueDate,
      assignedTo,
      projectId,
      createdBy: req.user._id,
    });

    await logActivity(
      req.user._id,
      projectId,
      `Created task "${title}"`
    );

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL TASKS
export const getTasks = async (req, res) => {
  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "title")
      .populate("createdBy", "name");

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE TASK
export const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title =
      req.body.title || task.title;

    task.description =
      req.body.description || task.description;

    task.priority =
      req.body.priority || task.priority;

    task.status =
      req.body.status || task.status;

    task.dueDate =
      req.body.dueDate || task.dueDate;

    task.assignedTo =
      req.body.assignedTo || task.assignedTo;

    const updatedTask = await task.save();

    await logActivity(
      req.user._id,
      task.projectId,
      `Updated task "${task.title}"`
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE TASK
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    await logActivity(
      req.user._id,
      task.projectId,
      `Deleted task "${task.title}"`
    );

    res.status(200).json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};