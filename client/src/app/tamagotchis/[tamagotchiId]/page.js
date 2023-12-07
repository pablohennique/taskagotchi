"use client";

import { useBackendFetchCall } from "@/lib/backend";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import EditDeleteButtons from "@/components/edit-delete-buttons";
import FeedButton from "@/components/feed-button";
import { FaSkull } from "react-icons/fa";
import logInCheck from "@/utils/logInCheck";

function TamagotchiPage({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
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
  const [food, setFood] = useState(null);
  const [hungerPointsGained, setHungerPointsGained] = useState(0);
  const [feedButtonClicked, setFeedButtonClicked] = useState(false);

  let hungerDescription;
  let tamagotchiImage;

  const onNameUpdate = (newName) => {
    setUpdatedName(newName);
  };

  const onFoodUpdate = (updatedFood) => {
    setFeedButtonClicked(true);
    setFood(updatedFood);
  };

  function setHungerDescription() {
    if (tamagotchi.hunger + hungerPointsGained <= 25) {
      hungerDescription = "Very Hungry";
    } else if (tamagotchi.hunger + hungerPointsGained < 50) {
      hungerDescription = "Hungry";
    } else if (tamagotchi.hunger + hungerPointsGained <= 95) {
      hungerDescription = "Satisfied";
    } else if (tamagotchi.hunger + hungerPointsGained > 95) {
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

  useEffect(() => {
    if (feedButtonClicked) {
      setHungerPointsGained(hungerPointsGained + 5);
      setHungerDescription();
    }
  }, [food]);

  return (
    <>
      <div className={styles.tamagotchiContainer}>
        <div>
          <h1>{updatedName || tamagotchi.name}</h1>
          <div className={styles.imgContainer}>
            {/* evolution stage will be showed in the image and will be calculated in Node */}
            {tamagotchi.alive ? (
              <img src={tamagotchiImage} alt="Cat Tamagotchi" />
            ) : (
              <FaSkull size={64} />
            )}
          </div>
          <h3>Breed: {tamagotchi.breed}</h3>
          <h3>Age: {tamagotchi.age}</h3>
          <h3>Hunger: {hungerDescription}</h3>
          <div className={styles.foodBar}>
            <FeedButton
              params={params}
              tamagotchi={tamagotchi}
              user={user}
              onFoodUpdate={onFoodUpdate}
            />
            <p>
              Available food: {food !== null && food >= 0 ? food : user.food}
            </p>
          </div>
        </div>
      </div>
      <EditDeleteButtons
        tamagotchi={tamagotchi}
        params={params}
        onNameUpdate={onNameUpdate}
      />
    </>
  );
}

export default logInCheck(TamagotchiPage);
