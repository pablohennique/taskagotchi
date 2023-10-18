"use client";
import { useBackendFetchCall } from "@/lib/backend";
import TamagotchiList from "../../components/tamagotchis-list";
import Link from "next/link";
import styles from "./page.module.css";

export default function TamagotchisPage() {
  // const [tamagotchis, setTamagotchis] = useState([]);
  const baseUrl = process.env.API_BASE_PATH;

  const url = baseUrl + "/tamagotchis";
  const [tamagotchis, setTamagotchis] = useBackendFetchCall(
    "tamagotchis",
    [],
    url
  );

  return (
    <>
      <h1>My Tamagotchis</h1>
      <TamagotchiList tamagotchis={tamagotchis} />
      <div className="buttonContainer">
        <Link href="/tamagotchis/create">CREATE TAMAGOTCHI</Link>
      </div>
    </>
  );
}
