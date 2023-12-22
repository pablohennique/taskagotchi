"use client";

import Link from "next/link";
import styles from "@/components/nav-menu.module.css";
import { useEffect, useState } from "react";
import { auth } from "@/utils/auth";
import { logout } from "@/utils/logout";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect and useState used to make sure getLocalStorage is being called after component has gone through initial render in Vercel
  useEffect(() => {
    const checkAuth = () => {
      const getLocalStorage = auth();
      setIsLoggedIn(getLocalStorage);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm(
      `Are you sure you want to logout?`
    );
    if (confirmation) {
      logout();
      router.push('/');
      setIsLoggedIn(false);
    }
  };

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
            <li>
              <a onClick={handleLogout}>Logout</a>
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
