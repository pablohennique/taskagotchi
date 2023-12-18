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
  const [tamagotchi, setTamagotchi] = useBackendFetchCall("tamagotchi", [], tamagotchiUrl);

  const [updatedName, setUpdatedName] = useState(null);
  const [food, setFood] = useState(null);
  const [hungerPointsGained, setHungerPointsGained] = useState(0);
  const [feedButtonClicked, setFeedButtonClicked] = useState(false);
  const [yum, setYum] = useState(false);

  let hungerDescription;
  let tamagotchiImage;

  const onNameUpdate = (newName) => {
    setUpdatedName(newName);
  };

  const onFoodUpdate = (updatedFood) => {
    localStorage.setItem("state", "awake"); //if tamagotchi is asleep, it will wake up when being fed.
    setFeedButtonClicked(true);
    setFood(updatedFood);

    //Show Yum! image and remove after 2 seconds
    setYum(true);
    setTimeout(() => {
      setYum(false);
    }, 2000);
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

  //sets a random state between awake or asleep for a tamagotchi that persists for one hour
  function assignTamagotchiState() {
    let availableStates = ["asleep", "awake"];
    const randomIndex = Math.floor(Math.random() * availableStates.length);
    const currentDate = new Date();

    //code that assesses if new tamagotchi state should be determined based on whether the 1 hour timer has elapsed or if there was not timer stored in the local memory
    function resetTamagotchiState() {
      const countdownTime = 60 * 60; //1 hour in seconds

      const storedDate = localStorage.getItem("storedDate");
      console.log("Stored Date:", storedDate);

      if (!storedDate) {
        console.log("inside storedDate false");
        return true;
      } else {
        // timeRemaining is the representation of the 1 hour "timer". It substracts the storedDate in the local memory minus the currentDate (time now) to give us a 1 hour timer
        const timeRemaining = countdownTime - (currentDate - new Date(storedDate)) / 1000;
        if (timeRemaining < 0) {
          return true;
        } else {
          return false;
        }
      }
    }

    const pickNewRandState = resetTamagotchiState();

    // If a new state is required, the new sate will be stored locally as well as a new date, to trigger the new "1 hour countdown"
    let stateAssigned;
    if (pickNewRandState) {
      stateAssigned = availableStates[randomIndex];
      localStorage.setItem("storedDate", currentDate);
      localStorage.setItem("state", stateAssigned);
      return stateAssigned;
    } else {
      //if the timer has not reached zero, the same state as previously stored is used to display the tamagotchi image
      stateAssigned = localStorage.getItem("state");
      return stateAssigned;
    }
  }

  function assignTamagotchiImage(breed) {
    const state = assignTamagotchiState();
    switch (breed) {
      case "Dragon":
        tamagotchiImage = "/tamagotchis-images/dragon/baby-dragon-tamagotchi.gif";
        break;
      case "Dog":
        tamagotchiImage = "/tamagotchis-images/dog/baby-dog-tamagotchi.gif";
        break;
      case "Cat":
        switch (state) {
          case "asleep":
            tamagotchiImage = "/tamagotchis-images/cat/sleeping-cat-pixel-nobackground-final.gif";
            break;
          case "awake":
            tamagotchiImage = "/tamagotchis-images/cat/cat-walking-pixel-nobackground-final.gif";
            break;
        }
        break;
    }
  }
  if (tamagotchi) {
    setHungerDescription();
    assignTamagotchiImage(tamagotchi.breed);
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
            {yum ? <img src="/action-props/yum-bold.png" alt="yum! tamagotchi eating" className={styles.yum} /> : ""}

            {tamagotchi.alive ? (
              <img src={tamagotchiImage} alt="Cat Tamagotchi" className={styles.tamagotchiIage} />
            ) : (
              <FaSkull size={64} />
            )}
          </div>
          <h3>Breed: {tamagotchi.breed}</h3>
          <h3>Age: {tamagotchi.age}</h3>
          <h3>Hunger: {hungerDescription}</h3>
          <div className={styles.foodBar}>
            <FeedButton params={params} tamagotchi={tamagotchi} user={user} onFoodUpdate={onFoodUpdate} />
            <p>Available food: {food !== null && food >= 0 ? food : user.food}</p>
          </div>
        </div>
      </div>
      <EditDeleteButtons tamagotchi={tamagotchi} params={params} onNameUpdate={onNameUpdate} />
    </>
  );
}

export default logInCheck(TamagotchiPage);
