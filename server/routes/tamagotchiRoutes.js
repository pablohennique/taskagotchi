const express = require("express");
const router = express.Router();
const {
  getTamagotchis,
  createTamagotchi,
  getTamagotchi,
  updateTamagotchi,
  deleteTamagotchi,
} = require("../controllers/tamagotchiController");

router.route("/").get(getTamagotchis).post(createTamagotchi);
router
  .route("/:id")
  .get(getTamagotchi)
  .put(updateTamagotchi)
  .delete(deleteTamagotchi);

module.exports = router;
