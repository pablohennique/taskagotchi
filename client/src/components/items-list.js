import Link from "next/link";
import styles from "./items-list.module.css";

export default function ItemsList(props) {
  const { items, urlPath } = props;
  const generateLineItems = (item) => {
    if (urlPath === "/tamagotchis") {
      return `${item.name} - ${item.breed}`;
    } else if (urlPath === "/tasks") {
      return item.title;
    }
  };
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <Link key={item._id} href={`${urlPath}/${item._id}`}>
          <li key={item._id}>{generateLineItems(item)}</li>
        </Link>
      ))}
    </ul>
  );
}
