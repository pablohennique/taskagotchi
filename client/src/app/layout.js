import NavMenu from "@/components/nav-menu";
import "./globals.css";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.rootLayout}`}>
        <header>
          <NavMenu />
        </header>

        <main>{children}</main>

        <footer>
          <p>Taskagotchi 2023 - All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}
