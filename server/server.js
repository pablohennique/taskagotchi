const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const {
  taskCompletionResetCronJob,
  tamagotchisAgeCronJob,
  tamagotchisGetHungrierCronJob,
  tamagotchisStageEvolutionCronJob
} = require("./scheduling/cronJobs");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/tamagotchis", require("./routes/tamagotchiRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Start Cron Jobs
taskCompletionResetCronJob.start();
tamagotchisAgeCronJob.start();
tamagotchisGetHungrierCronJob.start();
tamagotchisStageEvolutionCronJob.start();
