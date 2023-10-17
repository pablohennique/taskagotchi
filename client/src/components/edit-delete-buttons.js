import { deleteFetchCall } from "@/lib/backend";
import { useRouter } from "next/navigation";

export default function EditDeleteButtons(props) {
  const router = useRouter();
  let tamagotchi = props.tamagotchi;
  let params = props.params;
  // console.log(paramsObject);
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

  const handleEdit = () => {
    const url = `http://localhost:8000/tamagotchis/${params.tamagotchiId}`;
    editFetchCall(url);
    router.push(`/tamagotchis/`);
  };

  return (
    <div className="buttonContainer">
      <button onClick={handleEdit}>EDIT {tamagotchiNameUppercase}</button>
      <button onClick={handleDelete}>KILL {tamagotchiNameUppercase}</button>
    </div>
  );
}
