"use client";
import { useBackendFetchCall } from "@/lib/backend";
import ItemsList from "@/components/items-list";
import logInCheck from "@/utils/logInCheck";
import Link from "next/link";
import { tasksToday } from "@/utils/tasksToday";

function TasksPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const urlPath = "/tasks";
  const url = baseUrl + urlPath;

  //Get all tasks assigned to the user
  const [tasks, setTasks] = useBackendFetchCall("tasks", [], url);

  //Get the tasks that have been marked to repeat for today (Monday, Tuesday, Wednesday, etc...)
  const tasksForToday = tasksToday(tasks);
  const tasksNotForToday = tasks.filter(task => !tasksForToday.includes(task));
  const tasksNotForTodayIds = tasksNotForToday.map(task => task._id);

  //Get the tasks that have already been marked as completed today
  const initialCheckedTasks = tasks.filter((task) => task.completed);
  const initialCheckedTaskIds = initialCheckedTasks.map(task => task._id);

  //Combine tasks not for today with tasks that have been marked as completed today to be originally rendered as disabled
  const initallyDisabledTasks = tasksNotForTodayIds.concat(initialCheckedTaskIds)

  return (
    <>
      <h1>My Tasks</h1>
      <ItemsList
        items={tasks}
        urlPath={urlPath}
        initallyDisabledTasks={initallyDisabledTasks}
      />
      <div className="buttonContainer">
        <Link href="/tasks/create">CREATE TASK</Link>
      </div>
    </>
  );
}

export default logInCheck(TasksPage);
