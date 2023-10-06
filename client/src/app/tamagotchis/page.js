"use client";
import React, { useState, useEffect } from "react";
import TamagotchiList from "../../components/tamagotchis-list";

export default function TamagotchisPage() {
  const [tamagotchis, setTamagotchis] = useState([]);
  // console.log(`Bearer ${sessionStorage.getItem("accessToken")}`);

  useEffect(() => {
    const url = "http://localhost:8000/tamagotchis";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
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
        setTamagotchis(data);
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
      });
  }, []);

  return (
    <>
      <h1>My Tamagotchis</h1>
      <TamagotchiList tamagotchis={tamagotchis} />
    </>
  );
}
