"use client";

import { deleteFetchCall, updateFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditDeleteButtons(props) {
  const router = useRouter();
  const baseUrl = process.env.API_BASE_PATH;

  const { tamagotchi, params, onUpdate } = props;
  const [tamagotchiNameUppercase, setTamagotchiNameUppercase] = useState(
    tamagotchi.name ? tamagotchi.name.toUpperCase() : ""
  );

  useEffect(() => {
    if (tamagotchi.name) {
      setTamagotchiNameUppercase(tamagotchi.name.toUpperCase());
    }
  }, [tamagotchi.name]);

  const handleDelete = () => {
    const confirmation = window.confirm(
      `Are you sure you want to kill ${tamagotchi.name}?`
    );
    if (confirmation) {
      const url = baseUrl + `/tamagotchis/${params.tamagotchiId}`;
      deleteFetchCall(url);
      router.push("/tamagotchis");
    }
  };

  const handleUpdate = () => {
    const newTamagotchiName = window.prompt(
      "Enter a new name: ",
      `${tamagotchi.name}`
    );
    if (newTamagotchiName) {
      const url = baseUrl + `/tamagotchis/${params.tamagotchiId}`;
      updateFetchCall(url, newTamagotchiName);
      onUpdate(newTamagotchiName);
      setTamagotchiNameUppercase(newTamagotchiName.toUpperCase());
      // window.location.reload();
    }
  };

  return (
    <div className="buttonContainer">
      <button onClick={handleUpdate}>CHANGE NAME</button>
      <button onClick={handleDelete}>KILL {tamagotchiNameUppercase}</button>
    </div>
  );
}
