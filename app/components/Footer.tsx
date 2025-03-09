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
    <section className="container bg-background public-sans px-sm-3  px-0">
      <div
        style={{
          height: "432px",
          backgroundImage: `url('/images/${
            darkMode ? "pattern-dark" : "pattern"
          }.svg')`,
        }}
        className="w-100 pill my-sm-6 bg-soft-blue bg-sky px-5 px-md-8 pill"
      >
        <div className="row h-100 align-items-center">
          <div className="col-12">
            <h2
              style={{ fontWeight: "900" }}
              className="text-blue w-100 fs-2 mb-5 text-center text-md-start"
            >
              Risk-free 30 day trial to <br />{" "}
              <span className="text-green">level up </span> your {`team's`}
              productivity.
            </h2>
            <div className="row">
              <div className="col-12 col-lg-8">
                <p className="fs-4 text-ocean-blue text-center text-md-start">
                  Get started now and take advantage of our 30 day free trial{" "}
                  <br />
                  today. No credit card required.
                </p>
              </div>
              <div className="col-12 col-lg-4 d-flex justify-content-center justify-content-lg-end align-items-center">
                <Button className="bg-green mt-5 col-12 col-sm-9 mt-lg-0 d-flex align-items-center gap-4 justify-content-center jusify-content-md-start">
                  <span>Get Started</span>
                  <IoIosArrowForward className="fs-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-6 mx-auto" style={{ maxWidth: "1025px" }}>
        <div className="col-12 col-md-3 d-flex flex-column align-items-center align-items-md-start">
          <div className="montserrat text-green fw-bolder fs-4 mb-6">
            7<span className="text-blue">flow</span>.
          </div>
          <DarkMode className="d-none d-md-flex" />
        </div>

        <div className="col-12 col-md-6 alog-center">
          <div className="row mx-auto gap-4 gap-sm-0 col-6 justify-content-sm-center col-sm-12 flex-sm-row flex-column fw-bolder fs-6 text-midnight-gray mx-md-auto">
            <div className="col-auto me-5">
              <div className="d-flex gap-4 flex-column">
                <span>Pricing</span>
                <span>How it Works</span>
                <span>FAQ</span>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-4 flex-column">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3 mt-6 mt-md-0">
          <div className="d-flex gap-5 gap-md-2 text-green justify-content-center justify-content-md-end">
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <FaInstagram className="fs-4" />
            </span>
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <LuTwitter className="fs-4" />
            </span>
            <span
              style={{ border: "2px solid rgba(8, 192, 86, 0.24)" }}
              className="rounded-circle p-2"
            >
              <SlSocialFacebook className="fs-4" />
            </span>
          </div>
          <DarkMode className="d-md-none d-flex justify-content-center mt-4" />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h6 className="fw-bolder text-gray mt-7 mb-6 text-center">
            Made with ❤️ for{" "}
            <a href="https://7ho.st/" target="_blank">
              7ho.st
            </a>{" "}
            By Mohamad Shayanfar
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Footer;
