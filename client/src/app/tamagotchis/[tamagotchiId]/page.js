"use client";

import { useBackendFetchCall, getCurrentUserFetchCall } from "@/lib/backend";
import { useState } from "react";
import styles from "./page.module.css";
import EditDeleteButtons from "@/components/edit-delete-buttons";
import FeedButton from "@/components/feed-button";

export default function TamagotchiPage({ params }) {
  const baseUrl = process.env.API_BASE_PATH;

  const userUrlPath = `/users/current`;
  const userUrl = baseUrl + userUrlPath;
  const [user, setUser] = useBackendFetchCall("user", [], userUrl);

  const tamagotchiUrlPath = `/tamagotchis/${params.tamagotchiId}`;
  const tamagotchiUrl = baseUrl + tamagotchiUrlPath;

  const [tamagotchi, setTamagotchi] = useBackendFetchCall(
    "tamagotchi",
    [],
    tamagotchiUrl
  );

  const [updatedName, setUpdatedName] = useState(null);

  let hungerDescription;
  let tamagotchiImage;

  const onUpdate = (newName) => {
    setUpdatedName(newName);
  };

  function setHungerDescription() {
    if (tamagotchi.hunger <= 25) {
      hungerDescription = "Very Hungry";
    } else if (tamagotchi.hunger < 50) {
      hungerDescription = "Hungry";
    } else if (tamagotchi.hunger >= 50) {
      hungerDescription = "Satisfied";
    } else if (tamagotchi.hunger === 100) {
      hungerDescription = "Full";
    }
  }

  function setTamagotchiImage(breed) {
    switch (breed) {
      case "Dragon":
        tamagotchiImage =
          "/tamagotchis-images/dragon/baby-dragon-tamagotchi.gif";
        break;
      case "Dog":
        tamagotchiImage = "/tamagotchis-images/dog/baby-dog-tamagotchi.gif";
        break;
      case "Cat":
        tamagotchiImage = "/tamagotchis-images/cat/baby-cat-tamagotchi.gif";
        break;
    }
  }
  if (tamagotchi) {
    setHungerDescription();
    setTamagotchiImage(tamagotchi.breed);
  }
  return (
    <>
      <div className={styles.tamagotchiContainer}>
        <div>
          <h1>{updatedName || tamagotchi.name}</h1>
          <h3>Breed: {tamagotchi.breed}</h3>
          <h3>Age: {tamagotchi.age}</h3>
          <h3>Hunger: {hungerDescription}</h3>
          <div className={styles.foodBar}>
            <FeedButton params={params} hunger={tamagotchi.hunger} />
            <p>Available food: {user.food}</p>
          </div>
        </div>
        <div>
          {/* evolution stage will be showed in the image and will be calculated in Node */}
          <img src={tamagotchiImage} alt="Cat Tamagotchi" />
        </div>
      </div>
      <EditDeleteButtons
        tamagotchi={tamagotchi}
        params={params}
        onUpdate={onUpdate}
      />
    </>
  );
}
