const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title for your Task"],
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Hard"],
      required: [true, "Please select a difficulty for your Task"],
    },
    notes: {
      type: String,
    },
    repeat_monday: {
      type: Boolean,
      default: false,
    },
    repeat_tuesday: {
      type: Boolean,
      default: false,
    },
    repeat_wednesday: {
      type: Boolean,
      default: false,
    },
    repeat_thursday: {
      type: Boolean,
      default: false,
    },
    repeat_friday: {
      type: Boolean,
      default: false,
    },
    repeat_saturday: {
      type: Boolean,
      default: false,
    },
    repeat_sunday: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
