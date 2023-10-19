"use client";
import { useBackendFetchCall, updateRecurrencesFetchCall } from "@/lib/backend";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function TaskPage({ params }) {
  const baseUrl = process.env.API_BASE_PATH;
  const urlPath = "/tasks";
  const url = baseUrl + `${urlPath}/${params.taskId}`;

  const [task, setTask] = useBackendFetchCall("task", [], url);
  const [mondayCheck, setMondayCheck] = useState(false);
  const [tuesdayCheck, setTuesdayCheck] = useState(false);
  const [wednesdayCheck, setWednesdayCheck] = useState(false);
  const [thursdayCheck, setThursdayCheck] = useState(false);
  const [fridayCheck, setFridayCheck] = useState(false);
  const [saturdayCheck, setSaturdayCheck] = useState(false);
  const [sundayCheck, setSundayCheck] = useState(false);

  useEffect(() => {
    if (task) {
      setMondayCheck(task.repeat_monday);
      setTuesdayCheck(task.repeat_tuesday);
      setWednesdayCheck(task.repeat_wednesday);
      setThursdayCheck(task.repeat_thursday);
      setFridayCheck(task.repeat_friday);
      setSaturdayCheck(task.repeat_saturday);
      setSundayCheck(task.repeat_sunday);
    }
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();
    const baseUrl = process.env.API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;
    updateRecurrencesFetchCall(
      url,
      mondayCheck,
      tuesdayCheck,
      wednesdayCheck,
      thursdayCheck,
      fridayCheck,
      saturdayCheck,
      sundayCheck
    );
    // add a pop up that confirms save successful
  }
  return (
    <>
      <div>
        <h1>{task.title}</h1>
        <h3>Difficulty: {task.difficulty}</h3>
        <h3>Recurrence:</h3>
        <form
          method="post"
          onSubmit={handleSubmit}
          className={styles.recurrencesForm}
        >
          <label>
            Monday:
            <input
              type="checkbox"
              checked={mondayCheck || false}
              onChange={(e) => setMondayCheck(e.target.checked)}
            />
          </label>
          <label>
            Tuesday:
            <input
              type="checkbox"
              checked={tuesdayCheck || false}
              onChange={(e) => setTuesdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Wednesday:
            <input
              type="checkbox"
              checked={wednesdayCheck || false}
              onChange={(e) => setWednesdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Thursday:
            <input
              type="checkbox"
              checked={thursdayCheck || false}
              onChange={(e) => setThursdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Friday:
            <input
              type="checkbox"
              checked={fridayCheck || false}
              onChange={(e) => setFridayCheck(e.target.checked)}
            />
          </label>
          <label>
            Saturday:
            <input
              type="checkbox"
              checked={saturdayCheck || false}
              onChange={(e) => setSaturdayCheck(e.target.checked)}
            />
          </label>
          <label>
            Sunday:
            <input
              type="checkbox"
              checked={sundayCheck || false}
              onChange={(e) => setSundayCheck(e.target.checked)}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}