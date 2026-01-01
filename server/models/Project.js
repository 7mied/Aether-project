const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a project name"],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Construction",
        "Manufacturing",
        "Software",
        "General",
        "Personal",
      ],
      default: "General",
    },
    status: {
      type: String,
      enum: ["Initiation", "Planning", "Execution", "Monitoring", "Closing"],
      default: "Initiation",
    },
    budget: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: "USD" },
    },
    location: {
      address: String,
      coordinates: [Number],
    },
    aiInsights: {
      riskScore: { type: Number, min: 0, max: 100, default: 0 },
      summary: String,
      generatedCharter: String,
      nextSuggestedActions: [String],
    },
    startDate: { type: Date },
    endDate: { type: Date },
    actualEndDate: { type: Date },
    teamMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: String,
      },
    ],
    resources: [
      {
        name: String,
        quantity: Number,
        unit: String,
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
