const Project = require("../Models/ProjectDetails");
const responseHandler = require("../library/responseTemplate");

exports.createProjectDetails = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const { _id } = req.body;
    let project;

    if (_id) {
      project = await Project.findById(_id);

      if (project) {
        // If project exists, update it
        project = await Project.findByIdAndUpdate(_id, req.body, { new: true });
        return res.json(
          responseHandler(1, 200, "Project updated successfully", project)
        );
      }
    }
    // If no ID is provided or the project doesn't exist, create a new one
    project = new Project(req.body);
    await project.save();
    res.json(responseHandler(1, 200, "Project created successfully", project));
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.getAllProjectDetails = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const projects = await Project.find();
    if (projects.length === 0) {
      return res
        .status(404)
        .json(responseHandler(0, 404, "No projects found."));
    }
    res.json(
      responseHandler(1, 200, "projects retrieved successfully", projects)
    );
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error", error.message));
  }
};

exports.deleteProjects = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    const { id } = req.params;
    const result = await Project.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.json(
        responseHandler(0, 404, "No Project found with the give id.")
      );
    }
    res.json(responseHandler(1, 200, "Project deleted successfully", id));
  } catch (error) {
    res.json(responseHandler(0, 500, "Internal server error.", error.message));
  }
};
