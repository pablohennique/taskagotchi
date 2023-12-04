"use client";
import { useBackendFetchCall } from "@/lib/backend";
import ItemsList from "@/components/items-list";
import logInCheck from "@/utils/logInCheck";
import Link from "next/link";

function TasksPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const urlPath = "/tasks";
  const url = baseUrl + urlPath;

  const [tasks, setTasks] = useBackendFetchCall("tasks", [], url);
  const initialCheckedTasks = tasks.filter((task) => task.completed);
  const initialCheckedTaskIds = initialCheckedTasks.map((task) => task._id);

  return (
    <>
      <h1>My Tasks</h1>
      <ItemsList
        items={tasks}
        urlPath={urlPath}
        initialCheckedItems={initialCheckedTaskIds}
      />
      <div className="buttonContainer">
        <Link href="/tasks/create">CREATE TASK</Link>
      </div>
    </>
  );
}

export default logInCheck(TasksPage);
