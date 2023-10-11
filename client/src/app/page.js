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
      <Link className={styles.button} href="/tamagotchis/create">
        CREATE A TAMAGOTCHI
      </Link>
      <Link className={styles.button} href="/tasks/create">
        CREATE A DAILY TASK
      </Link>
    </>
  );
}
