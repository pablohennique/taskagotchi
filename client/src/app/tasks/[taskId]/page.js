"use client";
import {
  useBackendFetchCall,
  updateTaskFetchCall,
  deleteFetchCall,
} from "@/lib/backend";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import logInCheck from "@/utils/logInCheck";

function TaskPage({ params }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const urlPath = "/tasks";
  const url = baseUrl + `${urlPath}/${params.taskId}`;

  const [task, setTask] = useBackendFetchCall("task", [], url);
  const [notes, setNotes] = useState(task.notes);
  const [mondayCheck, setMondayCheck] = useState(false);
  const [tuesdayCheck, setTuesdayCheck] = useState(false);
  const [wednesdayCheck, setWednesdayCheck] = useState(false);
  const [thursdayCheck, setThursdayCheck] = useState(false);
  const [fridayCheck, setFridayCheck] = useState(false);
  const [saturdayCheck, setSaturdayCheck] = useState(false);
  const [sundayCheck, setSundayCheck] = useState(false);

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  useEffect(() => {
    if (task) {
      setNotes(task.notes)
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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + `/tasks/${task._id}`;
    updateTaskFetchCall(
      url,
      notes,
      mondayCheck,
      tuesdayCheck,
      wednesdayCheck,
      thursdayCheck,
      fridayCheck,
      saturdayCheck,
      sundayCheck
    );
    // add a pop up that confirms save successful
    window.alert("Task has been saved successfully!");
  }

  function handleDelete() {
    const confirmation = window.confirm(
      `Are you sure you want to delete this task?`
    );
    if (confirmation) {
      const url = baseUrl + `/tasks/${params.taskId}`;
      deleteFetchCall(url);
      router.push("/tasks");
    }
  }
  return (
    <>
      <div>
        <h1>{task.title}</h1>
        <h3>Difficulty: {task.difficulty}</h3>
        <form
          method="post"
          onSubmit={handleSubmit}
          className={styles.recurrencesForm}>
          <div>
          <h3>Notes:</h3>
          <textarea
            value={notes}
            onChange={handleNotesChange}
            rows={6} // You can adjust the number of rows to control the initial size
            cols={40} // You can adjust the number of columns to control the initial size
          />
          </div>
          <h3>Recurrence:</h3>
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
          <div className={styles.saveButtonContainer}>
            <button
              className={styles.saveButton}
              type="submit">Save</button>
          </div>

        </form>
      </div>
      <div className="buttonContainer">
        <button onClick={handleDelete}>DELETE TASK</button>
      </div>
    </>
  );
}

export default logInCheck(TaskPage);
