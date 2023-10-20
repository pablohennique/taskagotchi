const cron = require("node-cron");

const { resetCompletedTasks } = require("../controllers/taskController");

const taskCompletionResetJob = cron.schedule("0 3 * * *", () => {
  resetCompletedTasks();
  console.log("All tasks have been reset to not completed");
});

module.exports = { taskCompletionResetJob };
