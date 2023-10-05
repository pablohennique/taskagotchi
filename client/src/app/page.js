"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/tamagotchis")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  // test
  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}
