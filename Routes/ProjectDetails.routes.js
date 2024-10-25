// routes/authRoutes.js
const express = require("express");
const { createProjectDetails, getAllProjectDetails, deleteProjects } = require("../Controllers/ProjectDetails.Controller");
const router = express.Router();

router.post("/createProjectDetails", createProjectDetails);
router.get("/getProjectDetails", getAllProjectDetails);
router.delete("/deleteProfiles/:id", deleteProjects);

module.exports = router;
