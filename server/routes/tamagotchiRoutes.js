const express = require("express");
const router = express.Router();
const { getTamagotchis } = require("../controllers/tamagotchiController");

router.route("/").get(getTamagotchis);

module.exports = router;
