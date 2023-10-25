"use client";

import { updateFetchCall } from "@/lib/backend";

export default function FeedButton() {
  function handleUpdate() {
    const baseUrl = process.env.API_BASE_PATH;
    const url = baseUrl + `/tamagotchis/${params.tamagotchiId}`;
    updateFetchCall(url);
  }
  return <button onClick={handleUpdate}>FEED</button>;
}
