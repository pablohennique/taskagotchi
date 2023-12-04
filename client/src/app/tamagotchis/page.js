"use client";
import { useBackendFetchCall } from "@/lib/backend";
import ItemsList from "../../components/items-list";
import logInCheck from "@/utils/logInCheck";
import Link from "next/link";
import styles from "./page.module.css";

function TamagotchisPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
  const urlPath = "/tamagotchis";
  const url = baseUrl + urlPath;

  const [tamagotchis, setTamagotchis] = useBackendFetchCall(
    "tamagotchis",
    [],
    url
  );

  return (
    <>
      <h1>My Tamagotchis</h1>
      <ItemsList items={tamagotchis} urlPath={urlPath} />
      <div className="buttonContainer">
        <Link href="/tamagotchis/create">CREATE TAMAGOTCHI</Link>
      </div>
    </>
  );
}

export default logInCheck(TamagotchisPage);
