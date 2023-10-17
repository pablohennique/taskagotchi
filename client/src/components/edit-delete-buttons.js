import { deleteFetchCall, updateFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function EditDeleteButtons(props) {
  const router = useRouter();

  const { tamagotchi, params } = props;
  let tamagotchiNameUppercase;

  if (tamagotchi.name) {
    tamagotchiNameUppercase = tamagotchi.name.toUpperCase();
  }

  const handleDelete = () => {
    const confirmation = window.confirm(
      `Are you sure you want to kill ${tamagotchi.name}?`
    );
    if (confirmation) {
      const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
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
      const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
      updateFetchCall(url, newTamagotchiName);
      window.location.reload();
    }
  };

  return (
    <div className="buttonContainer">
      <button onClick={handleUpdate}>CHANGE NAME</button>
      <button onClick={handleDelete}>KILL {tamagotchiNameUppercase}</button>
    </div>
  );
}
