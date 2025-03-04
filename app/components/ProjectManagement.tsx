import React from "react";
import PhoneImage from "../../public/images/phone.avif";
import Image from "next/image";

const ProjectManagement = () => {
  return (
    <section className="py-6 d-flex flex-column align-items-center">
      <div
        style={{ maxWidth: "940px" }}
        className="text-center gap-5 d-flex flex-column mb-9"
      >
        <h2
          style={{ fontSize: "48px", fontWeight: "900" }}
          className="text-blue"
        >
          
          Fully reinvented project management system to help you ship products
          faster
        </h2>
        <p className="fs-4 text-gray">
          Focus on what matters most, our robots handle the rest ☕️
        </p>
      </div>
      <Image src={PhoneImage} width={1520} height={750} alt={"Phone image"} />
    </section>
  );
};

export default ProjectManagement;
