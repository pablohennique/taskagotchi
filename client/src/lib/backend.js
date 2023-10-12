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

export function loginFetchCall(url, email, password) {
  const requestBody = JSON.stringify({ email, password });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      localStorage.setItem("accessToken", data.accessToken);
      console.log("Login successful. Access Token:", data.accessToken);
    })
    .catch((error) => {
      console.error("An error occurred during login:", error);
    });
}

export function createTamagotchiFetchCall(url, name, breed) {
  const requestBody = JSON.stringify({ name, breed });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: requestBody,
  };

  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Creation failed");
      }
    })
    .then((data) => {
      console.log(data);
      console.log("Tamagotchi created successfully. Name:", data.name);
    })
    .catch((error) => {
      console.error("An error occurred during Tamagotchi creation:", error);
    });
}
