import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "Countries" }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "user-theme",
      localStorage.getItem("theme")
    );

    setTheme(localStorage.getItem("theme"));
  }, []);

  const switchTheme = () => {
    theme === "light" ? applyTheme("dark") : applyTheme("light");
  };

  const applyTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("user-theme", theme);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <header className={styles.header}>
          Countries info
        <button className={styles.themeSwitcher} onClick={switchTheme}>
          {theme} mode
        </button>
      </header>

      <section className={styles.main}>{children}</section>
    </div>
  );
};

export default Layout;