import React from "react";
import Image from "next/image";
import CharsImage from "../../public/images/charts.avif";
const CurrenciesHero = () => {
  return (
    <section
      style={{ minHeight: "480px" }}
      className="bg-pink d-flex align-items-center justify-content-center py-4"
    >
      <div className="container d-flex flex-md-row flex-column justify-content-between align-items-center">
        <div className="d-flex flex-column gap-4 text-center text-md-start">
          <h1 style={{ fontWeight: "900", color: "#23262F" }}>
            Today’s Cryptocurrency <br />
            prices
          </h1>
          <p style={{ color: "#353945" }} className="fs-5">
            The global crypto market cap is{" "}
            <span className="fw-bold">$1.86T</span>
          </p>
        </div>
        <div>
          <Image
            src={CharsImage}
            width={450}
            height={330}
            alt={"charts image"}
          />
        </div>
      </div>
    </section>
  );
};

export default CurrenciesHero;
