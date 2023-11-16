"use client";

import { deleteFetchCall, updateFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditDeleteButtons(props) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;

  const { tamagotchi, params, onNameUpdate } = props;
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
      updateFetchCall({ url: url, name: newTamagotchiName });
      onNameUpdate(newTamagotchiName);
      setTamagotchiNameUppercase(newTamagotchiName.toUpperCase());
      // window.location.reload();
    }
  };

  return (
    <div className="buttonContainer">
      <button onClick={handleUpdate} disabled={!tamagotchi.alive}>
        CHANGE NAME
      </button>
      <button onClick={handleDelete} disabled={!tamagotchi.alive}>
        KILL {tamagotchiNameUppercase}
      </button>
    </div>
  );
}
