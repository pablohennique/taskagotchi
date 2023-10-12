"use client";

import { useBackendFetchCall } from "@/lib/backend";

export default function TamagotchiPage({ params }) {
  const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
  const [tamagotchi, setTamagotchi] = useBackendFetchCall(
    "tamagotchi",
    [],
    url
  );
  let hungerDescription;
  if (tamagotchi.hunger <= 25) {
    hungerDescription = "Very Hungry";
  } else if (tamagotchi.hunger <= 50) {
    hungerDescription = "Hungry";
  }
  return (
    <>
      <h1>{tamagotchi.name}</h1>
      <h3>Breed: {tamagotchi.breed}</h3>
      <h3>Age: {tamagotchi.age}</h3>
      <h3>Hunger: {hungerDescription}</h3>
      {/* evolution stage will be showed in the image and will be calculated in Node */}
    </>
  );
}
