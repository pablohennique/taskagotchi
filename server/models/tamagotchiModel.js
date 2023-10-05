const mongoose = require("mongoose");

const tamagotchiSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for your Tamagotchi"],
    },
    habitat: {
      type: String,
      enum: ["Air", "Sea", "Land"],
      required: [
        true,
        "Please choose a habitat of Tamagotchi - Air, Sea of Land",
      ],
    },
    age: {
      type: Number,
      default: 0,
    },
    hunger: {
      type: Number,
      default: 25,
    },
    evolution_level: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      default: "Alive",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tamagotchi", tamagotchiSchema);
