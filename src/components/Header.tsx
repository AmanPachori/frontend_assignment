import next from "next";
import styles from "../styles/Header.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { TbCurrencyCent } from "react-icons/tb";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const theme = document.body.style.getPropertyValue("--current-theme") as
      | "light"
      | "dark";
    setTheme(theme);
  }, []);

  const changeTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark");
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <div className={styles.title}>
          <TbCurrencyCent size={30} />
        </div>
      </Link>
      <SearchBar />
      <div className={styles.themebtn}>
        {theme === "dark" ? (
          <FaMoon size={30} onClick={changeTheme} />
        ) : (
          <FaSun size={30} onClick={changeTheme} />
        )}
      </div>
    </div>
  );
};

export default Header;
