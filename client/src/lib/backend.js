import { useEffect, useState } from "react";

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

export async function loginFetchCall(url, email, password) {
  const requestBody = JSON.stringify({ email, password });
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
      throw new Error("Login Failed");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    console.log("Login successful. Access Token:", data.accessToken);
  } catch (error) {
    console.error("An error occurred during login:", error);
  }
}

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

export async function updateFetchCall(url, name) {
  const requestBody = JSON.stringify({ name });

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
