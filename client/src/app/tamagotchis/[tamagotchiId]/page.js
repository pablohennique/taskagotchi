"use client";

import { useBackendFetchCall } from "@/lib/backend";

export default function TamagotchiPage({ params }) {
  const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
  const [tamagotchi, setTamagotchi] = useBackendFetchCall(
    "tamagotchi",
    [],
    url
  );
  return <h1>{tamagotchi.name}</h1>;
}
