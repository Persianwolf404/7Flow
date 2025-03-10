import React from "react";
import CurrenciesHero from "./CurrenciesHero";
import Currencies from "../components/Currencies";

const page = () => {
  return (
    <>
      <CurrenciesHero />
      <section className="container py-sm-6 px-0 ">
        <div className="bg-cream currencies py-3 px-md-24 py-md-23 ">
          <div className="fs-8 text-gray  border-bottom py-2 d-flex pe-3 ps-3 ps-md-5">
            <span className="fw-bold col-1 ">#</span>
            <span className="fw-semibold col-sm-6 col-5 ">Name</span>
            <span className="fw-semibold text-center col-3 ">Price (USD)</span>
            <span className="fw-semibold text-end col-3 col-sm-2 ">
              Last Updated
            </span>
          </div>
          <Currencies />
        </div>
      </section>
    </>
  );
};

export default page;
