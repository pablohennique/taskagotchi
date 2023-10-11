import Link from "next/link";

export default function TamagotchisList({ tamagotchis }) {
  return (
    <ul>
      {tamagotchis.map((tamagotchi) => (
        <Link href={`/tamagotchis/${tamagotchi._id}`}>
          <li key={tamagotchi._id}>{tamagotchi.name}</li>
        </Link>
      ))}
    </ul>
  );
}
