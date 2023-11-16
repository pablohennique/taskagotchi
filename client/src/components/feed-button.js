"use client";

import { updateFetchCall, updateUserFetchCall } from "@/lib/backend";
import { useEffect, useState } from "react";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export default function FeedButton(props) {
  const { params, tamagotchi, user, onFoodUpdate } = props;
  const hunger = tamagotchi.hunger;
  const food = user.food;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const url = baseUrl + `/tamagotchis/${params.tamagotchiId}`;
  const [hungerPoints, setHungerPoints] = useState(hunger);
  const [feedButtonClicked, setFeedButtonClicked] = useState(false);
  const [userFood, setUserFood] = useState(food);

  useEffect(() => {
    setHungerPoints(hunger);
  }, [hunger]);

  useEffect(() => {
    setUserFood(food);
  }, [food]);

  function handleFeed() {
    setFeedButtonClicked(true);
    if (userFood >= 5) {
      if (hungerPoints <= 95) {
        setHungerPoints(hungerPoints + 5);
        setUserFood(userFood - 5);
        onFoodUpdate(userFood - 5);
      } else {
        window.alert("Your tamagotchi is already full!");
      }
    } else {
      window.alert("You don't have enough food!");
    }
  }

  useEffect(() => {
    let isCurrent = true;

    const throttle = async () => {
      await delay(1000);
      if (isCurrent && feedButtonClicked) {
        console.log(url);
        console.log(hungerPoints);
        updateFetchCall({ url: url, hunger: hungerPoints });
        updateUserFetchCall({ food: userFood });
      }
    };
    throttle();

    return () => {
      isCurrent = false;
    };
  }, [hungerPoints]);

  return (
    <button onClick={handleFeed} disabled={!tamagotchi.alive}>
      FEED
    </button>
  );
}
