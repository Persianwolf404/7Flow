"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import workflow from "../../public/images/workflow.avif";
import templateLibrary from "../../public/images/template-library.avif";
import globalTeam from "../../public/images/global-teams.avif";
import workflowDark from "../../public/images/workflow-dark.avif";
import templateLibraryDark from "../../public/images/template-library-dark.avif";
import globalTeamDark from "../../public/images/global-teams-dark.avif";

const FeatureShowcase = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Read dark mode state from cookies on client
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
    <>
      <section className="py-6 d-flex justify-content-between align-items-center">
        <Image
          src={darkMode ? workflowDark : workflow}
          width={528}
          height={528}
          alt="Task management dashboard preview"
          className="rounded-circle"
          style={{ boxShadow: "-12px 0px 24px rgba(33, 64, 212, 0.25)" }}
        />
        <div>
          <h2 className="fs-2 text-purple mb-5" style={{ fontWeight: "900" }}>
            Revolutionize your workflow
          </h2>
          <p className="fs-4 text-gray mb-6" style={{ maxWidth: "485px" }}>
            We have designed our app for increased efficiency and it will help
            you to start getting more things done.
          </p>
          <span className="fw-6 text-blue fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
      </section>

      <section className="py-6 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fs-2 text-orange mb-5" style={{ fontWeight: "900" }}>
            Free template library <br /> included
          </h2>
          <p className="fs-4 text-gray mb-6" style={{ maxWidth: "485px" }}>
            We have got quite a few already made templates for better project
            management that you can use now.
          </p>
          <span className="fw-6 text-blue fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
        <Image
          src={darkMode ? templateLibraryDark : templateLibrary}
          width={528}
          height={528}
          alt="Template library preview"
          className="rounded-circle"
          style={{ boxShadow: "-12px 0px 24px rgba(255, 153, 0, 0.35)" }}
        />
      </section>

      <section className="py-6 d-flex justify-content-between align-items-center">
        <Image
          src={darkMode ? globalTeamDark : globalTeam}
          width={528}
          height={528}
          alt="Global teams preview"
          className="rounded-circle"
          style={{ boxShadow: "-12px 0px 24px rgba(251, 83, 146, 0.25)" }}
        />
        <div style={{ maxWidth: "485px" }}>
          <h2 className="fs-2 text-red mb-5" style={{ fontWeight: "900" }}>
            Used by teams from all over the globe
          </h2>
          <p className="fs-4 text-gray mb-6">
            We have designed our app for increased efficiency and it will help
            you to start getting more things done.
          </p>
          <span className="fw-6 text-blue fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
      </section>
    </>
  );
};

export default FeatureShowcase;
