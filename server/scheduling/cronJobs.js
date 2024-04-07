const cron = require("node-cron");

const { resetCompletedTasks } = require("../controllers/taskController");
const {
  tamagotchisAgeOneDay,
  tamagotchisGetHungrier,
  tamagotchisStageEvolution
} = require("../controllers/tamagotchiController");

// @desc All tasks are reset at 3 am EST every day
const taskCompletionResetCronJob = cron.schedule(
  "0 3 * * *",
  () => {
    resetCompletedTasks();
  },
  {
    scheduled: false,
    timezone: "America/New_York",
  }
);

// @desc tamagotchi ages 1 day at midnight everyday
const tamagotchisAgeCronJob = cron.schedule(
  "0 0 * * *",
  () => {
    tamagotchisAgeOneDay();
  },
  {
    scheduled: false,
    timezone: "America/New_York",
  }
);

// @desc tamagotchis get hungry every 6 hours
const tamagotchisGetHungrierCronJob = cron.schedule(
  "0 0,6,12,18 * * *",
  () => {
    tamagotchisGetHungrier();
  },
  {
    scheduled: false,
    timezone: "America/New_York",
  }
);

// @desc function that runs at 2 am to evolve applicable tamagotchis onto the next stage
const tamagotchisStageEvolutionCronJob = cron.schedule(
  "0 2 * * *",
  () => {
    tamagotchisStageEvolution();
  },
  {
    scheduled: false,
    timezone: "America/New_York",
  }
);

module.exports = {
  taskCompletionResetCronJob,
  tamagotchisAgeCronJob,
  tamagotchisGetHungrierCronJob,
  tamagotchisStageEvolutionCronJob
};
