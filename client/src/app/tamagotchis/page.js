"use client";
import React, { useState, useEffect } from "react";

export default function TamagotchisPage() {
  const [tamagotchis, setTamagotchis] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/tamagotchis")
      .then((res) => res.json())
      .then((data) => setTamagotchis(data.message));
  }, []);

  return (
    <>
      <h1>My Tamagotchis</h1>
      <h2>Yes!{tamagotchis}</h2>
    </>
  );
}
