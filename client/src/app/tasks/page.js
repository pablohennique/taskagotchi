"use client";
import { useBackendFetchCall } from "@/lib/backend";
import ItemsList from "@/components/items-list";
import logInCheck from "@/utils/logInCheck";
import Link from "next/link";
import { tasksToday } from "@/utils/tasksToday";
import { useState, useEffect } from "react";

function TasksPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const urlPath = "/tasks";
  const url = baseUrl + urlPath;
  const [foodEarned, setFoodEarned] = useState("")
  let foodEarnedPopUpText;

  //Get all tasks assigned to the user
  const [tasks, setTasks] = useBackendFetchCall("tasks", [], url);

  const getInitiallyDisabledTasks = (tasks) => {
    //Get the tasks that have been marked to repeat for today (Monday, Tuesday, Wednesday, etc...)
    const tasksForToday = tasksToday(tasks);
    const tasksNotForToday = tasks.filter(
      (task) => !tasksForToday.includes(task)
    );
    const tasksNotForTodayIds = tasksNotForToday.map((task) => task._id);

    //Get the tasks that have already been marked as completed today
    const initialCheckedTasks = tasks.filter((task) => task.completed);
    const initialCheckedTaskIds = initialCheckedTasks.map((task) => task._id);

    //Combine tasks not for today with tasks that have been marked as completed today to be originally rendered as disabled
    return tasksNotForTodayIds.concat(initialCheckedTaskIds);
  };

  const initallyDisabledTasks = getInitiallyDisabledTasks(tasks);

  const onTaskCompleted = (foodEarnedReceivedFromApiCall) => {
    setFoodEarned(`Task completed. You've earned ${foodEarnedReceivedFromApiCall} food!`);
  };

  return (
    <>
      <div>
        <h1>My Tasks</h1>
        <p>{foodEarned || 'Complete tasks to earn food.'}</p>
      </div>
      <ItemsList
        items={tasks}
        urlPath={urlPath}
        initallyDisabledTasks={initallyDisabledTasks}
        onTaskCompleted={onTaskCompleted}
      />
      <div className="buttonContainer">
        <Link href="/tasks/create">CREATE TASK</Link>
      </div>
    </>
  );
}

export default logInCheck(TasksPage);
