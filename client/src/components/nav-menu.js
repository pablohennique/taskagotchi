import Link from "next/link";
import styles from "@/components/nav-menu.module.css";

export default function NavMenu() {
  return (
    <nav className={styles.navMenu}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/tamagotchis">My Tamagotchis</Link>
        </li>
        <li>
          <Link href="/tasks">Taks</Link>
        </li>
        <span>|</span>
        <li>
          <Link href="/users/login">Login</Link>
        </li>
        <li>
          <Link href="/users/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
