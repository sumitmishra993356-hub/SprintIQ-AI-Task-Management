import Activity from "../models/Activity.js";

const logActivity = async (userId, projectId, action) => {
  try {
    await Activity.create({
      userId,
      projectId,
      action,
    });
  } catch (error) {
    console.log("Activity Log Error:", error.message);
  }
};

export default logActivity;