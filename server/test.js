// const connectDb = require("./config/dbConnection");
// const dotenv = require("dotenv").config();
// connectDb();

const Task = require("./models/taskModel");

async function findTaskById() {
  try {
    const completedTask = await Task.findById("652ffeb41c555642ae31bb61");
    console.log(completedTask); // The specific Task object
  } catch (error) {
    console.error(error);
  }
}

module.exports = { findTaskById };
