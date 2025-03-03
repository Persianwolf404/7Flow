import React from "react";
import Image from "next/image";
import workflow from "../../public/images/workflow.avif";
import templateLibrary from "../../public/images/template-library.avif";
import globalTeam from "../../public/images/global-teams.avif";

import { IoIosArrowForward } from "react-icons/io";

const FeatureShowcase = () => {
  return (
    <>
      <section className="py-6 d-flex justify-content-between align-items-center">
        <Image
          src={workflow}
          width={528}
          height={528}
          alt="Task management dashboard preview"
          className="rounded-pill"
          style={{
            boxShadow: "-12px 0px 24px rgba(33, 64, 212, 0.25)",
          }}
        />
        <div>
          <h2 style={{ fontWeight: "900" }} className="fs-2 text-blue mb-5">
            Revolutionize your workflow
          </h2>
          <p style={{ maxWidth: "485px" }} className="fs-4 text-gray mb-6">
            We have designed our app for increased efficiency and it will help
            you to start getting more things done.
          </p>
          <span className="fw-6 text-blue justify-content-end fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
      </section>
      <section className="py-6 d-flex justify-content-between align-items-center">
        <div>
          <h2 style={{ fontWeight: "900" }} className="fs-2 text-orange mb-5">
            Free template library <br /> included
          </h2>
          <p style={{ maxWidth: "485px" }} className="fs-4 text-gray mb-6">
            We have got quite a few already made templates for better project
            management that you can use now.
          </p>
          <span className="fw-6 text-blue justify-content-end fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
        <Image
          src={templateLibrary}
          width={528}
          height={528}
          alt="Task management dashboard preview"
          className="rounded-pill"
          style={{
            boxShadow: "-12px 0px 24px rgb(255, 153, 0, 0.35)",
          }}
        />
      </section>
      <section className="py-6 d-flex justify-content-between align-items-center">
        <Image
          src={globalTeam}
          width={528}
          height={528}
          alt="Task management dashboard preview"
          className="rounded-pill"
          style={{
            boxShadow: "-12px 0px 24px rgba(251, 83, 146, 0.25)",
          }}
        />
        <div style={{ maxWidth: "485px" }}>
          <h2 style={{ fontWeight: "900" }} className="fs-2 text-red mb-5">
            Used by teams from all over the globe
          </h2>
          <p className="fs-4 text-gray mb-6">
            We have designed our app for increased efficiency and it will help
            you to start getting more things done.
          </p>
          <span className="fw-6 text-blue justify-content-end fw-bold d-flex align-items-center">
            Learn More <IoIosArrowForward className="fs-4 ms-3" />
          </span>
        </div>
      </section>
    </>
  );
};

export default FeatureShowcase;
