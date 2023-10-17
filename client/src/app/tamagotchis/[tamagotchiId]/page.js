"use client";

import { useBackendFetchCall } from "@/lib/backend";
import Link from "next/link";
import styles from "./page.module.css";
import { deleteFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function TamagotchiPage({ params }) {
  const router = useRouter();
  const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
  const [tamagotchi, setTamagotchi] = useBackendFetchCall(
    "tamagotchi",
    [],
    url
  );
  let hungerDescription;
  let tamagotchiImage;
  let tamagotchiNameUppercase;
  if (tamagotchi.name) {
    tamagotchiNameUppercase = tamagotchi.name.toUpperCase();
  }
  function setHungerDescription() {
    if (tamagotchi.hunger <= 25) {
      hungerDescription = "Very Hungry";
    } else if (tamagotchi.hunger <= 50) {
      hungerDescription = "Hungry";
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
  const handleDelete = () => {
    const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
    deleteFetchCall(url);
    router.push("/tamagotchis");
  };

  setHungerDescription();
  setTamagotchiImage(tamagotchi.breed);
  return (
    <>
      <div className={styles.tamagotchiContainer}>
        <div>
          <h1>{tamagotchi.name}</h1>
          <h3>Breed: {tamagotchi.breed}</h3>
          <h3>Age: {tamagotchi.age}</h3>
          <h3>Hunger: {hungerDescription}</h3>
        </div>
        <div>
          {/* evolution stage will be showed in the image and will be calculated in Node */}
          <img src={tamagotchiImage} alt="Cat Tamagotchi" />
        </div>
      </div>
      <div className="buttonContainer">
        <Link href="/tamagotchis/create">EDIT TAMAGOTCHI</Link>
        <button onClick={handleDelete}>KILL {tamagotchiNameUppercase}</button>
      </div>
    </>
  );
}
