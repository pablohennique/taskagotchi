"use client";

import { useState } from "react";
import { createTamagotchiFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function CreateTamagotchi() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "http://localhost:8000/tamagotchis";
    createTamagotchiFetchCall(url, name, breed);
    router.push("/tamagotchis");
  };
  return (
    <>
      <h1>Create a New Tamagotchi</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="breed"
            id="breed"
            value={breed}
            onChange={handleBreedChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
}
