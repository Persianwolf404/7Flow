"use client";

import { useState, useEffect } from "react";
import darkModeImage from "../../public/images/dark-mode.svg";
import lightModeImage from "../../public/images/light-mode.svg";
import Image from "next/image";

const DarkModeToggle = ({ className }: { className?: string }) => {
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
    <div className={`${className} dark-mode-toggle d-flex gap-4`}>
      <Image
        src={!darkMode ? lightModeImage : darkModeImage}
        width={32}
        height={32}
        alt="on/off"
      />
      <div
        onClick={() => setDarkMode((prev) => !prev)}
        className={`d-flex align-items-center ${
          darkMode ? "justify-content-end" : ""
        } bg-switch-background`}
        style={{
          cursor: "pointer",
          width: "58px",
          height: "32px",
          borderRadius: "16px",
        }}
      >
        {!darkMode ? (
          <span
            className=" rounded-circle ms-2  d-flex justify-content-center align-items-center"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "#2140D4",
            }}
          >
            <span
              className=" rounded-circle "
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#EBEEFB",
              }}
            ></span>
          </span>
        ) : (
          <span
            style={{
              backgroundColor: "#7737FF",
              width: "6px",
              height: "20px",
              marginRight: "12px",
              borderRadius: "4px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
