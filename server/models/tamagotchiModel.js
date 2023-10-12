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
        "Please choose a breed of Tamagotchi - Air, Sea of Land",
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
