function calculateFoodEarned(difficulty, tasksAssociatedToUser) {
  const maxFood = 50;

  const numberOfEasyTasks = tasksAssociatedToUser.filter(
    (task) => task.difficulty === "Easy"
  ).length;
  const numberOfModerateTasks = tasksAssociatedToUser.filter(
    (task) => task.difficulty === "Moderate"
  ).length;
  const numberOfHardTasks = tasksAssociatedToUser.filter(
    (task) => task.difficulty === "Hard"
  ).length;

  const numberOfUnits = //Easy tasks have a weight of 1, moderate 2 and hard 3
    numberOfEasyTasks * 1 + numberOfModerateTasks * 2 + numberOfHardTasks * 3;

  const pointsPerUnit = maxFood / numberOfUnits;

  const pointsPerEasy = pointsPerUnit * 1; //Easy tasks have a weight of 1
  const pointsPerModerate = pointsPerUnit * 2; //Moderate tasks have a weight of 2
  const pointsPerHard = pointsPerUnit * 3; //Hard tasks have a weight of 3

  let foodEarned = 0;
  switch (difficulty) {
    case "Easy":
      foodEarned = pointsPerEasy;
      break;
    case "Moderate":
      foodEarned = pointsPerModerate;
      break;
    case "Hard":
      foodEarned = pointsPerHard;
      break;
  }

  // let roundedFoodEarned = Math.round(foodEarned);
  // console.log("net food" + foodEarned);
  // console.log("rounded" + roundedFoodEarned);

  return Math.round(foodEarned);
}

module.exports = {
  calculateFoodEarned,
};
