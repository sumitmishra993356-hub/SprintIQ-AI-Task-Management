import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

export const getDashboardStats = async (req, res) => {
  try {

    // TOTAL PROJECTS
    const totalProjects = await Project.countDocuments();

    // TOTAL TASKS
    const totalTasks = await Task.countDocuments();

    // COMPLETED TASKS
    const completedTasks = await Task.countDocuments({
      status: "Done",
    });

    // PENDING TASKS
    const pendingTasks = await Task.countDocuments({
      status: {
        $ne: "Done",
      },
    });

    // OVERDUE TASKS
    const overdueTasks = await Task.countDocuments({
      dueDate: {
        $lt: new Date(),
      },
      status: {
        $ne: "Done",
      },
    });

    // PRODUCTIVITY SCORE
    const productivityScore =
      totalTasks === 0
        ? 0
        : Math.round(
            (completedTasks / totalTasks) * 100
          );

    // RECENT ACTIVITIES
    const recentActivities = await Activity.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      productivityScore,
      recentActivities,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};