import React from "react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { FiCreditCard, FiGitPullRequest } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import Button from "./Button";
import DesktopImage from "../../public/images/desktop.avif";

const Hero = () => {
  const features = [
    {
      icon: <FiCreditCard className="fs-2 text-light-blue" />,
      title: "Transparent Pricing",
      bgColor: "#20DAF114",
      textColor: "text-light-blue",
    },
    {
      icon: <FiGitPullRequest className="fs-2 text-orange" />,
      title: "Easy Integrations",
      bgColor: "#FF990014",
      textColor: "text-orange",
    },
    {
      icon: <FaArrowTrendUp className="fs-3 text-red" />,
      title: "Superb Efficiency",
      bgColor: "#FB539214",
      textColor: "text-red",
    },
  ];

  return (
    <section className="w-100">
      <section className="py-6 d-flex justify-content-between">
        <div className="d-flex flex-column" style={{ width: "576px" }}>
          <h1 className="text-blue fs-1 fw-bold">
            Manage your daily tasks better without all the <br /> stress.
          </h1>
          <p className="mt-5 mb-7 fs-4 text-gray">
            Change the way you manage your tasks with our revolutionary project
            management technology
          </p>
          <div className="d-flex gap-4">
            <Button className="bg-green d-flex align-items-center">
              Get Started <IoIosArrowForward className="ms-6 fs-5" />
            </Button>
            <Button className="bg-transparent text-blue border border-2 border-sky-blue py-3">
              Schedule a Demo
            </Button>
          </div>
        </div>
        <Image
          src={DesktopImage}
          width={450}
          height={340}
          alt="Task management dashboard preview"
        />
      </section>
      <section className="w-100 py-6 d-flex align-items-center flex-column">
        <h2 className="text-dark-gray fs-2 fw-bold mb-3">
          Get more done in <span className="text-green">less time</span>
        </h2>
        <p className="fs-4 text-gray mb-6">Simple, fast, effortlessly.</p>

        <div className="d-flex gap-9">
          {features.map((feature, index) => (
            <div key={index} className="d-flex align-items-center gap-4">
              <div
                className="rounded-pill d-flex justify-content-center align-items-center"
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: feature.bgColor,
                }}
              >
                {feature.icon}
              </div>
              <h6 className="fw-bold text-dark-blue">{feature.title}</h6>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Hero;
