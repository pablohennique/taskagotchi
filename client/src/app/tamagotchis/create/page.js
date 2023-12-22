"use client";

import { useState } from "react";
import { createTamagotchiFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import logInCheck from "@/utils/logInCheck";

function CreateTamagotchi() {
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
        <div className='formLineSpacing'>
          <label htmlFor="name">Name:</label>
          <input type="name" id="name" value={name} onChange={handleNameChange} className={styles.nameSelect} />
        </div>
        <div className='formLineSpacing'>
          <label htmlFor="breed">Breed:</label>
          <select id="breed" value={breed} onChange={handleBreedChange} className={styles.breedSelect}>
            <option value="">Select breeed</option>
            <option value="Cat">Cat</option>
            <option value="Dragon">Dragon - beta</option>
            <option value="Dog">Dog - beta</option>
          </select>
        </div>
        <button type="submit">Create Tamagotchi</button>
      </form>
    </>
  );
}

export default logInCheck(CreateTamagotchi);
