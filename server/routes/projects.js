const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Project = require("../models/Project");

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, type, budget, location, startDate, endDate } =
      req.body;

    const newProject = new Project({
      name,
      description,
      type,
      budget,
      location,
      startDate,
      endDate,
      manager: req.user.id,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/projects
// @desc    Get all projects for the logged-in user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ manager: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    // Ensure the user owns this project
    if (project.manager.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
