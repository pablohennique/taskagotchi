function calculateFoodEarned(difficulty) {
  let foodEarned = 0;
  switch (difficulty) {
    case "Easy":
      foodEarned = 1;
      break;
    case "Moderate":
      foodEarned = 2;
      break;
    case "Hard":
      foodEarned = 3;
      break;
  }
  return foodEarned;
}

module.exports = {
  calculateFoodEarned,
};
