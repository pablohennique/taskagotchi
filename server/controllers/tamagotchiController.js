const asyncHandler = require("express-async-handler");

// @desc Get all tamagotchis associated to req.user
// @route GET /tamagotchis
// @access private

const getTamagotchis = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "These are all your Tamagotchis" });
});

// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

module.exports = { getTamagotchis };
