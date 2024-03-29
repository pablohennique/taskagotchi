import { useEffect, useState } from "react";

// GET CALL FOR LIST ITEMS (USER, TAMAGOTCHIS AND TASKS)
export function useBackendFetchCall(key, initialValue, url) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json({ message: "User Authenticated" });
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        console.log(data);
        setValue(data);
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
      });
  }, []);

  return [value, setValue];
}

// USER ONLY
export async function loginRegisterFetchCall({ url, username, email, password }) {
  let requestBody = {};
  let purpose = "";
  let message = "";

  if (!username) {
    //if Username empty, then it is a login
    requestBody = JSON.stringify({ email, password });
    purpose = "login";
  } else {
    //if Username is not empty, then it is a registration
    requestBody = JSON.stringify({ username, email, password });
    purpose = "registration";
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorObject = await response.json();
      throw new Error(errorObject.message);
    }

    const data = await response.json();

    if (purpose === "login") {
      message = "Login successful!";

      localStorage.setItem("accessToken", data.accessToken);
      console.log("Login successful. Access Token:", data.accessToken);
      return { success: true, message: message };
    } else if (purpose === "registration") {
      message = "Registration successful. Accaount created with email: " + email;
      return { success: true, message: message };
    }
  } catch (error) {
    console.error(`An error occurred during ${purpose}:`, error);

    return { success: false, error: error };
  }
}

export async function updateUserFetchCall({ food }) {
  const url = process.env.NEXT_PUBLIC_API_BASE_PATH + "/users/update";

  const requestBody = JSON.stringify({ food });
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("User update failed");
    }

    const data = await response.json();
    console.log(data);
    console.log("The following username has been successfully updated (with given food):", data.username, data.food);
  } catch (error) {
    console.log("An error occurred while trying to update user:", error);
  }
}

// TAMAGOTCHI AND TASK
export async function deleteFetchCall(url) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const data = await response.json();
    console.log("Tamagotchi Deleted: ", data);
  } catch (error) {
    console.log("An error occurred while trying to delete Tamagotchi:", error);
  }
}

// TAMAGOTCHI ONLY
export async function createTamagotchiFetchCall(url, name, breed) {
  const requestBody = JSON.stringify({ name, breed });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Creation failed");
    }

    const data = await response.json();
    console.log(data);
    console.log("Tamagotchi created successfully. Name:", data.name);
  } catch (error) {
    console.log("An error occurred during Tamagotchi creation:", error);
  }
}

export async function updateFetchCall({ url, name, hunger }) {
  let requestBody = {};

  if (name !== undefined) {
    requestBody = JSON.stringify({ url, name });
  }

  if (hunger !== undefined) {
    requestBody = JSON.stringify({ url, hunger });
  }

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const data = await response.json();
    console.log("Tamagotchi Edited: ", data);
  } catch (error) {
    console.log("An error occurred while trying to update Tamagotchi:", error);
  }
}

// TASKS ONLY
export async function updateTaskFetchCall(
  url,
  notes,
  repeat_monday,
  repeat_tuesday,
  repeat_wednesday,
  repeat_thursday,
  repeat_friday,
  repeat_saturday,
  repeat_sunday
) {
  const requestBody = JSON.stringify({
    notes,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
  });

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Update failed");
    }

    const data = await response.json();
    console.log("Task recurrences edited: ", data);
  } catch (error) {
    console.log("An error occurred while trying to update task recurrences:", error);
  }
}

export async function updateTaskCompletion(url, completed) {
  const requestBody = JSON.stringify({
    completed,
  });
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Updating task completion failed");
    }

    const data = await response.json();
    console.log("Task completion updated: ", data);
    return data;
  } catch (error) {
    console.log("An error occurred while trying to update task completions:", error);
  }
}

export async function createTaskFetchCall(
  url,
  title,
  difficulty,
  notes,
  repeat_monday,
  repeat_tuesday,
  repeat_wednesday,
  repeat_thursday,
  repeat_friday,
  repeat_saturday,
  repeat_sunday
) {
  const requestBody = JSON.stringify({
    title,
    difficulty,
    notes,
    repeat_monday,
    repeat_tuesday,
    repeat_wednesday,
    repeat_thursday,
    repeat_friday,
    repeat_saturday,
    repeat_sunday,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Creation failed");
    }

    const data = await response.json();
    console.log(data);
    console.log("Task created successfully. Name:", data.title);
  } catch (error) {
    console.log("An error occurred during Task creation:", error);
  }
}
