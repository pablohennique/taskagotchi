"use client";

import Link from "next/link";
import styles from "./items-list.module.css";
import { useState, useEffect } from "react";
import { updateTaskCompletion } from "@/lib/backend";

export default function ItemsList(props) {
  const { items, urlPath, initialCheckedItems } = props;

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItems(initialCheckedItems);
  }, [initialCheckedItems]);

  function handleCompleteTask(task) {
    // CHECK IF IS CANCELLED ACTUALLY WORKS
    let isCancelled = false;

    const baseUrl = process.env.API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;

    let completed = !task.completed; // Toggle the completion status

    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(task._id)
        ? prevCheckedItems.filter((id) => id !== task._id)
        : [...prevCheckedItems, task._id]
    );

    if (!isCancelled) {
      updateTaskCompletion(url, completed);
    }
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <div key={item._id}>
          {urlPath === "/tasks" ? (
            <input
              type="checkbox"
              defaultChecked={item.completed}
              onChange={() => handleCompleteTask(item)}
              disabled={checkedItems.includes(item._id)}
            />
          ) : null}
          <Link href={`${urlPath}/${item._id}`}>
            {urlPath === "/tamagotchis" ? (
              <li key={item._id}>{`${item.name} - ${item.breed}`}</li>
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
