const mongoose = require("mongoose");

const tamagotchiSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name for your Tamagotchi"],
    },
    breed: {
      type: String,
      enum: ["Dragon", "Cat", "Dog"],
      required: [
        true,
        "Please choose a breed of Tamagotchi - Dragon, Dog, Cat",
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
    alive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tamagotchi", tamagotchiSchema);
