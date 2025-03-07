import React from "react";
import Image from "next/image";
import CharsImage from "../../public/images/charts.avif";
const CurrenciesHero = () => {
  return (
    <section
      style={{ minHeight: "480px" }}
      className="bg-pink d-flex align-items-center justify-content-center"
    >
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column gap-4">
          <h1 style={{ fontWeight: "900" }}>
            Today’s Cryptocurrency <br />
            prices
          </h1>
          <p className="fs-5">
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
