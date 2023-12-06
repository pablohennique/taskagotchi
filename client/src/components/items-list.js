"use client";

import Link from "next/link";
import styles from "./items-list.module.css";
import { FaSkull } from "react-icons/fa";
import { useState, useEffect } from "react";
import { updateTaskCompletion } from "@/lib/backend";

export default function ItemsList(props) {
  //initallyDisabledTasks refers to tasks marked as completed already plus tasks not set for today (monday, tuesday, etc)
  const { items, urlPath, initallyDisabledTasks } = props;

  const [disabledItems, setDisabledItems] = useState([]);

  useEffect(() => {
    setDisabledItems(initallyDisabledTasks);
  }, [initallyDisabledTasks]);

  function handleCompleteTask(task) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;

    let completed = !task.completed; // Toggle the completion status

    setDisabledItems((prevDisabledItems) =>
      prevDisabledItems.includes(task._id)
        ? prevDisabledItems.filter((id) => id !== task._id)
        : [...prevDisabledItems, task._id]
    );

    updateTaskCompletion(url, completed);
  }

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
