const cron = require("cron");
const taskController = require("../controllers/taskController");

const taskCompletionResetJob = new cron.CronJob(
  "0 3 * * *",
  taskController.resetCompletedTasks
);

taskCompletionResetJob.start();
