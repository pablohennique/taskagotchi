import Link from "next/link";
import styles from "./tamagotchis-list.module.css";

export default function TamagotchisList({ tamagotchis }) {
  return (
    <ul className={styles.list}>
      {tamagotchis.map((tamagotchi) => (
        <Link key={tamagotchi._id} href={`/tamagotchis/${tamagotchi._id}`}>
          <li key={tamagotchi._id}>
            {tamagotchi.name} - {tamagotchi.breed}
          </li>
        </Link>
      ))}
    </ul>
  );
}
