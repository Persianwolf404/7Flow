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
    <section className="w-100 px-5 ">
      <section className="py-5">
        <div className="row justify-content-between align-items-lg-start align-items-center">
          <div className="col-lg-6">
            <div className="d-flex flex-column">
              <h1
                style={{ fontWeight: "900" }}
                className="text-blue fs-1 f text-center text-lg-start"
              >
                Manage your <br /> daily tasks better without all the stress.
              </h1>
              <p className="mt-5 mb-5 fs-4 text-gray text-center text-lg-start">
                Change the way you manage your tasks with our revolutionary
                project management technology
              </p>
              <div className="d-flex flex-lg-row flex-column gap-4">
                <Button className=" bg-green d-flex align-items-center">
                  <span className="w-100">
                    Get Started <IoIosArrowForward className="ms-3 fs-5" />
                  </span>
                </Button>
                <Button className="bg-transparent text-blue px-4 border border-2 border-sky-blue py-3">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <Image
              src={DesktopImage}
              width={450}
              height={340}
              alt="Task management dashboard preview"
              className="w-100 h-auto mt-lg-0 mt-6"
            />
          </div>
        </div>
      </section>
      <section className="w-100 py-5">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <h2 className="text-dark-gray fs-1 fw-bolder mb-3">
              Get more done in <br className="d-md-none" />{" "}
              <span className="text-green">less time</span>
            </h2>
            <p className="fs-4 text-gray mb-5">Simple, fast, effortlessly.</p>
          </div>
        </div>
        <div className="row mx-auto gap-5 d-flex justify-content-center">
          {features.map((feature, index) => (
            <div key={index} className="col-auto  ">
              <div className="d-flex align-items-center gap-4">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: feature.bgColor,
                  }}
                >
                  {feature.icon}
                </div>
                <h6 className="fw-bolder text-dark-blue">{feature.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Hero;
