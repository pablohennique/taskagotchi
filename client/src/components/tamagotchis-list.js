export default function TamagotchisList({ tamagotchis }) {
  return (
    <ul>
      {tamagotchis.map((tamagotchi) => (
        <li key={tamagotchi._id}>{tamagotchi.name}</li>
      ))}
    </ul>
  );
}
