"use client";
import React, { useState, useEffect } from "react";
import { useBackendFetchCall } from "@/lib/backend";
import TamagotchiList from "../../components/tamagotchis-list";

export default function TamagotchisPage() {
  // const [tamagotchis, setTamagotchis] = useState([]);
  const url = "http://localhost:8000/tamagotchis";
  const [tamagotchis, setTamagotchis] = useBackendFetchCall(
    "tamagotchis",
    [],
    url
  );

  return (
    <>
      <h1>My Tamagotchis</h1>
      <TamagotchiList tamagotchis={tamagotchis} />
    </>
  );
}
