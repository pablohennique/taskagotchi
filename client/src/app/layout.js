import NavMenu from "@/components/nav-menu";
import "./globals.css";
import { Roboto_Flex } from "next/font/google";
import styles from "./layout.module.css";

const roboto = Roboto_Flex({subsets: ['latin']});

export const metadata = {
  title: "Taskagotchi",
  description: "Complete tasks and feed your tamagotchis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${styles.rootLayout}`}>
        <header>
          <NavMenu />
        </header>
{/*  */}

        <main>{children}</main>

        <footer>
          <p>Taskagotchi 2024 - All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}
