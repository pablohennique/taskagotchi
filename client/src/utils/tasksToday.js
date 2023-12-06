export function tasksToday(tasks) {
  const currentDate = new Date();
  const dayOfWeekIndex = currentDate.getDay();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayOfWeek = daysOfWeek[dayOfWeekIndex];

  let tasksForToday;

  switch (dayOfWeek) {
    case "monday":
      tasksForToday = tasks.filter((task) => task.repeat_monday === true);
      break;
    case "tuesday":
      tasksForToday = tasks.filter((task) => task.repeat_tuesday === true);
      break;
    case "wednesday":
      tasksForToday = tasks.filter((task) => task.repeat_wednesday === true);
      break;
    case "thursday":
      tasksForToday = tasks.filter((task) => task.repeat_thursday === true);
      break;
    case "friday":
      tasksForToday = tasks.filter((task) => task.repeat_friday === true);
      break;
    case "saturday":
      tasksForToday = tasks.filter((task) => task.repeat_saturday === true);
      break;
    case "sunday":
      tasksForToday = tasks.filter((task) => task.repeat_sunday === true);
      break;
  }

	return tasksForToday;
}
