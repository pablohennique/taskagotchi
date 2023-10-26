const asyncHandler = require("express-async-handler");
const Tamagotchi = require("../models/tamagotchiModel");

// @desc Get all tamagotchis associated to req.user
// @route GET /tamagotchis
// @access private
const getTamagotchis = asyncHandler(async (req, res) => {
  const tamagotchis = await Tamagotchi.find({ user_id: req.user.id });
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
  if (tamagotchi.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this Tamagotchi");
  }
  res.status(200).json(tamagotchi);
});

// @desc Create new tamagotchi
// @route POST /tamagotchis
// @access private
const createTamagotchi = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, breed } = req.body;
  if (!name || !breed) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const tamagotchi = await Tamagotchi.create({
    name,
    breed,
    user_id: req.user.id,
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
  if (tamagotchi.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this Tamagotchi");
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

  if (!tamagotchi) {
    res.status(404);
    throw new Error("Tamagotchi not found");
  }
  if (tamagotchi.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User is not the owner of this Tamagotchi");
  }
  await Tamagotchi.findByIdAndRemove(req.params.id);
  res.status(203).json(tamagotchi);
});

// @desc tamagotchis age by one day
const tamagotchisAgeOneDay = async () => {
  try {
    const tamagotchis = await Tamagotchi.find({ alive: true });

    for (const tamagotchi of tamagotchis) {
      tamagotchi.age += 1;
      await tamagotchi.save();
    }
    console.log(new Date(), "All tamagotchis have aged by 1 days");
  } catch (error) {
    console.error(new Date(), "Error aging tamagotchis at midnight:", error);
  }
};

// @desc tamagotchis lose hunger points by a random amount
const tamagotchisGetHungrier = async () => {
  function getRandomHungerLost(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  try {
    const tamagotchis = await Tamagotchi.find({ alive: true });
    for (const tamagotchi of tamagotchis) {
      let hungerLost = getRandomHungerLost(5, 10);
      tamagotchi.hunger = tamagotchi.hunger - hungerLost;
      if (tamagotchi.hunger <= 0) {
        tamagotchi.alive = false;
      }
      await tamagotchi.save();
      // console.log(
      //   `tamagotchi ${tamagotchi.name} lost ${hungerLost}. Hunger now at ${tamagotchi.hunger}`
      // );
    }
    console.log(new Date(), "Hunger levels for all tamagotchis have gone down");
  } catch (error) {
    console.error(new Date(), "Error reducing hunger from tamagotchis", error);
  }
};

module.exports = {
  getTamagotchis,
  getTamagotchi,
  createTamagotchi,
  updateTamagotchi,
  deleteTamagotchi,
  tamagotchisAgeOneDay,
  tamagotchisGetHungrier,
};
