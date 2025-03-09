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
      <style jsx>{`
        /* Custom responsive styles */
        .feature-image {
          max-width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .feature-image {
            max-width: 300px;
            margin: 0 auto;
          }
          .feature-text h2 {
            font-size: 1.5rem;
          }
          .feature-text p {
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .feature-image {
            max-width: 200px;
          }
          .feature-text h2 {
            font-size: 1.25rem;
          }
          .feature-text p {
            font-size: 0.875rem;
          }
        }
      `}</style>

      <section className="py-5 overflow-visible">
        <div className="container overflow-visible">
          <div className="row align-items-center justify-content-between gy-4 overflow-visible">
            <div className="col-12 col-md-6 order-1 order-md-1 text-center text-md-start overflow-visible">
              <Image
                src={darkMode ? workflowDark : workflow}
                width={528}
                height={528}
                alt="Task management dashboard preview"
                className="rounded-circle img-fluid feature-image"
                style={{ boxShadow: "-12px 0px 24px rgba(33, 64, 212, 0.25)" }}
              />
            </div>
            <div
              style={{ maxWidth: "485px" }}
              className="col-12 col-md-6 order-2 order-md-1 feature-text mt-6"
            >
              <h2
                className="fs-2 fs-md-fs-3 text-purple mb-4"
                style={{ fontWeight: "900" }}
              >
                Revolutionize your workflow
              </h2>
              <p className="fs-4 text-gray mb-4" style={{ maxWidth: "485px" }}>
                We have designed our app for increased efficiency and it will
                help you to start getting more things done.
              </p>
              <span className="fw-bold text-blue d-flex align-items-center justify-content-end">
                Learn More <IoIosArrowForward className="fs-4 ms-3" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 overflow-visible">
        <div className="container overflow-visible">
          <div className="row align-items-center justify-content-between gy-4 overflow-visible">
            <div
              style={{ maxWidth: "485px" }}
              className="col-12 col-md-6 order-2 order-md-1 feature-text overflow-visible mt-6"
            >
              <h2
                className="fs-2 fs-md-fs-3 text-orange mb-4"
                style={{ fontWeight: "900" }}
              >
                Free template library <br /> included
              </h2>
              <p className="fs-4 text-gray mb-4" style={{ maxWidth: "485px" }}>
                We have got quite a few already made templates for better
                project management that you can use now.
              </p>
              <span className="fw-bold text-blue d-flex align-items-center justify-content-end">
                Learn More <IoIosArrowForward className="fs-4 ms-3" />
              </span>
            </div>
            <div className="col-12 col-md-6 order-1 order-md-2 text-center overflow-visible">
              <Image
                src={darkMode ? templateLibraryDark : templateLibrary}
                width={528}
                height={528}
                alt="Template library preview"
                className="rounded-circle img-fluid feature-image"
                style={{ boxShadow: "-12px 0px 24px rgba(255, 153, 0, 0.35)" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 overflow-visible">
        <div className="container overflow-visible">
          <div className="row align-items-center justify-content-between gy-4 overflow-visible">
            <div className="col-12 col-md-6  text-center overflow-visible">
              <Image
                src={darkMode ? globalTeamDark : globalTeam}
                width={528}
                height={528}
                alt="Global teams preview"
                className="rounded-circle img-fluid feature-image"
                style={{ boxShadow: "-12px 0px 24px rgba(251, 83, 146, 0.25)" }}
              />
            </div>
            <div
              style={{ maxWidth: "485px" }}
              className="col-12 col-md-6  feature-text mt-6"
            >
              <div>
                <h2
                  className="fs-2 fs-md-fs-3 text-red mb-4"
                  style={{ fontWeight: "900" }}
                >
                  Used by teams from all over the globe
                </h2>
                <p className="fs-4 text-gray mb-4">
                  We have designed our app for increased efficiency and it will
                  help you to start getting more things done.
                </p>
                <span className="fw-bold text-blue d-flex align-items-center justify-content-end">
                  Learn More <IoIosArrowForward className="fs-4 ms-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureShowcase;
