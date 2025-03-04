import React from "react";

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
        <h2 style={{ fontWeight: "900" }} className="text-blue w-100 fs-2">
          Risk-free 30 day trial to <br /> <span className="text-green">level up </span> your team’s
          productivity.
        </h2>
        <div className="d-flex">
          <p></p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
