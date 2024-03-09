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
      required: [true, "Please choose a breed of Tamagotchi - Dragon, Dog, Cat"],
    },
    age: {
      type: Number,
      default: 0,
    },
    hunger: {
      type: Number,
      default: 25,
    },
    stage: {
      type: String,
      enum: ["Baby", "Child", "Teenager", "Adult"],
      default: "Baby",
      required: true,
    },
    minAgeForNextStage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tamagotchi", tamagotchiSchema);
