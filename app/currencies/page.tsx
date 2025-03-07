import React from "react";
import CurrenciesHero from "./CurrenciesHero";
import Currencies from "../components/Currencies";
import { Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";

const page = () => {
  return (
    <>
      <CurrenciesHero />
      <section className="container py-6">
        <div style={{ padding: "56px 40px" }} className="bg-cream rounded-4">
          <div
            className="fs-8 text-gray border-bottom py-2 d-grid pe-3 ps-5"
            style={{
              gridTemplateColumns: "71px 1fr 150px 215px",
            }}
          >
            <span className="fw-bold">#</span>
            <span className="fw-semibold">Name</span>
            <span className="fw-semibold text-center">Price (USD)</span>
            <span className="fw-semibold text-end">Last Updated</span>
          </div>
          <Suspense
            fallback={
              <div style={{ height: "650px" }} className="w-100 d-flex">
                <Spinner className="m-auto" />
              </div>
            }
          >
            <Currencies />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default page;
