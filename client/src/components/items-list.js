"use client";

import Link from "next/link";
import styles from "./items-list.module.css";
import { FaSkull } from "react-icons/fa";

import { useState, useEffect } from "react";
import { updateTaskCompletion } from "@/lib/backend";

export default function ItemsList(props) {
  const { items, urlPath, initialCheckedItems } = props;

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    setCheckedItems(initialCheckedItems);
  }, [initialCheckedItems]);

  function handleCompleteTask(task) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;

    let completed = !task.completed; // Toggle the completion status

    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(task._id)
        ? prevCheckedItems.filter((id) => id !== task._id)
        : [...prevCheckedItems, task._id]
    );

    updateTaskCompletion(url, completed);
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
