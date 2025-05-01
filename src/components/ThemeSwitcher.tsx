import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
  }, []);

  const switchTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";

      localStorage.setItem("theme", newTheme);

      document.documentElement.classList.remove(prevTheme);
      document.documentElement.classList.add(newTheme);

      return newTheme;
    });
  };

  return (
    <button onClick={switchTheme} className="cursor-pointer rounded border border-gray-300 p-1.5 dark:border-gray-700">
      {theme === "dark" ? (
        <LuSun size={17} className="text-yellow-300" />
      ) : (
        <LuMoon size={17} className="text-sky-500" />
      )}
    </button>
  );
};
