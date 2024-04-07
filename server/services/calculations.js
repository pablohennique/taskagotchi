function calculateFoodEarned(difficulty, tasksAssociatedToUser) {
  const maxFood = 50;
let tasksAssociatedToUserToday

  //Get current day to avoid including tasks that are unavailable today for point calculations
  const currentDate = new Date()
  const dayOfWeekIndex = currentDate.getDay();
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayOfWeek = daysOfWeek[dayOfWeekIndex]

  switch (dayOfWeek) {
    case 'monday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_monday === true);
    break;
    case 'tuesday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_tuesday === true);
    break;
    case 'wednesday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_wednesday === true);
    break;
    case 'thursday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_thursday === true);
    break;
    case 'friday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_friday === true);
    break;
    case 'saturday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_saturday === true);
    break;
    case 'sunday':
      tasksAssociatedToUserToday = tasksAssociatedToUser.filter(task => task.repeat_sunday === true);
    break;
  }

  // console.log(`today is ${dayOfWeek} and the tasks are: `, tasksAssociatedToUserToday);

  const numberOfEasyTasks = tasksAssociatedToUserToday.filter(
    (task) => task.difficulty === "Easy"
  ).length;
  const numberOfModerateTasks = tasksAssociatedToUserToday.filter(
    (task) => task.difficulty === "Moderate"
  ).length;
  const numberOfHardTasks = tasksAssociatedToUserToday.filter(
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
  // console.log("net food" + foodEarned);

  return Math.round(foodEarned);
}

// Function that runs once per day to evolve tamagotchi if conditions are met
async function evolveCalculationAndSave(tamagotchi) {
  let newStage = "";

  switch (tamagotchi.stage) {
    case "Baby":
      newStage = "Child";
      break;
    case "Child":
      newStage = "Teenager";
      break;
    case "Teenager":
      newStage = "Adult";
      break;
  }

  tamagotchi.stage = newStage;
  tamagotchi.minAgeForNextStage = tamagotchi.age + 5 //Adding 5 since +5 ensures that no matter when the last evolution took place, min age will always be less than .6 but more than .0
  await tamagotchi.save();

  console.log(`Tamagothi ${tamagotchi.name} evolved to ${newStage}`);
}

module.exports = {
  calculateFoodEarned,
  evolveCalculationAndSave
};
