"use client";

import { updateFetchCall } from "@/lib/backend";
import { useEffect, useState } from "react";

export default function FeedButton(props) {
  const { hunger, params } = props;

  const baseUrl = process.env.API_BASE_PATH;
  const url = baseUrl + `/tamagotchis/${params.tamagotchiId}`;
  const [hungerPoints, setHungerPoints] = useState(hunger);
  const [feedButtonClicked, setFeedButtonClicked] = useState(false);

  useEffect(() => {
    setHungerPoints(hunger);
  }, [hunger]);

  function handleFeed() {
    setFeedButtonClicked(true);
    setHungerPoints(hungerPoints + 5);
  }

  useEffect(() => {
    let isCurrent = true;
    if (isCurrent && feedButtonClicked) {
      console.log(url);
      console.log(hungerPoints);
      updateFetchCall({ url: url, hunger: hungerPoints });
    }
    return () => {
      isCurrent = false;
    };
  }, [hungerPoints]);

  return <button onClick={handleFeed}>FEED</button>;
}
