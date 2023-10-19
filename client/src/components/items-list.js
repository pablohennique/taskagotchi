"use client";

import Link from "next/link";
import styles from "./items-list.module.css";
import { updateTaskCompletion } from "@/lib/backend";

export default function ItemsList(props) {
  const { items, urlPath } = props;

  function handleCompleteTask(task) {
    const baseUrl = process.env.API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;

    let completed;
    task.completed ? (completed = false) : (completed = true);

    updateTaskCompletion(url, completed);
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <div key={item._id}>
          {urlPath === "/tasks" ? (
            <input
              type="checkbox"
              defaultChecked={item.completed ? true : false}
              onChange={() => handleCompleteTask(item)}
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
