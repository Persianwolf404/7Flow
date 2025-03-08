"use client";

import React, { useState, useEffect } from "react";
import Button from "./Button";
import { IoIosArrowForward } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { LuTwitter } from "react-icons/lu";
import { SlSocialFacebook } from "react-icons/sl";
import DarkMode from "./DarkMode";

const Footer = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read dark mode from cookies
    const savedMode = document.cookie
      .split("; ")
      .find((row) => row.startsWith("darkMode="))
      ?.split("=")[1];

    setDarkMode(savedMode ? JSON.parse(savedMode) : false);

    // Listen for dark mode toggle events
    const handleStorageChange = () => {
      const updatedMode = document.cookie
        .split("; ")
        .find((row) => row.startsWith("darkMode="))
        ?.split("=")[1];

      setDarkMode(updatedMode ? JSON.parse(updatedMode) : false);
    };

    window.addEventListener("darkModeToggle", handleStorageChange);
    return () =>
      window.removeEventListener("darkModeToggle", handleStorageChange);
  }, []);

  return (
    <section className="container bg-background public-sans">
      <div
        style={{
          height: "432px",
          backgroundImage: `url('/images/${
            darkMode ? "pattern-dark" : "pattern"
          }.svg')`,
          borderRadius: "56px",
        }}
        className="w-100 my-6 d-flex align-items-center bg-soft-blue bg-sky justify-content-center flex-column px-8"
      >
        <h2 style={{ fontWeight: "900" }} className="text-blue w-100 fs-2 mb-5">
          Risk-free 30 day trial to <br />{" "}
          <span className="text-green">level up </span> your team’s
          productivity.
        </h2>
        <div className="d-flex justify-content-between w-100">
          <p className="fs-4 text-ocean-blue">
            Get started now and take advantage of our 30 day free trial <br />
            today. No credit card required.
          </p>
          <div className="d-flex flex-column justify-content-center">
            <Button className="bg-green d-flex align-items-center gap-4">
              <span>Get Started</span>
              <IoIosArrowForward className="fs-4 " />
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{ width: "1025px" }}
        className="pt-6 d-flex mx-auto justify-content-between "
      >
        <div className="d-flex flex-column">
          <div className="montserrat text-green fw-bolder fs-4 ">
            7<span className="text-blue">flow</span>.
          </div>
          <DarkMode />
        </div>
        <div className="d-flex gap-7 fw-bolder fs-6 text-midnight-gray">
          <div className="d-flex gap-4 flex-column">
            <span>Pricing</span>
            <span>How it Works</span>
            <span>FAQ</span>
          </div>
          <div className="d-flex gap-4 flex-column">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
          </div>
        </div>
        <div>
          <div className="d-flex gap-5 text-green">
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <FaInstagram className="fs-4 " />
            </span>
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <LuTwitter className="fs-4 " />
            </span>
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <SlSocialFacebook className="fs-4" />
            </span>
          </div>
        </div>
      </div>
      <h6 className="fw-bolder text-gray mt-7 mb-6 text-center">
        Made with ❤️ for{" "}
        <a href="https://7ho.st/" target="_blank">
          7ho.st
        </a>{" "}
        By Mohamad Shayanfar
      </h6>
    </section>
  );
};

export default Footer;
