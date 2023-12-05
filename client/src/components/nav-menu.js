"use client";

import Link from "next/link";
import styles from "@/components/nav-menu.module.css";
import { auth } from "@/utils/auth";

export default function NavMenu() {
  // const isLoggedIn = auth();

  return (
    <nav className={styles.navMenu}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {/* {isLoggedIn && ( */}
          <>
            <li>
              <Link href="/tamagotchis">Tamagotchis</Link>
            </li>
            <li>
              <Link href="/tasks">Taks</Link>
            </li>
          </>
        {/* )} */}
        {/* {!isLoggedIn && ( */}
          <>
            <li>
              <Link href="/users/login">Login</Link>
            </li>
            <li>
              <Link href="/users/register">Register</Link>
            </li>
          </>
        {/* )} */}
      </ul>
    </nav>
  );
}
