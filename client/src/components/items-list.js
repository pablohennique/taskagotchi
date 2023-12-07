"use client";

import Link from "next/link";
import styles from "./items-list.module.css";
import { FaSkull } from "react-icons/fa";
import { useState, useEffect } from "react";
import { updateTaskCompletion } from "@/lib/backend";

export default function ItemsList(props) {
  //initallyDisabledTasks refers to tasks marked as completed already plus tasks not set for today (monday, tuesday, etc)
  const { items, urlPath, initallyDisabledTasks, onTaskCompleted } = props;

  const [disabledItems, setDisabledItems] = useState([]);

  //Disable completed tasks + tasks not repeated today as soon as component loads
  useEffect(() => {
    setDisabledItems(initallyDisabledTasks);
  }, [initallyDisabledTasks]);

  async function handleCompleteTask(task) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;

    let completed = !task.completed; // Toggle the completion status

    const taskCompletedJsonRes = await updateTaskCompletion(url, completed);

    //Add the latest task completed to the array of disabled tasks
    setDisabledItems(prevDisabledItems => [...prevDisabledItems, task._id]);

    //Callback function from the tasks psge.js to pass the amount of food earned to display it to the user
    onTaskCompleted(taskCompletedJsonRes.foodEarned);
  }

  //Solution for a bug that prevented task from disabled after being marked as completed. Caused by onTaskCompleted() within the handleCompleteTask() function
  useEffect(() => {
    setDisabledItems(disabledItems)
  }, [disabledItems])

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <div key={item._id}>
          {urlPath === "/tasks" ? (
            <>
              <input
                type="checkbox"
                defaultChecked={item.completed}
                onChange={() => handleCompleteTask(item)}
                disabled={disabledItems.includes(item._id)}
              />
              <span className={styles.checkmark}></span>
            </>
          ) : null}
          <Link href={`${urlPath}/${item._id}`}>
            {urlPath === "/tamagotchis" ? (
              <li key={item._id}>
                {item.name} - {item.breed} {item.alive ? "" : <FaSkull />}
              </li>
            ) : null}
            {urlPath === "/tasks" ? (
              <li key={item._id}>{`${item.title}`}</li>
            ) : null}
          </Link>
        </div>
      ))}
    </ul>
  );
}
