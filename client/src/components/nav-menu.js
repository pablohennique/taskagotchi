"use client";

import Link from "next/link";
import styles from "@/components/nav-menu.module.css";
import { useEffect, useState } from "react";
import { auth } from "@/utils/auth";

export default function NavMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect and useState used to make sure getLocalStorage is being called after component has gone through initial render in Vercel
  useEffect(() => {
    const checkAuth = () => {
      const getLocalStorage = auth();
      setIsLoggedIn(getLocalStorage);
      console.log("is logged in?", isLoggedIn);
    };

    checkAuth();
  }, []);

  return (
    <nav className={styles.navMenu}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link href="/tamagotchis">Tamagotchis</Link>
            </li>
            <li>
              <Link href="/tasks">Taks</Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link href="/users/login">Login</Link>
            </li>
            <li>
              <Link href="/users/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
