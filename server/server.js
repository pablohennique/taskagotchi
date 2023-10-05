const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/tamagotchis", require("./routes/tamagotchiRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port 8000.`);
});
