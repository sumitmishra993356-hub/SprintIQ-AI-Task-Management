import Project from "../models/Project.js";


// CREATE PROJECT
export const createProject = async (req, res) => {
  try {

    const { title, description, status } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Project title is required");
    }

    const project = await Project.create({
      title,
      description,
      status,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("members", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title =
      req.body.title || project.title;

    project.description =
      req.body.description || project.description;

    project.status =
      req.body.status || project.status;

    const updatedProject = await project.save();

    res.status(200).json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};