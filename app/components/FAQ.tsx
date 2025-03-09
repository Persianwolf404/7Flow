"use client";
import { Accordion } from "react-bootstrap";
import Image from "next/image";
import "./FAQ.css";
import plusImage from "../../public/images/plus.svg";
import minusImage from "../../public/images/minus.svg";
import minusDarkImage from "../../public/images/minus-dark.svg";
import plusDarkImage from "../../public/images/plus-dark.svg";
import { useState, useEffect } from "react";

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet??",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "sed do eiusmod tempor incididunt ut labore et dolore?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "ullamco laboris nisi ut aliquip ex?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "ea commodo consequat?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "Duis aute irure dolor in reprehenderit in voluptate velit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "Excepteur sint occaecat cupidatat non?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    question: "sunt in culpa qui officia deserunt mollit anim id est laborum?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const FAQ = () => {
  const [activeKey, setActiveKey] = useState("0");
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
    <section className="pt-6 pb-sm-6 container px-0 px-md-2 ">
      <Accordion
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key as string)}
        className="custom-accordion text-bone bg-cream pill overflow-hidden py-23 px-3 px-sm-23"
      >
        <div className="w-100 d-flex flex-column align-items-center">
          <h3 className="mb-4 text-brown">FAQ</h3>
          <p className="fs-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          </p>
        </div>

        {faqData.map((item, index) => (
          <Accordion.Item
            className="bg-transparent border-0 border-bottom border-faq-border"
            eventKey={`${index}`}
            key={index}
          >
            <Accordion.Header>
              <div className="text-brown" style={{ width: "80%" }}>
                {item.question}
              </div>
              <div style={{ width: "25px", height: "25px" }}>
                <Image
                  src={
                    darkMode
                      ? activeKey === `${index}`
                        ? minusDarkImage
                        : plusDarkImage
                      : activeKey === `${index}`
                      ? minusImage
                      : plusImage
                  }
                  width={25}
                  height={25}
                  alt={activeKey === `${index}` ? "minus" : "plus"}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body className="text-bone">{item.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQ;
