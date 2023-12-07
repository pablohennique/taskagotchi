const asyncHandler = require("express-async-handler");
const { earnFood } = require("../controllers/userController");
const Task = require("../models/taskModel");

// @desc Get all tasks associated to req.user
// @route GET /tasks
// @access private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json(tasks);
});

// @desc Get individual task associated to req.user
// @route GET /tasks/:id
// @access private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error("Could not find task");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this task");
  }
  res.status(200).json(task);
});

// @desc Create new task
// @route POST /tasks
// @access private
const createTask = asyncHandler(async (req, res) => {
  console.log(req.body);

  const {
    title,
    difficulty,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
  } = req.body;
  if (!title || !difficulty) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const task = await Task.create({
    user_id: req.user.id,
    title,
    difficulty,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
  });
  res.status(201).json(task);
});

// @desc Update one task. This can be editing it or marking it as complete
// @route PUT /tasks/:id
// @access private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  console.log(req.body);

  let completionStatusBeforeUpdate = task.completed;
  let completionStatusAfterUpdate = req.body.completed;

  //declaring foodEarned to display on the front end for the user when task is marked as completed
  let foodEarned;

  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this task");
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  //If statement ensures that the change in the task status is from not-completed --> completed.
  if (!completionStatusBeforeUpdate && completionStatusAfterUpdate) {
    let userId = task.user_id.toString();
    let difficulty = task.difficulty;
    let tasksAssociatedToUser = await Task.find({ user_id: userId });

    foodEarned = await earnFood(userId, difficulty, tasksAssociatedToUser); // passes infomration to User controller
  }

  res.status(200).json({updatedTask: updatedTask, foodEarned: foodEarned});
});

// @desc Delete one task
// @route DELETE /tasks/:id
// @access private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  if (task.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this task");
  }
  await Task.findByIdAndRemove(req.params.id);
  res.status(203).json(task);
});

// @desc reset all tasks to not completed at 3 am
const resetCompletedTasks = async () => {
  const completedTasks = await Task.find({ completed: true });

  if (completedTasks.length === 0) {
    throw new Error("no completed tasks found");
  }

  try {
    for (const task of completedTasks) {
      task.completed = false;
      await task.save();
    }
    console.log(new Date(), "All tasks have been reset to not completed");
  } catch (error) {
    console.error(new Date(), "Error reseting tasks at 3 am:", error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  resetCompletedTasks,
};
