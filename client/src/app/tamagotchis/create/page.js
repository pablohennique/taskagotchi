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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    const url = baseUrl + "/tamagotchis";
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
          <select id="breed" value={breed} onChange={handleBreedChange}>
            <option value="">Select a breeed</option>
            <option value="Dragon">Dragon</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
          </select>
        </div>
        <button type="submit">Create Tamagotchi</button>
      </form>
    </>
  );
}
