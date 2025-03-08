"use client";

import { useState, useEffect } from "react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read dark mode from cookies on mount
    const savedMode = document.cookie
      .split("; ")
      .find((row) => row.startsWith("darkMode="))
      ?.split("=")[1];

    setDarkMode(savedMode ? JSON.parse(savedMode) : false);
  }, []);

  useEffect(() => {
    // Update cookies when dark mode changes
    document.cookie = `darkMode=${JSON.stringify(darkMode)}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Strict`;

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("darkModeToggle"));
  }, [darkMode]);

  return (
    <div className="dark-mode-toggle">
      <label htmlFor="darkModeToggle">
        Dark Mode:
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={() => setDarkMode((prev) => !prev)}
        />
      </label>
    </div>
  );
};

export default DarkModeToggle;
