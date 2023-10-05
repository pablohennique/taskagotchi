const express = require("express");
const router = express.Router();
const {
  getTamagotchis,
  createTamagotchi,
  getTamagotchi,
  updateTamagotchi,
  deleteTamagotchi,
} = require("../controllers/tamagotchiController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTamagotchis).post(createTamagotchi);
router
  .route("/:id")
  .get(getTamagotchi)
  .put(updateTamagotchi)
  .delete(deleteTamagotchi);

module.exports = router;
