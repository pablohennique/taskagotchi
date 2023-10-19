"use client";

import { useState } from "react";
import { createTaskFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [mondayCheck, setMondayCheck] = useState(true);
  const [tuesdayCheck, setTuesdayCheck] = useState(true);
  const [wednesdayCheck, setWednesdayCheck] = useState(true);
  const [thursdayCheck, setThursdayCheck] = useState(true);
  const [fridayCheck, setFridayCheck] = useState(true);
  const [saturdayCheck, setSaturdayCheck] = useState(true);
  const [sundayCheck, setSundayCheck] = useState(true);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const baseUrl = process.env.API_BASE_PATH;
    const url = baseUrl + "/tasks";
    createTaskFetchCall(
      url,
      title,
      difficulty,
      mondayCheck,
      tuesdayCheck,
      wednesdayCheck,
      thursdayCheck,
      fridayCheck,
      saturdayCheck,
      sundayCheck
    );
    router.push("/tasks");
  };

  return (
    <>
      <h1>Create a New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultyChange}
            required={true}
          >
            <option value="">Select a difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <h4>Recurrence:</h4>
        <div className={styles.recurrencesForm}>
          <label>
            Monday:
            <input
              type="checkbox"
              checked={mondayCheck}
              onChange={(e) => setMondayCheck(e.target.checked)}
            />
          </label>
          <label>
            Tuesday:
            <input
              type="checkbox"
              checked={tuesdayCheck}
              onChange={(e) => setTuesdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Wednesday:
            <input
              type="checkbox"
              checked={wednesdayCheck}
              onChange={(e) => setWednesdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Thursday:
            <input
              type="checkbox"
              checked={thursdayCheck}
              onChange={(e) => setThursdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Friday:
            <input
              type="checkbox"
              checked={fridayCheck}
              onChange={(e) => setFridayCheck(e.target.checked)}
            />
          </label>
          <label>
            Saturday:
            <input
              type="checkbox"
              checked={saturdayCheck}
              onChange={(e) => setSaturdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Sunday:
            <input
              type="checkbox"
              checked={sundayCheck}
              onChange={(e) => setSundayCheck(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </>
  );
}