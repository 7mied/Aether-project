const mongoose = require("mongoose");

// The Task Schema: The engine for WBS, Gantt, and Critical Path
const TaskSchema = new mongoose.Schema(
  {
    // 1. Identification
    name: {
      type: String,
      required: [true, "Please provide a task name"],
      trim: true,
    },
    description: String,
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    // 2. WBS Structure (Hierarchy)
    parentTask: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null, // If null, it's a top-level Phase or Activity
    },
    wbsIndex: String, // e.g., "1.2.1" for sorting

    // 3. PERT Estimation (The 3-Point Estimate)
    duration: {
      type: Number,
      required: true,
      default: 1, // Duration in days (or hours, depending on setting)
    },
    estimates: {
      optimistic: Number, // Best case
      mostLikely: Number, // Normal case
      pessimistic: Number, // Worst case
      source: {
        type: String,
        enum: ["User", "AI"],
        default: "User",
      },
    },

    // 4. Gantt Dependencies (The Network Diagram)
    dependencies: [
      {
        task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        type: {
          type: String,
          enum: ["FS", "SS", "FF", "SF"], // FS = Finish-to-Start (Standard)
          default: "FS",
        },
        lag: { type: Number, default: 0 }, // Lag time in days
      },
    ],

    // 5. Critical Path Engine (Calculated Fields)
    // These are updated automatically by our CPM algorithm
    scheduling: {
      earlyStart: Date,
      earlyFinish: Date,
      lateStart: Date,
      lateFinish: Date,
      totalFloat: Number, // Slack: How much it can be delayed without delaying the project
      freeFloat: Number,
      isCritical: { type: Boolean, default: false }, // True if Float == 0
    },

    // 6. Execution & Tracking
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "On Hold"],
      default: "Not Started",
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    startDate: Date, // Planned Start
    endDate: Date, // Planned End
    progress: { type: Number, default: 0, min: 0, max: 100 },
  },
  {
    timestamps: true,
  },
);

// Optimize queries for WBS display
TaskSchema.index({ project: 1, parentTask: 1 });

module.exports = mongoose.model("Task", TaskSchema);
