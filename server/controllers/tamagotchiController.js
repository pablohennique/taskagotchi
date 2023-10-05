const asyncHandler = require("express-async-handler");
const Tamagotchi = require("../models/tamagotchiModel");

// @desc Get all tamagotchis associated to req.user
// @route GET /tamagotchis
// @access private
const getTamagotchis = asyncHandler(async (req, res) => {
  const tamagotchis = await Tamagotchi.find();
  res.status(200).json(tamagotchis);
});

// @desc Get individual tamagotchi associated to req.user
// @route GET /tamagotchis/:id
// @access private
const getTamagotchi = asyncHandler(async (req, res) => {
  const tamagotchi = await Tamagotchi.findById(req.params.id);
  if (!tamagotchi) {
    res.status(404);
    throw new Error("Could not find Tamagotchi");
  }
  res.status(200).json(tamagotchi);
});

// @desc Create new tamagotchi
// @route POST /tamagotchis
// @access private
const createTamagotchi = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, habitat } = req.body;
  if (!name || !habitat) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const tamagotchi = await Tamagotchi.create({
    name,
    habitat,
  });
  res.status(201).json(tamagotchi);
});

// @desc Update one tamagotchi
// @route PUT /tamagotchis/:id
// @access private
const updateTamagotchi = asyncHandler(async (req, res) => {
  const tamagotchi = await Tamagotchi.findById(req.params.id);
  console.log(req.body);

  if (!tamagotchi) {
    res.status(404);
    throw new Error("Tamagotchi not found");
  }
  const updatedTamagotchi = await Tamagotchi.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTamagotchi);
});

// @desc Delete one tamagotchi
// @route DELETE /tamagotchis/:id
// @access private
const deleteTamagotchi = asyncHandler(async (req, res) => {
  const tamagotchi = await Tamagotchi.findById(req.params.id);
  console.log(req.body);

  if (!tamagotchi) {
    res.status(404);
    throw new Error("Tamagotchi not found");
  }
  await Tamagotchi.findByIdAndRemove(req.params.id);
  res.status(203).json(tamagotchi);
});

module.exports = {
  getTamagotchis,
  getTamagotchi,
  createTamagotchi,
  updateTamagotchi,
  deleteTamagotchi,
};
