// components/DarkModeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check both localStorage and cookies on first load
    const savedMode = localStorage.getItem("darkMode") === "true";
    const cookies = parseCookies();
    const cookieMode = cookies.darkMode === "true";

    // Use localStorage value if available, otherwise use cookie
    const currentMode =
      localStorage.getItem("darkMode") !== null ? savedMode : cookieMode;

    setIsDarkMode(currentMode);

    // Apply theme class
    if (currentMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setIsLoaded(true);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Update localStorage
    localStorage.setItem("darkMode", newMode.toString());

    // Update cookie for SSR
    setCookie(null, "darkMode", newMode.toString(), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // Update DOM
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-1 rounded bg-opacity-20 hover:bg-opacity-30 transition-all"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
