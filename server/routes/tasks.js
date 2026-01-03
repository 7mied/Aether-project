const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const Project = require("../models/Project");

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      project,
      parentTask,
      duration,
      estimates,
      dependencies,
      startDate,
      endDate,
    } = req.body;

    // 1. Verify Project Ownership
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (projectDoc.manager.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // 2. Create the Task
    const newTask = new Task({
      name,
      project,
      parentTask: parentTask || null,
      duration,
      estimates,
      dependencies,
      startDate,
      endDate,
      status: "Not Started",
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/tasks/project/:projectId
// @desc    Get all tasks for a specific project
// @access  Private
router.get("/project/:projectId", auth, async (req, res) => {
  try {
    // 1. Verify Project Ownership
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    if (project.manager.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // 2. Fetch Tasks (Sorted by creation or WBS index)
    const tasks = await Task.find({ project: req.params.projectId }).sort({
      createdAt: 1,
    });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task (status, dates, name)
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    // Check project ownership via the task's project ID
    const project = await Project.findById(task.project);
    if (project.manager.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update fields
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    const project = await Project.findById(task.project);
    if (project.manager.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
