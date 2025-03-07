import React from "react";
import Button from "./Button";
import Link from "next/link";

const Navbar = () => {
  return (
    <header
      style={{ height: "80px" }}
      className="border-bottom border-cloudy-blue bg-background"
    >
      <div className="container h-100 d-flex align-items-center">
        <Link href={"/"} className="montserrat text-green fw-bolder fs-4 me-8">
          7<span className="text-blue">flow</span>.
        </Link>
        <ul className="d-flex gap-5 p-0 m-0 list-unstyled  fw-bolder fs-6">
          <Link className="text-midnight-gray" href={"/#"}>Pricing</Link>
          <Link className="text-midnight-gray" href={"/#"}>How it Works</Link>
          <Link className="text-midnight-gray" href={"/#"}>FAQ</Link>
          <Link className="text-midnight-gray" href={"/currencies"}>Currencies</Link>
        </ul>
        <div className="ms-auto d-flex align-items-center">
          <button className="bg-transparent border-0 fs-6 fw-bolder text-midnight-gray me-4">
            Sign in
          </button>
          <Button className="ms-7">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
