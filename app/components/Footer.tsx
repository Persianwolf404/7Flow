import React from "react";
import Button from "./Button";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <section className="container py-6 public-sans">
      <div
        style={{
          height: "432px",
          backgroundImage: "url('/images/pattern.avif')",
          borderRadius: "56px",
          backgroundColor: "#BED0FF",
        }}
        className="w-100 d-flex align-items-center justify-content-center flex-column px-8"
      >
        <h2 style={{ fontWeight: "900" }} className="text-blue w-100 fs-2 mb-5">
          Risk-free 30 day trial to <br />{" "}
          <span className="text-green">level up </span> your team’s
          productivity.
        </h2>
        <div className="d-flex justify-content-between w-100">
          <p style={{ color: "#0445B1" }} className="fs-4">
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
    </section>
  );
};

export default Footer;
