import React from "react";
import Button from "./Button";


const Navbar = () => {
  return (
    <header
      style={{ height: "80px" }}
      className="border-bottom border-cloudy-blue "
    >
      <div className="container h-100 d-flex align-items-center ">
        <div className="montserrat text-green  fw-bold fs-4 me-8">
          7<span className="text-blue">flow</span>.
        </div>
        <ul className=" d-flex gap-5 p-0 m-0 list-unstyled text-midnight-gray fw-bold fs-6">
          <li>Pricing</li>
          <li>How it Works</li>
          <li>FAQ</li>
          <li>Currencies</li>
        </ul>
        <div className="ms-auto">
          <button className="bg-transparent border-0 fs-6 fw-bold text-midnight-gray">
            Sign in
          </button>
          <Button className="ms-7">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
