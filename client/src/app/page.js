"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <>
      <div>
        <h1>Welcome to Taskagotchi!</h1>

        <p>Complete your daily tasks to feed your tamagotchis...</p>
        <p>... otherwise they will die</p>
        <p>Also, give them lots of love</p>
      </div>
      <div className="buttonContainer">
        <Link href="/tamagotchis/create">CREATE TAMAGOTCHI</Link>
        <Link href="/tasks/create">CREATE DAILY TASK</Link>
      </div>
    </>
  );
}
