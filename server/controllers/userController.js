const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { calculateFoodEarned } = require("../services/calculations");

// @desc Register a user
// @route POST users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email already exists under a another username");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log(`User created ${user}`);
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login a user
// @route POST users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields must be completed");
  }
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Incorrect password or email");
  }
});

// @desc Current user info
// @route GET users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

async function earnFood(userId, difficulty) {
  let user = await User.findById(userId);
  let foodEarned = calculateFoodEarned(difficulty);

  user.food = user.food + foodEarned;
  user.save();
  console.log(
    `user id ${userId} has earned ${foodEarned} food. The total is now ${user.food}`
  );
}

module.exports = { registerUser, loginUser, currentUser, earnFood };
